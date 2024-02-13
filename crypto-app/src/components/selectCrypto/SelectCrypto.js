import { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

const SelectCrypto = ({ name, onChange, classes }) => {
  const { t, i18n } = useTranslation();

  const [listName, setListName] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredOptions = listName.filter((option) => option.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const coinList = async () => {
    try {
      const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 100,
          page: 1,
        },
      });
      const data = response.data;
      const coinNames = data.map((coin) => ({
        name: coin.name,
        coinId: coin.id,
        symbol: coin.symbol.toUpperCase(),
        image: coin.image,
      }));
      setListName(coinNames);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    coinList();
  }, []);

  return (
    <div className={classes.selectWrapper}>
      <label htmlFor="name">{t("Asset name")}</label>

      <input className={classes.searchInput} type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Search..." />

      <select
        className={classes.selectCrypto}
        id="name"
        value={name}
        //   onChange={(e) => setName(e.target.value)}
        onChange={onChange}
        size={listName.length}
      >
        <option value="" className="selectOneModal">
          Select one
        </option>
        {listName.length > 0 &&
          filteredOptions.map((coin) => (
            <option
              key={coin.coinId}
              value={coin.coinId}
              style={{
                backgroundImage: `url(${coin.image})`,
              }}
            >
              {coin.name}
            </option>
          ))}
      </select>
    </div>
  );
};

export default SelectCrypto;
