import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { ThreeDGrid } from "./3DGrid/ThreeDGrid";
import { AudioVisFirstScene } from "./Waveform/AudioVisFirstScene";
import { MediaParserSign } from "./MediaParserSign/MediaParserSign";
import { OutTransition } from "./OutTransition";
import { DepixelationThreeD } from "./DepixelationThreeD";
import { DecodeCloseUp } from "./DepixelationThreeD/DecodeCloseUp";
import { AudioVisSecondScene } from "./Waveform/AudioVisSecondScene";
import { Characters } from "./Characters/Characters";
import { CharactersAlt } from "./Characters/CharactersAlt";
import { AudioVisIntermediateScene } from "./Waveform/AudioVisIntermediateScene";

export const Master: React.FC = () => {
  return (
    <AbsoluteFill>
      <Audio src={staticFile("music.mp3")} />
      <Sequence durationInFrames={60}>
        <Characters />
      </Sequence>
      <Sequence durationInFrames={60} from={60}>
        <CharactersAlt />
      </Sequence>
      <Sequence durationInFrames={120} from={120}>
        <ThreeDGrid />
      </Sequence>
      <Sequence durationInFrames={120} from={240}>
        <DepixelationThreeD />
      </Sequence>
      <Sequence durationInFrames={90} from={360}>
        <AudioVisFirstScene />
      </Sequence>
      <Sequence durationInFrames={60} from={450}>
        <DecodeCloseUp />
      </Sequence>
      <Sequence durationInFrames={60} from={510}>
        <Sequence from={-112}>
          <AudioVisIntermediateScene />
        </Sequence>
      </Sequence>
      <Sequence durationInFrames={60} from={570}>
        <Sequence from={-42}>
          <AudioVisSecondScene />
        </Sequence>
      </Sequence>
      <Sequence durationInFrames={60} from={668}>
        <MediaParserSign lines={["Understand media", "deeper than ever"]} />
      </Sequence>
      <Sequence durationInFrames={70} from={728}>
        <MediaParserSign lines={["npm i @remotion/media-parser"]} />
      </Sequence>
      <Sequence durationInFrames={120} from={778}>
        <OutTransition />
      </Sequence>
    </AbsoluteFill>
  );
};
