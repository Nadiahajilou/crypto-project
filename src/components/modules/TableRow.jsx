import chartUp from "../../assets/chart-up.svg";
import chartDown from "../../assets/chart-down.svg";
import styles from "./TableCoin.module.css";
import { useState } from "react";
import { useEffect } from "react";
import { marketChart } from "../../services/cryptoApi";

const TableRow = ({
  // coin: {
  //   id,
  //   name,
  //   image,
  //   symbol,
  //   total_volume,
  //   current_price,
  //   price_change_percentage_24h,
  // }
  coin,
  currency,
  setChart,
}) => {
  const {
    id,
    name,
    image,
    symbol,
    total_volume,
    current_price,
    price_change_percentage_24h,
  } = coin; //destructe

  const [currencySymbol, setCurrencySymbol] = useState("$");

  const showHandler = async () => {
    try {
      const res = await fetch(marketChart(id));
      const json = await res.json();
      console.log(json);
      setChart({ ...json, coin });
    } catch (error) {
      setChart(null);
    }
  };
  useEffect(() => {
    // بر اساس مقدار currency تنظیم مقدار currencySymbol
    switch (currency) {
      case "usd":
        setCurrencySymbol("$");
        break;
      case "eur":
        setCurrencySymbol("€");
        break;
      case "jpy":
        setCurrencySymbol("¥");
        break;
      default:
        setCurrencySymbol("$");
        break;
    }
  }, [currency]);

  return (
    <tr>
      <td>
        <div className={styles.symbol} onClick={showHandler}>
          <img src={image} alt="" />
          <span> {symbol.toUpperCase()}</span>
        </div>
      </td>
      <td>{name}</td>
      <td>
        {currencySymbol}
        {current_price.toLocaleString()}
      </td>
      <td
        className={
          price_change_percentage_24h > 0 ? styles.success : styles.error
        }
      >
        {price_change_percentage_24h.toFixed(2)}%
      </td>
      <td>{total_volume.toLocaleString()}</td>
      <td>
        <img src={price_change_percentage_24h > 0 ? chartUp : chartDown} />
      </td>
    </tr>
  );
};

export default TableRow;
