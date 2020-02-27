import React, { useEffect, useRef } from "react";
import { AxisScale, select } from "d3";
import { ChartMetric } from "../metrics";
import { translateStr } from "./helpers";

type DotProps = {
  metric: ChartMetric;
  activeTimeStamp: number;
  xScale: AxisScale<number>;
};

export default ({
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
        select(dotRef.current).attr("transform", translate);
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
