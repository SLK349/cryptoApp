import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import FormModal from "../../components/FormModal/FormModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPowerOff,
  faBars,
  faArrowDown,
  faRepeat,
  faChildReaching,
  faWallet,
  faCircleCheck,
  faHeadset,
  faPhone,
  faEnvelope,
  faCircleUser,
  faBell,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import Settings from "../../components/settings/Settings";
import UserSettings from "../../components/settings/userSettings";
import "./HomeV2.css";
import logo from "../../asset/logov2.png";
import { Fade } from "react-awesome-reveal";
import { keyframes } from "@emotion/react";
import { Reveal } from "react-awesome-reveal";
import ToolsList from "../../components/toolsList/ToolsList";

const HomeV2 = () => {
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
    // setShowToolsList(false);
  };

  const customAnimation = keyframes`
        from {
        opacity: 0;
        transform: translate3d(200px, 0px, 0);
        }
    
        to {
        opacity: 1;
        transform: translate3d(0, 0, 0);
        }
    `;

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
    <div className="container-homev2">
      <div className="container-homev2-section1">
        {showModal && <FormModal closeModal={setShowModal} />}

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
              {/* <li>
                <NavLink to="/metamask" className={({ isActive }) => (isActive ? "nav-active" : "")}>
                  MetaMask
                </NavLink>
              </li> */}

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

        <div className="container-homev2-presentation">
          <div className="homev2-title">CoinMarketCap</div>

          <div className="homev2-p">
            <Fade cascade damping={0.05} triggerOnce={true}>
              Simplify your crypto life. Access & manage your assets anytime. Anywhere.
            </Fade>
          </div>

          <div className="arrow">
            <FontAwesomeIcon icon={faArrowDown} />
          </div>
        </div>

        <div className="container-homev2-2">
          <div className="homev2-describe-title">
            <h3 className="h3-1">Crypto world.</h3>
            <h3 className="h3-2">All-in-one solution</h3>
          </div>

          <div className="homev2-describe-p">
            <p>
              With our user-friendly platform, you can easily buy, sell, and store crypto <br /> currency securely and hassle-free. Say goodbye to complicated
              interfaces and <br /> hello to a seamless crypto experience with CoinMarketCap
            </p>
          </div>
        </div>

        <div className="containerv2-stats">
          <div className="v2-stats">
            <p className="p1">562M</p>
            <p>of active daily users</p>
          </div>

          <div className="v2-stats">
            <p className="p1">1234</p>
            <p>transactions per second</p>
          </div>

          <div className="v2-stats">
            <p className="p1">11236</p>
            <p>validator nodes</p>
          </div>

          <div className="v2-stats">
            <p className="p1">2M</p>
            <p>transactions per day</p>
          </div>
        </div>
      </div>

      <div className="container-homev2-section2">
        <div className="container-describe-2">
          <div className="container-content-describe-2">
            <div className="title-describe-2">
              <h3 className="title-blue">Key features</h3>
              <h3 className="title-2">that set us apart</h3>
            </div>

            <div className="p-describe-2">
              <p>
                CoinMarketCap is more than just a wallet - it's a comprehensive platform with features that are tailored to the needs of cryptocurrency
                enthusiats
              </p>
            </div>
          </div>
        </div>

        <div className="benefit-list">
          <div className="item-list">
            <div className="icon-item">
              <div className="icon-item-container">
                <FontAwesomeIcon icon={faHeadset} />
              </div>
            </div>

            <div className="title-item">
              <h5>Support</h5>
            </div>

            <div className="describe-item">
              <p>supports a wide range of knezfooezf, fieohfeozifh, ezifheozihf, eizhfoezhf</p>
            </div>
          </div>
          <div className="item-list">
            <div className="icon-item">
              <div className="icon-item-container">
                <FontAwesomeIcon icon={faCircleCheck} />
              </div>
            </div>

            <div className="title-item">
              <h5>Secure storage</h5>
            </div>

            <div className="describe-item">
              <p>Digital assets are stoped securely in our offline storage. They're protected from hacking attempts.</p>
            </div>
          </div>
          <div className="item-list-mid">
            <div className="icon-item">
              <div className="icon-item-container-mid">
                <FontAwesomeIcon icon={faWallet} />
              </div>
            </div>

            <div className="title-item">Easy transactions</div>

            <div className="describe-item">Sending & receiving cryptocurrency has never been easier. Make transactions with just a few clicks.</div>
          </div>
          <div className="item-list">
            <div className="icon-item">
              <div className="icon-item-container">
                <FontAwesomeIcon icon={faChildReaching} />
              </div>
            </div>

            <div className="title-item">User-friendly interface</div>

            <div className="describe-item">Sending & receiving cryptocurrency has never been easier. Make transactions with just a few clicks.</div>
          </div>
          <div className="item-list">
            <div className="icon-item">
              <div className="icon-item-container">
                <FontAwesomeIcon icon={faRepeat} />
              </div>
            </div>

            <div className="title-item">Exchange integration</div>

            <div className="describe-item">Our platform afhoufezbfoezbf, zoufouzef, azoifhauzfgo, eofezubezgzg.</div>
          </div>
        </div>
      </div>

      <div className="home-section-3">
        <Fade direction="left" delay={500} triggerOnce={true}>
          <div className="container-zone-1">
            <div className="zone-1-left">
              <div className="zone-1-container">
                <div className="zone-1-title">
                  <h3>Trusted By Millions</h3>
                </div>
                <div className="zone-1-p">
                  <p>Over 4.9 million downloads and a 4.5/5 star rating or higher across more than 84,000 reviews.</p>
                </div>
                <div className="zone-1-p">
                  <p>The Crypto App is your ultimate resource for all things crypto, including coin tracking, analysis, news and much more.</p>
                </div>
              </div>
            </div>
            <div className="zone-1-right"></div>
          </div>
        </Fade>
        <Reveal keyframes={customAnimation} delay={500} triggerOnce={true}>
          <div className="container-zone-2">
            <div className="zone-2-left"></div>
            <div className="zone-2-right">
              <div className="zone-2-container">
                <div className="zone-2-title">
                  <h3>Coin Tracker</h3>
                </div>

                <div className="zone-2-container-list">
                  <div className="zone-2-list">
                    <h5>Customizable Crypto Watch Lists</h5>
                    <p>Keep track of your own portfolio and monitor over 10,000 coins across 100+ exchanges.</p>
                  </div>

                  <div className="zone-2-list">
                    <h5>Complete Coin Performance Overview</h5>
                    <p>Follow the latest market trends in real-time in one place.</p>
                  </div>

                  <div className="zone-2-list">
                    <h5>Advanced and Dynamic Charting</h5>
                    <p>Set up technical indicators and conduct market analysis.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Fade direction="left" delay={500} triggerOnce={true}>
          <div className="container-zone-3">
            <div className="zone-3-left">
              <div className="zone-3-container">
                <div className="zone-3-title">
                  <h3>Portfolio Manager</h3>
                </div>

                <div className="zone-3-container-list">
                  <div className="zone-3-list">
                    <h5>Connect Exchange Accounts</h5>
                    <p>Check your balance across different exchanges on the go using API keys.</p>
                  </div>

                  <div className="zone-3-list">
                    <h5>Connect Public Addresses</h5>
                    <p>Track your external wallet balances across different blockchains – BTC, ERC20, Polygon, Binance Smart Chain, and many more.</p>
                  </div>

                  <div className="zone-3-list">
                    <h5>Customize Manually</h5>
                    <p>Manually enter the number of coins you own and track your portfolio balance easily.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="zone-3-right"></div>
          </div>
        </Fade>
        <Reveal keyframes={customAnimation} delay={500} triggerOnce={true}>
          <div className="container-zone-4 animate-on-scroll" id="zone-4">
            <div className="zone-4-left"></div>
            <div className="zone-4-right">
              <div className="zone-4-container">
                <div className="zone-4-title">
                  <h3>News</h3>
                </div>

                <div className="zone-4-container-list">
                  <div className="zone-4-list">
                    <h5>Stay Up-to-date</h5>
                    <p>Be the first to know what is moving & shaking the markets.</p>
                  </div>

                  <div className="zone-4-list">
                    <h5>Personalize Your News Feed</h5>
                    <p>Receive the latest news about your selected coins.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
        <Fade direction="left" delay={500} triggerOnce={true}>
          <div className="container-zone-5 animate-on-scroll" id="zone-5">
            <div className="zone-5-left">
              <div className="zone-5-container">
                <div className="zone-5-title">
                  <h3>Widgets</h3>
                </div>

                <div className="zone-5-container-list">
                  <div className="zone-5-list">
                    <h5>Stay Updated From Your Home Screen</h5>
                    <p>Receive price notifications without opening the app.</p>
                  </div>

                  <div className="zone-5-list">
                    <h5>Fully Customizable Widgets</h5>
                    <p>
                      Only display what you need on your home screen. Conveniently track your favorite token charts, the latest crypto news, market cap data and
                      more.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="zone-5-right"></div>
          </div>
        </Fade>

        <Reveal keyframes={customAnimation} delay={500} triggerOnce={true}>
          <div className="container-zone-6 animate-on-scroll" id="zone-6">
            <div className="zone-6-left"></div>
            <div className="zone-6-right">
              <div className="zone-6-container">
                <div className="zone-6-title">
                  <h3>Alerts</h3>
                </div>

                <div className="zone-6-container-list">
                  <div className="zone-6-list">
                    <h5>Follow Price Movements</h5>
                    <p>Set up custom alerts, get notified, and never miss an opportunity.</p>
                  </div>

                  <div className="zone-6-list">
                    <h5>Customize Alerts</h5>
                    <p>Personalize your alerts so they trigger around the specific tokens and events you want.</p>
                  </div>

                  <div className="zone-6-list">
                    <h5>Push Notifications</h5>
                    <p>Never miss any market action, even when the app is closed.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="home-footer">
          <div className="footer-left">
            <div className="footer-title">
              <h5>
                We are at <span>your service !</span>{" "}
              </h5>
            </div>

            <div className="footer-p">
              <p>Need more help? Don't hesitate to contact us! We're here to help at any time. Send us a message and we'll get back to you promptly.</p>
            </div>

            <div className="footer-contact">
              <div className="footer-tel">
                <FontAwesomeIcon icon={faPhone} />
                <p>+33 07 87 46 37 37</p>
              </div>

              <div className="footer-mail">
                <FontAwesomeIcon icon={faEnvelope} />
                <p>CoinMarketCap@company.com</p>
              </div>
            </div>
          </div>

          <div className="footer-right">
            <div className="form-footer-right">
              <form className="footer-form">
                <div className="footer-form-input">
                  <label for="name">Full name</label>
                  <input type="text" name="name" placeholder="Your name" />
                </div>

                <div className="footer-form-input">
                  <label for="mail">Email</label>
                  <input type="mail" name="mail" placeholder="example@company.com" />
                </div>
                <div className="footer-form-input">
                  <label for="phone">Phone number</label>
                  <input type="number" name="phone" placeholder="+33 07 97 35 37 25" />
                </div>
                <div className="footer-button">
                  <button type="">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeV2;
