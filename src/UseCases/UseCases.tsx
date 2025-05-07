import { AbsoluteFill } from "remotion";
import { Pill } from "./Pill";

export const UseCases: React.FC = () => {
  return (
    <AbsoluteFill
      className="bg-background justify-center items-center px-52"
      style={{
        scale: 1.05,
      }}
    >
      <h2
        className="text-6xl font-bold text-foreground"
        style={{
          fontFamily: "GT Planar",
          fontFeatureSettings: "'ss03' on",
          marginBottom: 150,
        }}
      >
        Unlocking new use cases
      </h2>
      <div
        className="flex flex-row flex-wrap justify-center gap-4"
        style={{
          marginBottom: 80,
        }}
      >
        <Pill highlightFrom={[82, 145]}>Extracting thumbnail frames</Pill>
        <Pill>Video resizing</Pill>
        <Pill>Video rotation</Pill>
        <Pill>Playing multiple videos in sync</Pill>
        <Pill>Trimming videos</Pill>
        <Pill>Cropping videos</Pill>
        <Pill>Audio extraction</Pill>
        <Pill>Resampling</Pill>
        <Pill highlightFrom={[240, 400]}>Better {"<video>"} tag</Pill>
        <Pill>Incompatible file rejection</Pill>
        <Pill>Video filters</Pill>
        <Pill>Combining videos</Pill>
        <Pill>Audio filters</Pill>
        <Pill>Loudness adjustment</Pill>
        <Pill>Watermarking</Pill>
        <Pill>Re-muxing</Pill>
        <Pill>Looping</Pill>
        <Pill>Pitch adjustment</Pill>
        <Pill>Speed up and down</Pill>
        <Pill>Partial waveform extraction</Pill>
        <Pill>Preloading video frames</Pill>
        <Pill>Video frame caching</Pill>
        <Pill highlightFrom={[145, 230]}>Compressing videos</Pill>
        <Pill>Precomputed seeking hints</Pill>
        <Pill>Generic video creation APIs</Pill>
      </div>
    </AbsoluteFill>
  );
};
