import React from "react";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  RotateX,
  RotateY,
  RotateZ,
  Scale,
  TranslateX,
  TranslateY,
} from "./transformation-context";
import { DecodeScene } from "./DecodeScene";
import { visualControl } from "@remotion/studio";
import { z } from "zod";

export const DecodeCloseUp: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const motion = spring({
    frame,
    fps,
    config: {
      damping: 200,
    },
    durationInFrames: 150,
  });

  const startX = visualControl("one-startX", 200, z.number().step(1));
  const startY = visualControl("one-startY", -200, z.number().step(1));
  const endX = visualControl("one-endX", 0, z.number().step(1));
  const endY = visualControl("one-endY", 100, z.number().step(1));
  const rotateZStart = visualControl(
    "one-rotateZStart",
    -Math.PI / 8,
    z.number().step(0.01),
  );
  const rotateZEnd = visualControl(
    "one-rotateZEnd",
    Math.PI / 8,
    z.number().step(0.01),
  );
  const scaleStart = visualControl(
    "one-scaleStart",
    3.5,
    z.number().step(0.01),
  );
  const scaleEnd = visualControl("one-scaleEnd", 3.89, z.number().step(0.01));

  const scale = interpolate(motion, [0, 1], [scaleStart, scaleEnd]);
  const translateX = interpolate(motion, [0, 1], [startX, endX]);
  const translateY = interpolate(motion, [0, 1], [startY, endY]);
  const rotateZ = interpolate(motion, [0, 1], [rotateZStart, rotateZEnd]);

  return (
    <Sequence from={-0}>
      <AbsoluteFill className="bg-white flex justify-center items-center">
        <TranslateX px={translateX}>
          <TranslateY px={translateY}>
            <RotateZ radians={rotateZ}>
              <RotateY radians={0}>
                <RotateX radians={-Math.PI / 3}>
                  <Scale factor={scale}>
                    <DecodeScene src={staticFile("SlowDissolve.mp4")} />
                  </Scale>
                </RotateX>
              </RotateY>
            </RotateZ>
          </TranslateY>
        </TranslateX>
      </AbsoluteFill>
    </Sequence>
  );
};
