import React, { useEffect, useState } from "react";
import {
  AbsoluteFill,
  cancelRender,
  continueRender,
  delayRender,
  interpolate,
  staticFile,
  useVideoConfig,
} from "remotion";
import { TileOrImage } from "./Depixelation";
import { loadImageAsBitmap } from "./load-image-as-bitmap";

export const DepixelationSimple: React.FC<{
  level: number;
  type: "tile" | "image";
  withNumbers: boolean;
  fontStyles: React.CSSProperties;
  appear: number;
  disappear: number;
}> = ({ level, type, withNumbers, fontStyles, appear, disappear }) => {
  const tiles = 2 ** level;
  const { width, height } = useVideoConfig();
  const [handle] = useState(() => delayRender());

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

  return (
    <AbsoluteFill>
      {new Array(tiles).fill(true).map((_, i) => {
        return (
          <AbsoluteFill key={i}>
            {new Array(tiles).fill(true).map((_, j) => {
              const index = i * tiles + (tiles - j - 1);

              const totalTiles = tiles * tiles;
              const progress = index / totalTiles;

              const left = Math.round((width / tiles) * i);
              const top = Math.round((height / tiles) * j);
              const w = Math.round(width / tiles);
              const h = Math.round(height / tiles);

              return (
                <AbsoluteFill
                  style={{ left, top, width: w, height: h }}
                  key={index}
                >
                  <TileOrImage
                    appear={interpolate(appear, [progress * 0.7, 1], [0, 1])}
                    disappear={interpolate(
                      disappear,
                      [progress * 0.9, 1],
                      [0, 1],
                    )}
                    absoluteLeft={left}
                    absoluteTop={top}
                    absoluteWidth={w}
                    absoluteHeight={h}
                    padding={0}
                    imageData={imageData}
                    type={type}
                    withNumbers={withNumbers}
                    fontStyles={{ ...fontStyles }}
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
