import React, { useRef } from "react";
import { useContainerSize } from "../hooks/useContainerSize";

export type Margin = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

export type Bounds = { height: number; width: number };

interface SVGProps {
  children: (bounds: Bounds, margin: Margin) => JSX.Element;
  margin?: Margin;
}

export default ({
  margin = { top: 50, right: 50, bottom: 50, left: 50 },
  children
}: SVGProps) => {
  const containerDiv = useRef(null);
  const svgSize = useContainerSize(containerDiv);

  return (
    <div
      ref={containerDiv}
      style={{
        height: "100%",
        width: "100%"
      }}
    >
      {containerDiv && svgSize ? (
        <svg data-testid="resize-svg" style={{ height: "100%", width: "100%" }}>
          <g
            transform={`translate(${margin.left},${margin.top})`}
            data-testid="resize-svg-g"
          >
            {children(
              {
                height: svgSize.height - margin.top - margin.bottom,
                width: svgSize.width - margin.left - margin.right
              },
              margin
            )}
          </g>
        </svg>
      ) : null}
    </div>
  );
};
