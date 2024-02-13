import axios from "axios";
import react, { useState, useEffect } from "react";
import "./Spotlight.css";
import Navbar from "../../components/navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTrendUp, faArrowTrendDown } from "@fortawesome/free-solid-svg-icons";

const Spotlight = () => {
  const [categories, setCategories] = useState([]);
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    getSpotlightData();
  }, []);

  const getSpotlightData = async () => {
    let response = await axios.get("https://api.coingecko.com/api/v3/search/trending");
    let data = response.data;
    console.log(data);
    setCategories(data.categories);
    setCoins(data.coins);
  };
  console.log(categories);

  function formatNumber(number) {
    return number.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  let trendingCategories = categories.map((item, index) => {
    return (
      <tr key={index}>
        <td>
          <img src={item.data.sparkline} />
        </td>
        <td>{item.name}</td>
        <td>${formatNumber(item.data.market_cap)}</td>
        <td>${formatNumber(item.data.total_volume)}</td>
        <td>{item.data.market_cap_change_percentage_24h.usd.toFixed(2)}%</td>
      </tr>
    );
  });

  let trendingCoins = coins.map((item, index) => {
    return (
      <tr key={index}>
        <td>
          <img src={item.item.small} alt={item.name} />
        </td>
        <td>{item.item.name}</td>
        <td>{item.item.symbol.toUpperCase()}</td>
        <td>{item.item.data.price}</td>
        <td>{item.item.data.market_cap}</td>
        <td>
          <span className={`price-change ${item.item.data.price_change_percentage_24h.usd >= 0 ? "positive" : "negative"}`}>
            {item.item.data.price_change_percentage_24h.usd.toFixed(2)}%
          </span>
        </td>
      </tr>
    );
  });

  return (
    <div className="spotlight-container">
      <Navbar />

      <div className="spotlight-title">
        <p className="spotlight-p1">The Best Cryptos Based On The Latest Data</p>
        <p className="spotlight-p2">Our cryptocurrencies to watch lists are based on the latest price and user behavior data.</p>
      </div>

      <div className="trending-container">
        <div className="trending-categ">
          <h5>🔥 Trending Categories</h5>
          <table className="trending-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Market Cap</th>
                <th>Total Volume</th>
                <th>MktCap 24h</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? (
                trendingCategories
              ) : (
                <tr key="no-data">
                  <td colSpan="5">No trending categories for the moment</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="trending-coins">
          <h5>
            <FontAwesomeIcon icon={faArrowTrendUp} className="arrowUp" /> Most popular coins
          </h5>
          <table className="trending-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Symbol</th>
                <th>Price</th>
                <th>Market Cap</th>
                <th>MktCap 24h</th>
              </tr>
            </thead>
            <tbody>
              {coins.length > 0 ? (
                trendingCoins
              ) : (
                <tr key="no-data">
                  <td colSpan="7">No trending coins for the moment</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Spotlight;
