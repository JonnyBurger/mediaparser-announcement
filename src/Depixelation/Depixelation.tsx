import { makeTransform, rotateX } from "@remotion/animation-utils";
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
  }, [absoluteLeft, absoluteTop, height, width]);

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
    <Tile
      padding={padding}
      imageData={imageData}
      absoluteLeft={absoluteLeft}
      absoluteTop={absoluteTop}
    />
  );

  const transform = (backSide: boolean, startFromProgress: number) =>
    makeTransform([
      rotateX(
        interpolate(divisionsLeft, [startFromProgress, 1], [0, 180], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }) + (backSide ? 180 : 0),
      ),
    ]);

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
                transform: transform(true, (i / 4) * 0.5),
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

  if (divisionsLeft <= 0) {
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
    <AbsoluteFill
      style={{
        perspective: 20000,
      }}
    >
      <AbsoluteFill
        style={{ transform: transform(false, 0), backfaceVisibility: "hidden" }}
      >
        {frontSide}
      </AbsoluteFill>
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

  const divisions = new Array(5)
    .fill(true)
    .map((_, i) => {
      return spring({
        fps,
        frame,
        config: {
          damping: 200,
        },
        delay: i * 30,
      });
    })
    .reduce((acc, curr) => acc + curr, 0);

  if (!imageData) {
    return null;
  }

  return (
    <AbsoluteFill className="flex flex-col text-white">
      <Division
        divisionsLeft={divisions}
        level={0}
        absoluteLeft={0}
        absoluteTop={0}
        padding={1}
        imageData={imageData}
      />
    </AbsoluteFill>
  );
};
