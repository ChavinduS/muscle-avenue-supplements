import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Flame, 
  Gift, 
  ChevronLeft, 
  ChevronRight, 
  MessageSquare, 
  ShoppingBag, 
  Sparkles, 
  ArrowRight
} from 'lucide-react';

export default function PortraitPromoSliders() {
  const { theme, storeInfo, navigateToCategory, navigateToTab } = useStore();
  const isDark = theme === 'dark';

  // Slides data for New Arrivals
  const newArrivalSlides = [
    {
      id: 'arrival-creatines',
      image: '/promos/arrival-creatines.jpg',
      title: 'Build Stronger with the Best',
      category: 'Creatines',
      categorySlug: 'creatines',
      highlight: 'BigMuscles • Wellcore • Kevin Levrone Gold',
      badge: 'New Creatines Drop'
    },
    {
      id: 'arrival-preworkouts',
      image: '/promos/arrival-preworkouts.jpg',
      title: 'Ignite Your Beast',
      category: 'Pre Workouts',
      categorySlug: 'pre-workouts',
      highlight: 'Outrage • The Curse • Psychotic',
      badge: 'High-Energy Pre-Workouts'
    },
    {
      id: 'arrival-fatburners',
      image: '/promos/arrival-fatburners.jpg',
      title: 'Burn Fat & Shred Limits',
      category: 'Fat Burners',
      categorySlug: 'fat-burners',
      highlight: 'Yeti Burn-Shot • Super Cut • Shred-X',
      badge: 'Metabolic Fat Burners'
    }
  ];

  // Slides data for Buy & Get Free Offers
  const offerSlides = [
    {
      id: 'offer-preworkout-shaker',
      image: '/promos/offer-preworkout-shaker.jpg',
      title: 'Purchase Any Pre-Workout & Get FREE Shaker Bottle',
      category: 'Pre Workouts',
      categorySlug: 'pre-workouts',
      highlight: 'Redcon1 Total War • The Curse • ABE Pre-Workout',
      badge: 'Free Shaker Bottle'
    },
    {
      id: 'offer-whey-shaker-gloves',
      image: '/promos/offer-whey-shaker-gloves.jpg',
      title: 'Purchase Any Whey Protein & Get FREE Shaker & Workout Gloves',
      category: 'Whey Proteins',
      categorySlug: 'whey-proteins',
      highlight: 'Core Champs • Dymatize ISO100 • Nitro-Tech • ON Gold Standard',
      badge: 'Free Shaker & Gloves'
    }
  ];

  // State for active slide indices
  const [arrivalIndex, setArrivalIndex] = useState(0);
  const [offerIndex, setOfferIndex] = useState(0);
  const [arrivalPaused, setArrivalPaused] = useState(false);
  const [offerPaused, setOfferPaused] = useState(false);

  // Auto-slide for New Arrivals (4.5s)
  useEffect(() => {
    if (arrivalPaused) return;
    const interval = setInterval(() => {
      setArrivalIndex((prev) => (prev + 1) % newArrivalSlides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [arrivalPaused, newArrivalSlides.length]);

  // Auto-slide for Offers (5s)
  useEffect(() => {
    if (offerPaused) return;
    const interval = setInterval(() => {
      setOfferIndex((prev) => (prev + 1) % offerSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [offerPaused, offerSlides.length]);

  const currentArrival = newArrivalSlides[arrivalIndex];
  const currentOffer = offerSlides[offerIndex];

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 py-2">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-sky-500 animate-pulse" />
            <span>EXCLUSIVE HIGHLIGHTS & DEALS</span>
          </div>
          <h2 className="font-display font-black text-xl sm:text-2xl text-slate-900 dark:text-white tracking-wide uppercase">
            Special Highlights & Limited Offers
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-lg mt-0.5">
            Freshest shipments and complimentary gym gear with selected performance stacks.
          </p>
        </div>

        <div className="mt-3 sm:mt-0 flex items-center gap-3">
          <button
            onClick={() => navigateToTab('offers')}
            className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:text-sky-500 flex items-center gap-1.5 transition-colors group"
          >
            <span>View All Deals</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Two Portrait Sliders Grid: Centered, Compact & Perfectly Proportioned */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center items-start max-w-4xl mx-auto">
        
        {/* SLIDER 1: NEW ARRIVALS */}
        <div 
          className={`relative w-full max-w-[380px] mx-auto rounded-3xl overflow-hidden border p-3.5 sm:p-4 flex flex-col justify-between transition-all duration-300 shadow-lg ${
            isDark 
              ? 'bg-slate-900/90 border-sky-500/30 hover:border-sky-400/50 hover:shadow-[0_0_25px_rgba(56,189,248,0.15)]' 
              : 'bg-white border-sky-200 hover:border-sky-400 hover:shadow-xl'
          }`}
          onMouseEnter={() => setArrivalPaused(true)}
          onMouseLeave={() => setArrivalPaused(false)}
        >
          {/* Card Top Header */}
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-sky-500/10 text-sky-500 border border-sky-500/20">
                <Flame className="w-4 h-4 text-sky-500" />
              </span>
              <div>
                <span className="text-[10px] font-black tracking-wider uppercase text-sky-600 dark:text-sky-400 block leading-tight">
                  Fresh Batch
                </span>
                <h3 className="font-display font-black text-base text-slate-900 dark:text-white uppercase tracking-wide leading-tight">
                  New Arrivals
                </h3>
              </div>
            </div>

            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/30">
              {arrivalIndex + 1} / {newArrivalSlides.length}
            </span>
          </div>

          {/* Portrait Image Stage: Exact 2:3 aspect ratio fitted edge-to-edge */}
          <div className="relative w-full aspect-[2/3] rounded-2xl overflow-hidden border border-slate-700/40 shadow-inner group bg-slate-950">
            {newArrivalSlides.map((slide, idx) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                  idx === arrivalIndex ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover object-center block"
                  loading="lazy"
                />
              </div>
            ))}

            {/* Navigation Arrows (visible on hover) */}
            <button
              onClick={() => setArrivalIndex((prev) => (prev - 1 + newArrivalSlides.length) % newArrivalSlides.length)}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-slate-950/75 hover:bg-sky-500 text-white hover:text-slate-950 backdrop-blur-md border border-white/20 transition-all opacity-80 sm:opacity-0 sm:group-hover:opacity-100 active:scale-90"
              aria-label="Previous arrival"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setArrivalIndex((prev) => (prev + 1) % newArrivalSlides.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-slate-950/75 hover:bg-sky-500 text-white hover:text-slate-950 backdrop-blur-md border border-white/20 transition-all opacity-80 sm:opacity-0 sm:group-hover:opacity-100 active:scale-90"
              aria-label="Next arrival"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-1.5 py-2.5">
            {newArrivalSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setArrivalIndex(idx)}
                aria-label={`Go to arrival slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === arrivalIndex 
                    ? 'w-6 bg-sky-500 shadow-sm shadow-sky-500/50' 
                    : 'w-1.5 bg-slate-400 dark:bg-slate-700 hover:bg-sky-400/70'
                }`}
              />
            ))}
          </div>

          {/* Action Footer Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => navigateToCategory(currentArrival.categorySlug)}
              className="py-2.5 px-2 rounded-xl bg-gradient-to-r from-sky-400 to-blue-600 hover:from-sky-500 hover:to-blue-700 text-slate-950 font-display font-black text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all truncate"
            >
              <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Shop Category</span>
            </button>

            <a
              href={`https://wa.me/${storeInfo.whatsappRaw}?text=${encodeURIComponent(`Hi Muscle Avenue Supplements, I am interested in the New Arrival: ${currentArrival.title} (${currentArrival.highlight}). Please share available flavors and pricing!`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-display font-bold text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all truncate"
            >
              <MessageSquare className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Inquire WhatsApp</span>
            </a>
          </div>
        </div>

        {/* SLIDER 2: BUY & GET ONE FREE OFFERS */}
        <div 
          className={`relative w-full max-w-[380px] mx-auto rounded-3xl overflow-hidden border p-3.5 sm:p-4 flex flex-col justify-between transition-all duration-300 shadow-lg ${
            isDark 
              ? 'bg-slate-900/90 border-amber-500/30 hover:border-amber-400/50 hover:shadow-[0_0_25px_rgba(245,158,11,0.15)]' 
              : 'bg-white border-amber-200 hover:border-amber-400 hover:shadow-xl'
          }`}
          onMouseEnter={() => setOfferPaused(true)}
          onMouseLeave={() => setOfferPaused(false)}
        >
          {/* Card Top Header */}
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500 border border-amber-500/20">
                <Gift className="w-4 h-4 text-amber-500" />
              </span>
              <div>
                <span className="text-[10px] font-black tracking-wider uppercase text-amber-600 dark:text-amber-400 block leading-tight">
                  Free Gifts
                </span>
                <h3 className="font-display font-black text-base text-slate-900 dark:text-white uppercase tracking-wide leading-tight">
                  Buy & Get Free Offers
                </h3>
              </div>
            </div>

            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30">
              {offerIndex + 1} / {offerSlides.length}
            </span>
          </div>

          {/* Portrait Image Stage: Exact 2:3 aspect ratio fitted edge-to-edge */}
          <div className="relative w-full aspect-[2/3] rounded-2xl overflow-hidden border border-slate-700/40 shadow-inner group bg-slate-950">
            {offerSlides.map((slide, idx) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                  idx === offerIndex ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover object-center block"
                  loading="lazy"
                />
              </div>
            ))}

            {/* Navigation Arrows (visible on hover) */}
            <button
              onClick={() => setOfferIndex((prev) => (prev - 1 + offerSlides.length) % offerSlides.length)}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-slate-950/75 hover:bg-amber-400 text-white hover:text-slate-950 backdrop-blur-md border border-white/20 transition-all opacity-80 sm:opacity-0 sm:group-hover:opacity-100 active:scale-90"
              aria-label="Previous offer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setOfferIndex((prev) => (prev + 1) % offerSlides.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-slate-950/75 hover:bg-amber-400 text-white hover:text-slate-950 backdrop-blur-md border border-white/20 transition-all opacity-80 sm:opacity-0 sm:group-hover:opacity-100 active:scale-90"
              aria-label="Next offer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-1.5 py-2.5">
            {offerSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setOfferIndex(idx)}
                aria-label={`Go to offer slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === offerIndex 
                    ? 'w-6 bg-amber-400 shadow-sm shadow-amber-400/50' 
                    : 'w-1.5 bg-slate-400 dark:bg-slate-700 hover:bg-amber-400/70'
                }`}
              />
            ))}
          </div>

          {/* Action Footer Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => navigateToCategory(currentOffer.categorySlug)}
              className="py-2.5 px-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-display font-black text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all truncate"
            >
              <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Shop Category</span>
            </button>

            <a
              href={`https://wa.me/${storeInfo.whatsappRaw}?text=${encodeURIComponent(`Hi Muscle Avenue Supplements, I would like to claim the Free Gift Offer: ${currentOffer.title}! Please confirm availability.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-display font-bold text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all truncate"
            >
              <MessageSquare className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Claim on WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
