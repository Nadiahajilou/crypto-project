import React, { useEffect, useState } from "react";
import { searchCoins } from "../../services/cryptoApi";
import { RotatingLines } from "react-loader-spinner";
import styles from "./search.module.css";

function Search({ currency, setCurrency }) {
  const [text, setText] = useState("");
  const [coins, setCoins] = useState([]); //coin haye search shude
  const [loading, setloading] = useState(false); //coin haye search shude

  useEffect(() => {
    const controller = new AbortController();
    setCoins([]); //baraye khali kardan state coin vaghti input khali mishe
    if (!text) {
      setloading(false);
      return;
    }

    const search = async () => {
      try {
        const res = await fetch(searchCoins(text), {
          signal: controller.signal,
        });
        const json = await res.json();
        console.log(json);
        if (json.coins) {
          setloading(false);
          setCoins(json.coins);
        } else {
          alert(json.status.error_message);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          alert(error.message);
        }
      }
    };
    setloading(true);
    search();
    return () => controller.abort(); //controller darkhast ghabli ro barmidare
  }, [text]);
  return (
    <div className={styles.searchBox}>
      <input
        type="text"
        placeholder="search"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
        <option value="usd">USD</option>
        <option value="eur">EUR</option>
        <option value="jpy">JPY</option>
      </select>
      {/* !! baraye inke coins.length bolean beshe  */}
      {(!!coins.length || loading) && (
        <div className={styles.searchResult}>
          {loading && (
            <RotatingLines
              width="50px"
              height="50px"
              strokeWidth="2"
              strokeColor="#3874ff"
            />
          )}
          <ul>
            {coins.map((coin) => (
              <li id={coin.id}>
                <img src={coin.thumb} alt={coin.name} />
                <p>{coin.name}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Search;
