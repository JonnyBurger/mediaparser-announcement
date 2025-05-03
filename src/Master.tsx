import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { ThreeDGrid } from "./3DGrid/ThreeDGrid";
import { AudioVisFirstScene } from "./Waveform/AudioVisFirstScene";
import { MediaParserSign } from "./MediaParserSign/MediaParserSign";
import { OutTransition } from "./OutTransition";
import { ParseAndDownloadMedia } from "./ParseAndDownloadMedia";
import { DecodeCloseUp } from "./ParseAndDownloadMedia/DecodeCloseUp";
import { AudioVisSecondScene } from "./Waveform/AudioVisSecondScene";

export const Master: React.FC = () => {
  return (
    <AbsoluteFill>
      <Audio src={staticFile("music.mp3")} />
      <Sequence durationInFrames={120} from={120}>
        <ThreeDGrid />
      </Sequence>
      <Sequence durationInFrames={120} from={240}>
        <ParseAndDownloadMedia />
      </Sequence>
      <Sequence durationInFrames={120} from={360}>
        <AudioVisFirstScene />
      </Sequence>
      <Sequence durationInFrames={90} from={480}>
        <DecodeCloseUp />
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
