import React from "react";
import { AxisScale } from "d3";

interface BandProps {
  yScale: AxisScale<number>;
  xScale: AxisScale<number>;
  start: number;
  end: number;
}
const Band = ({ start, end, xScale, yScale }: BandProps) => {
  const [height] = yScale.range();
  const startPt = xScale(start) || 0;
  const endPt = xScale(end) || 0;
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
