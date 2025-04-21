import { makeTransform, scale } from "@remotion/animation-utils";
import React, { useEffect, useMemo, useState } from "react";
import {
  AbsoluteFill,
  cancelRender,
  continueRender,
  delayRender,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadImageAsBitmap } from "./load-image-as-bitmap";
import { getAveragePixel } from "./get-average-pixel";
import { CanvasPix } from "./CanvasPix";

const LEVELS = 6;

const TileOrImage: React.FC<{
  padding: number;
  imageData: ImageData;
  absoluteLeft: number;
  absoluteTop: number;
  level: number;
}> = ({ padding, imageData, absoluteLeft, absoluteTop, level }) => {
  if (level < LEVELS) {
    return (
      <Tile
        padding={padding}
        imageData={imageData}
        absoluteLeft={absoluteLeft}
        absoluteTop={absoluteTop}
      />
    );
  }

  return (
    <CanvasPix
      imageData={imageData}
      absoluteLeft={absoluteLeft}
      absoluteTop={absoluteTop}
    />
  );
};

const Tile: React.FC<{
  padding: number;
  imageData: ImageData;
  absoluteLeft: number;
  absoluteTop: number;
}> = ({ padding, imageData, absoluteLeft, absoluteTop }) => {
  const { width, height } = useVideoConfig();
  const averagePixel = useMemo(() => {
    return getAveragePixel({
      imageData,
      top: absoluteTop,
      left: absoluteLeft,
      width,
      height,
    });
  }, [absoluteLeft, absoluteTop, height, imageData, width]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        color: "black",
        margin: padding, // Add consistent gap between tiles
        fontSize: 10,
        backgroundColor: `rgba(${averagePixel.red}, ${averagePixel.green}, ${averagePixel.blue}, ${averagePixel.alpha})`,
      }}
    ></div>
  );
};

const Division: React.FC<{
  divisionsLeft: number;
  level: number;
  absoluteLeft: number;
  absoluteTop: number;
  padding: number;
  imageData: ImageData;
}> = ({
  level,
  divisionsLeft,
  absoluteLeft,
  absoluteTop,
  padding,
  imageData,
}) => {
  const { width, height } = useVideoConfig();

  const frontSide = (
    <TileOrImage
      padding={padding}
      imageData={imageData}
      absoluteLeft={absoluteLeft}
      absoluteTop={absoluteTop}
      level={level}
    />
  );

  const transform = (startFromProgress: number) =>
    makeTransform([
      scale(
        interpolate(divisionsLeft, [startFromProgress, 1], [1.1, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
      ),
    ]);

  if (divisionsLeft <= 0) {
    return (
      <TileOrImage
        padding={padding}
        imageData={imageData}
        absoluteLeft={absoluteLeft}
        absoluteTop={absoluteTop}
        level={level}
      />
    );
  }

  const backSide =
    divisionsLeft > 0
      ? new Array(4).fill(true).map((d, i) => {
          const left = i % 2 === 0 ? 0 : width / 2;
          const top = i < 2 ? 0 : height / 2;

          return (
            <Sequence
              key={i}
              width={width / 2}
              height={height / 2}
              style={{
                left,
                top,
                transform: transform(0),
                backfaceVisibility: "hidden",
                padding: padding, // Add padding to create gap between subdivisions
              }}
            >
              <Division
                divisionsLeft={divisionsLeft - 1}
                level={level + 1}
                absoluteLeft={absoluteLeft + left}
                absoluteTop={absoluteTop + top}
                padding={padding}
                imageData={imageData}
              />
            </Sequence>
          );
        })
      : null;

  return (
    <AbsoluteFill>
      <AbsoluteFill>{backSide}</AbsoluteFill>
    </AbsoluteFill>
  );
};

export const Depixelation: React.FC = () => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [handle] = useState(() => delayRender());

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

  const divisions = new Array(LEVELS)
    .fill(true)
    .map((_, i) => {
      return spring({
        fps,
        frame,
        config: {
          damping: 200,
        },
        durationInFrames: 20,
        delay: i * 20,
      });
    })
    .reduce((acc, curr) => acc + curr, 0);

  if (!imageData) {
    return null;
  }

  return (
    <AbsoluteFill className="flex flex-col text-white bg-white">
      <Division
        divisionsLeft={divisions}
        level={0}
        absoluteLeft={0}
        absoluteTop={0}
        padding={Math.max(8 - divisions * 2, 0)}
        imageData={imageData}
      />
    </AbsoluteFill>
  );
};
