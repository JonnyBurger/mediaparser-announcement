import { AbsoluteFill, random, useVideoConfig } from "remotion";

const columns = 16;
const rows = 9;

const randomHex = (seed: number) => {
  return Math.floor(random(seed) * 16777215)
    .toString(16)
    .slice(0, 1)
    .toUpperCase();
};

export const Grid = () => {
  const { width, height } = useVideoConfig();

  return (
    <AbsoluteFill className="bg-white">
      <div className="grid grid-cols-16 grid-rows-9">
        {Array.from({ length: columns * rows }).map((_, index) => {
          const column = index % columns;
          const row = Math.floor(index / columns);
          return (
            <div
              key={index}
              style={{
                position: "absolute",
                left: (column * width) / columns,
                top: (row * height) / rows,
                width: width / columns,
                height: height / rows,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: 60,
                fontFamily: "GT Planar",
                fontFeatureSettings: "'ss03' on",
              }}
            >
              {randomHex(index)}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
