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

  const scale = interpolate(motion, [0, 1], [3.5, 3.1]);
  const translateX = interpolate(motion, [0, 1], [200, 0]);
  const translateY = interpolate(motion, [0, 1], [-200, 100]);
  const rotateZ = interpolate(motion, [0, 1], [-Math.PI / 8, Math.PI / 8]);

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
