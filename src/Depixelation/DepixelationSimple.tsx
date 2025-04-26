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
  withNumbers: boolean;
  fontStyles: React.CSSProperties;
}> = ({
  level,
  type,
  durationInFrames,
  direction,
  withNumbers,
  fontStyles,
}) => {
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
    durationInFrames: durationInFrames,
    durationRestThreshold: 0.01,
  });

  const scale =
    interpolate(spr, [0, 1], [1.2, 0.9]) -
    interpolate(frame, [0, durationInFrames], [0, 0.2]);

  return (
    <AbsoluteFill>
      {new Array(tiles).fill(true).map((_, i) => {
        return (
          <AbsoluteFill key={i}>
            {new Array(tiles).fill(true).map((_, j) => {
              const index = j * tiles + i;

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
                    absoluteLeft={left}
                    absoluteTop={top}
                    absoluteWidth={w}
                    absoluteHeight={h}
                    padding={0}
                    imageData={imageData}
                    type={type}
                    withNumbers={withNumbers}
                    fontStyles={{ ...fontStyles, scale: scale }}
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
