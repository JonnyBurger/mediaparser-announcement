import { Composition } from "remotion";
import { Main } from "./Main";
import "./index.css";

import { calculateMetadata } from "./calculate-metadata/calculate-metadata";
import { schema } from "./calculate-metadata/schema";
import { Grid } from "./Grid/Grid";
import { HEIGHT } from "./Grid/layout";
import { ThreeDGrid } from "./3DGrid/ThreeDGrid";
import { Waveform } from "./Waveform/Waveform";

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
        component={Waveform}
        fps={30}
        height={1080}
        durationInFrames={200}
        width={1920}
      />
    </>
  );
};
