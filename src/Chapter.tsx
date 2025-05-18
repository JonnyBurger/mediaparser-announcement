import { visualControl } from "@remotion/studio";
import { transparentize } from "polished";
import React from "react";
import {
  AbsoluteFill,
  interpolate,
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
  op: number;
}> = ({ column, row, op }) => {
  const { width, height } = useVideoConfig();
  const index = row * columns + column;
  const frame = useCurrentFrame();

  const positionY = (column / columns) * height + height / columns / 2;
  const positionX = (row / rows) * width;

  const centerX = width / 2;
  const centerY = height / 2;

  const distanceFromCenter = Math.sqrt(
    (positionX - centerX) ** 2 + (positionY - centerY) ** 2,
  );

  const distanceFromCenterXMore = Math.sqrt(
    (positionX - centerX) ** 2 * 0.1 + (positionY - centerY) ** 2 * 10,
  );

  const delay = distanceFromCenter * 0.0003;

  const opacityDeduction = Math.max(0, 0.4 - distanceFromCenterXMore / 1000);

  return (
    <AbsoluteFill
      style={{
        width: 1920 / rows,
        height: 1080 / columns,
        left: (1920 / rows) * row,
        top: (1080 / columns) * column,
        color: "white",
        overflow: "visible",
      }}
    >
      <div
        style={{
          backgroundColor: transparentize(1 - (op - delay) * 1.3, "#F7F9FB"),
          scale: 1.005,
        }}
        className="flex-1 text-gray-400 flex justify-center items-center text-3xl"
      >
        <span
          style={{
            scale: op,
            display: "block",
            opacity: 0.4 - opacityDeduction,
          }}
        >
          {Math.floor(random(index + Math.round((frame + index) / 20)) * 16)
            .toString(16)
            .toUpperCase()}
        </span>
      </div>
    </AbsoluteFill>
  );
};

export const Chapter: React.FC = () => {
  const frame = useCurrentFrame();
  const { height } = useVideoConfig();
  const op =
    spring({
      frame,
      fps: 30,
      config: {
        damping: 200,
      },

      durationInFrames: 20,
    }) -
    spring({
      frame,
      fps: 30,
      config: {
        damping: 200,
      },
      reverse: true,
      from: 1,
      to: 0,
      durationInFrames: 12,
      delay: 55,
    });

  return (
    <AbsoluteFill
      style={{
        transform:
          frame > 30
            ? undefined
            : `rotate(${interpolate(op, [0.4, 1], [5, 0], {
                extrapolateRight: "clamp",
              })}deg)`,
        overflow: "visible",
        scale: frame > 30 ? 1 : interpolate(op, [0, 1], [1.5, 1]),
      }}
    >
      <AbsoluteFill>
        {Array.from({ length: columns }).map((_, i) =>
          Array.from({ length: rows }).map((_, j) => (
            <Tile op={op} column={i} row={j} />
          )),
        )}
        <AbsoluteFill
          className="justify-center items-center"
          style={{ overflow: "visible" }}
        >
          <div
            className="text-white text-3xl pl-6 pr-6 flex items-center justify-center"
            style={{
              fontFamily: "GT Planar",
              fontWeight: "500",
              color: "black",
              height: height / columns / 2,
              scale:
                2 *
                interpolate(op, [0.4, 1], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
            }}
          >
            {visualControl("title", "License + Business Model")}
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
