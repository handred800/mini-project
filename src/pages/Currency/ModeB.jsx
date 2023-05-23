import { useState, useEffect, useMemo } from 'react';

export default function Currency(props) {
  const { currencyList } = props;
  const [fromCurrency, setFrom] = useState(currencyList[0]);
  const [rateList, setRateList] = useState(null);
  const [currentVal, setCurrentVal] = useState(1);
  const [isRounded, setRounded] = useState(false);

  const currencyListExcludeFrom = useMemo(
    () => currencyList.filter((currencyName) => currencyName !== fromCurrency),
    [fromCurrency, currencyList],
  );

  function result(currencyName) {
    if (!rateList) return '資料讀取中...';
    if (!rateList[currencyName]) return null;
    return isRounded
      ? Math.round(rateList[currencyName] * currentVal * 100) / 100
      : rateList[currencyName] * currentVal;
  }

  useEffect(() => {
    const apiEndpoint = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${fromCurrency}.json`;
    setRateList(null);
    fetch(apiEndpoint)
      .then((res) => res.json())
      .then((data) => {
        const list = data[fromCurrency];
        const newRateList = currencyListExcludeFrom.reduce((acc, current) => {
          acc[current] = list[current];
          return acc;
        }, {});
        setRateList(newRateList);
      });
  }, [fromCurrency, currencyListExcludeFrom]);

  return (
    <div>
      <form>
        <div className="flex">
          <input
            className="input-text"
            type="number"
            min={1}
            value={currentVal}
            onChange={(e) => setCurrentVal(e.target.value)}
          />
          <select
            className="border p-2"
            value={fromCurrency}
            onChange={(e) => {
              setFrom(e.target.value);
            }}
          >
            {currencyList.map((currencyName) => (
              <option key={currencyName} value={currencyName}>
                {currencyName}
              </option>
            ))}
          </select>
          <input
            id="isRounded"
            type="checkbox"
            className="checkbox"
            title="到小數後2位"
            onChange={() => {
              setRounded(!isRounded);
            }}
            value={isRounded}
          />
        </div>
        {currencyListExcludeFrom.map((toCurrency) => (
          <code className="flex p-2" key={toCurrency}>
            <strong className="mr-2">{toCurrency}</strong>
            {result(toCurrency)}
          </code>
        ))}
      </form>
    </div>
  );
}
