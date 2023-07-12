import React, { useState } from 'react';
import CarouselItem from './CarouselItem';

export default function Carousel({ children }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [totalCount] = useState(React.Children.count(children));
  return (
    <div className="card">
      <div className="overflow-hidden">
        <div className="flex duration-300" style={{ transform: `translateX(-${(activeIndex) * 100}%)` }}>
          {React.Children.map(children, (child) => (
            <CarouselItem>{child}</CarouselItem>
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        {React.Children.map(children, (child, i) => (
          <button
            type="button"
            onClick={() => setActiveIndex(i)}
            className={`block rounded-xl w-3 h-3 mx-1 bg-slate-300 ease-in-out duration-300 text-[0px] ${activeIndex === i && '!w-5 bg-slate-600'} `}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
