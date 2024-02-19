import React, { useEffect } from "react";
import TableCoins from "../modules/TableCoins";
import { useState } from "react";
import { getCoinsList } from "../../services/cryptoApi";

function HomePage() {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getData = async () => {
      const res = await fetch(getCoinsList());
      const json = await res.json();
      setCoins(json);
      setIsLoading(false);
    };
    getData();
  }, []);
  return (
    <div>
      <TableCoins
        coins={coins}
        isLoading={isLoading}
       
      />
    </div>
  );
}

export default HomePage;
