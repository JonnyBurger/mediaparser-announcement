import React from "react";
import { AbsoluteFill } from "remotion";
import { COLUMNS, HexCharacter, ROWS } from "./HexCharacter";
import { randomHex } from "../Grid/Grid";
import { visualControl } from "@remotion/studio";
import { z } from "zod";
import {
  makeTransform,
  rotateX,
  rotateY,
  rotateZ,
  scale,
} from "@remotion/animation-utils";

export const Characters: React.FC = () => {
  const rotY = visualControl("rotateY", 0.76, z.number().step(0.01));
  const rotX = visualControl("visualX", 1.18, z.number().step(0.01));
  const rotZ = visualControl("visualZ", 0.52, z.number().step(0.01));
  const s = visualControl("scale", 0.97, z.number().step(0.01));

  return (
    <AbsoluteFill
      className="flex justify-center items-center bg-white"
      style={{
        perspective: 1000,
      }}
    >
      <div
        style={{
          width: 1080,
          height: 1080,
        }}
      >
        {Array.from({ length: COLUMNS * ROWS }).map((_, index) => {
          const column = index % COLUMNS;
          const row = Math.floor(index / COLUMNS);

          return (
            <HexCharacter
              column={column}
              row={row}
              color="black"
              transforms={[
                rotateY(rotY, "rad"),
                rotateX(rotX, "rad"),
                rotateZ(rotZ, "rad"),
                scale(s),
              ]}
            >
              {randomHex(index)}
            </HexCharacter>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
