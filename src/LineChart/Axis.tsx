import React, { useRef, useEffect } from "react";
import { Axis, select } from "d3";
import { Bounds } from "./ResizeSVG";

interface AxisProps<D> {
  axis: Axis<D>;
  bounds?: Bounds;
}
const AxisCmp = <D extends any>({
  axis,
  bounds: { height, width } = { height: 0, width: 0 }
}: AxisProps<D>) => {
  const gRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (gRef.current) {
      select(gRef.current).call(axis);
    }
  });

  return (
    <g
      ref={gRef}
      color="#dde3ed"
      style={{ fontSize: "14px" }}
      transform={`translate(${width},${height})`}
    />
  );
};

AxisCmp.displayName = "AxisCmp";
export default AxisCmp;
