import React, { useEffect } from "react";
import TableCoins from "../modules/TableCoins";
import { useState } from "react";
import { getCoinsList } from "../../services/cryptoApi";
import Paginations from "../modules/Paginations";


function HomePage() {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(getCoinsList(page));
      const json = await res.json();
      setCoins(json);
      setIsLoading(false);
    };
    getData();
  }, [page]);
  return (
    <div>
        <Paginations page={page} setPage={setPage} />
      <TableCoins
        coins={coins}
        isLoading={isLoading}
       
      />
      
    </div>
  );
}

export default HomePage;
