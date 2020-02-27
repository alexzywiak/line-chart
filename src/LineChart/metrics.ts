import { MetricType } from "../bsData";
import { AxisScale, scaleLinear, min, max } from "d3";
import { Bounds } from "./ResizeSVG";

type Data = { timestamp: string; value: string };
type Metric = { data: Data[]; type: MetricType };
type Metrics = { [key: string]: Metric };

export interface ChartMetric {
  color: string;
  yScale: AxisScale<number>;
  data: { timestamp: string; value: string }[];
}

const colors = ["#FF00FF", "#5D7FED"];

const getYScale = ({ type, data }: Metric, { height }: Bounds) => {
  if (type === MetricType.PERCENTAGE) {
    return scaleLinear()
      .domain([0, 1])
      .range([height, 0]);
  }
  if (type === MetricType.SECONDS) {
    return scaleLinear()
      .domain([
        Number(min(data.map(({ value }) => value))),
        Number(max(data.map(({ value }) => value)))
      ])
      .range([height, 0]);
  }

  return scaleLinear()
    .domain([
      Number(min(data.map(({ value }) => value))),
      Number(max(data.map(({ value }) => value)))
    ])
    .range([height, 0]);
};

export const getChartMetrics = (metrics: Metrics, bounds: Bounds) => {
  return Object.keys(metrics).reduce((acc, key, idx) => {
    const metric = metrics[key];

    const yScale = getYScale(metric, bounds);

    return { ...acc, [key]: { ...metric, color: colors[idx] || "", yScale } };
  }, {} as { [K in keyof Metrics]: ChartMetric });
};

export const getTimestampXScale = <M extends Metrics>(
  metrics: M,
  { width }: Bounds,
  primaryMetric: keyof M
) => {
  const { data } = metrics[primaryMetric];
  return scaleLinear()
    .domain([
      Number(min(data.map(({ timestamp }) => timestamp))),
      Number(max(data.map(({ timestamp }) => timestamp)))
    ])
    .range([0, width]);
};
