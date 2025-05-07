import {
  makeTransform,
  scale,
  translateX,
  translateY,
} from "@remotion/animation-utils";
import { noise2D } from "@remotion/noise";
import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

type Api = {
  name: string;
  color: string;
};

const useScaleWiggleAndHide = ({
  delay,
  frame,
  fps,
  seed,
}: {
  delay: number;
  frame: number;
  fps: number;
  seed: string;
}) => {
  const enter = spring({
    fps,
    frame,
    config: {
      damping: 200,
    },
    delay,
  });

  const exit = spring({
    fps,
    frame,
    config: {
      damping: 200,
    },
    delay: delay + 35,
  });

  const noiseY = noise2D(`${seed}ysad${delay}`, frame / 100, 0) * 20;

  return makeTransform([scale(enter - exit), translateY(noiseY, "px")]);
};

export const WebAPIs: React.FC<{
  api1: Api;
  api2: Api;
  api3: Api;
  title1: string;
  title2: string;
}> = ({ api1, api2, api3, title1, title2 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const spr = spring({
    fps,
    frame,
    config: {
      damping: 200,
    },
  });

  const transform1 = useScaleWiggleAndHide({
    delay: 10,
    frame,
    fps,
    seed: title1,
  });
  const transform2 = useScaleWiggleAndHide({
    delay: 20,
    frame,
    fps,
    seed: title1,
  });
  const transform3 = useScaleWiggleAndHide({
    delay: 30,
    frame,
    fps,
    seed: title1,
  });

  return (
    <svg
      width="960"
      height="1080"
      viewBox="0 0 960 1080"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Frame 39">
        <rect width="960" height="1080" fill="#F8FAFC" />
        <g
          style={{
            transformOrigin: "center center",
            transform: makeTransform([scale(spr)]),
          }}
        >
          <text
            id="Integrates with Web APIs"
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="GT Planar"
            fontSize="65"
            fontWeight="bold"
            letterSpacing="0em"
          >
            <tspan x="245.161" y="527.265">
              {title1}
            </tspan>
            <tspan x="332.79" y="602.265">
              {title2}
            </tspan>
          </text>
        </g>
        <g transform="translate(95.8203 395.565) rotate(-22)">
          <text
            id="fetch()"
            fill={api1.color}
            xmlSpace="preserve"
            style={{
              whiteSpace: "preserve",
              transform: transform1,
              transformOrigin: "center bottom",
              transformBox: "fill-box",
            }}
            fontFamily="Fira Code"
            fontSize="42"
            fontWeight="bold"
            letterSpacing="0em"
          >
            <tspan x="0.357422" y="41.528">
              {api1.name}
            </tspan>
          </text>
        </g>

        <g transform="translate(546.473 300.511) rotate(19)">
          <text
            id="VideoDecoder"
            fill={api2.color}
            xmlSpace="preserve"
            style={{
              whiteSpace: "preserve",
              transform: transform2,
              transformOrigin: "center bottom",
              transformBox: "fill-box",
            }}
            fontFamily="Fira Code"
            fontSize="42"
            fontWeight="bold"
            letterSpacing="0em"
          >
            <tspan x="0.398438" y="41.528">
              {api2.name}
            </tspan>
          </text>
        </g>
        <g transform="translate(364.664 732.085) rotate(-6)">
          <text
            id="AudioData"
            fill={api3.color}
            xmlSpace="preserve"
            style={{
              whiteSpace: "preserve",
              transform: transform3,
              transformOrigin: "center top",
              transformBox: "fill-box",
            }}
            fontFamily="Fira Code"
            fontSize="42"
            fontWeight="bold"
            letterSpacing="0em"
          >
            <tspan x="0.173828" y="41.528">
              {api3.name}
            </tspan>
          </text>
        </g>
      </g>
    </svg>
  );
};
