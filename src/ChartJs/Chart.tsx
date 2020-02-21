import React, { useRef, useEffect } from "react";
import Chart from "chart.js";

const randomScalingFactor = () => Math.random() * (100 - 1) + 1;
const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "November",
  "December"
];

export default () => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (chartRef.current && chartRef.current.getContext("2d")) {
      const context = chartRef.current.getContext("2d");
      if (context) {
        new Chart(context, {
          type: "line",
          data: {
            labels,
            datasets: [
              {
                label: "My First dataset",
                borderColor: "red",
                backgroundColor: "red",
                fill: false,
                data: labels.map(() => randomScalingFactor())
              },
              {
                label: "My Second dataset",
                borderColor: "blue",
                backgroundColor: "blue",
                fill: false,
                data: labels.map(() => randomScalingFactor())
              }
            ]
          }
        });
      }
    }
  });

  return <canvas ref={chartRef} />;
};
