const DOMAIN = import.meta.env.VITE_API_DOMAIN;
const KEY = import.meta.env.VITE_WEATHER_API_KEY;

const dictionary = {
  PoP12h: '12小時降雨機率',
  Wx: '天氣現象',
  T: '溫度',
  RH: '相對濕度',
  CI: '舒適度指數',
};

function paramsObjToQueryString(paramsObj) {
  const keys = Object.keys(paramsObj);
  return keys.reduce((acc, current) => `${acc}&${current}=${paramsObj[current]}`, '');
}

function fetchWrapper(endpointPath, paramsObj) {
  return fetch(`${DOMAIN}${endpointPath}?Authorization=${KEY}${paramsObjToQueryString(paramsObj)}`)
    .then((res) => res.json())
    .then((data) => data);
}

const API = {
  hr36(params) {
    return fetchWrapper('/F-C0032-001', params).then((data) => {
      const infos = data.records.location[0].weatherElement;
      return infos.reduce((acc, current) => {
        acc[current.elementName] = current.time[0].parameter.parameterName;
        return acc;
      }, {});
    });
  },
  day2(params) {
    const mergedParams = Object.assign(params, { elementName: ['Wx', 'PoP12h', 'T', 'RH', 'CI'] });
    return fetchWrapper('/F-D0047-089', mergedParams).then((data) => {
      const infos = data.records.locations[0].location[0].weatherElement;
      return infos.reduce((acc, current) => {
        acc[current.elementName] = current.time[0].elementValue[0].value;
        return acc;
      }, {});
    });
  },
};

export default API;
