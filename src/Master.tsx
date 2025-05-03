import React from "react";
import { AbsoluteFill, Audio, Sequence, Series, staticFile } from "remotion";
import { AudioVisFirstScene } from "./Waveform/AudioVisFirstScene";
import { MediaParserSign } from "./MediaParserSign/MediaParserSign";
import { OutTransition } from "./OutTransition";
import { DepixelationThreeD } from "./DepixelationThreeD";
import { DecodeCloseUp } from "./DepixelationThreeD/DecodeCloseUp";
import { AudioVisSecondScene } from "./Waveform/AudioVisSecondScene";
import { Characters } from "./Characters/Characters";
import { CharactersAlt } from "./Characters/CharactersAlt";
import { AudioVisIntermediateScene } from "./Waveform/AudioVisIntermediateScene";
import { DecodeCloseUpTwo } from "./DepixelationThreeD/DecodeCloseUpTwo";
import { ThreeDGrid } from "./3DGrid/ThreeDGrid";

export const Master: React.FC = () => {
  return (
    <AbsoluteFill>
      <Audio src={staticFile("music.mp3")} />
      <Series>
        <Series.Sequence durationInFrames={60}>
          <Characters />
        </Series.Sequence>
        <Series.Sequence durationInFrames={60}>
          <ThreeDGrid />
        </Series.Sequence>
        <Series.Sequence durationInFrames={60}>
          <CharactersAlt />
        </Series.Sequence>
        <Series.Sequence durationInFrames={90}>
          <Sequence from={-60}>
            <ThreeDGrid />
          </Sequence>
        </Series.Sequence>
        <Series.Sequence durationInFrames={60}>
          <DecodeCloseUpTwo />
        </Series.Sequence>
        <Series.Sequence durationInFrames={90}>
          <AudioVisFirstScene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={55}>
          <Sequence from={-50}>
            <DecodeCloseUpTwo />
          </Sequence>
        </Series.Sequence>
        <Series.Sequence durationInFrames={60}>
          <AudioVisIntermediateScene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={70}>
          <Sequence>
            <DecodeCloseUp />
          </Sequence>
        </Series.Sequence>
        <Series.Sequence durationInFrames={90}>
          <Sequence from={-30}>
            <AudioVisSecondScene />
          </Sequence>
        </Series.Sequence>
        <Series.Sequence durationInFrames={60}>
          <MediaParserSign lines={["Understand media", "deeper than ever"]} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={70}>
          <MediaParserSign lines={["npm i @remotion/media-parser"]} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={120} offset={-20}>
          <OutTransition />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
