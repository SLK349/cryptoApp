import React from "react";
import { useNavigate } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import { useTranslation } from "react-i18next";
import { useRef, useState, useEffect, useContext } from "react";
import { userContext } from "../../utils/Context";
import LanguageToggle from "../../components/TranslateBtn/LanguageToggle";
import { logout } from "../../utils/authService";

const UserSettings = ({ setShowModal, showUserSettings, setShowUserSettings }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const userInfo = useContext(userContext);

  const [ShowButtonLogin, setShowButtonLogin] = useState("navbar-sign");
  const [ShowButtonDisc, setShowButtonDic] = useState("hide");

  useEffect(() => {
    if (userInfo.isConnected == true) {
      setShowButtonLogin("hide");
      setShowButtonDic("navbar-sign");
    }
  }, [userInfo]);

  return (
    <div className={`home-menu ${showUserSettings ? "open" : "closed"}`}>
      <div className={ShowButtonLogin}>
        <span class="mas"> {t("Sign up / Register")} </span>{" "}
        <button
          className="sign"
          onClick={() => {
            setShowModal(true);
          }}
        >
          {t("Sign up / Register")}{" "}
        </button>{" "}
      </div>

      <div className={ShowButtonDisc}>
        <span className="mas"> {t("LOGOUT")} </span>
        <button
          className="sign"
          onClick={() => {
            // localStorage.removeItem("token");
            // let content = {
            //   ...userInfo,
            // };
            // content.isConnected = false;
            // userInfo.setUserInfo(content);
            // navigate("/home");
            logout(userInfo.setUserInfo, navigate);
          }}
        >
          {t("LOGOUT")}{" "}
        </button>{" "}
      </div>

      <I18nextProvider i18n={i18n}>
        <div className="language">
          <LanguageToggle />
        </div>{" "}
      </I18nextProvider>
    </div>
  );
};

export default UserSettings;
