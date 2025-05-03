import {
  makeTransform,
  TransformFunctionReturnType,
  translateX,
  translateY,
} from "@remotion/animation-utils";
import React from "react";

export const COLUMNS = 16;
export const ROWS = 16;
export const HEIGHT = 1920;
export const WIDTH = 1080;

export const HexCharacter: React.FC<{
  column: number;
  row: number;
  children: React.ReactNode;
  color: string;
  backgroundColor?: string;
  scale?: number;
  transforms?: TransformFunctionReturnType[];
}> = ({
  column,
  row,
  children,
  color,
  backgroundColor,
  scale = 1,
  transforms,
}) => {
  const left = (column * WIDTH) / COLUMNS + (1920 - 1080) / 2;
  const top = (row * HEIGHT) / ROWS;
  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        width: WIDTH / COLUMNS,
        height: HEIGHT / ROWS,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 60,
        fontFamily: "GT Planar",
        fontFeatureSettings: "'ss03' on",
        color,
        backgroundColor,
        scale,
        transform: makeTransform([
          translateX(-left),
          translateY(-top),
          ...(transforms ?? []),
          translateX(left),
          translateY(top),
        ]),
      }}
    >
      {children}
    </div>
  );
};
