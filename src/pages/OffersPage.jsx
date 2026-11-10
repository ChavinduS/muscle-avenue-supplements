import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import { 
  Tag, 
  Flame, 
  Clock, 
  Percent, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  ArrowRight,
  Filter
} from 'lucide-react';

export default function OffersPage() {
  const { products, theme, navigateToTab } = useStore();
  const isDark = theme === 'dark';

  // Live countdown timer for Flash Offers
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 38,
    seconds: 45
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Filter only products with offer prices
  const offerProducts = products.filter(p => p.offerPrice && p.offerPrice < p.price);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Mega Offers Banner with Countdown */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-950 via-slate-900 to-blue-950 border-2 border-red-500/50 p-8 md:p-12 shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600 text-white font-black text-xs uppercase tracking-wider shadow-md animate-pulse">
            <Flame className="w-4 h-4 fill-white text-red-600" />
            <span>Exclusive Flash Offers & Bundles</span>
          </div>

          <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white leading-tight">
            MEGA SUPPLEMENTS SALE & PROMOS
          </h1>

          <p className="text-sm md:text-base text-slate-300 max-w-xl leading-relaxed">
            Save up to 30% on original imported Whey Proteins, Creatines, Pre-Workouts and Gym Accessories. All offers include live stock counts and Koko Pay 3-installment eligibility!
          </p>

          {/* Flash Deal Countdown */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-sky-400" />
              Flash Promo Ends In:
            </span>
            <div className="flex items-center gap-2 font-mono font-black text-sm sm:text-base">
              <div className="px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-700 text-sky-400">
                {String(timeLeft.hours).padStart(2, '0')} <span className="text-[10px] text-slate-400 font-sans">HRS</span>
              </div>
              <span className="text-slate-500 font-bold">:</span>
              <div className="px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-700 text-sky-400">
                {String(timeLeft.minutes).padStart(2, '0')} <span className="text-[10px] text-slate-400 font-sans">MIN</span>
              </div>
              <span className="text-slate-500 font-bold">:</span>
              <div className="px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-700 text-sky-400">
                {String(timeLeft.seconds).padStart(2, '0')} <span className="text-[10px] text-slate-400 font-sans">SEC</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Offer Perks Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-500 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Percent className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-slate-900 dark:text-white">Genuine Slashed Prices</div>
            <div className="text-slate-600 dark:text-slate-400">Direct savings passed on from official importers.</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-500 dark:text-sky-400 flex items-center justify-center shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-slate-900 dark:text-white">Free Islandwide Delivery</div>
            <div className="text-slate-600 dark:text-slate-400">On all orders over Rs. 20,000 or store pickup.</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-500 dark:text-purple-400 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-slate-900 dark:text-white">Pre-Orders Accepted</div>
            <div className="text-slate-600 dark:text-slate-400">Lock in offer prices on upcoming shipments.</div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display font-black text-2xl text-slate-900 dark:text-white">
              All Discounted Supplements ({offerProducts.length} Offers)
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              Quantities are limited. Add to cart to secure discounted pricing today.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {offerProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

    </div>
  );
}


