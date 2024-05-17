import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const FloatBarChart = () => {
  const canvasRef = useRef(null);

  const newMidValue = [33, 24, 22, 19, 13];

  useEffect(() => {
    // setup
    const data = {
      labels: ["G7", "YV", "C5", "OO", "YX"],
      datasets: [
        {
          label: "Red Sales",
          data: [
            { x: "G7", y: [10, newMidValue[0]] },
            { x: "YV", y: [15, newMidValue[1]] },
            { x: "C5", y: [7, newMidValue[2]] },
            { x: "OO", y: [8, newMidValue[3]] },
            { x: "YX", y: [6, newMidValue[4]] },
          ],
          backgroundColor: [
            "#772a42",
            "#192c54",
            "#5476be",
            "#1986e5",
            "#4d2a56",
          ],
          borderWidth: 0,
        },
        {
          label: "Black Sales",
          data: [
            { x: "G7", y: [newMidValue[0], 40] },
            { x: "YV", y: [newMidValue[1], 30] },
            { x: "C5", y: [newMidValue[2], 24] },
            { x: "OO", y: [newMidValue[3], 23] },
            { x: "YX", y: [newMidValue[4], 15] },
          ],
          backgroundColor: [
            "#b19aa4",
            "#7d889e",
            "#a1a7bf",
            "#4a9dfb",
            "#a58ca0",
          ],
          borderWidth: 0,
        },
      ],
    };

    const topLabels = {
      id: "topLabels",
      afterDatasetsDraw(chart) {
        const {
          ctx,
          scales: { x, y },
        } = chart;

        chart.data.datasets.forEach((dataset) => {
          dataset.data.forEach((datapoint) => {
            const values = datapoint.y; // Array of values
            ctx.font = "bold 11px sans-serif";
            ctx.textAlign = "center";

            // Draw background for y[0] values of Black Sales
            if (dataset.label === "Black Sales") {
              const value = values[0];
              const xPos = x.getPixelForValue(datapoint.x);
              const yPos = y.getPixelForValue(value);

              // Determine the background color based on the value
              let bgColor;
              if (value >= 0 && value <= 20) {
                bgColor = "#febd2b";
              } else if (value > 30) {
                bgColor = "#c30401";
              } else if (value > 20 && value < 30) {
                bgColor = "green";
              } else {
                bgColor = "transparent"; // Default color if value doesn't match any condition
              }

              // Draw the background rectangle
              const textWidth = ctx.measureText(value).width + 14;
              const textHeight = 8; // Approximate height of the text
              const padding = 2;
              const radius = 5.6;
              const margin = -4.3;
              ctx.fillStyle = bgColor;
              drawRoundedRect(
                ctx,
                xPos - textWidth / 2 - padding,
                yPos - textHeight - padding - radius - margin,
                textWidth + 2 * padding,
                textHeight + 1 * padding,
                radius
              );

              // Draw the y[0] value text
              if (bgColor === "#febd2b") {
                ctx.fillStyle = "#000000"; // Black text color when background is yellow
                ctx.font = "800 10px sans-serif";
              } else {
                ctx.fillStyle = "#ffffff"; // White text color for other backgrounds
              }
              ctx.fillText(value, xPos, yPos - 2);
            }

            // Draw all values with specific colors
            values.forEach((value, index) => {
              const xPos = x.getPixelForValue(datapoint.x);
              const yPos = y.getPixelForValue(value);

              if (dataset.label === "Red Sales" && index === 0) {
                ctx.fillStyle = "#ffffff"; // White for Red Sales y[0]
              } else {
                ctx.fillStyle = "#000000"; // Black for all other values
              }

              if (!(dataset.label === "Black Sales" && index === 0)) {
                ctx.fillText(value, xPos, yPos - 2);
              }
            });
          });
        });
      },
    };

    function drawRoundedRect(ctx, x, y, width, height, borderRadius) {
      ctx.beginPath();
      ctx.moveTo(x + borderRadius, y);
      ctx.lineTo(x + width - borderRadius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + borderRadius);
      ctx.lineTo(x + width, y + height - borderRadius);
      ctx.quadraticCurveTo(
        x + width,
        y + height,
        x + width - borderRadius,
        y + height
      );
      ctx.lineTo(x + borderRadius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - borderRadius);
      ctx.lineTo(x, y + borderRadius);
      ctx.quadraticCurveTo(x, y, x + borderRadius, y);
      ctx.closePath();
      ctx.fill();
    }

    const config = {
      type: "bar",
      data,
      options: {
        plugins: {
          legend: {
            display: false, // Hide the legend
          },
        },

        scales: {
          x: {
            stacked: true,
            title: {
              display: true,
              text: "unscheduled",
              color: "#000", // X axis title color
              font: {
                weight: "bold",
                size: 16,
              },
            },

            ticks: {
              color: "black",
              font: {
                weight: "bold",
                size: 16,
              },
            },
            barPercentage: 0.6, // Controls the width of the bars
            categoryPercentage: 0.6,
          },

          y: {
            beginAtZero: true,
            max: 40, // Explicitly set the maximum value for the y-axis
            ticks: {
              color: "black",
              font: {
                weight: "bold",
                size: 16,
              },
              stepSize: 20, // Step size between ticks
              callback: function (value) {
                if (value === 0 || value === 20 || value === 40) {
                  return value; // Display only 0, 20, 40
                }
                return null; // Skip other values
              },
            },
          },
        },
      },
      plugins: [topLabels],
    };

    const myChart = new Chart(canvasRef.current, config);

    // Clean up
    return () => {
      myChart.destroy();
    };
  }, []);

  return (
    <div>
      <div
        className="chartBox"
        style={{ width: "fit-content", height: "fit-content" }}
      >
        <canvas ref={canvasRef} width={"400"} height={"330"}></canvas>
      </div>
    </div>
  );
};

export default FloatBarChart;
