import { interpolate } from "remotion";

export const remapSpeed = (frame: number, speed: (fr: number) => number) => {
  let framesPassed = 0;
  for (let i = 0; i <= frame; i++) {
    framesPassed += speed(i);
  }

  return framesPassed;
};

export const takeOffSpeedFunction = (f: number) =>
  10 ** interpolate(f, [0, 120], [-0.2, 1.5]);
