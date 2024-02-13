import axios from "axios";
import { useEffect, useState } from "react";

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import { API_ENDPOINTS } from "../../utils/constants";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

export default function BalanceChart() {
  const [solde, setSolde] = useState([]);

  useEffect(() => {
    fetchBalanceChartData();
  }, []);

  const fetchBalanceChartData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        API_ENDPOINTS.ALL_SOLDE,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
        }
      );
      setSolde(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const balanceChartData = solde.sort((a, b) => new Date(a.date) - new Date(b.date)).map((value) => ({ x: value.date.split("T")[0], y: value.prix }));

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        grid: {
          display: false,
        },
        ticks: {
          color: "white",
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "white",
        },
      },
    },
    elements: {
      line: {
        tension: 0.4, // Ajustez cette valeur pour la courbure (0 = ligne droite, 1 = très courbé)
      },
      // point: {
      //   radius: 0,
      // },
    },
  };

  const data = {
    labels: balanceChartData.map((value) => value.x),
    datasets: [
      {
        fill: true,
        data: balanceChartData.map((val) => val.y),
        borderColor: "rgb(67, 138, 224)",
        backgroundColor: "rgba(67, 138, 224, 0.1)",
      },
    ],
  };

  console.log(solde);
  if (solde.length <= 1) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
        <p>No data for your balance graph at the moment</p>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        boxShadow: "1px 1px 10px 2px rgba(19, 19, 34, 0.75)",
      }}
    >
      <Line options={options} data={data} />
    </div>
  );
}
