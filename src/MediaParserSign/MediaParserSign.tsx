import { AbsoluteFill } from "remotion";
import { Line } from "./Line";

export const MediaParserSign: React.FC<{
  lines: string[];
}> = ({ lines }) => {
  return (
    <AbsoluteFill className="absolute flex justify-center items-center bg-white">
      <div
        style={{
          scale: 1.5,
        }}
      >
        {lines.map((line, index) => (
          <Line delay={index * 10}>{line}</Line>
        ))}
      </div>
    </AbsoluteFill>
  );
};
