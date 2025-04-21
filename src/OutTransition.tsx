import React from "react";
import { AbsoluteFill, random, spring, useCurrentFrame } from "remotion";

const columns = 9;
const rows = 16;

const Tile: React.FC<{
  column: number;
  row: number;
}> = ({ column, row }) => {
  const frame = useCurrentFrame();
  const index = row * columns + column * 5;
  const delay = index * 0.15;

  const op = spring({
    from: 0,
    to: 1,
    config: {
      damping: 200,
    },
    delay,
    frame,
    fps: 30,
  });

  const op1 = spring({
    from: 0,
    to: 1,
    config: {
      damping: 200,
    },
    delay: delay + 30,
    frame,
    fps: 30,
  });

  const bgOpacity = spring({
    from: 0,
    to: 1,
    config: {
      damping: 200,
    },
    delay: 30,
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
        opacity: op,
        color: "white",
      }}
    >
      <div
        style={{
          backgroundColor: `rgba(0, 0, 0, ${1 - bgOpacity})`,
        }}
        className="flex-1 bg-black text-white flex justify-center items-center text-3xl"
      >
        <span style={{ scale: op - op1, display: "block" }}>
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
