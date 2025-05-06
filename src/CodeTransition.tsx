import { AbsoluteFill, interpolate, spring, useVideoConfig } from "remotion";
import { continueRender, delayRender, useCurrentFrame } from "remotion";
import { Pre, HighlightedCode, AnnotationHandler } from "codehike/code";
import React, { useLayoutEffect, useMemo } from "react";

import {
  calculateTransitions,
  getStartingSnapshot,
} from "codehike/utils/token-transitions";
import { applyStyle } from "./utils";
import { callout } from "./annotations/Callout";

import { tokenTransitions } from "./annotations/InlineToken";
import { errorInline, errorMessage } from "./annotations/Error";
import { fontFamily, fontSize, lineHeight, tabSize } from "./font";
import { getTextDimensions } from "./calculate-metadata/get-text-dimensions";
import { PADDING_X, TOP_EXPLAINER_HEIGHT, TopExplainer } from "./TopExplainer";

export function CodeTransition({
  previousCode,
  currentCode,
  nextCode,
  topExplainerContent,
}: {
  readonly previousCode: HighlightedCode | null;
  readonly currentCode: HighlightedCode;
  readonly nextCode: HighlightedCode | null;
  readonly topExplainerContent: React.ReactNode;
}) {
  const frame = useCurrentFrame();
  const { height, fps, durationInFrames } = useVideoConfig();

  const previousRef = React.useRef<HTMLPreElement>(null);
  const currentRef = React.useRef<HTMLPreElement>(null);
  const nextRef = React.useRef<HTMLPreElement>(null);

  const [handle] = React.useState(() => delayRender());

  const prevCode: HighlightedCode = useMemo(() => {
    return previousCode || { ...currentCode, tokens: [], annotations: [] };
  }, [currentCode, previousCode]);

  const nexCode: HighlightedCode = useMemo(() => {
    return nextCode || { ...currentCode, tokens: [], annotations: [] };
  }, [currentCode, nextCode]);

  const code = useMemo(() => {
    return currentCode;
  }, [currentCode]);

  const progress = (delay: number) =>
    spring({
      frame,
      fps,
      config: {
        damping: 200,
      },
      durationInFrames: 15,
      delay: delay - 1,
      durationRestThreshold: 0.001,
    });

  const endProgress = spring({
    frame,
    fps,
    config: {
      damping: 200,
    },
    durationInFrames: 15,
    delay: durationInFrames - 9,
    durationRestThreshold: 0.001,
  });

  useLayoutEffect(() => {
    const oldSnapshot = getStartingSnapshot(previousRef.current!);

    const transitionFromPrevious = calculateTransitions(
      currentRef.current!,
      oldSnapshot,
    );

    transitionFromPrevious.forEach(({ element, keyframes, options }) => {
      if (endProgress === 0) {
        applyStyle({
          element,
          keyframes,
          progress: progress(options.fill === "both" ? 10 : 0),
        });
      }
    });

    const transitionToNext = calculateTransitions(
      currentRef.current!,
      getStartingSnapshot(nextRef.current!),
    );

    transitionToNext.forEach(({ element, keyframes, options }) => {
      if (options.fill === "both" && endProgress > 0) {
        applyStyle({
          element,
          keyframes: {
            opacity: keyframes.opacity
              ? (keyframes.opacity.slice().reverse() as [number, number])
              : undefined,
          },
          progress: endProgress,
        });
      }
    });
    continueRender(handle);
  });

  const handlers: AnnotationHandler[] = useMemo(() => {
    return [tokenTransitions, callout, errorInline, errorMessage];
  }, []);

  const oldDimensions = getTextDimensions(prevCode.code);
  const newDimensions = getTextDimensions(code.code);
  const interpolatedHeight = interpolate(
    progress(0),
    [0, 1],
    [oldDimensions.height, newDimensions.height],
  );
  const paddingY =
    (height - interpolatedHeight) / 2 - (TOP_EXPLAINER_HEIGHT / 3) * 2;

  const style: React.CSSProperties = useMemo(() => {
    return {
      position: "relative",
      fontSize,
      lineHeight,
      fontFamily,
      tabSize,
      marginTop: 0,
      marginBottom: 0,
    };
  }, []);

  return (
    <AbsoluteFill>
      <TopExplainer>{topExplainerContent}</TopExplainer>
      <div
        style={{
          flex: 1,
          position: "relative",
        }}
      >
        <AbsoluteFill
          style={{
            paddingTop: paddingY,
            paddingLeft: PADDING_X,
            opacity: 0,
          }}
        >
          <Pre
            ref={previousRef}
            code={prevCode}
            handlers={handlers}
            style={style}
          />
        </AbsoluteFill>
        <AbsoluteFill
          style={{
            paddingTop: paddingY,
            paddingLeft: PADDING_X,
          }}
        >
          <Pre ref={currentRef} code={code} handlers={handlers} style={style} />
        </AbsoluteFill>
        <AbsoluteFill
          style={{
            paddingTop: paddingY,
            paddingLeft: PADDING_X,
            opacity: 0,
          }}
        >
          <Pre ref={nextRef} code={nexCode} handlers={handlers} style={style} />
        </AbsoluteFill>
      </div>
    </AbsoluteFill>
  );
}
