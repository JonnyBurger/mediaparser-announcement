import { AbsoluteFill, random, Sequence } from "remotion";
import { Flash } from "./Flash";
import { COLUMNS, ROWS } from "./layout";
import { HexCharacter } from "./HexCharacter";

export const randomHex = (seed: number) => {
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
      <Sequence from={3}>
        <Flash
          actualContent
          content="1920"
          width={4}
          offset={41}
          label="width"
        />
      </Sequence>
      <Sequence from={15}>
        <Flash
          actualContent
          content="1080"
          width={4}
          offset={66}
          label="height"
        />
      </Sequence>
      <Sequence from={25}>
        <Flash actualContent content="30" width={2} offset={90} label="fps" />
      </Sequence>
      <Sequence from={70}>
        <Flash
          background="#8e44ad"
          content="10802160234902349"
          width={4}
          offset={144 - 16}
          label="H.264 keyframe"
        />
      </Sequence>
      <Sequence from={75}>
        <Flash
          background="rgb(16 171 58)"
          content="1080216023490"
          width={4}
          offset={144 - 16 + 5}
          label="AAC sample"
        />
      </Sequence>
      <Sequence from={78}>
        <Flash
          background="#8e44ad"
          content="10802160234902349"
          width={5}
          offset={154 - 16}
          label="H.264 delta"
        />
      </Sequence>
      <Sequence from={80}>
        <Flash
          background="#8e44ad"
          content="1080216023490234alksjfaklsöf9"
          width={7}
          offset={240}
          label="H.264 delta"
        />
      </Sequence>
      <Sequence from={86}>
        <Flash
          background="rgb(16 171 58)"
          content="10802160234902349"
          width={8}
          offset={240 + 8}
          label="AAC sample"
        />
      </Sequence>
    </AbsoluteFill>
  );
};
