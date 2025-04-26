import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const BigFontSize: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const spr = spring({
    fps,
    frame,
    config: {
      damping: 100,
    },
    durationInFrames: 90,
    delay: 20,
  });

  const fontSize =
    450 * (1 - spr * 0.7) + interpolate(frame, [0, 150], [0, -100]);

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        fontFamily: "GT Planar",
        fontSize: fontSize,
        fontWeight: "bold",
        color: "black",
      }}
    >
      <span style={{}}>Hello</span>
    </AbsoluteFill>
  );
};
