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

  const rotYStart = visualControl("rotateY-start", 0.12, z.number().step(0.01));
  const rotYEnd = visualControl("rotateY-end", 0.19, z.number().step(0.01));
  const rotXStart = visualControl("rotateX-start", 0.79, z.number().step(0.01));
  const rotXEnd = visualControl("rotateX-end", 0.79, z.number().step(0.01));
  const rotZStart = visualControl("rotateZ-start", 0.14, z.number().step(0.01));
  const rotZEnd = visualControl("rotateZ-end", 0.14, z.number().step(0.01));
  const scaleStart = visualControl("scale-start", 1.58, z.number().step(0.01));
  const scaleEnd = visualControl("scale-end", 1.96, z.number().step(0.01));
  const transXStart = visualControl("transX-start", -138, z.number().step(1));
  const transXEnd = visualControl("transX-end", -1022, z.number().step(1));
  const transYStart = visualControl("transY-start", -242, z.number().step(1));
  const transYEnd = visualControl("transY-end", 14, z.number().step(1));

  const rotY = interpolate(progress, [0, 1], [rotYStart, rotYEnd]);
  const rotX = interpolate(progress, [0, 1], [rotXStart, rotXEnd]);
  const rotZ = interpolate(progress, [0, 1], [rotZStart, rotZEnd]);
  const s = interpolate(progress, [0, 1], [scaleStart, scaleEnd]);
  const transX = interpolate(progress, [0, 1], [transXStart, transXEnd]);
  const transY = interpolate(progress, [0, 1], [transYStart, transYEnd]);

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
