import { AbsoluteFill, interpolate, Sequence, useCurrentFrame } from "remotion";
import { Grid } from "../Grid/Grid";
import { HEIGHT, WIDTH } from "../Grid/layout";
import {
  makeTransform,
  rotateX,
  rotateY,
  rotateZ,
  scale,
  translateX,
  translateY,
} from "@remotion/animation-utils";
import { visualControl } from "@remotion/studio";
import { z } from "zod";

const ThreeDGridSecondInternal = () => {
  const frame = useCurrentFrame() - 60;

  const progress = interpolate(frame, [0, 300], [0, 1]);

  const startScale = visualControl(
    "three-second-startScale",
    1.6,
    z.number().step(0.01),
  );
  const endScale = visualControl(
    "three-second-endScale",
    0.29,
    z.number().step(0.01),
  );
  const actualScale = interpolate(progress, [0, 1], [startScale, endScale]);

  const startRotateY = visualControl(
    "three-second-startRotateY",
    10,
    z.number().step(1),
  );
  const endRotateY = visualControl(
    "three-second-endRotateY",
    -18.14,
    z.number().step(1),
  );
  const currentRotateY = interpolate(
    progress,
    [0, 1],
    [startRotateY, endRotateY],
  );

  const startRotateX = visualControl(
    "three-second-startRotateX",
    50,
    z.number().step(1),
  );
  const endRotateX = visualControl(
    "three-second-endRotateX",
    80.38,
    z.number().step(1),
  );
  const currentRotateX = interpolate(
    progress,
    [0, 1],
    [startRotateX, endRotateX],
  );

  const startRotateZ = visualControl(
    "three-second-startRotateZ",
    -20,
    z.number().step(1),
  );
  const endRotateZ = visualControl(
    "three-second-endRotateZ",
    -14.81,
    z.number().step(1),
  );
  const currentRotateZ = interpolate(
    progress,
    [0, 1],
    [startRotateZ, endRotateZ],
  );

  const startTransX = visualControl(
    "three-second-startTransX",
    415,
    z.number().step(1),
  );
  const endTransX = visualControl(
    "three-second-endTransX",
    1173,
    z.number().step(1),
  );
  const currentTransX = interpolate(progress, [0, 1], [startTransX, endTransX]);

  const startTransY = visualControl(
    "three-second-startTransY",
    -794,
    z.number().step(1),
  );
  const endTransY = visualControl(
    "three-second-endTransY",
    -3551,
    z.number().step(1),
  );
  const currentTransY = interpolate(progress, [0, 1], [startTransY, endTransY]);

  return (
    <AbsoluteFill
      className="bg-white"
      style={{
        perspective: 2000,
      }}
    >
      <AbsoluteFill
        style={{
          transform: makeTransform([
            scale(actualScale),
            rotateY(currentRotateY),
            rotateX(currentRotateX),
            rotateZ(currentRotateZ),
            translateX(currentTransX),
            translateY(currentTransY),
          ]),
        }}
      >
        <Sequence height={HEIGHT} width={WIDTH}>
          <Grid />
        </Sequence>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const ThreeDGridSecond = () => {
  return (
    <Sequence from={-60}>
      <ThreeDGridSecondInternal />
    </Sequence>
  );
};
