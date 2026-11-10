import React from 'react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/supplementsData';
import HeroSlider from '../components/HeroSlider';
import BrandTicker from '../components/BrandTicker';
import ExploreBrandsSection from '../components/ExploreBrandsSection';
import PortraitPromoSliders from '../components/PortraitPromoSliders';
import ProductCard from '../components/ProductCard';
import { 
  Zap, 
  Flame, 
  Dumbbell, 
  Activity, 
  ShieldPlus, 
  Sparkles, 
  ShoppingBag, 
  ArrowRight, 
  Star, 
  Truck, 
  Store, 
  Phone, 
  MessageSquare,
  ShieldCheck,
  Tag,
  Clock
} from 'lucide-react';

export default function HomePage() {
  const { products, navigateToCategory, navigateToTab, storeInfo, theme } = useStore();
  const isDark = theme === 'dark';

  // Category icon mapping
  const renderCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Zap': return <Zap className="w-6 h-6 text-sky-500" />;
      case 'Flame': return <Flame className="w-6 h-6 text-red-500" />;
      case 'Dumbbell': return <Dumbbell className="w-6 h-6 text-amber-500" />;
      case 'Activity': return <Activity className="w-6 h-6 text-emerald-500" />;
      case 'ShieldPlus': return <ShieldPlus className="w-6 h-6 text-blue-500" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-purple-500" />;
      case 'ShoppingBag': return <ShoppingBag className="w-6 h-6 text-pink-500" />;
      default: return <Dumbbell className="w-6 h-6 text-sky-500" />;
    }
  };

  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 8);
  const newArrivals = products.filter(p => p.isNewArrival).slice(0, 4);

  return (
    <div className="space-y-16">
      
      {/* 1. Hero Animated Slideshow */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <HeroSlider />
      </section>

      {/* 2. Official Brands Animated Running Bar */}
      <section className="w-full">
        <BrandTicker />
      </section>

      {/* 3. Homepage Direct WhatsApp & Contact Us Banner Buttons */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`p-6 md:p-8 rounded-3xl border shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 ${
          isDark 
            ? 'bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-slate-700/80' 
            : 'bg-gradient-to-r from-sky-50 via-white to-amber-50 border-sky-200'
        }`}>
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Direct Athlete Hotline & WhatsApp
            </div>
            <h3 className="font-display font-black text-xl sm:text-2xl text-slate-900 dark:text-white">
              Need Instant Advice or Custom Order?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-lg">
              Contact Muscle Avenue Supplements right away for genuine import verification, stack advice, or instant self pickup reservation.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            {/* WhatsApp Button */}
            <a
              href={`https://wa.me/${storeInfo.whatsappRaw}?text=Hi%20Muscle%20Avenue%20Supplements,%20I%20am%20messaging%20from%20the%20website`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-display font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-emerald-600/30 hover:scale-105 active:scale-95 transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp: {storeInfo.whatsapp}</span>
            </a>

            {/* Contact Us Phone Call Button */}
            <a
              href={`tel:${storeInfo.phone}`}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-sky-400 to-blue-600 hover:from-sky-500 hover:to-blue-700 text-slate-950 font-display font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-sky-500/20 hover:scale-105 active:scale-95 transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>Contact: {storeInfo.phoneFormatted}</span>
            </a>

            {/* Contact Page Link */}
            <button
              onClick={() => navigateToTab('contact')}
              className="px-5 py-3.5 rounded-xl border border-slate-700 hover:border-sky-500 bg-slate-800 text-slate-200 hover:text-white text-xs font-bold transition-all"
            >
              Contact Us Page
            </button>
          </div>
        </div>
      </section>

      {/* 4. Explore Our Brands Section (18 Brand Logos Grid) */}
      <ExploreBrandsSection />

      {/* 5. Portrait Slideshows: New Arrivals & Buy Get Free Offers */}
      <PortraitPromoSliders />

      {/* 4. Supplements Categories Grid (Dedicated page for each category) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-sky-500">
              EXPLORE OUR STORE
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900 dark:text-white mt-1">
              Supplements Categories
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Each category has its own dedicated page with live quantities & brand filters.
            </p>
          </div>

          <button
            onClick={() => navigateToTab('supplements')}
            className="mt-4 md:mt-0 inline-flex items-center gap-2 font-display font-bold text-xs uppercase tracking-wider text-sky-500 hover:text-sky-400 group"
          >
            <span>View All Supplements (No Filter)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES.map(cat => (
            <div
              key={cat.id}
              onClick={() => navigateToCategory(cat.slug)}
              className={`p-5 rounded-3xl border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl cursor-pointer group flex flex-col justify-between ${
                isDark
                  ? 'bg-slate-900/80 border-slate-800 hover:border-sky-500/50 hover:bg-slate-850'
                  : 'bg-white border-slate-200 hover:border-sky-500/50 shadow-sm'
              }`}
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {renderCategoryIcon(cat.icon)}
                </div>
                <h3 className="font-display font-black text-base sm:text-lg mb-1 group-hover:text-sky-500 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs font-bold text-sky-500">
                <span>Browse {cat.count} items</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Best Sellers Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-500 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Star className="w-3.5 h-3.5 fill-amber-500" />
              Top Rated by Athletes
            </div>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900 dark:text-white">
              Best Sellers Collection
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Our highest performing supplements with verified batch authenticity.
            </p>
          </div>

          <button
            onClick={() => navigateToTab('supplements')}
            className="mt-4 sm:mt-0 font-display font-bold text-xs uppercase tracking-wider text-sky-500 hover:text-sky-400 flex items-center gap-1 group"
          >
            <span>See Full Store</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {bestSellers.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. Special Offers & Pre-Order Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-950 via-slate-900 to-blue-950 border border-red-500/40 p-8 md:p-12 shadow-2xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="px-3.5 py-1.5 rounded-full bg-red-600 text-white font-black text-xs uppercase tracking-wider shadow-md inline-block">
              LIMITED TIME SAVINGS
            </span>
            <h3 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white leading-tight">
              UP TO 30% OFF ON IMPORTED SUPPLEMENTS
            </h3>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed">
              Creatines, Gold Standard Whey & Pre-Workouts at discounted rates. Pre-order incoming shipments or reserve for store self pickup now.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => navigateToTab('offers')}
                className="px-6 py-3.5 rounded-xl font-display font-black text-xs uppercase tracking-wider bg-gradient-to-r from-sky-400 to-blue-600 hover:from-sky-500 hover:to-blue-700 text-slate-950 shadow-xl transition-all"
              >
                Go to Offers Page
              </button>

              <button
                onClick={() => navigateToTab('supplements')}
                className="px-6 py-3.5 rounded-xl font-display font-bold text-xs uppercase tracking-wider bg-slate-900/90 hover:bg-slate-800 text-white border border-slate-700 transition-all"
              >
                Explore All Supplements
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. New Arrivals Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-500">
              FRESH IMPORTED BATCHES
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900 dark:text-white mt-1">
              New Arrivals
            </h2>
          </div>
          <button
            onClick={() => navigateToTab('supplements')}
            className="font-display font-bold text-xs uppercase tracking-wider text-sky-500 hover:text-sky-400"
          >
            View More
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {newArrivals.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 8. Premium And Original Imported Supplements Guarantee Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 md:p-12 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/20 text-sky-600 dark:text-sky-400 font-bold text-xs uppercase tracking-wider border border-sky-500/30">
            <ShieldCheck className="w-4 h-4 text-sky-500" />
            <span>Muscle Avenue Authenticity Seal</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 dark:text-white max-w-2xl mx-auto">
            Premium And Original Imported Supplements
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-sm max-w-2xl mx-auto leading-relaxed">
            Every bottle on our shelves is 100% genuine, directly imported with verified batch codes, authentic scratch seals, and stored in climate-controlled conditions. We do NOT sell duplicates or unauthorized re-packs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left pt-6 max-w-4xl mx-auto">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
              <div className="font-display font-bold text-base text-sky-600 dark:text-sky-400 mb-1">
                Direct Official Importer
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Direct distribution ties with Applied Nutrition UK, Optimum Nutrition USA, Cellucor & Muscletech.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
              <div className="font-display font-bold text-base text-emerald-600 dark:text-emerald-400 mb-1">
                Flexible Fulfillment
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Self Pick Up at our Colombo flagship store or rapid islandwide doorstep courier delivery in 24-48 hours.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
              <div className="font-display font-bold text-base text-amber-600 dark:text-amber-400 mb-1">
                Easy Payment Options
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                Pay with Online Credit/Debit Cards, Cash On Delivery, or split into 3 interest-free payments via Koko Pay.
              </p>
              <div className="flex items-center gap-2">
                <div className="bg-white rounded px-2 py-0.5 border border-slate-200 shadow-sm flex items-center">
                  <img src="/visa-mastercard.png" alt="Visa &amp; Mastercard" className="h-5 w-auto object-contain" />
                </div>
                <div className="bg-white rounded px-2 py-0.5 border border-slate-200 shadow-sm flex items-center">
                  <img src="/koko-logo.jpg" alt="Koko Pay" className="h-5 w-auto object-contain" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}


