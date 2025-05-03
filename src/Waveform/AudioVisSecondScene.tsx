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
  rotateX,
  rotateY,
  scale,
  translateX,
} from "@remotion/animation-utils";
import { AudioVisTrack } from "./AudioVisTrack";
import { visualControl } from "@remotion/studio";
import { z } from "zod";

export const AudioVisSecondScene: React.FC = () => {
  const { height, fps } = useVideoConfig();
  const frame = useCurrentFrame();

  const whoosh = spring({
    fps,
    frame,
    config: {
      damping: 200,
    },
    durationInFrames: 120,
  });

  const startStateY = visualControl("startRotateY", -40, z.number().step(0.01));
  const endRotateY = visualControl("endRotateX", -78.25, z.number().step(0.01));

  const rotY = interpolate(frame, [0, 120], [startStateY, endRotateY]);

  return (
    <AbsoluteFill className="bg-white">
      <Sequence height={height} from={-120}>
        <AudioVisTrack
          noShrink
          style={{
            transform: makeTransform([
              perspective(1000),
              rotateY(rotY),
              translateX(
                interpolate(
                  whoosh,
                  [0, 1],
                  [
                    visualControl("translatexstart", -2000),
                    visualControl("translatexend", -6000),
                  ],
                ),
              ),
              rotateX(visualControl("rotateX", 0, z.number().step(0.01))),
              scale(visualControl("scale", 1, z.number().step(0.01))),
            ]),
            willChange: "transform",
          }}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
