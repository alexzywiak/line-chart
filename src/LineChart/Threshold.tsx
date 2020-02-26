import React from "react";
import { AxisScale } from "d3";

interface ThresholdProps {
  value: any;
  xScale: AxisScale<any>;
  yScale: AxisScale<any>;
}
const Threshold = ({ value, yScale, xScale }: ThresholdProps) => {
  const [x1, x2] = xScale.range();
  const y = yScale(value);
  const lineProps = {
    x1,
    x2,
    y1: y,
    y2: y
  };
  return (
    <line
      {...lineProps}
      stroke="#8e99ab"
      strokeWidth="3"
      strokeDasharray="5"
    ></line>
  );
};

Threshold.displayName = "Threshold";
export default Threshold;
