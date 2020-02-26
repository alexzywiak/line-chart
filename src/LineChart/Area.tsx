import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

interface AreaProps {
  xScale: d3.AxisScale<any>;
  yScale: d3.AxisScale<any>;
  data: { timestamp: string; value: string }[];
  color: string;
}
const Area = ({ xScale, yScale, data, color }: AreaProps) => {
  const pathRef = useRef<SVGPathElement>(null);
  const [height] = yScale.range();

  const area = d3
    .area<{ timestamp: string; value: string }>()
    .x(function(d) {
      return xScale(Number(d.timestamp)) || 0;
    })
    .y0(height)
    .y1(function(d) {
      return yScale(Number(d.value)) || 0;
    });

  useEffect(() => {
    if (pathRef.current) {
      d3.select(pathRef.current)
        .datum(data)
        .attr("d", area);
    }
  }, [data, area]);

  return (
    <>
      <defs>
        <linearGradient id="sampleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </linearGradient>
      </defs>
      <path fill="url(#sampleGradient)" opacity={0.9} ref={pathRef}></path>
    </>
  );
};

Area.displayName = "Area";
export default Area;
