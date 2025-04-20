import { measureText } from "@remotion/layout-utils";
import {
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
    ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 1)", "white", "white"],
  );
  const color = interpolateColors(
    anim,
    [0, 0.01, 0.6, 0.8],
    ["rgba(0, 0, 0, 0.3)", "rgba(0, 0, 0, 0.3)", "black", "black"],
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

export const Line: React.FC<{
  children: string;
  delay: number;
}> = ({ children, delay }) => {
  return (
    <div
      className="text-center"
      style={{
        height: 100,
      }}
    >
      {children.split("").map((char, index) => {
        return <Char char={char} index={index} delay={delay} />;
      })}
    </div>
  );
};
