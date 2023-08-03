import { icons } from 'lucide-react';

export default function Icon({ name, size, color }) {
  const WeatherIcon = icons[name];
  return <WeatherIcon size={size} color={color || '#0E121E'} />;
}
