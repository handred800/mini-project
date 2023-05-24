import { useEffect, useMemo, useState } from 'react';
import ModeA from './ModeA';
import ModeB from './ModeB';

export default function Currency() {
  const [bucketList, setBucketList] = useState(null);
  const [newCurrency, setNewCurrency] = useState('');
  const [currencyList, setList] = useState(['twd', 'jpy', 'usd', 'eur', 'hkd', 'krw', 'cny', 'btc']);
  const [currentMode, setMode] = useState(1);

  const excludeExistList = useMemo(() => {
    if (!bucketList) return [];
    return bucketList.filter((currencyName) => !currencyList.includes(currencyName));
  }, [bucketList, currencyList]);

  useEffect(() => {
    fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.min.json')
      .then((res) => res.json())
      .then((data) => {
        setBucketList(Object.keys(data));
      });
  }, []);

  function addCurrency() {
    if (newCurrency.trim() === '') return;
    if (currencyList.includes(newCurrency)) return;
    if (!bucketList.includes(newCurrency)) return;
    setList([...currencyList, newCurrency]);
    setNewCurrency('');
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">貨幣轉換</h1>
      <div className="flex py-2">
        <div className="inline-flex mr-2">
          <input className="input-text" list="currency" placeholder="填寫貨幣代號" value={newCurrency} onChange={(e) => setNewCurrency(e.target.value)} />
          <datalist id="currency">
            {excludeExistList.map((item) => (<option key={item} value={item}>{item}</option>))}
          </datalist>
          <button type="button" className="btn" onClick={addCurrency}>新增</button>
        </div>
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
