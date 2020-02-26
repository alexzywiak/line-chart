import React from "react";
import { AxisScale } from "d3";

interface BandProps {
  height: number;
  xScale: AxisScale<number>;
  start: string;
  end: string;
}
const Band = ({ start, end, xScale, height }: BandProps) => {
  const startPt = xScale(Number(start)) || 0;
  const endPt = xScale(Number(end)) || 0;
  const bandProps = {
    fill: "pink",
    opacity: 0.5,
    height,
    y: 0,
    x: startPt,
    width: endPt - startPt
  };

  return <rect {...bandProps}></rect>;
};

Band.displayName = "Band";
export default Band;
