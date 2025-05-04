import { measureText } from "@remotion/layout-utils";
import {
  AbsoluteFill,
  interpolate,
  interpolateColors,
  random,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const fontSize = 48;

const Char: React.FC<{
  char: string;
  index: number;
  delay: number;
}> = ({ char, index, delay }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  const flash = (delay: number) =>
    spring({
      fps,
      frame,
      config: {
        damping: 200,
      },
      delay: delay + 10,
      durationInFrames: 15,
    });

  const scale = (delay: number) =>
    interpolate(flash(delay), [0, 0.01, 0.7, 1], [1, 1, 1, 1]);

  const anim = flash(index * 0.7 + delay);

  const backgroundColor = interpolateColors(
    anim,
    [0, 0.01, 0.6, 0.61],
    [
      "rgba(255, 255, 255, 0)",
      "rgba(255, 255, 255, 1)",
      "transparent",
      "transparent",
    ],
  );
  const color = interpolateColors(
    anim,
    [0, 0.01, 0.6, 0.8],
    ["rgba(255, 255, 255, 0.3)", "rgba(255, 255, 255, 0.3)", "white", "white"],
  );
  const measured = measureText({
    text: char,
    fontFamily: "GT Planar",
    fontWeight: "500",
    fontSize,
  });

  const actualWidth = interpolate(anim, [0, 1], [45, measured.width]);

  return (
    <div
      style={{
        display: "inline-block",
        width: actualWidth,
        fontFamily: "GT Planar",
        fontSize,
        textAlign: "center",
        fontWeight: "500",
        backgroundColor,
        fontFeatureSettings: '"ss03" on',
        color,
        opacity: interpolate(frame, [0, 10], [0, 1]),
        scale: scale(index * 0.7 + delay),
      }}
    >
      {anim === 0
        ? Math.floor(random(String(index) + char) * 16)
            .toString(16)
            .toUpperCase()
        : char}
    </div>
  );
};

export const LowerThird: React.FC<{
  delay: number;
}> = ({ delay }) => {
  const children = ["Jonny Burger"];
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      className="flex items-start justify-end"
      style={{ padding: 200, opacity: interpolate(frame, [70, 90], [1, 0]) }}
    >
      <div>
        {children.map((child, index) => {
          return (
            <div key={index}>
              {child.split("").map((char, index) => {
                return <Char char={char} index={index} delay={delay} />;
              })}
            </div>
          );
        })}
        <div
          className="text-white text-xl"
          style={{
            fontFamily: "GT Planar",
            fontSize: 36,
            color: "#666666",
            opacity: interpolate(frame, [10, 20], [0, 1]),
          }}
        >
          Chief Hacker, Remotion
        </div>
      </div>
    </AbsoluteFill>
  );
};
