import "./Plans.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "../../components/navbar/Navbar";
import PaypalCheckout from "../../components/Paypal/Paypal";

export default function Plan() {
  const { t, i18n } = useTranslation();
  const [isChecked, setIsChecked] = useState(false);
  const [product, setProduct] = useState({ description: "test", price: 1 });

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
  console.log(product);
  const product1 = {
    description: "mensuel",
    price: 25,
  };

  const product2 = {
    description: "annuel",
    price: 240,
  };

  useEffect(() => {
    isChecked ? setProduct(product2) : setProduct(product1);
  }, [isChecked]);

  return (
    <div className="container-plans">
      <svg xmlns="http://www.w3.org/2000/svg" className="goo" version="1.1" width="100%">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur"></feGaussianBlur>
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -15" result="goo"></feColorMatrix>
            <feComposite in="SourceGraphic" in2="goo" operator="atop"></feComposite>
          </filter>
        </defs>
      </svg>
      <Navbar />
      <div className="plans-header">
        <h3> {t("Pricing")} </h3>
      </div>

      <div className="container-plans-duration">
        <div className="plans-duration">
          <p>{t("Monthly")}</p>
          <div className="checkbox-apple">
            <input className="yep" id="check-apple" type="checkbox" onChange={handleCheckboxChange} />
            <label for="check-apple"></label>
          </div>
          <p>{t("Yearly")}</p>
        </div>
      </div>

      <div className="container-plans-choice">
        <div className="plans-choice" id="team">
          <div className="plans-name"> Premium</div>

          {/* {isChecked ? (
          <div className="plans-price"> $240</div>
          ) : (
          <div className="plans-price"> $25</div>
          )} */}

          <div className={`plans-price ${isChecked ? "checked" : "not-checked"}`}>{isChecked ? "$240" : "$25"}</div>

          <div className="plans-price-describe">{t("Small teams with up to 10 users.")}</div>

          <div className="plans-details">
            <ul>
              <li>
                {" "}
                <FontAwesomeIcon icon={faCircleCheck} />
                <p>{t("Store up to 20 business")}</p>
              </li>
              <li>
                <FontAwesomeIcon icon={faCircleCheck} />
                <p>{t("2 collaborators")}</p>
              </li>
              <li>
                <FontAwesomeIcon icon={faCircleCheck} />
                <p>{t("Unlimited collaboration")}</p>
              </li>
              <li>
                <FontAwesomeIcon icon={faCircleCheck} />
                <p>{t("End to end encryption")}</p>
              </li>
              <li>
                <FontAwesomeIcon icon={faCircleCheck} />
                <p>{t("Mac, PC, Android, iOS")}</p>
              </li>
            </ul>
          </div>

          <div className="plans-button">
            <PaypalCheckout product={product} />
          </div>
        </div>
      </div>
      <div id="cursor"></div>
    </div>
  );
}
