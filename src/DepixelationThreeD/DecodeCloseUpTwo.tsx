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

export const DecodeCloseUpTwo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const motion =
    spring({
      frame,
      fps,
      config: {
        damping: 200,
      },
      durationInFrames: 300,
    }) + interpolate(frame, [0, 150], [0, 1]);

  const startX = visualControl("two-startX", -227, z.number().step(1));
  const startY = visualControl("two-startY", 83, z.number().step(1));
  const endX = visualControl("two-endX", 0, z.number().step(1));
  const endY = visualControl("two-endY", 100, z.number().step(1));
  const rotateZStart = visualControl(
    "two-rotateZStart",
    -1.33,
    z.number().step(0.01),
  );
  const rotateZEnd = visualControl(
    "two-rotateZEnd",
    Math.PI / 8,
    z.number().step(0.01),
  );

  const rotateXStart = visualControl(
    "two-rotateXStart",
    0,
    z.number().step(0.01),
  );
  const rotateXEnd = visualControl("two-rotateXEnd", 0, z.number().step(0.01));
  const scaleStart = visualControl(
    "two-scaleStart",
    1.63,
    z.number().step(0.01),
  );
  const scaleEnd = visualControl("two-scaleEnd", 3.89, z.number().step(0.01));

  const scale = interpolate(motion, [0, 1], [scaleStart, scaleEnd]);
  const translateX = interpolate(motion, [0, 1], [startX, endX]);
  const translateY = interpolate(motion, [0, 1], [startY, endY]);
  const rotateZ = interpolate(motion, [0, 1], [rotateZStart, rotateZEnd]);
  const rotateX = interpolate(motion, [0, 1], [rotateXStart, rotateXEnd]);
  return (
    <Sequence from={-0}>
      <AbsoluteFill className="bg-white flex justify-center items-center">
        <TranslateX px={translateX}>
          <TranslateY px={translateY}>
            <RotateX radians={rotateX}>
              <RotateZ radians={rotateZ}>
                <RotateY radians={0}>
                  <RotateX radians={-Math.PI / 3}>
                    <Scale factor={scale}>
                      <DecodeScene src={staticFile("LayeredPixelation.mp4")} />
                    </Scale>
                  </RotateX>
                </RotateY>
              </RotateZ>
            </RotateX>
          </TranslateY>
        </TranslateX>
      </AbsoluteFill>
    </Sequence>
  );
};
