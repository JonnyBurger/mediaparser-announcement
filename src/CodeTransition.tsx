import { AbsoluteFill, interpolate, spring, useVideoConfig } from "remotion";
import { continueRender, delayRender, useCurrentFrame } from "remotion";
import { Pre, HighlightedCode, AnnotationHandler } from "codehike/code";
import React, { useLayoutEffect, useMemo, useState } from "react";

import { applyStyle } from "./utils";
import { callout } from "./annotations/Callout";

import { tokenTransitions } from "./annotations/InlineToken";
import { errorInline, errorMessage } from "./annotations/Error";
import { fontFamily, fontSize, lineHeight, tabSize } from "./font";
import { getTextDimensions } from "./calculate-metadata/get-text-dimensions";
import { PADDDING_X, TOP_EXPLAINER_HEIGHT, TopExplainer } from "./TopExplainer";
import { getCodeSnapshot } from "./get-code-snapshot";
import { TokenTransition } from "codehike/utils/token-transitions";

export function CodeTransition({
  previousCode,
  currentCode,
  nextCode: nexCode,
}: {
  readonly previousCode: HighlightedCode | null;
  readonly currentCode: HighlightedCode;
  readonly nextCode: HighlightedCode | null;
}) {
  const frame = useCurrentFrame();
  const { height, fps, durationInFrames } = useVideoConfig();

  const ref = React.useRef<HTMLPreElement>(null);
  const [handle] = React.useState(() => delayRender());

  const prevCode: HighlightedCode = useMemo(() => {
    return previousCode || { ...currentCode, tokens: [], annotations: [] };
  }, [currentCode, previousCode]);

  const nextCode: HighlightedCode = useMemo(() => {
    return nexCode || { ...currentCode, tokens: [], annotations: [] };
  }, [currentCode, nexCode]);

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

  const [transitions, setTransitions] = useState<{
    transitionsBefore: TokenTransition[];
    transitionsAfter: TokenTransition[];
  }>({
    transitionsBefore: [],
    transitionsAfter: [],
  });

  useLayoutEffect(() => {
    const { transitionsBefore, transitionsAfter } = getCodeSnapshot({
      before: prevCode,
      after: nextCode,
      current: ref.current!,
      style,
    });

    setTransitions({ transitionsBefore, transitionsAfter });
  }, [prevCode, nextCode, currentCode, style]);

  const fadeOutProgress = spring({
    frame,
    fps,
    config: {
      damping: 200,
    },
    durationInFrames: 20,
    delay: durationInFrames - 20,
  });

  const progress = (delay: number) =>
    spring({
      frame,
      fps,
      config: {
        damping: 200,
      },
      durationInFrames: 20,
      delay: delay,
    });

  useLayoutEffect(() => {
    console.log({ transitions });
    transitions.transitionsBefore.forEach(({ element, keyframes, options }) => {
      applyStyle({
        element,
        keyframes,
        progress: progress(options.fill === "both" ? 10 : 0),
      });
    });

    transitions.transitionsAfter.forEach(({ element, keyframes, options }) => {
      applyStyle({
        element,
        keyframes,
        progress: fadeOutProgress,
      });
    });

    continueRender(handle);
  });

  const handlers: AnnotationHandler[] = useMemo(() => {
    return [tokenTransitions, callout, errorInline, errorMessage];
  }, []);

  const previousDimensions = getTextDimensions(prevCode.code);
  const currentDimensions = getTextDimensions(currentCode.code);
  const nextDimensions = getTextDimensions(nextCode.code);
  const interpolatedHeight = interpolate(
    progress(0) + fadeOutProgress,
    [0, 1, 2],
    [
      previousDimensions.height,
      currentDimensions.height,
      nextDimensions.height,
    ],
  );
  const paddingY = (height - interpolatedHeight) / 2 - TOP_EXPLAINER_HEIGHT / 2;

  return (
    <AbsoluteFill>
      <TopExplainer />
      <div style={{ flex: 1, paddingTop: paddingY, paddingLeft: PADDDING_X }}>
        <Pre ref={ref} code={currentCode} handlers={handlers} style={style} />
      </div>
    </AbsoluteFill>
  );
}
