import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faDownload } from "@fortawesome/free-solid-svg-icons";
import "./SaveTrade.css";
import html2canvas from "html2canvas";

const SaveTrade = ({ trade, closeModal }) => {
  const composantRef = useRef(null);
  const { name, leverage, buyPrice, exitPrice, type, gain } = trade;
  const pnlClass = gain > 0 ? "green" : "red2";
  const typeClass = type === "buy" ? "green" : "red2";
  const saveTradeClass = gain > 0 ? "save-trade-bull" : "save-trade-bear";

  const handleCapture = () => {
    const composant = composantRef.current;

    html2canvas(composant)
      .then((canvas) => {
        // Convertir le canvas en URL de données
        const image = canvas.toDataURL("image/png");

        // Créer un lien pour télécharger l'image
        const lien = document.createElement("a");
        lien.href = image;
        lien.download = "capture.png";
        lien.click();
      })
      .catch((error) => {
        console.error("Erreur lors de la capture d'écran:", error);
      });
  };

  return (
    <div ref={composantRef} className="save-trade-container">
      <div className={saveTradeClass}>
        <div className="save-trade-title">
          <h3>P&L share</h3>
          <button
            onClick={(e) => {
              closeModal(false);
            }}
          >
            <FontAwesomeIcon icon={faCircleXmark} className="leave-save-trade" />
          </button>
        </div>

        <div className="save-trade-stats">
          <div className="nameNlev">
            <div>{name.toUpperCase()}</div>
            <div className="save-trade-type">
              <p className={typeClass}>
                {type.toUpperCase()} {leverage}x
              </p>
            </div>
          </div>

          <div className="save-trade-pnl-container">
            <div className="save-trade-pnl">
              <p className="grey">PnL</p>
              <p className={pnlClass}>${gain.toFixed(2)}</p>
            </div>
          </div>

          <div className="save-trade-price-container">
            <div className="save-trade-price">
              <p className="grey">Entry Price</p>
              <p>${buyPrice}</p>
            </div>
            <div className="save-trade-price">
              <p className="grey">Exit Price</p>
              <p>${exitPrice}</p>
            </div>
          </div>

          <div className="save-trade-bottom">
            <FontAwesomeIcon icon={faDownload} id="save-btn" onClick={handleCapture} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaveTrade;
