import { useState } from 'react';
import ModeA from './ModeA';
import ModeB from './ModeB';

export default function Currency() {
  const [currencyList, setList] = useState(['twd', 'jpy', 'usd', 'eur', 'hkd', 'krw', 'cny', 'btc']);
  const [currentMode, setMode] = useState(1);

  return (
    <div>
      <h1 className="text-2xl font-bold">貨幣轉換</h1>
      <div className="py-2">
        <select
          onChange={(e) => {
            setMode(parseInt(e.target.value, 10));
          }}
          className="border p-2"
        >
          <option value="1">雙向轉換</option>
          <option value="2">一對多顯示</option>
        </select>
      </div>
      <div className="card">
        {
          currentMode === 1
            ? <ModeA currencyList={currencyList} />
            : <ModeB currencyList={currencyList} />
        }
      </div>
    </div>
  );
}
