import { AbsoluteFill } from "remotion";
import { Line } from "./Line";

export const MediaParserSign = () => {
  return (
    <AbsoluteFill className="absolute flex justify-center items-center bg-white">
      <div
        style={{
          scale: 1.5,
        }}
      >
        <Line delay={0}>Understand media</Line>
      </div>
      <div
        style={{
          scale: 1.5,
        }}
      >
        <Line delay={10}>deeper than ever</Line>
      </div>
    </AbsoluteFill>
  );
};
