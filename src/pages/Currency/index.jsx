import { useState, useEffect } from 'react';

export default function Currency() {
  const [currencyList] = useState(['twd', 'jpy', 'usd', 'hkd', 'krw', 'cny', 'btc']);
  const [fromCurrency, setFrom] = useState(currencyList[0]);
  const [toCurrency, setTo] = useState(currencyList[1]);
  const [rate, setRate] = useState(null);
  const [isRevert, setRevert] = useState(false);
  const [currentVal, setCurrentVal] = useState(1);

  useEffect(() => {
    const current = isRevert ? [toCurrency, fromCurrency] : [fromCurrency, toCurrency];
    const apiEndpoint = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${current[0]}/${current[1]}.json`;
    setRate(null);
    fetch(apiEndpoint)
      .then((res) => res.json())
      .then((data) => {
        setRate(data[current[1]]);
      });
  }, [fromCurrency, toCurrency, isRevert, setRate]);

  return (
    <div>
      <form className="flex py-2">
        <input
          className="input-text flex-auto"
          type="number"
          min={1}
          value={currentVal}
          onChange={(e) => setCurrentVal(e.target.value)}
        />
        <select
          id=""
          className="border p-2"
          value={fromCurrency}
          onChange={(e) => {
            setFrom(e.target.value);
          }}
          disabled={isRevert}
        >
          {currencyList.map((currencyName) => (
            <option key={currencyName} value={currencyName}>
              {currencyName}
            </option>
          ))}
        </select>
        <div className="p-2">
          =
          {rate ? rate * currentVal : '資料讀取中...'}
        </div>
        <select
          id=""
          className="border p-2"
          value={toCurrency}
          onChange={(e) => {
            setTo(e.target.value);
          }}
          disabled={isRevert}
        >
          {currencyList.map((currencyName) => (
            <option key={currencyName} value={currencyName}>
              {currencyName}
            </option>
          ))}
        </select>
        <input type="checkbox" value={isRevert} onChange={() => setRevert(!isRevert)} />
      </form>
    </div>
  );
}
