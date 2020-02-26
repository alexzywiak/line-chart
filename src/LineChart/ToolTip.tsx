import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Bounds } from "./ResizeSVG";
import { AxisScale } from "d3";

interface ToolTipProps {
  bounds: Bounds;
  xScale: AxisScale<number>;
  data: { timestamp: string; value: string }[][];
}

const bisectTime = d3.bisector((d: { timestamp: string }) => {
  return Number(d.timestamp);
}).left;

const ToolTip = ({ bounds: { height, width } }: ToolTipProps) => {
  const [showToolTip, setShowToolTip] = useState(false);
  const overlayRef = useRef<SVGRectElement>(null);
  const toolTipRef = useRef<SVGForeignObjectElement>(null);
  useEffect(() => {
    if (overlayRef.current && toolTipRef.current) {
      const toolTip = d3.select(toolTipRef.current);
      d3.select(overlayRef.current)
        .on("mouseover", () => setShowToolTip(true))
        .on("mouseout", () => setShowToolTip(false))
        .on("mousemove", function() {
          const [eventX, eventY] = d3.mouse(this);
          console.log(d3.mouse(this));
        });
    }
  }, []);
  const overlayProps = {
    height,
    width,
    fill: "none",
    pointerEvents: "all"
  };
  return (
    <>
      <foreignObject
        ref={toolTipRef}
        display={showToolTip ? "show" : "none"}
        height={100}
        width={100}
      >
        <div style={{ border: "1px solid green" }}>cheese</div>
      </foreignObject>
      <rect ref={overlayRef} {...overlayProps}></rect>
    </>
  );
};

ToolTip.displayName = "ToolTip";
export default ToolTip;
