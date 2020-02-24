import React from "react";
import { AxisScale, axisBottom, timeFormat } from "d3";
import AxisCmp from "./Axis";

interface XAxisProps<D> {
  height: number;
  scale: AxisScale<D>;
}

const timeFormatter = timeFormat("%I:%M");

const XAxis = <D extends number>({ height, scale }: XAxisProps<D>) => {
  const axis = axisBottom(scale).tickFormat(t => {
    const d = new Date(t * 1000);
    return timeFormatter(d);
  });
  const axisProps = {
    axis,
    bounds: { width: 0, height }
  };

  return <AxisCmp {...axisProps} />;
};

XAxis.displayName = "XAxis";
export default XAxis;
