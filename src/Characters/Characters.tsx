import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLUMNS, HexCharacter, ROWS } from "./HexCharacter";
import { randomHex } from "../Grid/Grid";
import { visualControl } from "@remotion/studio";
import { z } from "zod";
import {
  perspective,
  rotateX,
  rotateY,
  rotateZ,
  scale,
  translateX,
  translateY,
  translateZ,
} from "@remotion/animation-utils";
import { noise2D } from "@remotion/noise";

export const Characters: React.FC = () => {
  const rotY = visualControl("rotateY", 0.31, z.number().step(0.01));
  const rotX = visualControl("visualX", 1.13, z.number().step(0.01));
  const rotZ = visualControl("visualZ", 0.14, z.number().step(0.01));
  const s = visualControl("scale", 1.96, z.number().step(0.01));
  const transX = visualControl("transX", -1022, z.number().step(1));
  const transY = visualControl("transY", -245, z.number().step(1));
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  const constance = interpolate(frame, [0, 100], [-100, 100]);

  return (
    <AbsoluteFill
      className="flex justify-center items-center bg-white"
      style={{}}
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

          const spr = spring({
            fps,
            frame,
            config: { damping: 200 },
            delay: (column + row) * 1,
            durationInFrames: 120,
          });
          const nX = noise2D("x", row / 10, column);

          return (
            <HexCharacter
              column={column}
              row={row}
              color="black"
              transforms={[
                perspective(2000),
                rotateY(rotY, "rad"),
                rotateX(rotX, "rad"),
                rotateZ(rotZ, "rad"),
                translateZ(spr * 400 + nX * 100 + constance, "px"),
                translateX(transX, "px"),
                translateY(transY, "px"),
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
