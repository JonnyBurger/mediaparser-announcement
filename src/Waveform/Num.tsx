import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const Num: React.FC<{
  y: number;
  i: number;
  numWidth: number;
}> = ({ y, i, numWidth }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  const appear = spring({
    frame: frame,
    fps: fps,
    config: {
      damping: 200,
    },
    delay: i * 2,
  });

  const slide = spring({
    frame: frame,
    fps: fps,
    config: {
      damping: 200,
    },
    delay: i * 2 + 25,
  });

  const borderRadius = interpolate(slide, [0, 0.5], [0, numWidth / 2]);
  const textOpacity = interpolate(slide, [0, 0.3], [1, 0]);

  const scale = interpolate(slide, [0, 1], [1, 0.1]);

  const flash = (delay: number) =>
    spring({
      fps,
      frame,
      config: {
        damping: 200,
      },
      delay,
      durationInFrames: 15,
    });

  const flashScale = (delay: number) =>
    interpolate(flash(delay), [0, 0.01, 0.7, 1], [0, 1, 1.15, 1]);

  return (
    <div
      style={{
        width: numWidth,
        height: numWidth,
        marginTop: y * 6 * (i % 2 === 0 ? 1 : -1) * slide,
        position: "relative",
      }}
    >
      {appear < 0.88 ? (
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            borderRadius,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "black",
            fontSize: 32,
            fontFamily: "GT Planar",
            fontFeatureSettings: "'ss03' on",
          }}
        >
          <span>
            {Math.round(y).toString(16).toUpperCase().padStart(2, "0")}
          </span>
        </div>
      ) : null}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          borderRadius,
          backgroundColor: "#10AB3A",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: 32,
          fontFamily: "GT Planar",
          fontFeatureSettings: "'ss03' on",
          scale: scale * flashScale(i * 2),
        }}
      >
        <span style={{ opacity: textOpacity }}>
          {Math.round(y).toString(16).toUpperCase().padStart(2, "0")}
        </span>
      </div>
    </div>
  );
};
