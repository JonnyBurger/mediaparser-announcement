import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { DepixelationSimple } from "./DepixelationSimple";

export const LayeredPixelation: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence>
        <DepixelationSimple
          direction="down"
          durationInFrames={25}
          level={2}
          type="tile"
          withNumbers
          fontStyles={{
            fontSize: 140,
            fontWeight: "bold",
          }}
        />
      </Sequence>
      <Sequence from={25}>
        <DepixelationSimple
          direction="up"
          durationInFrames={25}
          level={3}
          type="tile"
          withNumbers
          fontStyles={{
            fontSize: 80,
            fontWeight: "bold",
          }}
        />
      </Sequence>
      <Sequence from={50}>
        <DepixelationSimple
          direction="down"
          durationInFrames={25}
          level={4}
          type="tile"
          withNumbers
          fontStyles={{
            fontSize: 60,
            fontWeight: "bold",
          }}
        />
      </Sequence>
      <Sequence from={75}>
        <DepixelationSimple
          direction="up"
          durationInFrames={25}
          level={5}
          type="tile"
          withNumbers
          fontStyles={{
            fontSize: 20,
          }}
        />
      </Sequence>
      <Sequence from={100}>
        <DepixelationSimple
          direction="down"
          durationInFrames={25}
          level={5}
          type="image"
          withNumbers={false}
          fontStyles={{
            fontSize: 12,
          }}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
