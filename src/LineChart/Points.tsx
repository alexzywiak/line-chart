import React from "react";
import { AxisScale } from "d3";

interface PointsProps {
  data: { timestamp: string }[];
  xScale: AxisScale<number>;
  yScale: AxisScale<number>;
}
const Points = ({ data, xScale, yScale }: PointsProps) => {
  // Separate out to individual components
  return (
    <>
      {data.map(({ timestamp }) => {
        return (
          <svg x={xScale(Number(timestamp))} y={(yScale(0) || 0) - 18}>
            <polygon points="0,0 24,0 12,18" style={{ fill: "green" }} />
          </svg>
        );
      })}
    </>
  );
};

Points.displayName = "Points";
export default Points;
