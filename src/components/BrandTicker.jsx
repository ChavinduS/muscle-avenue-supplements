import React from 'react';
import { BRANDS } from '../data/supplementsData';
import { useStore } from '../context/StoreContext';
import { ShieldCheck } from 'lucide-react';

export default function BrandTicker() {
  const { theme, navigateToTab, setSearchQuery } = useStore();
  const isDark = theme === 'dark';

  const handleBrandClick = (brandName) => {
    setSearchQuery(brandName);
    navigateToTab('supplements');
  };

  // Duplicate for smooth seamless loop
  const tickerList = [...BRANDS, ...BRANDS];

  return (
    <div className={`relative w-full py-3.5 border-y overflow-hidden transition-colors ${
      isDark 
        ? 'bg-slate-900/90 border-slate-800' 
        : 'bg-slate-100/95 border-slate-200'
    }`}>
      {/* Label tag */}
      <div className="absolute left-0 top-0 bottom-0 z-20 hidden lg:flex items-center px-4 bg-gradient-to-r from-sky-600 via-sky-600 to-transparent pr-8 text-white font-display text-xs font-black uppercase tracking-wider shadow-sm">
        <ShieldCheck className="w-4 h-4 mr-1.5 text-white animate-pulse" />
        Authorized Brands
      </div>

      {/* Gradient masks for smooth fade on sides */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-950 via-slate-950/80 to-transparent z-10 pointer-events-none" />

      {/* Continuous marquee */}
      <div className="flex w-max pause-marquee items-center">
        <div className="flex items-center gap-4 sm:gap-6 animate-marquee whitespace-nowrap pl-4">
          {tickerList.map((brand, idx) => (
            <div
              key={`${brand.id}-${idx}`}
              onClick={() => handleBrandClick(brand.name)}
              title={`View ${brand.name} Supplements`}
              className="flex items-center justify-center p-2 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300 cursor-pointer h-16 w-36 sm:w-40 shrink-0 group select-none"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="max-h-12 max-w-full object-contain filter group-hover:brightness-105 transition-all"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

