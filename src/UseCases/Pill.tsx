import {
  Easing,
  interpolate,
  interpolateColors,
  useCurrentFrame,
} from "remotion";

export const Pill: React.FC<{
  children: React.ReactNode;
  highlightFrom?: [number, number];
}> = ({ children, highlightFrom }) => {
  const frame = useCurrentFrame();
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

  return (
    <div
      className="px-6 py-3 text-3xl border-slate-300 border-solid border-2 rounded-full"
      style={{
        fontFamily: "GT Planar",
        fontFeatureSettings: "'ss03' on",
        backgroundColor,
        color,
      }}
    >
      {children}
    </div>
  );
};
