import { useEffect, useMemo, useState } from 'react';
import API from './api';
import Carousel from './Carousel';
import WeatherIcon from './WeatherIcon';

const locations = [
  '宜蘭縣',
  '花蓮縣',
  '臺東縣',
  '澎湖縣',
  '金門縣',
  '連江縣',
  '臺北市',
  '新北市',
  '桃園市',
  '臺中市',
  '臺南市',
  '高雄市',
  '基隆市',
  '新竹縣',
  '新竹市',
  '苗栗縣',
  '彰化縣',
  '南投縣',
  '雲林縣',
  '嘉義縣',
  '嘉義市',
  '屏東縣',
];

function printObj(obj) {
  return JSON.stringify(obj, null, 2);
}

export default function WeatherApp() {
  const [result, setResult] = useState([]);
  const [currentLoactaion, setLocation] = useState(locations[0]);

  useEffect(() => {
    const promiseQueue = [
      API.hr36({ locationName: currentLoactaion }),
      API.oneweek({ locationName: currentLoactaion }),
    ];

    Promise.all(promiseQueue).then((res) => {
      setResult(res);
    });
  }, [currentLoactaion]);
  return (
    <div>
      <h1 className="text-2xl font-bold">天氣 APP</h1>
      <select
        className="border p-2"
        name=""
        id=""
        onChange={(e) => {
          setLocation(e.target.value);
        }}
        value={currentLoactaion}
      >
        {locations.map((name) => (
          <option value={name} key={name}>
            {name}
          </option>
        ))}
      </select>
      {result.length === 0 || (
        <Carousel>
          <div className="flex items-center py-10 px-20 text-slate-700">
            <div className="flex-1">
              <div className="text-7xl font-bold">
                {result[0].MaxT}
                <sup className="text-4xl align-super top-0">°C</sup>
              </div>
              <div className="text-lg font-bold">{result[0].Wx}</div>
              <div className="text-gray-400">{result[0].CI}</div>
              <details className="cursor-pointer opacity-0 hover:opacity-100">
                <pre>{printObj(result[0])}</pre>
              </details>
            </div>
            <div>
              <WeatherIcon name={result[0].Wx} size="xxl" />
            </div>
          </div>
          <div>
            <pre>{printObj(result[1])}</pre>
          </div>
          <div>YEAH</div>
        </Carousel>
      )}
    </div>
  );
}
