import React from "react";
import { Chart } from "react-google-charts";

export const options = {
  pieHole: 0.4,
  is3D: false,
  backgroundColor: "rgb(22, 21, 28)",
  chartArea: {
    width: "100%",
    top: 90,
    left: "10",
  },
  legend: {
    // position: 'top',
    textStyle: { fontSize: "16", color: "#fff" },
  },
};

export default function Donut({ repartition }) {
  return (
    <div className="chart-container">
      <Chart
        chartType="PieChart"
        width="100%"
        height="430px"
        data={repartition}
        options={options}
      />
    </div>
  );
}
