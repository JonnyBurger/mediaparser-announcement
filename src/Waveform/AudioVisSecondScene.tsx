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
import { doFlip } from "./do-flip";
import { MediaParserSign } from "../MediaParserSign/MediaParserSign";

const AudioVisSecondSceneInternal: React.FC = () => {
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

  const { rotY, rotX } = doFlip({ frame, fps });

  if (rotX >= Math.PI / 2 - 0.03) {
    return (
      <Sequence from={115} className="bg-white">
        <AbsoluteFill
          style={{
            transform: makeTransform([
              rotateY(rotY),
              rotateX(rotX + Math.PI, "rad"),
            ]),
          }}
        >
          <MediaParserSign lines={["Understand media", "deeper than ever"]} />
        </AbsoluteFill>
      </Sequence>
    );
  }

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
              rotateX(rotX, "rad"),
              scale(visualControl("scale", 1, z.number().step(0.01))),
            ]),
            willChange: "transform",
          }}
        />
      </Sequence>
    </AbsoluteFill>
  );
};

export const AudioVisSecondScene: React.FC = () => {
  return (
    <Sequence from={-30}>
      <AudioVisSecondSceneInternal />
    </Sequence>
  );
};
