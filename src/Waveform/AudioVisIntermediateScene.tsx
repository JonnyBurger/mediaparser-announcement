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
import { useMotionPushEnd, useMotionPushStart } from "../use-motion-push";

export const AudioVisIntermediateSceneInternal: React.FC<{
  transitionStart: number;
  transitionEnd: number;
}> = ({ transitionStart: transitionStart, transitionEnd: transitionEnd }) => {
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
          noNum
          style={{
            transform: makeTransform([
              perspective(1000),
              translateX(900),
              scale(2.4 - scaled + (1 - transitionStart) * 4),
              translateX(150 + progress),
              rotateY(40 - transitionEnd * 20),
            ]),
            willChange: "transform",
          }}
        />
      </Sequence>
    </AbsoluteFill>
  );
};

export const AudioVisIntermediateScene: React.FC = () => {
  const motion = useMotionPushStart();
  const motionPush = useMotionPushEnd();

  return (
    <Sequence from={-106}>
      <AudioVisIntermediateSceneInternal
        transitionStart={motion}
        transitionEnd={motionPush}
      />
    </Sequence>
  );
};
