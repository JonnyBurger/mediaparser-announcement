import React from "react";
import { fontSize } from "./font";

export const PADDING_X = 83;
export const TOP_EXPLAINER_HEIGHT = 100;

export const TopExplainer: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div
      style={{
        color: "white",
        fontFamily: "GT Planar",
        height: 100,
        borderBottom: "2px solid rgba(255, 255, 255, 0.1)",
        fontSize: fontSize,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: 0.7,
        textAlign: "center",
      }}
    >
      {children}
    </div>
  );
};
