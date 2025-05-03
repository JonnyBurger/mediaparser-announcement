import { AbsoluteFill, OffthreadVideo } from "remotion";
import { ThreeDiv, ExtrudeDiv } from "./Div3D";

export const DecodeScene: React.FC<{
  src: string;
}> = ({ src }) => {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ThreeDiv
        className="text-3xl w-full h-full flex items-center justify-center absolute"
        style={{ fontFamily: "GT Planar" }}
      />
      <ExtrudeDiv depth={0.0001} width={960} height={540} cornerRadius={0}>
        <AbsoluteFill
          style={{
            borderRadius: 0,
            overflow: "hidden",
            boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.5)",
          }}
        >
          <OffthreadVideo src={src} />
        </AbsoluteFill>
      </ExtrudeDiv>
    </div>
  );
};
