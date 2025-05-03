import React from "react";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  makeTransform,
  perspective,
  rotateY,
  scale,
  translateX,
} from "@remotion/animation-utils";
import { takeOffSpeedFunction } from "../remap-speed";
import { AudioVisTrack } from "./AudioVisTrack";

export const AudioVisIntermediateScene: React.FC = () => {
  const { fps, height } = useVideoConfig();
  const frame = useCurrentFrame();

  const scaled = spring({
    frame,
    fps,
    config: { damping: 200 },
    delay: 0,
    durationInFrames: 600,
    durationRestThreshold: 0.00001,
  });

  const speed = takeOffSpeedFunction(frame * 1.5);
  const progress = interpolate(speed, [0, 1000], [0, -1500], {});

  return (
    <AbsoluteFill className="bg-white">
      <Sequence height={height}>
        <AudioVisTrack
          style={{
            transform: makeTransform([
              perspective(1000),
              translateX(900),
              scale(2.4 - scaled),
              translateX(150 + progress),
              rotateY(40),
            ]),
            willChange: "transform",
          }}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
