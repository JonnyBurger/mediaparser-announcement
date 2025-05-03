import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  AbsoluteFill,
} from "remotion";
import { waveform } from "./data";
import { Num } from "./Num";
import { Waveform } from "./Waveform";

export const AudioVisTrack: React.FC<{
  style: React.CSSProperties;
  noShrink?: boolean;
  noNum?: boolean;
}> = ({ style, noShrink, noNum }) => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();

  const shrink = noShrink
    ? 0
    : spring({
        frame,
        fps,
        config: { damping: 200 },
        delay: 150,
        durationInFrames: 400,
        durationRestThreshold: 0.00001,
      });

  const numWidth = interpolate(shrink, [0, 1], [75, 5]);
  const strokeWidth = interpolate(shrink, [0, 1], [20, 5]);

  const width = (512 - 1) * numWidth;

  return (
    <AbsoluteFill className="text-black">
      <AbsoluteFill style={style}>
        <Waveform width={width} height={height} strokeWidth={strokeWidth} />
      </AbsoluteFill>
      {noNum ? null : (
        <AbsoluteFill style={style}>
          <div className="flex flex-row absolute h-full">
            {waveform.slice(0, 32).map((y, i) => {
              return <Num key={i} numWidth={numWidth} y={y} i={i} />;
            })}
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
