import { AbsoluteFill, interpolate, spring, useVideoConfig } from "remotion";
import { continueRender, delayRender, useCurrentFrame } from "remotion";
import { Pre, HighlightedCode, AnnotationHandler } from "codehike/code";
import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";

import {
  calculateTransitions,
  getStartingSnapshot,
  TokenTransitionsSnapshot,
} from "codehike/utils/token-transitions";
import { applyStyle } from "./utils";
import { callout } from "./annotations/Callout";

import { tokenTransitions } from "./annotations/InlineToken";
import { errorInline, errorMessage } from "./annotations/Error";
import { fontFamily, fontSize, lineHeight, tabSize } from "./font";
import { getTextDimensions } from "./calculate-metadata/get-text-dimensions";
import { PADDDING_X, TOP_EXPLAINER_HEIGHT, TopExplainer } from "./TopExplainer";

export function CodeTransition({
  previousCode,
  currentCode,
}: {
  readonly previousCode: HighlightedCode | null;
  readonly currentCode: HighlightedCode;
}) {
  const frame = useCurrentFrame();
  const { height, fps } = useVideoConfig();

  const ref = React.useRef<HTMLPreElement>(null);
  const [oldSnapshot, setOldSnapshot] =
    useState<TokenTransitionsSnapshot | null>(null);
  const [handle] = React.useState(() => delayRender());

  const prevCode: HighlightedCode = useMemo(() => {
    return previousCode || { ...currentCode, tokens: [], annotations: [] };
  }, [currentCode, previousCode]);

  const code = useMemo(() => {
    return oldSnapshot ? currentCode : prevCode;
  }, [currentCode, prevCode, oldSnapshot]);

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

  useEffect(() => {
    if (!oldSnapshot) {
      setOldSnapshot(getStartingSnapshot(ref.current!));
    }
  }, [oldSnapshot]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(() => {
    if (!oldSnapshot) {
      setOldSnapshot(getStartingSnapshot(ref.current!));
      return;
    }

    const transitions = calculateTransitions(ref.current!, oldSnapshot);

    transitions.forEach(({ element, keyframes, options }) => {
      applyStyle({
        element,
        keyframes,
        progress: progress(options.fill === "both" ? 10 : 0),
      });
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
  const paddingY = (height - interpolatedHeight) / 2 - TOP_EXPLAINER_HEIGHT / 2;

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
      <TopExplainer />
      <div style={{ flex: 1, paddingTop: paddingY, paddingLeft: PADDDING_X }}>
        <Pre ref={ref} code={code} handlers={handlers} style={style} />
      </div>
    </AbsoluteFill>
  );
}
