import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLUMNS, HEIGHT, ROWS, WIDTH } from "./layout";
import { HexCharacter } from "./HexCharacter";
import { FlashLabel } from "./FlashLabel";
import { randomHex } from "./Grid";

export const Flash: React.FC<{
  content: string;
  offset: number;
  label: string;
  width: number;
  background?: string;
  actualContent?: boolean;
}> = ({
  content,
  offset,
  label,
  width,
  background = "#0B84F3",
  actualContent,
}) => {
  const column = offset % COLUMNS;
  const row = Math.floor(offset / COLUMNS);
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  const flash = (delay: number) =>
    spring({
      fps,
      frame,
      config: {
        damping: 200,
      },
      delay,
      durationInFrames: 15,
    });

  const scale = (delay: number) =>
    interpolate(flash(delay), [0, 0.01, 0.7, 1], [0, 1, 1.15, 1]);

  return (
    <AbsoluteFill>
      <div
        className="absolute"
        style={{
          width: width * (WIDTH / COLUMNS),
          height: HEIGHT / ROWS,
          top: (row * HEIGHT) / ROWS,
          left: (column * WIDTH) / COLUMNS,
        }}
      >
        <FlashLabel progress={flash(10)} content={label} tileWidth={width} />
        <div
          style={{
            filter: `drop-shadow(0 0 20px ${background})`,
          }}
        >
          {new Array(content.length).fill(true).map((_, i) => {
            const row = Math.floor(i / width);
            const column = i % width;
            return (
              <HexCharacter
                backgroundColor={background}
                color="white"
                column={column}
                row={row}
                scale={scale(i)}
              >
                {actualContent ? content[i] : randomHex(i + offset)}
              </HexCharacter>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
