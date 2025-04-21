import { makeTransform, rotateX } from "@remotion/animation-utils";
import React from "react";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const Tile: React.FC<{
  size: number;
}> = ({ size }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: Math.min(80, size / 2),
        flex: 1,
        backgroundColor: "white",
        margin: 8, // Add consistent gap between tiles
      }}
    >
      Tile
    </div>
  );
};

const Division: React.FC<{
  divisionsLeft: number;
}> = ({ divisionsLeft }) => {
  const { width, height } = useVideoConfig();

  const tileSize = Math.min(width, height) / Math.pow(2, divisionsLeft);
  const frontSide = <Tile size={tileSize} />;

  const backSide =
    divisionsLeft > 0
      ? new Array(4).fill(true).map((d, i) => {
          const left = i % 2 === 0 ? 0 : width / 2;
          const top = i < 2 ? 0 : height / 2;
          return (
            <Sequence
              width={width / 2}
              height={height / 2}
              style={{
                left,
                top,
                padding: 8, // Add padding to create gap between subdivisions
              }}
            >
              <Division divisionsLeft={divisionsLeft - 1} />
            </Sequence>
          );
        })
      : null;

  if (divisionsLeft === 0) {
    return <Tile size={tileSize} />;
  }

  const transform = (backSide: boolean) =>
    makeTransform([
      rotateX(
        interpolate(divisionsLeft, [0, 1], [0, 180], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }) + (backSide ? 180 : 0),
      ),
    ]);

  return (
    <AbsoluteFill
      style={{
        perspective: 20000,
      }}
    >
      <AbsoluteFill
        style={{ transform: transform(false), backfaceVisibility: "hidden" }}
      >
        {frontSide}
      </AbsoluteFill>
      <AbsoluteFill
        style={{ transform: transform(true), backfaceVisibility: "hidden" }}
      >
        {backSide}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const Depixelation: React.FC = () => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  const divisions = new Array(4)
    .fill(true)
    .map((_, i) => {
      return spring({
        fps,
        frame,
        config: {
          damping: 200,
        },
        delay: i * 30,
      });
    })
    .reduce((acc, curr) => acc + curr, 0);

  return (
    <AbsoluteFill className="flex flex-col text-white">
      <Division divisionsLeft={divisions} />
    </AbsoluteFill>
  );
};
