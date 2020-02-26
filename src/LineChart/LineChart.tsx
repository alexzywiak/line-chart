import React from "react";
import * as d3 from "d3";
import genBs from "../bsData";
import Line from "./Line";
import XAxis from "./XAxis";
import { Bounds, Margin } from "./ResizeSVG";
import YAxis from "./YAxis";
import Points from "./Points";
import YGridLines from "./YGridLines";
import Threshold from "./Threshold";
import Area from "./Area";
import Bands from "./Bands";

interface LineChartProps {
  bounds: Bounds;
  margin: Margin;
}

const data = genBs(25);

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

  const healthLineProps = {
    color: "#FF00FF",
    xScale,
    yScale: percentageYScale,
    data: data.health_score.map(({ timestamp, value }) => ({
      value,
      timestamp
    }))
  };

  const latencyLineProps = {
    color: "#5D7FED",
    xScale,
    yScale: latencyYScale,
    data: data.p50_request_duration_seconds
  };

  const xAxisProps = {
    scale: xScale,
    height
  };
  const yAxisProps = {
    scale: percentageYScale,
    height
  };
  const pointsProps = {
    xScale,
    yScale: percentageYScale,
    data: data.config_events,
    onClick: ({ timestamp }: { timestamp: string }) => {
      console.log(timestamp);
    }
  };
  const gridProps = {
    scale: percentageYScale,
    width
  };
  const thresholdProps = {
    xScale,
    yScale: percentageYScale
  };

  const bandProps = {
    bands: data.bands,
    xScale,
    height
  };
  const toolTipProps = {
    bounds: { height, width },
    xScale,
    data: [data.health_score, data.p50_request_duration_seconds]
  };
  return (
    <g>
      <YGridLines {...gridProps} />
      {/* <Bands {...bandProps} /> */}
      <Line {...healthLineProps} />
      <Area {...healthLineProps} />
      <Line {...latencyLineProps} />
      <Threshold {...thresholdProps} value={0.75} />
      <Threshold {...thresholdProps} value={0.25} />
      <Points {...pointsProps} />
      <XAxis {...xAxisProps} />
      <YAxis {...yAxisProps} />
      {/* <ToolTip {...toolTipProps} /> */}
    </g>
  );
};

LineChart.displayName = "LineChart";
export default LineChart;
