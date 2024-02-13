import "./Tracking.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowUpRightFromSquare, faHandHoldingDollar, faPencilAlt, faMessage, faTrash } from "@fortawesome/free-solid-svg-icons";
import { API_ENDPOINTS } from "../../utils/constants";
import { useTranslation } from "react-i18next";
import SaveTrade from "../../components/saveTrade/SaveTrade";
import SelectCrypto from "../../components/selectCrypto/SelectCrypto";
import Navbar from "../../components/navbar/Navbar";
import { toast } from "sonner";

export default function Tracking() {
  const { t, i18n } = useTranslation();
  let [name, setName] = useState("bitcoin");
  let [type, setType] = useState("");
  const [buyPrice, setBuyPrice] = useState(0);
  const [exitPrice, setExitPrice] = useState(0);
  const [leverage, setLeverage] = useState(1);
  const [amount, setAmount] = useState(0);
  const [gain, setGain] = useState(0);
  const [trades, setTrades] = useState([]);
  const [long, setLong] = useState(0);
  const [sell, setSell] = useState(0);
  const [totalTrade, setTotalTrade] = useState(0);
  const [win, setWin] = useState(0);
  const [loss, setLoss] = useState(0);
  const [winRate, setWinRate] = useState(0);
  const [avgAmount, setAvgAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [pnl, setPnl] = useState(0);
  const [sort, setSort] = useState("");
  const [longRatio, setLongRatio] = useState(0);
  const [shortRatio, setShortRatio] = useState(0);
  const [selectedTrade, setSelectedTrade] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [visibleObservations, setVisibleObservations] = useState({});
  const [obs, setObs] = useState("");
  const [comment, setComment] = useState("");
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    getAllTrade();
  }, []);

  function getAllTrade() {
    const token = localStorage.getItem("token");

    axios
      .post(
        API_ENDPOINTS.ALL_TRADE,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
        }
      )
      .then((response) => {
        let data = response.data;
        setTrades(data);

        let totalAmount = 0;
        let amountCount = 0;
        let longCount = 0;
        let sellCount = 0;
        let winCount = 0;
        let lossCount = 0;
        data.forEach((item) => {
          totalAmount += item.quantity * item.buyPrice;
          amountCount++;

          if (item.type === "buy") {
            longCount++;
            if (item.buyPrice < item.exitPrice) {
              winCount++;
            } else {
              lossCount++;
            }
          } else if (item.type === "sell") {
            sellCount++;
            if (item.buyPrice > item.exitPrice) {
              winCount++;
            } else {
              lossCount++;
            }
          }
          let averageAmount = totalAmount / amountCount;
          let numberOfTrade = longCount + sellCount;
          let winrate = (winCount / numberOfTrade) * 100;
          let sRatio = (sellCount / totalTrade) * 100;
          let lRatio = (longCount / totalTrade) * 100;
          setShortRatio(sRatio);
          setLongRatio(lRatio);
          setTotalAmount(totalAmount);
          setTotalTrade(numberOfTrade);
          setAvgAmount(averageAmount);
          setLong(longCount);
          setSell(sellCount);
          setWin(winCount);
          setLoss(lossCount);
          setWinRate(winrate);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function deleteOne(id) {
    const token = localStorage.getItem("token");
    axios
      .delete(`${API_ENDPOINTS.DELETE_TRADE}${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      })
      .then((response) => {
        toast("Trade deleted");
        getAllTrade();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const handleObservationSave = (id, comment) => {
    const token = localStorage.getItem("token");
    axios
      .put(
        `${API_ENDPOINTS.UPDATE_TRADE}${id}`,
        { comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    if (totalTrade > 0) {
      let sRatio = (sell / totalTrade) * 100;
      let lRatio = (long / totalTrade) * 100;
      setShortRatio(sRatio.toFixed(1));
      setLongRatio(lRatio.toFixed(1));
    } else {
      setShortRatio(0);
      setLongRatio(0);
    }
  }, [trades]);

  useEffect(() => {
    if (sort === "biggestGain") {
      const newTrades = [...trades];
      newTrades.sort((a, b) => b.gain - a.gain);
      setTrades(newTrades);
    } else if (sort === "biggestLoss") {
      const newTrades = [...trades];
      newTrades.sort((a, b) => a.gain - b.gain);
      setTrades(newTrades);
    }
  }, [sort]);

  let pnls = [];
  let data = trades.map((item, index) => {
    let pnlTrade;
    // let qty = item.amount / item.buyPrice;
    let qty = item.quantity;
    if (item.type === "buy") {
      pnlTrade = (item.exitPrice - item.buyPrice) * qty * leverage;
      item["gain"] = pnlTrade;
    } else {
      pnlTrade = (item.buyPrice - item.exitPrice) * qty * leverage;
      item["gain"] = pnlTrade;
    }
    pnls.push(pnlTrade);

    const handleTrade = (trade) => {
      setSelectedTrade(trade);
      setShowModal(true);
    };

    console.log(editMode);

    const handleObs = (tradeId) => {
      setVisibleObservations((prevState) => ({
        ...prevState,
        [tradeId]: !prevState[tradeId],
      }));
    };

    return (
      <div className="tracker-trades">
        <ul key={index}>
          <li>{item.name}</li>
          <li>{item.type}</li>
          <li>{item.leverage}</li>
          <li>{item.quantity}</li>
          <li>{item.buyPrice}</li>
          <li>{item.exitPrice}</li>
          <li>{pnlTrade.toFixed(0)}$</li>
          <li>
            <FontAwesomeIcon
              icon={faMessage}
              id="obs-icon"
              onClick={() => {
                handleObs(item.id_trade);
              }}
            />
          </li>
          <li className="action">
            <FontAwesomeIcon
              icon={faTrash}
              id="del-btn"
              onClick={() => {
                deleteOne(item.id_trade);
              }}
            />

            <FontAwesomeIcon icon={faArrowUpRightFromSquare} id="share-btn" onClick={() => handleTrade(item)} />
          </li>
        </ul>

        {visibleObservations[item.id_trade] && item.comment && (
          <div className={`observation ${visibleObservations[item.id_trade] ? "visible" : "invisible"}`}>
            <div className="obs-icon">
              <p>{item.create_at.split("T")[0]}</p>
              <FontAwesomeIcon icon={faArrowRight} />
            </div>

            <div className="obs-p">
              <p contentEditable="true" onBlur={(e) => handleObservationSave(item.id_trade, e.target.innerText)}>
                {item.comment}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "" || type === "" || quantity === 0 || buyPrice === 0) {
      return;
    }
    let data = {
      name,
      type,
      buyPrice,
      exitPrice,
      quantity,
      leverage,
      comment: obs,
    };
    const token = localStorage.getItem("token");

    axios
      .post(API_ENDPOINTS.CREATE_TRADE, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      })
      .then((response) => {
        setBuyPrice(0);
        setExitPrice(0);
        setQuantity(0);
        setLeverage(1);
        setObs("");
        getAllTrade();
        toast("Trade added");
      })
      .catch((error) => {
        console.log("error");
        console.error(error);
      });
  };

  useEffect(() => {
    let pnlAmount = 0;
    pnls.forEach((item) => {
      pnlAmount += item;
    });
    setPnl(pnlAmount);
  }, [trades]);

  const handleCryptoChange = (e) => {
    setName(e.target.value);
  };

  const selectCryptoClasses = {
    searchInput: "tracking-search-input",
    selectWrapper: "tracking-select-wrapper",
    selectCrypto: "tracking-select-crypto",
  };

  return (
    <div className="container-tracker">
      <Navbar />
      {selectedTrade && showModal && <SaveTrade trade={selectedTrade} closeModal={setShowModal} />}

      <div className="tracker-title">
        <h3> Trades Stats </h3>
      </div>

      <div className="tracker-stats">
        <div className="tracker-repartition">
          <div className="totalTrade">
            <p className="ratio-title">Total Trade</p>
          </div>

          <div className="numTrade">
            <p className="trade-white">{totalTrade}</p>
            <p className="volDetails">
              Total Volume of ${totalAmount} with an average of ${avgAmount.toFixed(2)} per trade
            </p>
          </div>
        </div>

        <div className="tracker-win">
          <div className="tracker-win-title">
            <p className="ratio-title">Total Win Rate</p>
          </div>

          <div className="winRate-container">
            <div className="winRate">
              <p className="trade-white">{winRate.toFixed(2)}%</p>
            </div>
            <div className="winRate-stats">
              <p className="trade-green">{win} Wins</p>
              <p className="trade-red">{loss} Losses</p>
            </div>
          </div>
        </div>

        <div className="ratio-long-short">
          <div className="long-short-details">
            <div className="long-detail">
              <p className="ratio-title">Long Ratio</p>
              <p className="ratio-green">{longRatio}%</p>
            </div>

            <div className="short-detail">
              <p className="ratio-title">Short Ratio</p>
              <p className="ratio-red">{shortRatio}%</p>
            </div>
          </div>

          <div className="ratio-bar">
            <div className="long-bar" style={{ width: `${longRatio}%` }}></div>
            <div className="short-bar" style={{ width: `${shortRatio}%` }}></div>
          </div>
        </div>

        <div className="tracker-gain">
          <div className="gain-details">
            <p className="ratio-title">Total PnL</p>
            <p className={`trade-white ${pnl > 0 ? "ratio-green" : "ratio-red"}`}>${pnl.toFixed(1)}</p>
          </div>
        </div>
      </div>

      <div className="container-new-trade">
        <div className="title-newTrade">
          <h3>{t("New Trade")}</h3>
        </div>

        <div className="newTrade">
          <form className="form-newTrade" onSubmit={handleSubmit}>
            <div className="left-newTrade">
              <SelectCrypto name={name} onChange={handleCryptoChange} classes={selectCryptoClasses} />
            </div>

            <div className="right-newTrade">
              <div className="section1-newTrade">
                <div className="input">
                  <label htmlFor="type">{t("BUY / SELL")}</label>
                  <select
                    id="type"
                    value={type}
                    onChange={(e) => {
                      setType(e.target.value);
                    }}
                  >
                    <option value="">Select</option>

                    <option value="buy">{t("Buy")}</option>
                    <option value="sell">{t("Sell")}</option>
                  </select>
                </div>

                <div className="input">
                  <label htmlFor="quantity">{t("Quantity")}</label>
                  <input
                    type="number"
                    name="quantity"
                    value={quantity}
                    onChange={(e) => {
                      setQuantity(e.target.value);
                    }}
                  />
                </div>

                <div className="input">
                  <label htmlFor="buyPrice">{t("Buy Price")}</label>
                  <input
                    type="number"
                    name="buyPrice"
                    value={buyPrice}
                    onChange={(e) => {
                      setBuyPrice(e.target.value);
                    }}
                  />
                </div>

                <div className="input">
                  <label htmlFor="exitPrice">{t("Exit Price")}</label>
                  <input
                    type="number"
                    name="exitPrice"
                    value={exitPrice}
                    onChange={(e) => {
                      setExitPrice(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="section2-newTrade">
                <div className="input">
                  <label htmlFor="leverage">{t("Leverage")}</label>
                  <input
                    type="number"
                    name="leverage"
                    value={leverage}
                    onChange={(e) => {
                      setLeverage(e.target.value);
                    }}
                  />
                </div>

                <div className="input-obs">
                  <label htmlFor="observation">Observation</label>
                  <textarea
                    type="text"
                    name="obs-input"
                    value={obs}
                    onChange={(e) => {
                      setObs(e.target.value);
                    }}
                  />
                </div>

                <div className="container-btn-trade">
                  <button type="submit" className="trade-btn">
                    <div className="svg-wrapper-1">
                      <div className="svg-wrapper">
                        <FontAwesomeIcon icon={faHandHoldingDollar} />
                      </div>
                    </div>
                    <span>{t("New Trade")}</span>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="tracker-container-trades">
        <div className="tracker-trade-info">
          <ul>
            <li>{t("Devise")}</li>
            <li>{t("Buy/Sell")}</li>
            <li>{t("Leverage")}</li>
            <li>{t("Quantity")}</li>
            <li>{t("Entry")}</li>
            <li>{t("Exit")}</li>
            <li>{t("PnL")}</li>
            <li>Observation</li>
            <li>
              <select
                id="sort"
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                }}
              >
                <option value="">{t("Sort by")}</option>
                <option value="biggestGain">{t("Biggest gain")}</option>
                <option value="biggestLoss">{t("Biggest loss")}</option>
              </select>
            </li>
          </ul>
        </div>
        <div className="container-data-trades">
          {trades.length > 0 ? (
            data
          ) : (
            <div className="tracker-trades">
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
