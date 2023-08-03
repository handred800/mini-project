import Icon from './Icon';

const table = new Proxy({
  多雲: 'Cloudy',
  陰時多雲: 'Cloudy',
  多雲短暫陣雨: 'Cloudy',
  多雲短暫陣雨或雷雨: 'Cloudy',
  多雲午後短暫雷陣雨: 'Cloudy',
  多雲時陰短暫陣雨或雷雨: 'Cloudy',
  陰時多雲短暫陣雨或雷雨: 'Cloudy',
  多雲時陰陣雨或雷雨: 'CloudRain',
  陰時多雲短暫陣雨: 'CloudRain',
  陰短暫陣雨或雷雨: 'CloudRain',
  陰陣雨或雷雨: 'CloudRain',
  陰短暫陣雨: 'CloudRain',
  陰時多雲陣雨或雷雨: 'CloudRain',
  晴時多雲偶陣雨: 'CloudSunRain',
  晴時多雲: 'CloudSun',
  多雲時晴: 'CloudSun',
  晴: 'Sun',
  晴午後短暫雷陣雨: 'Sun',
}, {
  get: (obj, propName) => (propName in obj ? obj[propName] : 'HelpCircle'),
});

const sizeTable = {
  xxl: 250,
  md: 60,
  xs: 14,
};

export default function WeatherIcon({ name, size }) {
  return <Icon name={table[name]} size={sizeTable[size]} color="#cbd4e1" />;
}
