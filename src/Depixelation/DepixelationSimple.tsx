import React, { useEffect, useState } from "react";
import {
  AbsoluteFill,
  cancelRender,
  continueRender,
  delayRender,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { TileOrImage } from "./Depixelation";
import { loadImageAsBitmap } from "./load-image-as-bitmap";

export const DepixelationSimple: React.FC<{
  level: number;
  type: "tile" | "image";
  durationInFrames: number;
  direction: "down" | "up";
}> = ({ level, type, durationInFrames, direction }) => {
  const tiles = 2 ** level;
  const { width, height } = useVideoConfig();
  const [handle] = useState(() => delayRender());

  const frame = useCurrentFrame();
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const imageSrc = staticFile("image.png");

  useEffect(() => {
    loadImageAsBitmap(imageSrc)
      .then((imageData) => {
        setImageData(imageData);
        continueRender(handle);
      })
      .catch((err) => {
        console.error(err);
        cancelRender(handle);
      });
  }, [handle, imageSrc]);

  if (imageData === null) {
    return null;
  }

  const spr = spring({
    frame,
    fps: 30,
    config: {
      damping: 200,
    },
    durationInFrames: durationInFrames * 1.5,
    durationRestThreshold: 0.01,
  });

  return (
    <AbsoluteFill>
      {new Array(tiles).fill(true).map((_, i) => {
        return (
          <AbsoluteFill key={i}>
            {new Array(tiles).fill(true).map((_, j) => {
              const index = j * tiles + i;
              const reverseIndex = tiles * tiles - index - 1;
              const relativeTime =
                (direction === "down" ? index : reverseIndex) / (tiles * tiles);
              const scale = interpolate(
                spr,
                [relativeTime - 0.25, relativeTime],
                [0, 1],
              );
              const left = Math.round((width / tiles) * i);
              const top = Math.round((height / tiles) * j);
              const w = Math.round(width / tiles);
              const h = Math.round(height / tiles);

              return (
                <AbsoluteFill
                  style={{ left, top, width: w, height: h, opacity: scale }}
                  key={index}
                >
                  <TileOrImage
                    absoluteLeft={left}
                    absoluteTop={top}
                    absoluteWidth={w}
                    absoluteHeight={h}
                    padding={0}
                    imageData={imageData}
                    type={type}
                  />
                </AbsoluteFill>
              );
            })}
          </AbsoluteFill>
        );
      })}
    </AbsoluteFill>
  );
};
