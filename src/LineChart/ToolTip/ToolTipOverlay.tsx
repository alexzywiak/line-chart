import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Bounds } from "../ResizeSVG";

interface ToolTipOverlayProps {
  bounds: Bounds;
  children: (args: { show: boolean; coords: [number, number] }) => JSX.Element;
}

const ToolTipOverlay = ({
  bounds: { height, width },
  children
}: ToolTipOverlayProps) => {
  const [show, setShow] = useState(false);
  const [coords, setCoords] = useState<[number, number]>([0, 0]);
  const overlayRef = useRef<SVGRectElement>(null);

  useEffect(() => {
    if (overlayRef.current) {
      d3.select(overlayRef.current)
        .on("mouseover", () => setShow(true))
        .on("mouseout", () => setShow(false))
        .on("mousemove", function() {
          setCoords(d3.mouse(this));
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
      {children({ show, coords })}
      <rect ref={overlayRef} {...overlayProps}></rect>
    </>
  );
};

ToolTipOverlay.displayName = "ToolTipOverlay";
export default ToolTipOverlay;
