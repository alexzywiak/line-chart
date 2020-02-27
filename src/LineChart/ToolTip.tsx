import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Bounds } from "./ResizeSVG";
import { AxisScale } from "d3";

type DotProps = {
  metric: Metric;
  activeTimeStamp: number;
  xScale: AxisScale<number>;
};

const translateStr = (x: number | string, y: number | string) =>
  `translate(${x},${y})`;

const Dot = ({
  metric: { color, data, yScale },
  activeTimeStamp,
  xScale
}: DotProps) => {
  const dotRef = useRef(null);

  useEffect(() => {
    if (dotRef.current) {
      const dataPoint = data.find(
        ({ timestamp }) => Number(timestamp) === activeTimeStamp
      );
      if (dataPoint) {
        const translate = translateStr(
          xScale(activeTimeStamp) || 0,
          yScale(Number(dataPoint.value)) || 0
        );
        d3.select(dotRef.current).attr("transform", translate);
      }
    }
  }, [activeTimeStamp, xScale, yScale, data]);

  return (
    <circle
      stroke={color}
      strokeWidth="3"
      fill="none"
      r="6"
      ref={dotRef}
    ></circle>
  );
};

interface Metric {
  color: string;
  yScale: AxisScale<number>;
  data: { timestamp: string; value: string }[];
}

interface ToolTipProps<M extends { [key: string]: Metric }> {
  primaryMetric: keyof M;
  bounds: Bounds;
  xScale: AxisScale<number>;
  colors: string[];
  metrics: M;
}

const bisectTime = d3.bisector((d: { timestamp: string }) => {
  return Number(d.timestamp);
}).left;

const ToolTip = <M extends { [key: string]: Metric }>({
  metrics,
  colors,
  bounds: { height, width },
  xScale,
  primaryMetric
}: ToolTipProps<M>) => {
  const [showToolTip, setShowToolTip] = useState(false);
  const [xValue, setXValue] = useState<number>(0);
  const overlayRef = useRef<SVGRectElement>(null);
  const toolTipRef = useRef<SVGForeignObjectElement>(null);
  useEffect(() => {
    if (overlayRef.current && toolTipRef.current) {
      const toolTip = d3.select(toolTipRef.current);
      d3.select(overlayRef.current)
        .on("mouseover", () => setShowToolTip(true))
        .on("mouseout", () => setShowToolTip(false))
        .on("mousemove", function() {
          const [eventX] = d3.mouse(this);
          const metric = metrics[primaryMetric].data;
          const x0 = (xScale as any).invert(eventX) || 0;
          const i = bisectTime(metric, x0, 1);
          const m0 = Number(metric[i - 1].timestamp);
          const m1 = Number(metric[i].timestamp);
          const closestTimestamp = x0 - m0 > m1 - x0 ? m1 : m0;
          toolTip.attr(
            "transform",
            translateStr(xScale(closestTimestamp) || 0, 150)
          );
          setXValue(closestTimestamp);
        });
    }
  }, []);
  const overlayProps = {
    height,
    width,
    fill: "none",
    pointerEvents: "all"
  };
  return (
    <>
      <foreignObject
        ref={toolTipRef}
        display={showToolTip ? "show" : "none"}
        height={100}
        width={100}
      >
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
      <rect ref={overlayRef} {...overlayProps}></rect>
    </>
  );
};

ToolTip.displayName = "ToolTip";
export default ToolTip;
