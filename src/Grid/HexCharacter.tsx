import React from "react";
import { COLUMNS, HEIGHT, ROWS, WIDTH } from "./layout";

export const HexCharacter: React.FC<{
  column: number;
  row: number;
  children: React.ReactNode;
  color: string;
  backgroundColor?: string;
  scale?: number;
}> = ({ column, row, children, color, backgroundColor, scale = 1 }) => {
  return (
    <div
      style={{
        position: "absolute",
        left: (column * WIDTH) / COLUMNS,
        top: (row * HEIGHT) / ROWS,
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
      }}
    >
      {children}
    </div>
  );
};
