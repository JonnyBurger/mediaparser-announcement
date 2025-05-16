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

export const ThreeDGrid = () => {
  const frame = useCurrentFrame();

  const progress = interpolate(frame, [0, 300], [0, 1]);

  const startScale = visualControl(
    "three-startScale",
    2.74,
    z.number().step(0.01),
  );
  const endScale = visualControl(
    "three-endScale",
    -2.13,
    z.number().step(0.01),
  );
  const actualScale = interpolate(progress, [0, 1], [startScale, endScale]);

  const startRotateY = visualControl(
    "three-startRotateY",
    70,
    z.number().step(1),
  );
  const endRotateY = visualControl(
    "three-endRotateY",
    1,
    z.number().step(1),
  );
  const currentRotateY = interpolate(
    progress,
    [0, 1],
    [startRotateY, endRotateY],
  );

  const startRotateX = visualControl(
    "three-startRotateX",
    52,
    z.number().step(1),
  );
  const endRotateX = visualControl(
    "three-endRotateX",
    -34,
    z.number().step(1),
  );
  const currentRotateX = interpolate(
    progress,
    [0, 1],
    [startRotateX, endRotateX],
  );

  const startRotateZ = visualControl(
    "three-startRotateZ",
    22,
    z.number().step(1),
  );
  const endRotateZ = visualControl(
    "three-endRotateZ",
    -29,
    z.number().step(1),
  );
  const currentRotateZ = interpolate(
    progress,
    [0, 1],
    [startRotateZ, endRotateZ],
  );

  const startTransX = visualControl(
    "three-startTransX",
    -720,
    z.number().step(1),
  );
  const endTransX = visualControl("three-endTransX", 1493, z.number().step(1));
  const currentTransX = interpolate(progress, [0, 1], [startTransX, endTransX]);

  const startTransY = visualControl(
    "three-startTransY",
    442,
    z.number().step(1),
  );
  const endTransY = visualControl("three-endTransY", -1245, z.number().step(1));
  const currentTransY = interpolate(progress, [0, 1], [startTransY, endTransY]);

  return (
    <AbsoluteFill
      style={{
        perspective: 2000,
        backgroundColor: "#F8FAFC",
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
