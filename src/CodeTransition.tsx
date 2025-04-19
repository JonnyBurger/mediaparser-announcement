import { interpolate, spring, useVideoConfig } from "remotion";
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

export function CodeTransition({
  oldCode,
  newCode,
}: {
  readonly oldCode: HighlightedCode | null;
  readonly newCode: HighlightedCode;
}) {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();

  const ref = React.useRef<HTMLPreElement>(null);
  const [oldSnapshot, setOldSnapshot] =
    useState<TokenTransitionsSnapshot | null>(null);
  const [handle] = React.useState(() => delayRender());

  const prevCode: HighlightedCode = useMemo(() => {
    return oldCode || { ...newCode, tokens: [], annotations: [] };
  }, [newCode, oldCode]);

  const code = useMemo(() => {
    return oldSnapshot ? newCode : prevCode;
  }, [newCode, prevCode, oldSnapshot]);

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
  const interpolatedDimensions = {
    width: interpolate(
      progress(0),
      [0, 1],
      [oldDimensions.width, newDimensions.width],
    ),
    height: interpolate(
      progress(0),
      [0, 1],
      [oldDimensions.height, newDimensions.height],
    ),
  };
  const paddingX = (width - interpolatedDimensions.width) / 3;
  const paddingY = (height - interpolatedDimensions.height) / 2;

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
    <div style={{ flex: 1, paddingTop: paddingY, paddingLeft: paddingX }}>
      <Pre ref={ref} code={code} handlers={handlers} style={style} />
    </div>
  );
}
