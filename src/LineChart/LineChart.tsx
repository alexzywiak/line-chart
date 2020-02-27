import React from "react";
import * as d3 from "d3";
import genBs, { getConfigEvents } from "../bsData";
import Line from "./Line";
import XAxis from "./XAxis";
import { Bounds, Margin } from "./ResizeSVG";
import YAxis from "./YAxis";
import Points from "./Points";
import YGridLines from "./YGridLines";
import Threshold from "./Threshold";
import Area from "./Area";
import ToolTip from "./ToolTip/ToolTip";
import ToolTipOverlay from "./ToolTip/ToolTipOverlay";
import { getTimestampXScale, getChartMetrics } from "./metrics";

interface LineChartProps {
  bounds: Bounds;
  margin: Margin;
}

const colors = ["#FF00FF", "#5D7FED"];
const metrics = genBs(25);
const configEvents = getConfigEvents(25);
const primaryMetric = "health_score";

const LineChart = ({ bounds: { height, width } }: LineChartProps) => {
  const xScale = getTimestampXScale(metrics, { height, width }, primaryMetric);
  const {
    health_score,
    p50_request_duration_seconds
  } = getChartMetrics(metrics, { height, width });

  const healthLineProps = {
    color: colors[0],
    xScale,
    ...health_score
  };

  const latencyLineProps = {
    color: colors[1],
    xScale,
    ...p50_request_duration_seconds
  };

  const xAxisProps = {
    scale: xScale,
    height
  };
  const yAxisProps = {
    scale: health_score.yScale,
    height
  };
  const pointsProps = {
    xScale,
    yScale: health_score.yScale,
    data: configEvents.data,
    onClick: ({ timestamp }: { timestamp: string }) => {
      console.log(timestamp);
    }
  };
  const gridProps = {
    scale: health_score.yScale,
    width
  };
  const thresholdProps = {
    xScale,
    yScale: health_score.yScale
  };

  const toolTipProps = {
    primaryMetric: "health_score" as "health_score",
    xScale,
    colors,
    metrics: {
      health_score,
      p50_request_duration_seconds
    }
  };
  return (
    <g>
      <YGridLines {...gridProps} />
      <Line {...healthLineProps} />
      <Area {...healthLineProps} />
      <Line {...latencyLineProps} />
      <Threshold {...thresholdProps} value={0.75} />
      <Threshold {...thresholdProps} value={0.25} />
      <Points {...pointsProps} />
      <XAxis {...xAxisProps} />
      <YAxis {...yAxisProps} />
      <ToolTipOverlay bounds={{ height, width }}>
        {props => <ToolTip {...{ ...props, ...toolTipProps }} />}
      </ToolTipOverlay>
    </g>
  );
};

LineChart.displayName = "LineChart";
export default LineChart;
