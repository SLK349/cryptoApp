import "./dashboard.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { API_ENDPOINTS } from "../../utils/constants";
import { useTranslation } from "react-i18next";

import Modal from "../../components/modal/modal";
import BalanceChart from "../../components/charts/BalanceChart";
import Dough from "../../components/charts/Doughnut";
import Navbar from "../../components/navbar/Navbar";
import { toast } from "sonner";

export default function Dashboard() {
  const { t, i18n } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [trade, setTrade] = useState([]);
  const [solde, setSolde] = useState(0);
  const [montant, setMontant] = useState([]);
  const [dataTest, setDataTest] = useState([]);
  const [bestTrade, setBestTrade] = useState();
  const [worstTrade, setWorstTrade] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAll();
  }, [showModal]);

  useEffect(() => {
    getSolde();
  }, [trade]);

  useEffect(() => {
    const interval = setInterval(() => {
      getAll();
    }, 180000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  async function getAll() {
    const token = localStorage.getItem("token");
    let response = await axios.get(API_ENDPOINTS.ALL_TRANSACTION, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    });
    let data = response.data;
    setTrade(data);
    setIsLoading(false);
  }

  function del(name) {
    const token = localStorage.getItem("token");

    axios
      .delete(`${API_ENDPOINTS.DELETE_TRANSACTION}${name}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      })
      .then((response) => {
        getAll();
        toast("Transaction deleted");
      })
      .catch((err) => {
        console.error(err);
      });
  }

  let soldeAvoir = [];
  let montantTrade = [];
  let statsTrades = [];
  let datachart = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  let data = Object.values(trade).map((item, index) => {
    const label = item.name;
    const value = item.totalSpent + item.montant;
    datachart.labels.push(label);
    datachart.datasets[0].data.push(value);
    let holding = item.totalSpent + item.montant;
    let quantity = holding / item.currentPrice;
    soldeAvoir.push(item.totalSpent);
    montantTrade.push(item.montant);

    const elemClass2 = item.change > 0 ? "active" : "inactive";
    return (
      <div className="invest-trade-info">
        <ul key={index}>
          <li className="uppercase">{item.name}</li>
          <li>${item.currentPrice}</li>
          <li>
            ${holding.toFixed(2)} / {quantity.toFixed(2).replace(/\.?0+$/, "")}
          </li>
          <li>${item.averagePrice.toFixed(4).replace(/\.?0+$/, "")}</li>
          <li className={elemClass2}>
            %{item.change.toFixed(2)} / ${item.montant.toFixed(2)}
          </li>
          <li>
            <FontAwesomeIcon
              icon={faTrash}
              id="del-btn"
              onClick={() => {
                del(item.name);
              }}
            />
          </li>
        </ul>
      </div>
    );
  });

  const sumAvoir = soldeAvoir.reduce((acc, curr) => acc + curr, 0);
  const profit = montantTrade.reduce((acc, montant) => acc + montant, 0);

  function getSolde() {
    const mySolde = sumAvoir + profit;
    const formattedSolde = mySolde.toFixed(2);
    setSolde(formattedSolde);
  }

  if (JSON.stringify(datachart) !== JSON.stringify(dataTest)) {
    setDataTest(datachart);
  }

  let bigOne = 0;
  let worstOne = 0;
  let changes = 0;
  let total = 0;
  let average = 0;
  let changePort = 0;
  let biggestChange = 0;
  let worstChange = 0;
  const elementClass = average > 0 ? "active" : "inactive";
  const bigMontant = biggestChange > 0 ? "active" : "inactive";
  const worstMont = worstChange > 0 ? "active" : "inactive";

  changes = Object.values(trade).map((record) => record.change);
  total = changes.reduce((sum, change) => sum + change, 0);
  if (changes.length === 0) {
    average = 0;
    biggestChange = 0;
    worstChange = 0;
    bigOne = 0;
    worstOne = 0;
  } else {
    average = total / changes.length;
    biggestChange = Math.max(...changes);
    worstChange = Math.min(...changes);
    bigOne = Math.max(...montantTrade);
    worstOne = Math.min(...montantTrade);
  }

  changePort = montantTrade.reduce((sum, montant) => sum + montant, 0);

  return (
    <div className="container-home">
      <Navbar />
      <div className="container-back"></div>
      {showModal && <Modal closeModal={setShowModal} />}

      <div className="solde-button">
        <div className="solde">
          <h5>{t("Account Balance")}</h5>
          <p className={elementClass}>${solde}</p>
        </div>
        <button
          className="addTransaction"
          onClick={() => {
            setShowModal(true);
          }}
        >
          {t("+ Add transaction")}
        </button>
      </div>

      <div className="variation-solde">
        <div className="profit">
          <p>{t("Total PnL")}</p>
          <p className={elementClass}>
            {average.toFixed(2)}% (${changePort.toFixed(2)})
          </p>
        </div>
        <div className="best">
          <p>{t("Best performer")}</p>
          <p className={bigMontant}>
            {biggestChange.toFixed(2)}% / (${bigOne.toFixed(2)})
          </p>
        </div>
        <div className="worst">
          <p>{t("Worst performer")}</p>
          <p className={worstMont}>
            {worstChange.toFixed(2)}% / (${worstOne.toFixed(2)})
          </p>
        </div>
      </div>

      <div className="home-title">
        <h3>Portfolio</h3>
      </div>

      <div className="stats">
        <div className="graph">
          <BalanceChart />
        </div>

        <div className="repartition">
          <Dough repartition={dataTest} />
        </div>
      </div>

      <div className="actif">
        <div className="actif-title">
          <h5>Assets</h5>
        </div>

        <div className="actif-container">
          <ul>
            <li>{t("Name")}</li>
            <li>{t("Price")}</li>
            <li>{t("Holdings")}</li>
            <li>{t("Average buy price")}</li>
            <li>{t("PnL")}</li>
            <li>Actions</li>
          </ul>
        </div>
        <div className="container-trade">
          {Object.values(trade).length > 0 ? (
            data
          ) : (
            <div className="invest-trade-info">
              <ul>
                <li>No trade for the moment</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
