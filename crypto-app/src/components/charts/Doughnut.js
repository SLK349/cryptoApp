import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  elements: {
    arc: {
      borderWidth: 0, // Réduire l'épaisseur de la ligne
    },
  },
  plugins: {
    legend: {
      display: true,
    },
  },
};

export default function Dough({ repartition }) {
  if (repartition.labels.length === 0) {
    repartition.labels = ["No trade for the moment"];
    repartition.datasets[0].data = [1];
  }
  return <Doughnut data={repartition} options={options} />;
}
