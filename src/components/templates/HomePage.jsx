import React, { useEffect } from "react";
import TableCoins from "../modules/TableCoins";
import { useState } from "react";
import { getCoinsList } from "../../services/cryptoApi";
import Paginations from "../modules/Paginations";
import Search from "../modules/Search";
import Chart from "../modules/Chart";

function HomePage() {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("USD");
  const [chart, setChart] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(getCoinsList(page, currency));
        const json = await res.json();
        setCoins(json);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [page, currency]);
  return (
    <div>
      <Search currency={currency} setCurrency={setCurrency} />
      <TableCoins coins={coins} isLoading={isLoading} currency={currency} setChart={setChart}/>
      <Paginations page={page} setPage={setPage} />
      {!!chart && <Chart chart={chart}  setChart={setChart}/>}
    </div>
  );
}

export default HomePage;
