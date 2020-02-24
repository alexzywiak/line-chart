import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface LineProps {
  xScale: d3.ScaleLinear<number, number>;
  yScale: d3.ScaleLinear<number, number>;
  data: { timestamp: string; value: string }[];
  color: string;
}

const Line = ({ xScale, yScale, data, color }: LineProps) => {
  const pathRef = useRef<SVGPathElement>(null);

  const line = d3
    .line<{ timestamp: string; value: string }>()
    .x(function(d) {
      return xScale(Number(d.timestamp));
    }) // set the x values for the line generator
    .y(function(d) {
      return yScale(Number(d.value));
    }) // set the y values for the line generator
    .curve(d3.curveMonotoneX);

  useEffect(() => {
    if (pathRef.current) {
      d3.select(pathRef.current)
        .datum(data)
        .attr("d", line);
    }
  }, [data, line]);

  return <path stroke={color} strokeWidth="3" fill="none" ref={pathRef}></path>;
};

Line.displayName = "Line";
export default Line;
