import { createSmoothSvgPath } from "@remotion/media-utils";
import { getLength, PathInternals } from "@remotion/paths";
import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Num } from "./Num";
import { takeOffSpeedFucntion } from "../remap-speed";

const waveform = [
  0.09637765323414522, 0.1044464111328125, 0.07179439769071691,
  0.05544595157398897, 0.16286333869485295, 0.11394635368795956,
  0.06425251680261948, 0.04051388011259191, 0.09683766084558823,
  0.16888652128331802, 0.11319104362936581, 0.06397561465992647,
  0.06609568876378677, 0.11682712330537684, 0.11956203685087316,
  0.12664121740004597, 0.07603319953469669, 0.052893694709329045,
  0.18451197007123163, 0.14489970487706802, 0.10197628245634191,
  0.0602717680089614, 0.09776934455422794, 0.15800386316636028,
  0.09107253130744486, 0.07591606588924632, 0.07628766228170956,
  0.16406788545496323, 0.1307709637810202, 0.1251063627355239,
  0.0648507510914522, 0.055905510397518385, 0.19056163114659927,
  0.12379769717945772, 0.08994427849264706, 0.06535967658547794,
  0.11077701344209559, 0.17204868092256434, 0.08914543600643382,
  0.10351517621208639, 0.08489765840418198, 0.1911894854377298,
  0.08540658389820772, 0.11507370892693014, 0.037980023552389705,
  0.09070317885454963, 0.18561464197495403, 0.08653528550091912,
  0.09723708208869486, 0.06247756060431985, 0.14591486313763788,
  0.1346098955939798, 0.11854014677159927, 0.09757591696346507,
  0.11262063419117647, 0.15288498822380514, 0.07459214154411764,
  0.08320931827320772, 0.07516524370978861, 0.09825897216796875,
  0.11794909308938419, 0.04416611615349265, 0.06412910012637868,
  0.09861486098345588,
].map((v) => v * 255);
for (let i = 0; i < 3; i++) {
  waveform.push(...waveform);
}

export const Waveform: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const shrink = spring({
    frame,
    fps,
    config: { damping: 200 },
    delay: 150,
    durationInFrames: 200,
    durationRestThreshold: 0.00001,
  });

  const numWidth = interpolate(shrink, [0, 1], [75, 5]);
  const strokeWidth = interpolate(shrink, [0, 1], [20, 5]);

  const width = (waveform.length - 1) * numWidth;
  const height = 1080;
  const amplitude = 1.5;

  const speed = takeOffSpeedFucntion(frame - 10);

  const points = waveform.map((y, i) => {
    return {
      x: (i / (waveform.length - 1)) * width,
      y:
        height / 2 +
        ((y * (i % 2 === 0 ? 1 : -1) * height) / 2 / 255) * amplitude,
    };
  });

  const path = createSmoothSvgPath({
    points,
  });

  const progress = interpolate(speed, [0, 1000], [0, 1], {
    extrapolateRight: "clamp",
  });

  const length = getLength(path);
  const cut = PathInternals.cutPath(path, progress * length);

  return (
    <AbsoluteFill className="bg-white">
      <AbsoluteFill className="text-black" style={{ marginLeft: "20%" }}>
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          style={{ overflow: "visible" }}
        >
          <path
            fill="none"
            stroke="#10AB3A"
            strokeLinecap="round"
            strokeWidth={strokeWidth}
            d={cut}
          />
        </svg>
        <div
          className="flex flex-row absolute justify-center items-center h-full"
          style={{ marginLeft: -numWidth / 2 }}
        >
          {waveform.slice(0, 32).map((y, i) => {
            return <Num numWidth={numWidth} y={y} i={i} />;
          })}
        </div>
      </AbsoluteFill>{" "}
    </AbsoluteFill>
  );
};
