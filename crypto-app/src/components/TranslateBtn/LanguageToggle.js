import React, { useState, createContext, useContext } from "react";
import { useTranslation } from "react-i18next";
import "./LanguageToggle.css";
import ToEmoji from "../ToEmoji";

const LanguageToggle = () => {
  const { i18n } = useTranslation();
  const [isEn, setIsEn] = useState(true);

  const toggleLanguage = () => {
    const newLanguage = isEn ? "fr" : "en";
    i18n.changeLanguage(newLanguage);
    setIsEn(!isEn);
  };

  return (
    <div>
      <div className="switch">
        <input id="language-toggle" className="check-toggle check-toggle-round-flat" type="checkbox" />
        <label htmlFor="language-toggle" onClick={toggleLanguage}></label>
        <span className={isEn ? "on active" : "on"}>{ToEmoji("gb")}</span>
        <span className={!isEn ? "off active" : "off"}>{ToEmoji("fr")}</span>
      </div>
    </div>
  );
};

export default LanguageToggle;
