import { TokenTransition } from "codehike/utils/token-transitions";
import { interpolate, interpolateColors } from "remotion";

export function applyStyle({
  element,
  keyframes,
  progress,
}: {
  element: HTMLElement;
  keyframes: TokenTransition["keyframes"];
  progress: number;
}) {
  const { translateX, translateY, color, opacity } = keyframes;

  if (opacity) {
    element.style.opacity = progress.toString();
  }
  if (color) {
    element.style.color = interpolateColors(progress, [0, 1], color);
  }
  const x = translateX ? interpolate(progress, [0, 1], translateX) : 0;
  const y = translateY ? interpolate(progress, [0, 1], translateY) : 0;

  // https://www.remotion.dev/docs/troubleshooting/subpixel-rendering
  element.style.transform = `perspective(1000px) translate(${x}px, ${y}px)`;
  element.style.willChange = "transform";
}
