import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import FormModal from "../../components/FormModal/FormModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faBell, faChevronDown, faChevronUp, faBars } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import Settings from "../../components/settings/Settings";
import UserSettings from "../../components/settings/userSettings";
import logo from "../../asset/logov2.png";
import ToolsList from "../../components/toolsList/ToolsList";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [showUserSettings, setShowUserSettings] = useState(false);
  const [showToolsList, setShowToolsList] = useState(false);

  const toggleMenu = () => {
    setShowNotif(!showNotif);
    setShowUserSettings(false);
  };
  const toggleUserSettings = () => {
    setShowUserSettings(!showUserSettings);
    setShowNotif(false);
  };

  const toggleToolsList = () => {
    setShowToolsList(!showToolsList);
  };

  const [showMenuNav, setShowMenuNav] = useState(false);

  const toggleNavMenu = () => {
    setShowMenuNav(!showMenuNav);
    setShowNotif(false);
    setShowUserSettings(false);
  };

  useEffect(() => {
    if (showMenuNav) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    // Nettoyage : réactiver le défilement quand le composant est démonté
    return () => document.body.classList.remove("no-scroll");
  }, [showMenuNav]);

  return (
    // <div className="container-homev2-navbar">
    //   <div className="logo" onClick={(e) => navigate("/home")}>
    //     <img src={logo} />
    //   </div>

    //   <div className="navigation-list">
    //     <ul>
    //       {/* <li onClick={(e) => navigate("/dashboard")}>{t("Investment")}</li> */}
    //       <li>
    //         <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "nav-active" : "")}>
    //           {t("Investment")}
    //         </NavLink>
    //       </li>
    //       <li>
    //         <NavLink to="/tracking" className={({ isActive }) => (isActive ? "nav-active" : "")}>
    //           {t("Trading")}
    //         </NavLink>
    //       </li>
    //       {/* <li onClick={(e) => navigate("/tracking")}>{t("Trading")}</li> */}
    //       <li className="toolsList" onClick={toggleToolsList}>
    //         {t("Tools")}
    //         <i>
    //           <FontAwesomeIcon icon={faChevronDown} className={`toggle-icon ${showToolsList ? "rot" : ""}`} />
    //         </i>
    //       </li>
    //       {/* <li onClick={(e) => navigate("/social")}>Community</li> */}
    //       <li>
    //         <NavLink to="/social" className={({ isActive }) => (isActive ? "nav-active" : "")}>
    //           Community
    //         </NavLink>
    //       </li>
    //       {/* <li onClick={(e) => navigate("/plans")}>{t("Plans")}</li> */}
    //       <li>
    //         <NavLink to="/plans" className={({ isActive }) => (isActive ? "nav-active" : "")}>
    //           {t("Plans")}
    //         </NavLink>
    //       </li>
    //     </ul>
    //   </div>
    //   {showToolsList && <ToolsList showToolsList={showToolsList} setShowToolsList={setShowToolsList} />}

    //   <div className="menu-v2">
    //     <FontAwesomeIcon icon={faCircleUser} className="icon-menu-v2" onClick={toggleUserSettings} />
    //     <FontAwesomeIcon icon={faBell} className="icon-menu-v2" onClick={toggleMenu} />
    //     {/* <FontAwesomeIcon icon={faBars} className="icon-menu-v2" onClick={toggleMenu} /> */}
    //   </div>
    //   {showUserSettings && <UserSettings showUserSettings={showUserSettings} setShowUserSettings={setShowUserSettings} setShowModal={setShowModal} />}
    //   {showNotif && <Settings showNotif={showNotif} setShowNotif={setShowNotif} />}
    // </div>

    <div className="container-homev2-navbar">
      {/* <div className="logo">
      <img src={logo} />
    </div> */}

      {/* <div className="navigation-list">
      <ul>
        <li onClick={(e) => navigate("/dashboard")}>{t("Investment")}</li>
        <li onClick={(e) => navigate("/tracking")}>{t("Trading")}</li>
        <li className="toolsList" onClick={toggleToolsList}>
          {t("Tools")}

          <i>
            <FontAwesomeIcon icon={faChevronDown} className={`toggle-icon ${showToolsList ? "rot" : ""}`} />
          </i>
        </li>
        <li onClick={(e) => navigate("/social")}>Community</li>
        <li onClick={(e) => navigate("/plans")}>{t("Plans")}</li>
      </ul>
    </div> */}

      <div className="myNavbar">
        <div className="menu-nav" onClick={toggleNavMenu}>
          <FontAwesomeIcon icon={faBars} />
        </div>

        <div className="logov2" onClick={(e) => navigate("/home")}>
          <h1>CoinMarketCap</h1>
        </div>

        <div className="menu-v2">
          <FontAwesomeIcon icon={faCircleUser} className="icon-menu-v2" onClick={toggleUserSettings} />
          <FontAwesomeIcon icon={faBell} className="icon-menu-v2" onClick={toggleMenu} />
        </div>
      </div>

      <div className={`menu ${showMenuNav ? "show" : ""}`}>
        <ul>
          <li>
            <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "nav-active" : "")}>
              {t("Investment")}
            </NavLink>
          </li>
          <li>
            <NavLink to="/tracking" className={({ isActive }) => (isActive ? "nav-active" : "")}>
              {t("Trading")}
            </NavLink>
          </li>
          {/* <li className="toolsList" onClick={toggleToolsList}>
          {t("Tools")}
          <i>
            <FontAwesomeIcon icon={faChevronDown} className={`toggle-icon ${showToolsList ? "rot" : ""}`} />
          </i>
        </li> */}
          <li>
            <NavLink to="/tools" className={({ isActive }) => (isActive ? "nav-active" : "")}>
              Position Size
            </NavLink>
          </li>

          <li>
            <NavLink to="/social" className={({ isActive }) => (isActive ? "nav-active" : "")}>
              {t("Community")}
            </NavLink>
          </li>

          <li>
            <NavLink to="/spotlight" className={({ isActive }) => (isActive ? "nav-active" : "")}>
              {t("Spotlight")}
            </NavLink>
          </li>

          <li>
            <NavLink to="/plans" className={({ isActive }) => (isActive ? "nav-active" : "")}>
              {t("Plans")}
            </NavLink>
          </li>
        </ul>
      </div>
      {showToolsList && <ToolsList showToolsList={showToolsList} setShowToolsList={setShowToolsList} />}

      {/* <div className="menu-v2">
      <FontAwesomeIcon icon={faCircleUser} className="icon-menu-v2" onClick={toggleUserSettings} />
      <FontAwesomeIcon icon={faBell} className="icon-menu-v2" onClick={toggleMenu} />
    </div> */}
      {showUserSettings && <UserSettings showUserSettings={showUserSettings} setShowUserSettings={setShowUserSettings} setShowModal={setShowModal} />}
      {showNotif && <Settings showNotif={showNotif} setShowNotif={setShowNotif} />}
    </div>
  );
};

export default Navbar;
