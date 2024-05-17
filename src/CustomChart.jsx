import React from "react";
import { Scatter } from "react-chartjs-2";
import "chart.js/auto";

const Utils = {
  months: function ({ count }) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
    ];
    return months.slice(0, count);
  },
  rand: function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  CHART_COLORS: {
    red: "rgba(255, 99, 132, 0.5)",
    blue: "rgba(54, 162, 235, 0.5)",
  },
};

const DATA_COUNT = 7;
const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 40 };

const labels = Utils.months({ count: DATA_COUNT });
const data = {
  labels: labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => {
        return {
          x: Utils.rand(NUMBER_CFG.min, NUMBER_CFG.max),
          y: Utils.rand(NUMBER_CFG.min, NUMBER_CFG.max),
        };
      }),
      backgroundColor: Utils.CHART_COLORS.red,
    },
    {
      label: "Dataset 2",
      data: labels.map(() => {
        return {
          x: Utils.rand(NUMBER_CFG.min, NUMBER_CFG.max),
          y: Utils.rand(NUMBER_CFG.min, NUMBER_CFG.max),
        };
      }),
      backgroundColor: Utils.CHART_COLORS.blue,
    },
  ],
};

const options = {
  scales: {
    y: {
      ticks: {
        callback: function (value) {
          if (value === 0 || value === 20 || value === 40) {
            return value;
          }
          return "";
        },
      },
      beginAtZero: true,
      max: 40,
    },
    x: {
      beginAtZero: true,
      max: 40,
    },
  },
};

const CustomChart = () => {
  return <Scatter data={data} options={options} />;
};

export default CustomChart;
