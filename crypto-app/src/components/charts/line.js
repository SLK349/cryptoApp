import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import axios from "axios";
import { API_ENDPOINTS } from "../../utils/constants";

export const options = {
  curveType: "function",
  legend: {
    position: "bottom",
    textStyle: {
      color: "#fff", // Couleur du texte des légendes
    },
  },
  backgroundColor: {
    fill: "rgb(22, 21, 28)", // Couleur de fond du graphique
  },
  series: {
    0: {
      color: "#54a0ff", // Couleur des lignes de la première série
    },
  },
  hAxis: {
    // Options de l'axe horizontal
    title: "Date", // Titre de l'axe horizontal
    format: "yyyy mm dd",
    maxAlternation: 1, // Format de l'affichage des dates
    textStyle: {
      color: "#FFFFFF", // Couleur blanche pour les étiquettes de prix
    },
  },
  vAxis: {
    // Options de l'axe vertical
    title: "Prix", // Titre de l'axe vertical
    minValue: 0, // Valeur minimale de l'axe vertical
    textStyle: {
      color: "#FFFFFF", // Couleur blanche pour les étiquettes de prix
    },
  },
};

export default function LineChart() {
  useEffect(() => {
    getAllSolde();
  }, []);

  const [solde, setSolde] = useState([]);

  function getAllSolde() {
    const token = localStorage.getItem("token");

    axios
      .post(
        `${API_ENDPOINTS.ALL_SOLDE}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
        }
      )
      .then((response) => {
        const data = [["date", "prix"]];
        response.data.map((item) => data.push([item.date.split("T")[0], item.prix]));
        data.sort((a, b) => new Date(a[0]) - new Date(b[0]));
        setSolde(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return <Chart chartType="LineChart" width="100%" height="100%" data={solde} options={options} />;
}
