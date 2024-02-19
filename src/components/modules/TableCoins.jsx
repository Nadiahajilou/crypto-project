import { RotatingLines } from "react-loader-spinner";
import styles from "./TableCoin.module.css";

import TableRow from "./TableRow";

function TableCoins({ coins, isLoading }) {
  console.log(coins);
  return (
    <div className={styles.container}>
      {isLoading ? (
        <RotatingLines strokeWidth="2" strokeColor="#3874ff" />
      ) : (
        <table className={styles.table}>
          {coins.length > 0 && (
            <thead>
              <tr>
                <th>Coin</th>
                <th>Name</th>
                <th>Price</th>
                <th>24h</th>
                <th>Total valume</th>
                <th></th>
              </tr>
            </thead>
          )}

          <tbody>
            {coins.map((coin) => (
              <TableRow coin={coin} key={coin.id} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TableCoins;
