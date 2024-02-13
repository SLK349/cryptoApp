import React from "react";
import { useNavigate } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import { useTranslation } from "react-i18next";
import { useRef, useState, useEffect, useContext } from "react";
import { userContext } from "../../utils/Context";
import LanguageToggle from "../../components/TranslateBtn/LanguageToggle";
import jwt_decode from "jwt-decode";

const Settings = ({ showNotif, setShowNotif, setShowModal }) => {
  const { notifData } = useContext(userContext);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const userInfo = useContext(userContext);

  const [ShowButtonLogin, setShowButtonLogin] = useState("navbar-sign");
  const [ShowButtonDisc, setShowButtonDic] = useState("hide");
  const [showNotifContainer, setShowNotifContainer] = useState("hide");

  const notifP = () => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.id;
      if (notifData.length === 0) {
        return console.log("Pas de notification");
      }
      const filteredNotifications = notifData.filter((notification) => notification.id === userId);
      console.log(filteredNotifications);

      if (!userInfo.isConnected) {
        return null;
      }
      return filteredNotifications.map((element) => {
        const changeDirection = element.change >= 10 ? "up" : "down";

        return (
          <p key={element.name}>
            {" "}
            {element.name.toUpperCase()} is {changeDirection} {element.change.toFixed(2)} % to $ {element.currentPrice}{" "}
          </p>
        );
      });
    }
  };

  useEffect(() => {
    if (userInfo.isConnected == true) {
      setShowButtonLogin("hide");
      setShowButtonDic("navbar-sign");
      setShowNotifContainer("notifs-container");
    }
  }, [userInfo]);

  const homeTitle = t("titleHome");
  const homeText = t("textHome");

  return (
    <div className={`home-menu ${showNotif ? "open" : "closed"}`}>
      <div className={` ${showNotif} container-notif`}>
        <div className="notif-title">
          <p> Notification </p>{" "}
        </div>
        <div className="notif">
          <div className="notif-title-content"> {notifP()} </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
