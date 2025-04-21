import { Composition } from "remotion";
import { Main } from "./Main";
import "./index.css";

import { calculateMetadata } from "./calculate-metadata/calculate-metadata";
import { schema } from "./calculate-metadata/schema";
import { Grid } from "./Grid/Grid";
import { HEIGHT } from "./Grid/layout";
import { ThreeDGrid } from "./3DGrid/ThreeDGrid";
import { AudioVis } from "./Waveform/AudioVis";
import { MediaParserSign } from "./MediaParserSign/MediaParserSign";
import { OutTransition } from "./OutTransition";
import { Master } from "./Master";
import { Depixelation } from "./Depixelation/Depixelation";
export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="Main"
        component={Main}
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
      <Composition
        id="Waveform"
        component={AudioVis}
        fps={30}
        height={1080}
        durationInFrames={500}
        width={1920}
      />
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
      <Composition
        id="Depixelation"
        component={Depixelation}
        fps={30}
        height={1080}
        durationInFrames={30 * 30}
        width={1920}
      />
    </>
  );
};
