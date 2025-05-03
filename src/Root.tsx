import { Composition, Folder, staticFile } from "remotion";
import { CodeAnimations } from "./Main";
import "./index.css";

import { calculateMetadata } from "./calculate-metadata/calculate-metadata";
import { schema } from "./calculate-metadata/schema";
import { Grid } from "./Grid/Grid";
import { HEIGHT } from "./Grid/layout";
import { ThreeDGrid } from "./3DGrid/ThreeDGrid";
import { AudioVisFirstScene } from "./Waveform/AudioVisFirstScene";
import { MediaParserSign } from "./MediaParserSign/MediaParserSign";
import { OutTransition } from "./OutTransition";
import { Master } from "./Master";
import { LayeredPixelation } from "./Depixelation/LayeredPixelation";
import { BigFontSize } from "./BigFontSize";
import { DepixelationThreeD } from "./DepixelationThreeD";
import { DecodeScene } from "./DepixelationThreeD/DecodeScene";
import { DecodeCloseUp } from "./DepixelationThreeD/DecodeCloseUp";
import { AudioVisSecondScene } from "./Waveform/AudioVisSecondScene";
export const RemotionRoot = () => {
  return (
    <>
      <Folder name="CodeAnimations">
        <Composition
          id="CodeAnimations"
          component={CodeAnimations}
          defaultProps={{
            steps: null,
            themeColors: null,
            theme: "github-dark" as const,
            width: {
              type: "fixed",
              value: 1920,
            },
          }}
          fps={30}
          height={1080}
          calculateMetadata={calculateMetadata}
          schema={schema}
        />
      </Folder>
      <Folder name="1-Grid">
        <Composition
          id="Grid"
          component={Grid}
          fps={30}
          height={HEIGHT}
          durationInFrames={200}
          width={1920}
        />
        <Composition
          id="ThreeDGrid"
          component={ThreeDGrid}
          fps={30}
          height={1080}
          durationInFrames={200}
          width={1920}
        />
      </Folder>
      <Folder name="2-Waveform">
        <Composition
          id="WaveformFirstScene"
          component={AudioVisFirstScene}
          fps={30}
          height={1080}
          durationInFrames={500}
          width={1920}
        />
        <Composition
          id="WaveformSecondScene"
          component={AudioVisSecondScene}
          fps={30}
          height={1080}
          durationInFrames={500}
          width={1920}
        />
      </Folder>

      <Composition
        id="MediaParserSign"
        component={MediaParserSign}
        fps={30}
        height={1080}
        durationInFrames={500}
        width={1920}
        defaultProps={{
          lines: ["Understand media", "deeper than ever"],
        }}
      />
      <Composition
        id="OutTransition"
        component={OutTransition}
        fps={30}
        height={1080}
        durationInFrames={500}
        width={1920}
      />
      <Composition
        id="Master"
        component={Master}
        fps={30}
        height={1080}
        durationInFrames={30 * 30}
        width={1920}
      />
      <Folder name="3-Depixelation">
        <Composition
          id="LayeredPixelation"
          component={LayeredPixelation}
          fps={30}
          height={1080}
          durationInFrames={30 * 30}
          width={1920}
          defaultProps={{
            level: 5,
            type: "tile",
          }}
        />
        <Composition
          id="DecodeScene"
          component={DecodeScene}
          fps={30}
          height={1080}
          durationInFrames={30 * 30}
          width={1920}
          defaultProps={{
            src: staticFile("LayeredPixelation.mp4"),
          }}
        />
        <Composition
          id="DecodeCloseUp"
          component={DecodeCloseUp}
          fps={30}
          height={1080}
          durationInFrames={120}
          width={1920}
        />
        <Composition
          id="BigFontSize"
          component={BigFontSize}
          fps={30}
          height={1080}
          durationInFrames={30 * 30}
          width={1920}
        />
        <Composition
          id="DepixelationThreeD"
          component={DepixelationThreeD}
          fps={30}
          height={1080}
          durationInFrames={30 * 30}
          width={1920}
        />
      </Folder>
    </>
  );
};
