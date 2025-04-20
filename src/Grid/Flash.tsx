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

export const Flash: React.FC<{
  content: string;
  offset: number;
  label: string;
  width: number;
}> = ({ content, offset, label, width }) => {
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
            filter: "drop-shadow(0 0 20px #0B84F3)",
          }}
        >
          {new Array(content.length).fill(true).map((_, i) => {
            const row = Math.floor(i / width);
            const column = i % width;
            return (
              <HexCharacter
                backgroundColor="#0B84F3"
                color="white"
                column={column}
                row={row}
                scale={scale(i)}
              >
                {content[i]}
              </HexCharacter>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
