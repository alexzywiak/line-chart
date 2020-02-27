import { AxisScale } from "d3";
export interface Metric {
  color: string;
  yScale: AxisScale<number>;
  data: { timestamp: string; value: string }[];
}
