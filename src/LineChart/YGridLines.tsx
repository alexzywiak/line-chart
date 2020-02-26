import React, { useRef, useEffect } from "react";
import { AxisScale, select, axisLeft } from "d3";

interface YGridLineProps<D> {
  scale: AxisScale<D>;
  width: number;
}
const YGridLines = <D extends any>({ scale, width }: YGridLineProps<D>) => {
  const gRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (gRef.current) {
      select(gRef.current).call(
        axisLeft(scale)
          .tickSize(-width)
          .tickFormat("" as any)
      );
    }
  });

  return <g ref={gRef} color="#dde3ed" strokeOpacity={0.7} />;
};

YGridLines.displayName = "YGridLines";
export default YGridLines;
