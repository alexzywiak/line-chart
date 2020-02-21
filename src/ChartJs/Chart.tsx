import React, { useRef, useEffect } from "react";
import moment from "moment";
import Chart from "chart.js";

const randomScalingFactor = (max: number = 100, min: number = 1) =>
  Math.random() * (max - min) + min;
const labels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export default () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chart = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && chartRef.current.getContext("2d")) {
      const context = chartRef.current.getContext("2d");
      if (context) {
        chart.current = new Chart(context, {
          type: "line",
          data: {
            datasets: [
              {
                label: "My First dataset",
                borderColor: "red",
                backgroundColor: "red",
                fill: false,
                data: labels.map((n, idx) => ({
                  x: moment().subtract(idx * 5 * 60 * 1000),
                  y: randomScalingFactor()
                })),
                yAxisID: "y0"
              },
              {
                label: "My Second dataset",
                borderColor: "blue",
                backgroundColor: "blue",
                fill: false,
                data: labels.map((n, idx) => ({
                  x: moment().subtract(idx * 5 * 60 * 1000),
                  y: randomScalingFactor(50, 1)
                })),
                yAxisID: "y1"
              },
              {
                label: "My Third dataset",
                borderColor: "green",
                backgroundColor: "green",
                fill: false,
                pointStyle: "triangle",
                pointRadius: 20,
                showLine: false,
                data: [2, 3, 5, 8].map((n, idx) => ({
                  x: moment().subtract(n * 5 * 60 * 1000),
                  y: 0
                }))
              }
            ]
          },
          options: {
            hover: {
              mode: "point",
              onHover: function(event, elements) {
                if (!elements.length) {
                  return;
                }
                const yAxes =
                  (this.options.scales && this.options.scales.yAxes) || [];
                const activeAxis = yAxes.find(axis => Boolean(axis.display));
                const targetId = (elements[0] as any)._yScale.id;
                console.log(activeAxis!.id, targetId);
                if (!activeAxis || activeAxis.id !== targetId) {
                  console.log(this.options.scales);
                  this.options.scales!.yAxes = yAxes.map(axis => {
                    const display = axis.id === targetId ? true : false;
                    return { ...axis, display };
                  });
                  console.log(this.options.scales);
                  this.update({ duration: 500, easing: "linear" });
                }
              }
            },

            scales: {
              xAxes: [
                {
                  type: "time",
                  time: {
                    unit: "minute",
                    stepSize: 5
                  }
                }
              ],
              yAxes: [
                {
                  id: "y0",
                  position: "left"
                },
                {
                  id: "y1",
                  display: false
                }
              ]
            }
          }
        });
      }
    }
  });

  return <canvas ref={chartRef} />;
};
