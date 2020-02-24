import React, { useRef, useEffect } from "react";
import { AxisScale, axisLeft } from "d3";
import AxisCmp from "./Axis";

interface YAxisProps<D> {
  scale: AxisScale<D>;
}
const YAxis = <D extends any>({ scale }: YAxisProps<D>) => {
  const axis = axisLeft(scale);
  //   const gRef = useRef<SVGGElement>(null);
  //   useEffect(() => {
  //     if (gRef.current) {
  //       select(gRef.current).call(
  //         axisBottom(scale).tickFormat(t => {
  //           const d = new Date(t * 1000);
  //           return timeFormatter(d);
  //         })
  //       );
  //     }
  //   });
  //   return <g ref={gRef} transform={`translate(0,${height})`} />;
  return <AxisCmp axis={axis} />;
};

YAxis.displayName = "YAxis";
export default YAxis;
