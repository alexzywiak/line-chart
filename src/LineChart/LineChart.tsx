import React from "react";
import * as d3 from "d3";
import data from "../bsData";
import Line from "./Line";
import XAxis from "./XAxis";
import { Bounds, Margin } from "./ResizeSVG";
import YAxis from "./YAxis";
interface LineChartProps {
  bounds: Bounds;
  margin: Margin;
}

const LineChart = ({ bounds: { height, width } }: LineChartProps) => {
  // Assume time stamps are the same
  const xScale = d3
    .scaleLinear()
    .domain([
      Number(d3.min(data.health_score.map(({ timestamp }) => timestamp))),
      Number(d3.max(data.health_score.map(({ timestamp }) => timestamp)))
    ]) // input
    .range([0, width]);

  // Metric One
  var percentageYScale = d3
    .scaleLinear()
    .domain([0, 1]) // input
    .range([height, 0]);

  // Metric Two
  var latencyYScale = d3
    .scaleLinear()
    .domain([
      Number(
        d3.min(data.p50_request_duration_seconds.map(({ value }) => value))
      ),
      Number(
        d3.max(data.p50_request_duration_seconds.map(({ value }) => value))
      )
    ]) // input
    .range([height, 0]);

  // Metric One
  var yScale = d3
    .scaleLinear()
    .domain([0, 1]) // input
    .range([height, 0]);

  const healthLineProps = {
    color: "blue",
    xScale,
    yScale: percentageYScale,
    data: data.health_score.map(({ timestamp, value }) => ({
      value,
      timestamp
    }))
  };
  const latencyLineProps = {
    color: "red",
    xScale,
    yScale: latencyYScale,
    data: data.p50_request_duration_seconds.map(({ timestamp, value }) => ({
      value,
      timestamp
    }))
  };

  const xAxisProps = {
    scale: xScale,
    height
  };
  const yAxisProps = {
    scale: yScale,
    height
  };

  return (
    <g>
      <Line {...healthLineProps} />
      <Line {...latencyLineProps} />
      <XAxis {...xAxisProps} />
      <YAxis {...yAxisProps} />
    </g>
  );
};

LineChart.displayName = "LineChart";
export default LineChart;
