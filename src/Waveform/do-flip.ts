import { visualControl } from "@remotion/studio";
import { interpolate, spring } from "remotion";
import { z } from "zod";

export const doFlip = ({ frame, fps }: { frame: number; fps: number }) => {
  const spr = spring({
    frame,
    fps,
    config: {
      damping: 200,
    },
    delay: 110,
  });

  const startStateY = visualControl(
    "two-startRotateY",
    -40,
    z.number().step(0.01),
  );
  const endRotateY = visualControl(
    "two-endRotateX",
    -78.25,
    z.number().step(0.01),
  );

  const rotY = interpolate(frame, [0, 120], [startStateY, endRotateY]);

  const actualRotate = interpolate(spr, [0, 1], [rotY, 0]);

  return { rotY: actualRotate, rotX: interpolate(spr, [0, 1], [0, Math.PI]) };
};
