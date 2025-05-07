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

export const CharactersAlt: React.FC = () => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  const progress = interpolate(frame, [0, 100], [0, 1]);
  const constance = interpolate(progress, [0, 1], [-100, 100]);

  const rotYStart = visualControl(
    "alt-rotateY-start",
    0.12,
    z.number().step(0.01),
  );
  const rotYEnd = visualControl("alt-rotateY-end", 0.19, z.number().step(0.01));
  const rotXStart = visualControl(
    "alt-rotateX-start",
    1.06,
    z.number().step(0.01),
  );
  const rotXEnd = visualControl("alt-rotateX-end", 0.79, z.number().step(0.01));
  const rotZStart = visualControl(
    "alt-rotateZ-start",
    0.14,
    z.number().step(0.01),
  );
  const rotZEnd = visualControl("alt-rotateZ-end", 0.14, z.number().step(0.01));
  const scaleStart = visualControl(
    "alt-scale-start",
    1.84,
    z.number().step(0.01),
  );
  const scaleEnd = visualControl("alt-scale-end", 3.35, z.number().step(0.01));
  const transXStart = visualControl(
    "alt-transX-start",
    -900,
    z.number().step(1),
  );
  const transXEnd = visualControl("alt-transX-end", -1831, z.number().step(1));
  const transYStart = visualControl(
    "alt-transY-start",
    -504,
    z.number().step(1),
  );
  const transYEnd = visualControl("alt-transY-end", -777, z.number().step(1));

  const rotY = interpolate(progress, [0, 1], [rotYStart, rotYEnd]);
  const rotX = interpolate(progress, [0, 1], [rotXStart, rotXEnd]);
  const rotZ = interpolate(progress, [0, 1], [rotZStart, rotZEnd]);
  const s = interpolate(progress, [0, 1], [scaleStart, scaleEnd]);
  const transX = interpolate(progress, [0, 1], [transXStart, transXEnd]);
  const transY = interpolate(progress, [0, 1], [transYStart, transYEnd]);

  return (
    <AbsoluteFill
      className="flex justify-center items-center bg-background"
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
          const nX = noise2D("x", row / 10, Math.sin(frame / 100));
          const nY = noise2D("y", column / 10, Math.sin(frame / 100));

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
                translateZ(spr * 400 + nX * 100 + nY * 100 + constance, "px"),
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
