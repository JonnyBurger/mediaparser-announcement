import React, { useMemo } from "react";
import { CanvasPix } from "./CanvasPix";
import { getAveragePixel } from "./get-average-pixel";

export const TileOrImage: React.FC<{
  padding: number;
  imageData: ImageData;
  absoluteLeft: number;
  absoluteTop: number;
  absoluteWidth: number;
  absoluteHeight: number;
  type: "tile" | "image";
}> = ({
  padding,
  imageData,
  absoluteLeft,
  absoluteTop,
  type,
  absoluteWidth,
  absoluteHeight,
}) => {
  if (type === "tile") {
    return (
      <Tile
        padding={padding}
        imageData={imageData}
        absoluteLeft={absoluteLeft}
        absoluteTop={absoluteTop}
        absoluteWidth={absoluteWidth}
        absoluteHeight={absoluteHeight}
      />
    );
  }

  return (
    <CanvasPix
      imageData={imageData}
      absoluteLeft={absoluteLeft}
      absoluteTop={absoluteTop}
      absoluteWidth={absoluteWidth}
      absoluteHeight={absoluteHeight}
    />
  );
};

const Tile: React.FC<{
  padding: number;
  imageData: ImageData;
  absoluteLeft: number;
  absoluteTop: number;
  absoluteWidth: number;
  absoluteHeight: number;
}> = ({
  padding,
  imageData,
  absoluteLeft,
  absoluteTop,
  absoluteWidth,
  absoluteHeight,
}) => {
  const averagePixel = useMemo(() => {
    return getAveragePixel({
      imageData,
      top: absoluteTop,
      left: absoluteLeft,
      width: absoluteWidth,
      height: absoluteHeight,
    });
  }, [absoluteLeft, absoluteTop, absoluteHeight, absoluteWidth, imageData]);

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
