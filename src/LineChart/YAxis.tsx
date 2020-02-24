import React from "react";
import { AxisScale, axisLeft } from "d3";
import AxisCmp from "./Axis";

interface YAxisProps<D> {
  scale: AxisScale<D>;
}
const YAxis = <D extends any>({ scale }: YAxisProps<D>) => {
  const axis = axisLeft(scale);

  return (
    <>
      <AxisCmp axis={axis} />
    </>
  );
};

YAxis.displayName = "YAxis";
export default YAxis;
