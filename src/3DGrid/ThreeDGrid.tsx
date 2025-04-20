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

export const ThreeDGrid = () => {
  const frame = useCurrentFrame();

  const transY = interpolate(frame, [0, 100], [0, -200]);

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
            scale(0.85),
            rotateY(10),
            rotateX(50),
            rotateZ(-20),
            translateX(200),
            translateY(transY),
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
