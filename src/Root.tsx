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
import { CharactersAlt } from "./Characters/CharactersAlt";
import { Characters } from "./Characters/Characters";
import { AudioVisIntermediateScene } from "./Waveform/AudioVisIntermediateScene";
import { DecodeCloseUpTwo } from "./DepixelationThreeD/DecodeCloseUpTwo";
import { Cover } from "./Cover";
import { ThreeDGridSecond } from "./3DGrid/ThreeDGridSecond";
import { MediaParserEndCard } from "./MediaParserEndCard";
import { LowerThird } from "./LowerThird";

export const RemotionRoot = () => {
  return (
    <>
      <Folder name="CodeAnimations">
        <Composition
          id="Metadata"
          component={CodeAnimations}
          defaultProps={{
            steps: null,
            themeColors: null,
            theme: "github-dark" as const,
            width: {
              type: "fixed",
              value: 1920,
            },
            topExplainerContent: "Getting Video Metadata",
          }}
          fps={30}
          height={1080}
          calculateMetadata={calculateMetadata}
          schema={schema}
        />
        <Composition
          id="Samples"
          component={CodeAnimations}
          defaultProps={{
            steps: null,
            themeColors: null,
            theme: "github-dark" as const,
            width: {
              type: "fixed",
              value: 1920,
            },
            topExplainerContent: "Extracting samples",
          }}
          fps={30}
          height={1080}
          calculateMetadata={calculateMetadata}
          schema={schema}
        />
        <Composition
          id="Decoder"
          component={CodeAnimations}
          defaultProps={{
            steps: null,
            themeColors: null,
            theme: "github-dark" as const,
            width: {
              type: "fixed",
              value: 1920,
            },
            topExplainerContent: "WebCodecs API",
          }}
          fps={30}
          height={1080}
          calculateMetadata={calculateMetadata}
          schema={schema}
        />
        <Composition
          id="Webcodecs"
          component={CodeAnimations}
          defaultProps={{
            steps: null,
            themeColors: null,
            theme: "github-dark" as const,
            width: {
              type: "fixed",
              value: 1920,
            },
            topExplainerContent: "WebCodecs API",
          }}
          fps={30}
          height={1080}
          calculateMetadata={calculateMetadata}
          schema={schema}
        />
        <Composition
          id="Async"
          component={CodeAnimations}
          defaultProps={{
            steps: null,
            themeColors: null,
            theme: "github-dark" as const,
            width: {
              type: "fixed",
              value: 1920,
            },
            topExplainerContent: "Controller API",
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
          durationInFrames={60}
          width={1920}
        />
        <Composition
          id="ThreeDGridSecond"
          component={ThreeDGridSecond}
          fps={30}
          height={1080}
          durationInFrames={90}
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
          id="WaveformIntermediateScene"
          component={AudioVisIntermediateScene}
          fps={30}
          height={1080}
          durationInFrames={70}
          width={1920}
        />
        <Composition
          id="WaveformSecondScene"
          component={AudioVisSecondScene}
          fps={30}
          height={1080}
          durationInFrames={140}
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
        id="MediaParserEndCard"
        component={MediaParserEndCard}
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
          id="DecodeCloseUpTwo"
          component={DecodeCloseUpTwo}
          fps={30}
          height={1080}
          durationInFrames={120}
          width={1920}
          defaultProps={{
            useMotionPush: true,
          }}
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
      <Folder name="Characters">
        <Composition
          id="Characters"
          component={Characters}
          fps={30}
          height={1080}
          durationInFrames={150}
          width={1920}
        />
        <Composition
          id="CharactersAlt"
          component={CharactersAlt}
          fps={30}
          height={1080}
          durationInFrames={150}
          width={1920}
        />
      </Folder>
      <Folder name="Cover">
        <Composition
          id="Cover"
          component={Cover}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={30 * 30}
        />
      </Folder>
      <Composition
        id="LowerThird"
        component={LowerThird}
        width={1920}
        height={1080}
        fps={30}
        durationInFrames={30 * 30}
        defaultProps={{
          delay: 0,
        }}
      />
    </>
  );
};
