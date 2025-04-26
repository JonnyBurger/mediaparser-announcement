import React, { useMemo } from "react";
import { CanvasPix } from "./CanvasPix";
import { getAveragePixel } from "./get-average-pixel";
import { darken } from "polished";
import { interpolateColors } from "remotion";

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
  appear: number;
  disappear: number;
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
  appear,
  disappear,
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
        appear={appear}
        disappear={disappear}
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
  appear: number;
  disappear: number;
}> = ({
  padding,
  imageData,
  absoluteLeft,
  absoluteTop,
  absoluteWidth,
  absoluteHeight,
  withNumbers,
  fontStyles,
  appear,
  disappear,
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

  const color = interpolateColors(
    appear,
    [0, 1],
    ["black", darken(0.3, backgroundColor)],
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        color,
        margin: padding,
        fontFamily: "GT Planar",
        fontFeatureSettings: "'ss03' on",
        backgroundColor: interpolateColors(
          appear,
          [0, 1],
          ["white", backgroundColor],
        ),
        lineHeight: 1,
        opacity: 1 - disappear,
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
