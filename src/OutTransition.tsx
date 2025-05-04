import { transparentize } from "polished";
import React from "react";
import {
  AbsoluteFill,
  random,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const columns = 9;
const rows = 16;

const Tile: React.FC<{
  column: number;
  row: number;
}> = ({ column, row }) => {
  const { width, height } = useVideoConfig();
  const frame = useCurrentFrame();
  const index = row * columns + column;

  const positionY = (column / columns) * height;
  const positionX = (row / rows) * width;

  const centerX = width / 2;
  const centerY = height / 2;

  const distanceFromCenter = Math.sqrt(
    (positionX - centerX) ** 2 + (positionY - centerY) ** 2,
  );

  const delay = distanceFromCenter * 0.01;

  const op = spring({
    from: 0,
    to: 1,
    config: {
      damping: 200,
    },
    delay,
    frame,
    durationInFrames: 10,
    fps: 30,
  });

  const scaleOut = spring({
    config: {
      damping: 200,
    },
    reverse: true,
    delay: delay + 20,
    durationInFrames: 15,
    frame,
    fps: 30,
  });

  return (
    <AbsoluteFill
      style={{
        width: 1920 / rows,
        height: 1080 / columns,
        left: (1920 / rows) * row,
        top: (1080 / columns) * column,
        color: "white",
      }}
    >
      <div
        style={{
          backgroundColor: transparentize(
            1 - (op - 1 + Math.min(1, Math.max(scaleOut, 0))),
            "#0D1116",
          ),
        }}
        className="flex-1 text-white flex justify-center items-center text-3xl"
      >
        <span style={{ scale: op + scaleOut - 1, display: "block" }}>
          {Math.floor(random(index) * 16)
            .toString(16)
            .toUpperCase()}
        </span>
      </div>
    </AbsoluteFill>
  );
};
export const OutTransition: React.FC = () => {
  return (
    <AbsoluteFill>
      {Array.from({ length: columns }).map((_, i) =>
        Array.from({ length: rows }).map((_, j) => <Tile column={i} row={j} />),
      )}
    </AbsoluteFill>
  );
};
