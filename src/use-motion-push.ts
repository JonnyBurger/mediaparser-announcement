import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export const useMotionPushEnd = () => {
  const { fps, durationInFrames } = useVideoConfig();
  const frame = useCurrentFrame();

  const motion = spring({
    fps,
    frame,
    config: {
      damping: 200,
    },
    durationInFrames: 20,
    delay: durationInFrames - 10,
  });

  return motion;
};

export const useMotionPushStart = () => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  const motion = spring({
    fps,
    frame,
    config: {
      damping: 200,
    },
    durationInFrames: 20,
    delay: -10,
  });

  return motion;
};
