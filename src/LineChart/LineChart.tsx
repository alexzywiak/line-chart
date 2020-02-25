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
import Band from "./Band";

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
    xScale,
    yScale: percentageYScale
  };

  return (
    <g>
      <YGridLines {...gridProps} />
      <XAxis {...xAxisProps} />
      <YAxis {...yAxisProps} />
      <Band
        {...bandProps}
        start={Number(data.health_score[2].timestamp)}
        end={Number(data.health_score[4].timestamp)}
      />
      <Band
        {...bandProps}
        start={Number(data.health_score[12].timestamp)}
        end={Number(data.health_score[16].timestamp)}
      />
      <Band
        {...bandProps}
        start={Number(data.health_score[20].timestamp)}
        end={Number(data.health_score[23].timestamp)}
      />
      <Threshold {...thresholdProps} value={0.75} />
      <Threshold {...thresholdProps} value={0.25} />
      <Line {...healthLineProps} />
      <Area {...healthLineProps} />
      <Line {...latencyLineProps} />
      <Points {...pointsProps} />
    </g>
  );
};

LineChart.displayName = "LineChart";
export default LineChart;
