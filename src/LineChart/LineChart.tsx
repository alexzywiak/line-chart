import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import data from "../bsData";
interface LineChartProps {}

const margin = { top: 50, right: 50, bottom: 50, left: 50 };
const width = 1000 - margin.left - margin.right; // Use the window's width
const height = 1000 - margin.top - margin.bottom;

const LineChart = (props: LineChartProps) => {
  const pathRef = useRef<SVGPathElement>(null);
  const xScale = d3
    .scaleLinear()
    .domain([
      Number(d3.min(data.health_score.map(({ timestamp }) => timestamp))),
      Number(d3.max(data.health_score.map(({ timestamp }) => timestamp)))
    ]) // input
    .range([0, width]);

  var yScale = d3
    .scaleLinear()
    .domain([0, 1]) // input
    .range([height, 0]);

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
        .datum(data.health_score)
        .attr("d", line);
    }
  }, [line]);

  return (
    <svg height={1000} width={1000}>
      <g>
        <path stroke="blue" strokeWidth="3" fill="none" ref={pathRef}></path>
      </g>
    </svg>
  );
};

LineChart.displayName = "LineChart";
export default LineChart;
