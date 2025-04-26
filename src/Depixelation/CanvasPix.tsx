import React, { useEffect, useRef } from "react";

export const CanvasPix: React.FC<{
  imageData: ImageData;
  absoluteLeft: number;
  absoluteTop: number;
  absoluteWidth: number;
  absoluteHeight: number;
}> = ({
  imageData,
  absoluteLeft,
  absoluteTop,
  absoluteWidth,
  absoluteHeight,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // The putImageData parameters are:
        // imageData: The ImageData to draw
        // dx: The x-coordinate where to place the image data in the destination canvas
        // dy: The y-coordinate where to place the image data in the destination canvas
        // dirtyX: The x-coordinate where to start copying from the source image data (optional)
        // dirtyY: The y-coordinate where to start copying from the source image data (optional)
        // dirtyWidth: Width of the rectangle to draw (optional)
        // dirtyHeight: Height of the rectangle to draw (optional)

        // We want to draw a portion of the source image at (absoluteLeft,absoluteTop)
        // onto our canvas at (0,0)
        ctx.putImageData(
          imageData,
          -absoluteLeft, // Offset the destination to show the correct portion
          -absoluteTop,
        );
      }
    }
  }, [imageData, absoluteLeft, absoluteTop]);

  return (
    <canvas
      ref={canvasRef}
      width={absoluteWidth}
      height={absoluteHeight}
    ></canvas>
  );
};
