import React, { useRef, useEffect } from "react";
import moment from "moment";
import Chart, { ChartDataSets } from "chart.js";

const randomScalingFactor = (max: number = 100, min: number = 1) =>
  Math.random() * (max - min) + min;
const labels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const configs: ChartDataSets[] = [
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
    pointRotation: 180,
    showLine: false,
    data: [2, 3, 5, 8].map((n, idx) => ({
      x: moment().subtract(n * 5 * 60 * 1000),
      y: 0
    }))
  }
];

export default () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chart = useRef<Chart | null>(null);
  const highlightedDataIndex = useRef(0);

  useEffect(() => {
    if (chartRef.current && chartRef.current.getContext("2d")) {
      const context = chartRef.current.getContext("2d");
      if (context) {
        chart.current = new Chart(context, {
          type: "line",
          data: {
            datasets: configs.map((config, idx) => {
              console.log(config);
              if (highlightedDataIndex.current === idx) {
                return config;
              }
              return {
                ...config,
                borderColor: "grey",
                backgroundColor: "grey"
              };
            })
          },
          options: {
            hover: {
              mode: "point"
            },
            legend: {
              onClick: function(e, item) {
                const t = this;
                (this as any).chart.data.datasets = (this as any).chart.data.datasets.map(
                  (dataSet: ChartDataSets, idx: number) => {
                    if (idx === item.datasetIndex) {
                      return {
                        ...dataSet,
                        backgroundColor: "orange",
                        borderColor: "orange"
                      };
                    }
                    return {
                      ...dataSet,
                      backgroundColor: "grey",
                      borderColor: "grey"
                    };
                  }
                );
                (this as any).chart.update();
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
                  id: "y1"
                  // display: false
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
