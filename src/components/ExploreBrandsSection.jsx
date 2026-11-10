import React from 'react';
import { BRANDS } from '../data/supplementsData';
import { useStore } from '../context/StoreContext';
import { ShieldCheck, ArrowRight, Sparkles, ExternalLink } from 'lucide-react';

export default function ExploreBrandsSection() {
  const { navigateToTab, setSearchQuery, theme } = useStore();
  const isDark = theme === 'dark';

  const handleBrandClick = (brandName) => {
    setSearchQuery(brandName);
    navigateToTab('supplements');
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-sky-500/20 text-sky-400 border border-sky-500/30 mb-2">
            <ShieldCheck className="w-4 h-4 text-sky-400" />
            <span>Official Authorized Partners</span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-slate-900 dark:text-white">
            Explore Our Brands
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
            We import 100% genuine supplements directly from world-renowned bodybuilding and sports nutrition manufacturers across the USA, UK, and Europe.
          </p>
        </div>

        <button
          onClick={() => navigateToTab('supplements')}
          className="mt-4 md:mt-0 inline-flex items-center gap-1.5 font-display font-bold text-xs uppercase tracking-wider text-sky-500 hover:text-sky-400 group"
        >
          <span>View All Brand Products</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* 18 Brands Grid matching the reference image */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
        {BRANDS.map((brand, idx) => (
          <div
            key={brand.id}
            onClick={() => handleBrandClick(brand.name)}
            className="group relative flex flex-col items-center justify-center p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-sky-500 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer min-h-[100px] sm:min-h-[110px]"
          >
            {/* Logo Image */}
            <div className="w-full h-14 flex items-center justify-center p-1">
              <img
                src={brand.logo}
                alt={brand.name}
                className="max-h-full max-w-full object-contain filter group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>

            {/* Quick Country / Origin Badge on Hover */}
            <div className="absolute inset-x-2 bottom-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-center pointer-events-none">
              <span className="text-[10px] font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200 shadow-xs inline-block line-clamp-1">
                {brand.country} • Shop Now →
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Trust Footer Note */}
      <div className={`mt-6 p-4 rounded-2xl border text-center flex flex-col sm:flex-row items-center justify-between gap-3 text-xs ${
        isDark 
          ? 'bg-slate-900/60 border-slate-800 text-slate-400' 
          : 'bg-sky-50/60 border-sky-200 text-slate-600'
      }`}>
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-sky-500 shrink-0" />
          <span>Every product from these brands arrives with verifiable holographic scratch seals and batch codes.</span>
        </div>
        <button
          onClick={() => navigateToTab('about')}
          className="text-sky-500 hover:text-sky-400 font-bold underline shrink-0"
        >
          Read Our Authenticity Guarantee
        </button>
      </div>
    </section>
  );
}


