import { AbsoluteFill, random, Sequence } from "remotion";
import { Flash } from "./Flash";
import { COLUMNS, ROWS } from "./layout";
import { HexCharacter } from "./HexCharacter";

const randomHex = (seed: number) => {
  return Math.floor(random(seed) * 16777215)
    .toString(16)
    .slice(0, 1)
    .toUpperCase();
};

export const Grid = () => {
  return (
    <AbsoluteFill className="bg-white">
      <div className="grid grid-cols-16 grid-rows-9">
        {Array.from({ length: COLUMNS * ROWS }).map((_, index) => {
          const column = index % COLUMNS;
          const row = Math.floor(index / COLUMNS);

          return (
            <HexCharacter column={column} row={row} color="black">
              {randomHex(index)}
            </HexCharacter>
          );
        })}
      </div>
      <Sequence from={30}>
        <Flash content="1920" width={4} offset={41} label="width" />
      </Sequence>
      <Sequence from={45}>
        <Flash content="1080" width={4} offset={66} label="height" />
      </Sequence>
      <Sequence from={55}>
        <Flash content="30" width={2} offset={90} label="fps" />
      </Sequence>
      <Sequence from={60}>
        <Flash
          content="10802160234902349"
          width={4}
          offset={144 - 16}
          label="H.264 sample"
        />
      </Sequence>
    </AbsoluteFill>
  );
};
