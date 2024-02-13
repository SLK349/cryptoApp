import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./layout.css";
import LanguageToggle from "../TranslateBtn/LanguageToggle";
import { I18nextProvider } from "react-i18next";
import i18n from "i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEarthAmericas, faBars, faCircleUser, faBell } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import Settings from "../settings/Settings";
import UserSettings from "../../components/settings/userSettings";
import { useState, useEffect, useContext } from "react";
import { userContext } from "../../utils/Context";

export default function Layout() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [showUserSettings, setShowUserSettings] = useState(false);
  // const [username, setUsername] = useState("");

  const toggleMenu = () => {
    setShowNotif(!showNotif);
    setShowUserSettings(false);
  };

  const toggleUserSettings = () => {
    setShowUserSettings(!showUserSettings);
    setShowNotif(false);
  };

  // function getUsername() {
  //     const token = localStorage.getItem("token");
  //     axios
  //         .post(
  //             API_ENDPOINTS.USERNAME,
  //             {},
  //             {
  //                 headers: {
  //                     Authorization: `Bearer ${token}`,
  //                     "Content-type": "application/json",
  //                 },
  //             }
  //         )
  //         .then((response) => setUsername(response.data[0].username))
  //         .catch((err) => console.error(err));
  // }

  // useEffect(() => {
  //     getUsername();
  // }, []);

  return (
    <>
      <div className="container-navb">
        <div className="home-nav">
          <div className="nav-title">
            <h1 onClick={(e) => navigate("/home")}>CoinMarketCap</h1>
            {/* <img src={logo} alt="" onClick={(e) => navigate("/home")} /> */}
          </div>
          <div className="nav-navigation">
            <ul>
              <li onClick={(e) => navigate("/dashboard")}>{t("Investment")}</li>
              <li onClick={(e) => navigate("/tracking")}>{t("Trading")}</li>
              <li onClick={(e) => navigate("/tools")}>{t("Tools")}</li>
              <li onClick={(e) => navigate("/social")}>Community</li>
              <li onClick={(e) => navigate("/plans")}>{t("Plans")}</li>
              {/* <li onClick={(e) => navigate("/about")}>{t("About us")}</li> */}
            </ul>
          </div>
        </div>

        <div className="icon-menu-container">
          <FontAwesomeIcon icon={faCircleUser} className="icon-menu-v2" onClick={toggleUserSettings} />
          <FontAwesomeIcon icon={faBell} className="icon-menu-v2" onClick={toggleMenu} />
          {/* <FontAwesomeIcon icon={faBars} className="icon-menu" onClick={toggleMenu} /> */}
        </div>

        {showUserSettings && <UserSettings showUserSettings={showUserSettings} setShowUserSettings={setShowUserSettings} />}
        {showNotif && <Settings showNotif={showNotif} setShowNotif={setShowNotif} />}
      </div>

      <Outlet />
    </>
  );
}
