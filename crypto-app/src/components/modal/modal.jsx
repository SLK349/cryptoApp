import "./modal.css";
import { useState, useEffect } from "react";
import axios from "axios";
import anime from "animejs";
import { API_ENDPOINTS } from "../../utils/constants";
import { useTranslation } from "react-i18next";
import SelectCrypto from "../selectCrypto/SelectCrypto";
import { toast } from "sonner";

export default function Modal({ closeModal }) {
  const { t, i18n } = useTranslation();
  let [name, setName] = useState("bitcoin");
  const [quantité, setQte] = useState(0);
  const [prix, setPrix] = useState(0);
  const [total, setTotal] = useState(0);
  const handleCryptoChange = (e) => {
    setName(e.target.value);
  };

  console.log(name);

  useEffect(() => {
    totalChange();
  }, [prix]);

  const totalChange = (e) => {
    let depense = quantité * prix;
    setTotal(depense);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (name && quantité && prix && total && token) {
      name = name.toLowerCase();
      let data = { name, quantité, prix, total };
      axios
        .post(API_ENDPOINTS.CREATE_TRANSACTION, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
        })
        .then((response) => {
          console.log("transaction created");
          toast("Transaction created");
        })
        .catch((err) => {
          console.error(err);
          console.log("transaction failed");
        });
    } else {
      console.log("Missing data");
    }
  };

  useEffect(() => {
    var basicTimeline = anime.timeline({
      autoplay: false,
    });

    var pathEls = document.querySelectorAll(".check");
    for (var i = 0; i < pathEls.length; i++) {
      var pathEl = pathEls[i];
      var offset = anime.setDashoffset(pathEl);
      pathEl.setAttribute("stroke-dashoffset", offset);
    }

    basicTimeline
      .add({
        targets: ".text",
        duration: 1,
        opacity: "0",
      })
      .add({
        targets: ".button",
        duration: 1300,
        height: 10,
        width: 300,
        backgroundColor: "#2B2D2F",
        border: "0",
        borderRadius: 100,
      })
      .add({
        targets: ".progress-bar",
        duration: 2000,
        width: 300,
        easing: "linear",
      })
      .add({
        targets: ".button",
        width: 0,
        duration: 1,
      })
      .add({
        targets: ".progress-bar",
        width: 80,
        height: 80,
        delay: 500,
        duration: 750,
        borderRadius: 80,
        backgroundColor: "#71DFBE",
      })
      .add({
        targets: pathEls,
        strokeDashoffset: [offset, 0],
        duration: 200,
        easing: "easeInOutSine",
        complete: () =>
          setTimeout(() => {
            closeModal(false);
          }, 1000),
      });

    const buttonClickHandler = () => {
      basicTimeline.play();
    };

    const textClickHandler = () => {
      basicTimeline.play();
    };

    const buttonElement = document.querySelector(".button");
    buttonElement.addEventListener("click", buttonClickHandler);

    const textElement = document.querySelector(".text");
    textElement.addEventListener("click", textClickHandler);

    return () => {
      buttonElement.removeEventListener("click", buttonClickHandler);
      textElement.removeEventListener("click", textClickHandler);
    };
  }, []);

  const selectCryptoClasses = {
    searchInput: "search-input",
    selectWrapper: "select-wrapper",
    selectCrypto: "select-crypto",
  };

  return (
    <div className="container-modal">
      <div className="myModal">
        <div className="modal-title">
          <h1>{t("Add a new transaction")}</h1>
          <button onClick={() => closeModal(false)}>X</button>
        </div>

        <div className="modal-form">
          <form onSubmit={handleSubmit} id="transaction-form">
            <div className="container-search-input">
              <SelectCrypto name={name} onChange={handleCryptoChange} classes={selectCryptoClasses} />
            </div>

            <div className="container-input">
              <label htmlFor="quantité">{t("Quantity")}</label>
              <input id="quantité" type="number" value={quantité} placeholder="Entrer la quantité" onChange={(e) => setQte(e.target.value)} />
            </div>

            <div className="container-input">
              <label htmlFor="prix">{t("Price")}</label>
              <input id="prix" type="number" value={prix} placeholder="Entrer le prix" onChange={(e) => setPrix(e.target.value)} />
            </div>

            <div className="container-input">
              <label htmlFor="total">{t("Total Spent")}</label>
              <input id="total" type="number" value={quantité * prix} placeholder="Entrer le prix" onChange={(e) => setTotal(quantité * prix)} />
            </div>

            {/* <div className="valider">
              <button className="valid-btn" type="submit">
                Ajouter une transaction
              </button>
            </div> */}

            <div className="container-button">
              <div className="button">
                <button className="text" type="submit">
                  {t("Submit")}
                </button>
                <div class="progress-bar"></div>
                <svg viewBox="0 0 25 30" className="svg">
                  <path className="check st0" d="M2,19.2C5.9,23.6,9.4,28,9.4,28L23,2" />
                </svg>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
