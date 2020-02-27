import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { AxisScale } from "d3";
import { Metric } from "./types";
import { translateStr } from "./helpers";
import Dot from "./Dot";

interface ToolTipProps<M extends { [key: string]: Metric }> {
  primaryMetric: keyof M;
  xScale: AxisScale<number>;
  colors: string[];
  metrics: M;
  show: boolean;
  coords: [number, number];
}

const bisectTime = d3.bisector((d: { timestamp: string }) => {
  return Number(d.timestamp);
}).left;

const ToolTip = <M extends { [key: string]: Metric }>({
  show,
  coords,
  metrics,
  xScale,
  primaryMetric
}: ToolTipProps<M>) => {
  const [xValue, setXValue] = useState<number | null>(0);
  const [height] = metrics[primaryMetric].yScale.range();
  const toolTipRef = useRef<SVGForeignObjectElement>(null);

  useEffect(() => {
    const [eventX] = coords;
    const metric = metrics[primaryMetric].data;
    const x0 = (xScale as any).invert(eventX) || 0;
    const i = bisectTime(metric, x0, 1);
    const m0 = Number(metric[i - 1].timestamp);
    const m1 = Number(metric[i].timestamp);
    const closestTimestamp = x0 - m0 > m1 - x0 ? m1 : m0;

    setXValue(closestTimestamp);

    if (toolTipRef.current) {
      const toolTip = d3.select(toolTipRef.current);
      toolTip.attr(
        "transform",
        translateStr(xScale(closestTimestamp) || 0, 150)
      );
    }
  }, [coords, metrics, primaryMetric, xScale]);

  useEffect(() => {
    if (!show) {
      setXValue(null);
    }
  }, [show, setXValue]);

  if (!show || xValue === null) {
    return null;
  }

  return (
    <>
      <line
        x1={xScale(xValue)}
        x2={xScale(xValue)}
        y1={0}
        y2={height}
        stroke="#dde3ed"
        strokeWidth="2"
        opacity="0.7"
      ></line>
      <foreignObject ref={toolTipRef} height={100} width={100}>
        <div style={{ border: "1px solid green", color: "#dde3ed" }}>
          cheese
        </div>
      </foreignObject>
      {Object.keys(metrics).map(key => {
        const metric = metrics[key];
        const dotProps = {
          metric,
          xScale,
          activeTimeStamp: xValue
        };
        return <Dot key={key} {...dotProps} />;
      })}
    </>
  );
};

ToolTip.displayName = "ToolTip";
export default ToolTip;
