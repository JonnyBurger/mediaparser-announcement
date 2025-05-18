import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { AudioVisFirstScene } from "./Waveform/AudioVisFirstScene";
import { OutTransition } from "./OutTransition";
import { DecodeCloseUp } from "./DepixelationThreeD/DecodeCloseUp";
import { AudioVisSecondScene } from "./Waveform/AudioVisSecondScene";
import { Characters } from "./Characters/Characters";
import { CharactersAlt } from "./Characters/CharactersAlt";
import { AudioVisIntermediateScene } from "./Waveform/AudioVisIntermediateScene";
import { DecodeCloseUpTwo } from "./DepixelationThreeD/DecodeCloseUpTwo";
import { ThreeDGrid } from "./3DGrid/ThreeDGrid";
import { TransitionSeries } from "@remotion/transitions";
import { ThreeDGridSecond } from "./3DGrid/ThreeDGridSecond";
import { MediaParserEndCard } from "./MediaParserEndCard";

export const Master: React.FC = () => {
  return (
    <AbsoluteFill>
      <Audio src={staticFile("music.mp3")} />
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={60}>
          <Characters />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence durationInFrames={70}>
          <ThreeDGrid />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence durationInFrames={60}>
          <CharactersAlt />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence durationInFrames={80}>
          <ThreeDGridSecond />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence durationInFrames={60}>
          <DecodeCloseUpTwo useMotionPush={false} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence durationInFrames={90}>
          <AudioVisFirstScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence durationInFrames={55}>
          <Sequence from={-50}>
            <DecodeCloseUpTwo useMotionPush={true} />
          </Sequence>
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence durationInFrames={60}>
          <AudioVisIntermediateScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence durationInFrames={70}>
          <DecodeCloseUp />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence durationInFrames={212}>
          <AudioVisSecondScene />
          <Sequence from={150}>
            <MediaParserEndCard />
          </Sequence>
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence durationInFrames={120} offset={-18}>
          <OutTransition />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
