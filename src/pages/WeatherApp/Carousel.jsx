import { useMemo, useState } from 'react';

export function Carousel({ children }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const pagination = useMemo(() => Array.from(Array(children.length).keys()), [children]);
  return (
    <div className="card">
      <div className="overflow-hidden">
        <div className="flex duration-300" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
          {children}
        </div>
      </div>
      <div className="flex justify-center">
        {pagination.map((val, i) => (
          <button
            type="button"
            onClick={() => setActiveIndex(i)}
            key={val}
            className={`block rounded-xl w-3 h-3 mx-1 bg-slate-300 ease-in-out duration-300 text-[0px] ${
              activeIndex === i && '!w-5 bg-slate-600'
            } `}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export function CarouselItem({ children }) {
  return <div className="flex-[1_0_100%]">{children}</div>;
}
