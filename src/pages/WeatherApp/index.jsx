import { useEffect, useState } from 'react';
import API from './api';
import Carousel from './Carousel';

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
  const [result, setResult] = useState({});
  const [currentLoactaion, setLocation] = useState(locations[0]);

  useEffect(() => {
    API.hr36({
      locationName: currentLoactaion,
    }).then((res) => {
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
      <pre>{printObj(result)}</pre>
      <Carousel>
        <div className="flex justify-between">
          <div>
            <h2 className="text-2xl font-bold">{result.Wx}</h2>
            <div className="text-gray-500">{result.CI}</div>
          </div>
          <div>icon</div>
        </div>
        <div>BABOO</div>
        <div>YEAH</div>
      </Carousel>

    </div>
  );
}
