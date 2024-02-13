import React, { Suspense } from "react";
import { useRef, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import FormModal from "../../components/FormModal/FormModal";
import Spline from "@splinetool/react-spline";
import { userContext } from "../../utils/Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff, faBars } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import LanguageToggle from "../../components/TranslateBtn/LanguageToggle";
import { I18nextProvider } from "react-i18next";
import Settings from "../../components/settings/Settings";

const Home = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="container-navbar">
      <div className="container-background"></div>
      {showModal && <FormModal closeModal={setShowModal} />}

      <div className="home-navbar">
        <div className="navbar-title">
          <h1>CoinMarketCap</h1>
        </div>
        <div className="navbar-navigation">
          <ul>
            <li onClick={(e) => navigate("/dashboard")}>{t("Investment")}</li>
            <li onClick={(e) => navigate("/tracking")}>{t("Trading")}</li>
            <li onClick={(e) => navigate("/tools")}>{t("Tools")}</li>
            <li onClick={(e) => navigate("/plans")}>{t("Plans")}</li>
            <li onClick={(e) => navigate("/about")}>{t("About us")}</li>
          </ul>
        </div>

        <div>
          <FontAwesomeIcon icon={faBars} className="icon-menu" onClick={toggleMenu} />
        </div>

        {showMenu && <Settings showMenu={showMenu} setShowMenu={setShowMenu} setShowModal={setShowModal} />}
      </div>

      <div className="container-presentation">
        <div className="title-pre">
          <h3>
            Smart system for <br /> <span>Cryptocurrency</span> <br /> assets trading
          </h3>
          <p>{t("presentation")}</p>
          {/* <button> Let's Explore </button> */}
        </div>
      </div>
      <div className="spline">
        {/* <Spline scene="https://prod.spline.design/omToWSfciT1BbnPi/scene.splinecode" /> */}
        {/* <Spline scene="https://prod.spline.design/a2QkAiJsBQh8oR1V/scene.splinecode" /> */}
        {/* <Spline scene="https://prod.spline.design/JhSDSPtflIFc4Dag/scene.splinecode" /> */}
        {/* <Spline scene="https://prod.spline.design/4QjFhCEiszLnBhly/scene.splinecode" /> */}
        <Spline scene="https://prod.spline.design/N-fqMCJj8pe-SVew/scene.splinecode" />
      </div>
    </div>
  );
};

export default Home;
