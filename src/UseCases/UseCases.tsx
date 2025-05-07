import { AbsoluteFill } from "remotion";
import { Pill } from "./Pill";

export const UseCases: React.FC = () => {
  return (
    <AbsoluteFill
      className="bg-background justify-center items-center px-48"
      style={{
        scale: 1.05,
      }}
    >
      <h2
        className="text-6xl font-bold text-foreground"
        style={{
          fontFamily: "GT Planar",
          fontFeatureSettings: "'ss03' on",
          marginBottom: 100,
        }}
      >
        Future ideas
      </h2>
      <div
        className="flex flex-row flex-wrap justify-center gap-4"
        style={{
          marginBottom: 20,
        }}
      >
        <Pill highlightFrom={[82, 145]} index={0}>
          Extracting thumbnail frames
        </Pill>
        <Pill index={1}>Video resizing</Pill>
        <Pill index={2}>Video rotation</Pill>
        <Pill index={3}>Playing multiple videos in sync</Pill>
        <Pill index={4}>Trimming videos</Pill>
        <Pill index={5}>Cropping videos</Pill>
        <Pill index={6}>Audio extraction</Pill>
        <Pill index={7}>Resampling</Pill>
        <Pill highlightFrom={[240, 340]} index={8}>
          Better {"<video>"} tag
        </Pill>
        <Pill index={9}>Incompatible file rejection</Pill>
        <Pill index={10}>Video filters</Pill>
        <Pill index={11}>Combining videos</Pill>
        <Pill index={12}>Audio filters</Pill>
        <Pill index={13}>Loudness adjustment</Pill>
        <Pill index={14}>Watermarking</Pill>
        <Pill index={15}>Re-muxing</Pill>
        <Pill index={16}>Looping</Pill>
        <Pill index={17}>Pitch adjustment</Pill>
        <Pill index={18}>Speed up and down</Pill>
        <Pill index={19}>Partial waveform extraction</Pill>
        <Pill index={20}>Preloading video frames</Pill>
        <Pill index={21}>Video frame caching</Pill>
        <Pill highlightFrom={[145, 230]} index={22}>
          Compressing videos
        </Pill>
        <Pill index={23}>Precomputed seeking hints</Pill>
        <Pill index={24}>Generic video creation APIs</Pill>
      </div>
    </AbsoluteFill>
  );
};
