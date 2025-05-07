import {
  Easing,
  interpolate,
  interpolateColors,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const Pill: React.FC<{
  children: React.ReactNode;
  highlightFrom?: [number, number];
  index: number;
}> = ({ children, highlightFrom, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = highlightFrom
    ? interpolate(frame, [highlightFrom[0], highlightFrom[0] + 5], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.inOut(Easing.ease),
      }) -
      interpolate(frame, [highlightFrom[1], highlightFrom[1] + 5], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.inOut(Easing.ease),
      })
    : 0;

  const backgroundColor = interpolateColors(
    progress,
    [0, 1],
    ["white", "#0B84F3"],
  );
  const color = interpolateColors(progress, [0, 1], ["black", "white"]);

  const enter = spring({
    fps,
    frame,
    config: {
      damping: 200,
    },
    durationInFrames: 25,
    delay: index * 0.3,
    durationRestThreshold: 0.01,
  });

  const translateY = interpolate(enter, [0, 1], [50, 0]);

  return (
    <div
      className="px-6 py-3 text-3xl border-slate-300 border-solid border-2 rounded-full"
      style={{
        fontFamily: "GT Planar",
        fontFeatureSettings: "'ss03' on",
        backgroundColor,
        color,
        ...(translateY > 0
          ? {
              translate: `0 ${translateY}px`,
              perspective: 1000,
              willChange: "transform, opacity",
              opacity: enter,
            }
          : {}),
      }}
    >
      {children}
    </div>
  );
};
