import React from "react";
import { AxisScale } from "d3";

interface PointsProps {
  data: { timestamp: string }[];
  xScale: AxisScale<number>;
  yScale: AxisScale<number>;
  onHover?: (data: { timestamp: string }) => void;
  onClick?: (data: { timestamp: string }) => void;
}

const TRIANGLE_SIZE = 36;
const HEIGHT_RATIO = 1 / 2;

const Points = ({ onHover, onClick, data, xScale, yScale }: PointsProps) => {
  // Separate out to individual components
  return (
    <>
      {data.map(({ timestamp }) => {
        return (
          <svg
            onMouseOver={() => onHover && onHover({ timestamp })}
            onClick={() => onClick && onClick({ timestamp })}
            key={timestamp}
            x={(xScale(Number(timestamp)) || 0) - TRIANGLE_SIZE / 2}
            y={(yScale(0) || 0) - TRIANGLE_SIZE * HEIGHT_RATIO}
          >
            <polygon
              points={`0,0 ${TRIANGLE_SIZE},0 ${TRIANGLE_SIZE /
                2},${TRIANGLE_SIZE * HEIGHT_RATIO}`}
              style={{ fill: "green" }}
            />
          </svg>
        );
      })}
    </>
  );
};

Points.displayName = "Points";
export default Points;
