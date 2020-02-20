import React, { useRef, useEffect } from "react";
import Chart from "chart.js";

export default () => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (chartRef.current && chartRef.current.getContext("2d")) {
      const context = chartRef.current.getContext("2d");
      if (context) {
        new Chart(context, {
          type: "line",
          data: {
            //Bring in data
            labels: ["Jan", "Feb", "March"],
            datasets: [
              {
                label: "Sales",
                data: [86, 67, 91]
              }
            ]
          },
          options: {
            //Customize chart options
          }
        });
      }
    }
  });

  return <canvas ref={chartRef} />;
};
