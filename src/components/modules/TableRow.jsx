import chartUp from "../../assets/chart-up.svg";
import chartDown from "../../assets/chart-down.svg";
import styles from "./TableCoin.module.css";
import { useState } from "react";
import { useEffect } from "react";

const TableRow = ({ coin, currency }) => {
  const [currencySymbol, setCurrencySymbol] = useState("$");
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
        <div className={styles.symbol}>
          <img src={coin.image} alt="" />
          <span> {coin.symbol.toUpperCase()}</span>
        </div>
      </td>
      <td>{coin.name}</td>
      <td>
        {currencySymbol}
        {coin.current_price.toLocaleString()}
      </td>
      <td
        className={
          coin.price_change_percentage_24h > 0 ? styles.success : styles.error
        }
      >
        {coin.price_change_percentage_24h.toFixed(2)}%
      </td>
      <td>{coin.total_volume.toLocaleString()}</td>
      <td>
        <img src={coin.price_change_percentage_24h > 0 ? chartUp : chartDown} />
      </td>
    </tr>
  );
};

export default TableRow;
