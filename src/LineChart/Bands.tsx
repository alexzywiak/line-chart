import React from "react";
import { AxisScale } from "d3";
import Band from "./Band";

interface BandsProps {
  height: number;
  xScale: AxisScale<number>;
  bands: { start: string; end: string }[];
}
const Bands = ({ bands, xScale, height }: BandsProps) => {
  return (
    <>
      {bands.map(({ start, end }) => (
        <Band key={start} {...{ start, end, xScale, height }} />
      ))}
    </>
  );
};

Bands.displayName = "Bands";
export default Bands;
