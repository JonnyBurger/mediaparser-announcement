import React, { useMemo } from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { DepixelationSimple } from "./DepixelationSimple";

export const LayeredPixelation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const appear = spring({
    fps,
    frame,
    config: {
      damping: 200,
    },
    durationInFrames: 48,
  });

  const disappear = spring({
    fps,
    frame,
    config: {
      damping: 200,
    },
    delay: 120,
    durationInFrames: 120,
    durationRestThreshold: 0.0001,
  });

  const progress = interpolate(frame, [0, 150], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const actualFontSize = 14 * Math.E ** ((1 - progress * 1.4) * 3);
  const fontSize = Math.min(actualFontSize);

  const props = useMemo(() => {
    if (fontSize > 14 * Math.E ** 2) {
      return {
        level: 2,
      };
    }

    if (fontSize > 14 * Math.E) {
      return {
        level: 3,
      };
    }

    if (fontSize > 14) {
      return {
        level: 4,
      };
    }

    return {
      level: 5,
    };
  }, [fontSize]);

  return (
    <AbsoluteFill>
      <AbsoluteFill>
        <Img src={staticFile("image.png")} style={{}}></Img>
      </AbsoluteFill>
      <DepixelationSimple
        disappear={disappear}
        appear={appear}
        {...props}
        type="tile"
        withNumbers
        fontStyles={{
          fontSize: fontSize,
          fontWeight: "bold",
        }}
      />
    </AbsoluteFill>
  );
};
