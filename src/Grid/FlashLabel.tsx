import { interpolate, useCurrentFrame } from "remotion";
import { HEIGHT, ROWS, WIDTH, COLUMNS } from "./layout";

export const FlashLabel: React.FC<{
  content: string;
  tileWidth: number;
  progress: number;
}> = ({ content, tileWidth, progress }) => {
  const gradientOffset = progress * 120 - 40;
  const maskImage = `linear-gradient(to right, white ${gradientOffset + 20}%, transparent ${gradientOffset + 50}%)`;
  const frame = useCurrentFrame();

  const appear = interpolate(frame, [20, 26], [0, 1]);

  return (
    <div
      className="bg-background"
      style={{
        height: HEIGHT / ROWS,
        width: (WIDTH / COLUMNS) * tileWidth,
        position: "absolute",
        top: -(HEIGHT / ROWS),
        left: 0,
        display: "flex",
        paddingLeft: 36,
        alignItems: "center",
        fontSize: 50,
        color: "black",
        fontFamily: "GT Planar",
        borderBottom: "4px solid white",
        fontFeatureSettings: "'ss03' on",
        maskImage,
      }}
    >
      <span style={{ opacity: appear }}>{content}</span>
    </div>
  );
};
