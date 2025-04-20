import { createSmoothSvgPath } from "@remotion/media-utils";
import { getLength, PathInternals } from "@remotion/paths";
import { interpolate, useCurrentFrame } from "remotion";
import { takeOffSpeedFucntion } from "../remap-speed";
import { waveform } from "./data";

export const Waveform: React.FC<{
  width: number;
  height: number;
  strokeWidth: number;
}> = ({ width, height, strokeWidth }) => {
  const frame = useCurrentFrame();
  const amplitude = 1.5;

  const speed = takeOffSpeedFucntion(frame);

  const points = waveform.map((y, i) => {
    return {
      x: (i / (waveform.length - 1)) * width,
      y:
        height / 2 +
        ((y * (i % 2 === 0 ? 1 : -1) * height) / 2 / 255) * amplitude,
    };
  });
  const path = createSmoothSvgPath({
    points,
  });
  const progress = interpolate(speed, [0, 1000], [-0.001, 1], {
    extrapolateRight: "clamp",
  });

  const length = getLength(path);
  const cut = PathInternals.cutPath(path, progress * length);

  const actualStrokeWidth = interpolate(
    progress,
    [0, 0.00016],
    [strokeWidth / 4, strokeWidth],
    {
      extrapolateRight: "clamp",
    },
  );

  console.log({ progress, cut });
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ overflow: "visible" }}
    >
      <path
        fill="none"
        stroke="#10AB3A"
        strokeLinecap="round"
        strokeWidth={actualStrokeWidth}
        d={cut}
      />
    </svg>
  );
};
