import { useState, useEffect } from 'react';

export default function Currency(props) {
  const { currencyList } = props;
  const [fromCurrency, setFrom] = useState(currencyList[0]);
  const [toCurrency, setTo] = useState(currencyList[1]);
  const [rate, setRate] = useState(null);
  const [currentVal, setCurrentVal] = useState(1);
  const [isRounded, setRounded] = useState(false);

  function swapFromTo() {
    const tempFrom = fromCurrency;
    const tempTo = toCurrency;
    setFrom(tempTo);
    setTo(tempFrom);
  }

  function result() {
    if (!rate) return '資料讀取中...';
    return isRounded ? Math.round(rate * currentVal * 100) / 100 : rate * currentVal;
  }

  useEffect(() => {
    const apiEndpoint = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${fromCurrency}/${toCurrency}.json`;
    setRate(null);
    fetch(apiEndpoint)
      .then((res) => res.json())
      .then((data) => {
        setRate(data[toCurrency]);
      });
  }, [fromCurrency, toCurrency]);

  return (
    <div>
      <form>
        <div className="flex">
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
          <svg
            className="w-6 h-6 mt-3 mx-2 inline-block cursor-pointer"
            onClick={swapFromTo}
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="#000">
              <path
                d="M2.688,6.716 C3.011,7.031 3.535,7.031 3.858,6.716 L3.858,4.992 L13.499,4.992 C14.327,4.992 14.999,4.332 14.999,3.52 C14.999,2.708 14.327,2.048 13.499,2.048 L3.858,2.048 L3.858,0.249 C3.535,-0.068 3.011,-0.068 2.688,0.249 L0.208,2.957 C-0.115,3.273 -0.115,3.785 0.208,4.103 L2.688,6.716 L2.688,6.716 Z"
                className="si-glyph-fill"
              />
              <path
                d="M14.758,9.83 L12.185,7.292 C11.862,6.972 11.338,6.972 11.014,7.292 L11.014,9.023 L1.583,9.023 C0.755,9.023 0.083,9.687 0.083,10.504 C0.083,11.321 0.755,11.985 1.583,11.985 L11.014,11.985 L11.014,13.717 C11.338,14.035 11.862,14.035 12.185,13.717 L14.758,11.179 C15.08,10.861 15.08,10.148 14.758,9.83 L14.758,9.83 Z"
                className="si-glyph-fill"
              />
            </g>
          </svg>
          <select
            id=""
            className="border p-2"
            value={toCurrency}
            onChange={(e) => {
              setTo(e.target.value);
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
        <code className="flex items-center py-2">
          <div className="pr-5">
            <input
              className="input-text"
              type="number"
              min={1}
              value={currentVal}
              onChange={(e) => setCurrentVal(e.target.value)}
            />
            <strong className="ml-2">{fromCurrency}</strong>
          </div>
          <svg className="w-6 h-6 inline-block" xmlns="http://www.w3.org/2000/svg">
            <polyline
              data-name="Right"
              fill="none"
              id="Right-2"
              points="16.4 7 21.5 12 16.4 17"
              stroke="#000000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />

            <line
              fill="none"
              stroke="#000000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              x1="2.5"
              x2="19.2"
              y1="12"
              y2="12"
            />
          </svg>
          <div className="px-5">
            {result()}
            <strong className="ml-2">{toCurrency}</strong>
          </div>
        </code>
      </form>
    </div>
  );
}
