import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { RotateX, RotateY, Scale } from "./transformation-context";
import { DecodeScene } from "./DecodeScene";

export const DepixelationThreeD: React.FC = () => {
  const frame = useCurrentFrame();

  const rotateX = -10 / 20;
  const rotateY = 10 / 20;

  return (
    <AbsoluteFill className="bg-white flex justify-center items-center">
      <Scale
        factor={interpolate(frame, [0, 20], [1.1, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.out(Easing.ease),
        })}
      >
        <RotateY radians={rotateX}>
          <RotateX radians={rotateY}>
            <Scale factor={1.5}>
              <DecodeScene src={staticFile("LayeredPixelation.mp4")} />
            </Scale>
          </RotateX>
        </RotateY>
      </Scale>
    </AbsoluteFill>
  );
};
