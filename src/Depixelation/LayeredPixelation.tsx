import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { DepixelationSimple } from "./DepixelationSimple";

export const LayeredPixelation: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence from={13}>
        <DepixelationSimple
          direction="down"
          durationInFrames={12}
          level={2}
          type="tile"
        />
      </Sequence>
      <Sequence from={25}>
        <DepixelationSimple
          direction="up"
          durationInFrames={16}
          level={3}
          type="tile"
        />
      </Sequence>
      <Sequence from={41}>
        <DepixelationSimple
          direction="down"
          durationInFrames={20}
          level={4}
          type="tile"
        />
      </Sequence>
      <Sequence from={61}>
        <DepixelationSimple
          direction="up"
          durationInFrames={24}
          level={5}
          type="tile"
        />
      </Sequence>
      <Sequence from={85}>
        <DepixelationSimple
          direction="down"
          durationInFrames={28}
          level={5}
          type="image"
        />
      </Sequence>
    </AbsoluteFill>
  );
};
