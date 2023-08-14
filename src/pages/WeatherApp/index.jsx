import { useEffect, useState } from 'react';
import API from './api';
import { Carousel, CarouselItem } from './Carousel';
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

function ObjectToArray(target) {
  return Object.keys(target).map((time) => ({
    time,
    ...target[time],
  }));
}

export default function WeatherApp() {
  const [result, setResult] = useState([]);
  const [isDebugMode, setDebugMode] = useState(false);
  const [currentLoactaion, setLocation] = useState(locations[0]);

  useEffect(() => {
    const promiseQueue = [
      API.hr36({ locationName: currentLoactaion }),
      API.oneweek({ locationName: currentLoactaion }),
    ];

    Promise.all(promiseQueue).then((res) => {
      setResult(res.map(ObjectToArray));
    });
  }, [currentLoactaion]);
  return (
    <div>
      <h1 className="text-2xl font-bold">天氣 APP</h1>
      <div className="flex py-2">
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
        <input
          type="checkbox"
          className="checkbox"
          value={isDebugMode}
          onChange={() => {
            setDebugMode(!isDebugMode);
          }}
        />
        debug mode
      </div>
      {result.length === 0 || (
        <Carousel>
          <CarouselItem>
            <div className="flex justify-center items-center p-5 text-slate-700">
              <div className="px-10">
                <div className="text-5xl font-bold">
                  {result[0][0].MaxT === result[0][0].MinT ? result[0][0].MaxT : `${result[0][0].MaxT}~${result[0][0].MinT}`}
                  <sup className="text-4xl align-super top-0">°C</sup>
                </div>
                <div className="text-lg font-bold">{result[0][0].Wx}</div>
                <div className="text-gray-400">{result[0][0].CI}</div>
              </div>
              <div className="svg-responsive" title={result[0][0].Wx}>
                <WeatherIcon name={result[0][0].Wx} size="xxl" />
              </div>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="flex items-center h-full">
              <div className="flex flex-wrap flex-1">
                {result[0].map((info) => (
                  <div
                    className="flex flex-col items-center flex-1 text-center px-2 py-3 relative group hover:bg-slate-100 rounded-md duration-300"
                    key={info.time}
                  >
                    <div className="text-md text-slate-500">{info.time.split(' ')[0]}</div>
                    <div className="text-lg font-bold">{info.time.split(' ')[1]}</div>
                    <div className="svg-responsive py-2" title={info.Wx}>
                      <WeatherIcon name={info.Wx} size="md" />
                    </div>
                    <div className="text-sm text-slate-400 group-hover:text-slate-800 group-hover:font-bold duration-300">
                      <div>
                        降雨率：
                        {info.PoP !== ' ' ? `${info.PoP}%` : '--'}
                      </div>
                      <div>
                        溫度：
                        {`${info.MaxT}~${info.MinT}`}
                        <sup>°C</sup>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {isDebugMode && <pre className="code-panel">{printObj(result[0])}</pre>}
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="flex items-center h-full">
              <div className="flex flex-wrap flex-1">
                {result[1].map((info) => (
                  <div
                    className="flex flex-col items-center flex-1 text-center px-2 py-3 relative group hover:bg-slate-100 rounded-md duration-300"
                    key={info.time}
                  >
                    <div className="text-lg font-bold">{info.time}</div>
                    <div className="svg-responsive py-2" title={info.Wx}>
                      <WeatherIcon name={info.Wx} size="md" />
                    </div>
                    <div className="text-sm text-slate-400 group-hover:text-slate-800 group-hover:font-bold duration-300">
                      <div>
                        降雨率：
                        {info.PoP12h !== ' ' ? `${info.PoP12h}%` : '--'}
                      </div>
                      <div>
                        溫度：
                        {info.T}
                        <sup>°C</sup>
                      </div>
                      <div>
                        濕度：
                        {info.RH}
                        %
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {isDebugMode && <pre className="code-panel">{printObj(result[1])}</pre>}
            </div>
          </CarouselItem>
        </Carousel>
      )}
    </div>
  );
}
