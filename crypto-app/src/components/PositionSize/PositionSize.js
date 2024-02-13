import { useState } from "react";
import "./PositionSize.css";

export default function PositionSize() {
  const [entryPrice, setEntryPrice] = useState(null);
  const [targetPrice, setTargetPrice] = useState(null);
  const [stopLossPrice, setStopLossPrice] = useState(null);
  const [riskPercentage, setRiskPercentage] = useState(null);
  const [accountSize, setAccountSize] = useState(null);
  const [leverage, setLeverage] = useState(1);
  const [riskAmount, setRiskAmount] = useState(null);
  const [potentialProfit, setPotentialProfit] = useState(null);
  const [valueAtRisk, setValueAtRisk] = useState(null);
  const [direction, setDirection] = useState("long");
  const [tradeSize, setTradeSize] = useState(null);
  const [RR, setRR] = useState(null);
  const [potentialLoss, setPotentialLoss] = useState(null);

  const calculatePositionSize = () => {
    //Taille de la position = Taille du compte x Risque du compte / Point d'invalidation
    //Taille de la position = 5000 $ x 0,01 / 0,05
    //1000 $ = 5000 $ x 0,01 / 0,05

    //         Formule de taille de position pour une position LONG
    // (Taille du compte * (Risque max % X 0,01)) / (Prix d'entrée - Prix Stoploss) X Prix d'entrée

    //         Formule de taille de position pour une position COURTE
    // Ceci est très similaire au calcul de la position LONG mais nous inverserons le prix d'entrée et le prix Stoploss dans la formule, cela va comme ceci:
    // (Taille du compte * (Risque max % X 0,01)) / (Prix Stoploss - Prix d'entrée) X Prix d'entrée
    let invalidation = 0;
    let pnl = 0;
    let loss = 0;
    let qty = 0;
    let positionSize = 0;
    let riskReward = 0;

    if (direction === "long") {
      positionSize = (((accountSize * (riskPercentage * 0.01)) / (entryPrice - stopLossPrice)) * entryPrice) / leverage;
      qty = (((accountSize * (riskPercentage * 0.01)) / (entryPrice - stopLossPrice)) * entryPrice) / entryPrice;
      pnl = targetPrice * qty - ((accountSize * (riskPercentage * 0.01)) / (entryPrice - stopLossPrice)) * entryPrice;
      loss = ((accountSize * (riskPercentage * 0.01)) / (entryPrice - stopLossPrice)) * entryPrice - stopLossPrice * qty;
      riskReward = (targetPrice - entryPrice) / (entryPrice - stopLossPrice);
    } else {
      positionSize = (((accountSize * (riskPercentage * 0.01)) / (stopLossPrice - entryPrice)) * entryPrice) / leverage;
      qty = (((accountSize * (riskPercentage * 0.01)) / (entryPrice - stopLossPrice)) * entryPrice) / entryPrice;
      pnl = ((accountSize * (riskPercentage * 0.01)) / (entryPrice - stopLossPrice)) * entryPrice - targetPrice * qty;
      loss = stopLossPrice * qty - ((accountSize * (riskPercentage * 0.01)) / (entryPrice - stopLossPrice)) * entryPrice;
      riskReward = (targetPrice - entryPrice) / (entryPrice - stopLossPrice);
    }
    setTradeSize(positionSize);
    setPotentialProfit(pnl);
    setPotentialLoss(loss);
    setRR(riskReward);
  };

  return (
    <div className="pos-container">
      <div className="pos">
        <div className="pos-title">
          <h1>Position Size Calculator</h1>
        </div>

        <form className="pos-form">
          <div className="pos-input">
            <label>Direction</label>
            <select onChange={(e) => setDirection(e.target.value)}>
              <option value="long">Long</option>
              <option value="short">Short</option>
            </select>
          </div>

          <div className="pos-input">
            <label>Entry Price</label>
            <input type="number" value={entryPrice} onChange={(e) => setEntryPrice(e.target.value)} placeholder="2223" />
          </div>

          <div className="pos-input">
            <label>Target Price</label>
            <input type="number" value={targetPrice} onChange={(e) => setTargetPrice(e.target.value)} placeholder="2723" />
          </div>

          <div className="pos-input">
            <label>Stop Loss Price</label>
            <input type="number" value={stopLossPrice} onChange={(e) => setStopLossPrice(e.target.value)} placeholder="2163" />
          </div>

          <div className="pos-input">
            <label>Risk Percentage</label>
            <input type="number" value={riskPercentage} onChange={(e) => setRiskPercentage(e.target.value)} placeholder="2" />
          </div>

          <div className="pos-input">
            <label>Account Size</label>
            <input type="number" value={accountSize} onChange={(e) => setAccountSize(e.target.value)} placeholder="10000" />
          </div>

          <div className="pos-input">
            <label>Leverage</label>
            <input type="number" value={leverage} onChange={(e) => setLeverage(e.target.value)} placeholder="1" />
          </div>

          <button className="pos-button" type="button" onClick={calculatePositionSize}>
            Calculate
          </button>
        </form>

        <div className="pos-stats-container">
          <div className="pos-stats">
            {RR !== null && (
              <>
                <p> Risk/Reward ratio </p>
                <p>{RR.toFixed(2)}</p>
              </>
            )}
          </div>

          <div className="pos-stats">
            {potentialProfit !== null && (
              <>
                <p>Potential Profit </p>
                <p>${potentialProfit.toFixed(2).replace(/-/g, "")}</p>
              </>
            )}
          </div>

          <div className="pos-stats">
            {potentialLoss !== null && (
              <>
                <p>Potential Loss </p>
                <p>${potentialLoss.toFixed(2).replace(/-/g, "")}</p>
              </>
            )}
          </div>

          <div className="pos-stats">
            {tradeSize !== null && (
              <>
                <p>Position Size </p>
                <p>${tradeSize.toFixed(2)}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
