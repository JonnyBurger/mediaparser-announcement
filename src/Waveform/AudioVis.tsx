import React from "react";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Num } from "./Num";
import { Waveform } from "./Waveform";
import { waveform } from "./data";
import {
  makeTransform,
  rotateX,
  rotateY,
  rotateZ,
  scale,
  translateX,
} from "@remotion/animation-utils";
import { takeOffSpeedFucntion } from "../remap-speed";

export const AudioVisTrack: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();

  const shrink = spring({
    frame,
    fps,
    config: { damping: 200 },
    delay: 150,
    durationInFrames: 400,
    durationRestThreshold: 0.00001,
  });

  const numWidth = interpolate(shrink, [0, 1], [75, 5]);
  const strokeWidth = interpolate(shrink, [0, 1], [20, 5]);

  const width = (waveform.length - 1) * numWidth;

  return (
    <AbsoluteFill>
      <AbsoluteFill className="text-black" style={{ marginLeft: "20%" }}>
        <Sequence from={20}>
          <Waveform width={width} height={height} strokeWidth={strokeWidth} />
        </Sequence>
        <div
          className="flex flex-row absolute justify-center items-center h-full"
          style={{ marginLeft: -numWidth / 2 }}
        >
          {waveform.slice(0, 32).map((y, i) => {
            return <Num numWidth={numWidth} y={y} i={i} />;
          })}
        </div>
      </AbsoluteFill>{" "}
    </AbsoluteFill>
  );
};

export const AudioVis: React.FC = () => {
  const { fps, height } = useVideoConfig();
  const frame = useCurrentFrame();

  const scaled = spring({
    frame,
    fps,
    config: { damping: 200 },
    delay: 60,
    durationInFrames: 600,
    durationRestThreshold: 0.00001,
  });

  const move = spring({
    fps,
    frame,
    config: { damping: 200 },
    durationInFrames: 600,
    delay: 120,
    durationRestThreshold: 0.00001,
  });

  const speed = takeOffSpeedFucntion(frame);
  const progress = interpolate(speed, [0, 1000], [0, -1500], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        perspective: 1000,
      }}
      className="bg-white"
    >
      <Sequence
        height={height}
        style={{
          transform: makeTransform([
            scale(2.4 - scaled),
            translateX(150 + progress),
            rotateY(40),
          ]),
        }}
      >
        <AudioVisTrack />
      </Sequence>
    </AbsoluteFill>
  );
};
