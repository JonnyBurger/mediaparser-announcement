import React, { useMemo } from "react";
import { CanvasPix } from "./CanvasPix";
import { getAveragePixel } from "./get-average-pixel";
import { darken } from "polished";

export const TileOrImage: React.FC<{
  padding: number;
  imageData: ImageData;
  absoluteLeft: number;
  absoluteTop: number;
  absoluteWidth: number;
  absoluteHeight: number;
  type: "tile" | "image";
  withNumbers: boolean;
  fontStyles: React.CSSProperties;
}> = ({
  padding,
  imageData,
  absoluteLeft,
  absoluteTop,
  type,
  absoluteWidth,
  absoluteHeight,
  withNumbers,
  fontStyles,
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
        withNumbers={withNumbers}
        fontStyles={fontStyles}
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
  withNumbers: boolean;
  fontStyles: React.CSSProperties;
}> = ({
  padding,
  imageData,
  absoluteLeft,
  absoluteTop,
  absoluteWidth,
  absoluteHeight,
  withNumbers,
  fontStyles,
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

  const backgroundColor = `rgba(${Math.round(averagePixel.red)}, ${Math.round(averagePixel.green)}, ${Math.round(averagePixel.blue)}, ${averagePixel.alpha})`;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        color: darken(0.3, backgroundColor),
        margin: padding, // Add consistent gap between tiles
        fontSize: 50,
        fontFamily: "GT Planar",
        fontFeatureSettings: "'ss03' on",
        backgroundColor,
      }}
    >
      <span style={fontStyles}>
        {withNumbers
          ? Math.round(
              (averagePixel.red + averagePixel.green + averagePixel.blue) / 3,
            )
              .toString(16)
              .toUpperCase()
          : null}
      </span>
    </div>
  );
};
