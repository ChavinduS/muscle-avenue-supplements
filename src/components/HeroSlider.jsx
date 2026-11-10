import React, { useState, useEffect } from 'react';
import { HERO_SLIDES } from '../data/supplementsData';
import { useStore } from '../context/StoreContext';
import { ChevronLeft, ChevronRight, Sparkles, ShieldCheck, ArrowRight, Truck } from 'lucide-react';

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { navigateToTab, navigateToCategory, theme } = useStore();
  const isDark = theme === 'dark';

  // Auto advance slides every 6 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length);
  };

  const handleCtaClick = (linkType, slide) => {
    if (slide.categoryLink === 'offers') {
      navigateToTab('offers');
    } else if (slide.categoryLink) {
      navigateToCategory(slide.categoryLink);
    } else {
      navigateToTab('supplements');
    }
  };

  return (
    <div 
      className="relative w-full overflow-hidden rounded-3xl border border-sky-500/25 shadow-2xl my-6 bg-slate-950 min-h-[340px] sm:min-h-[400px] md:min-h-[460px] lg:h-[500px] select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div 
        className="h-full flex transition-transform duration-700 ease-out will-change-transform"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {HERO_SLIDES.map((slide) => (
          <div
            key={slide.id}
            className="w-full h-full shrink-0 relative flex items-center justify-between overflow-hidden"
          >
            {slide.id === 1 ? (
              /* Slide 1: Recreated Ultra-High-Def Muscle Avenue Slogan & Logo Anthem Banner (100% Vector Crisp) */
              <div 
                onClick={() => handleCtaClick('primary', slide)}
                className="w-full h-full relative cursor-pointer group flex items-center overflow-hidden py-8 lg:py-0"
              >
                {/* Cinematic Gym Background with Atmospheric Neon Red Glow */}
                <div className="absolute inset-0 z-0">
                  <img
                    src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=2000&q=85"
                    alt="Muscle Avenue Gym"
                    className="w-full h-full object-cover object-center filter brightness-[0.35] contrast-125"
                  />
                  {/* Fiery atmospheric lighting */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-red-950/45" />
                  <div className="absolute inset-0 bg-radial-gradient from-red-600/25 via-transparent to-black/85 pointer-events-none" />
                  
                  {/* Decorative Geometric Corner Streaks (matches official banner aesthetic) */}
                  <div className="absolute top-0 left-0 w-32 h-32 sm:w-44 sm:h-44 border-t-4 border-l-4 border-red-600/50 pointer-events-none" />
                  <div className="absolute top-3 left-3 w-24 h-24 sm:w-36 sm:h-36 border-t-2 border-l-2 border-sky-500/35 pointer-events-none" />
                  <div className="absolute bottom-0 right-0 w-32 h-32 sm:w-44 sm:h-44 border-b-4 border-r-4 border-red-600/50 pointer-events-none" />
                  <div className="absolute bottom-3 right-3 w-24 h-24 sm:w-36 sm:h-36 border-b-2 border-r-2 border-sky-500/35 pointer-events-none" />
                </div>

                {/* Main Content Layout: Ultra-HD sharp recreation */}
                <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 my-auto">
                  
                  {/* Left: Ultra-Crisp High-Res Muscle Avenue Logo with Fiery Aura */}
                  <div className="flex-1 flex items-center justify-center md:justify-start">
                    <div className="relative group/logo">
                      {/* Dynamic Radiant Fiery Pulse Aura */}
                      <div className="absolute -inset-6 bg-gradient-to-r from-red-600/60 via-sky-600/40 to-blue-600/30 rounded-full blur-3xl opacity-80 group-hover/logo:opacity-100 transition duration-700 animate-pulse" />
                      
                      {/* Crystal Clear Logo */}
                      <img
                        src="/logo.png"
                        alt="Muscle Avenue Supplements"
                        className="relative h-32 sm:h-44 md:h-52 lg:h-64 xl:h-72 w-auto object-contain drop-shadow-[0_0_35px_rgba(220,38,38,0.7)] drop-shadow-[0_15px_25px_rgba(0,0,0,0.9)] transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>

                  {/* Right: Sharp Metallic & Flaming Slogan Typography */}
                  <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left select-none">
                    
                    {/* Metallic Chrome & Neon Red Line 1 */}
                    <div className="font-display font-black italic tracking-wide text-2xl sm:text-4xl md:text-5xl lg:text-6xl uppercase leading-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)]">
                      <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400">
                        FUEL YOUR{' '}
                      </span>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-500 to-red-600 drop-shadow-[0_0_30px_rgba(239,68,68,0.95)]">
                        FIRE,
                      </span>
                    </div>

                    {/* Metallic Chrome & Neon Red Line 2 */}
                    <div className="font-display font-black italic tracking-wide text-2xl sm:text-4xl md:text-5xl lg:text-6xl uppercase leading-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)] mt-1.5 sm:mt-2.5">
                      <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400">
                        FIND YOUR{' '}
                      </span>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-500 to-red-600 drop-shadow-[0_0_30px_rgba(239,68,68,0.95)]">
                        POWER
                      </span>
                    </div>

                    {/* Fiery Neon Speed Streak Divider */}
                    <div className="my-2.5 sm:my-3.5 h-1 sm:h-1.5 w-48 sm:w-72 md:w-96 bg-gradient-to-r from-red-600 via-rose-500 to-transparent rounded-full shadow-[0_0_15px_rgba(239,68,68,0.9)]" />

                    {/* Official Muscle Avenue Logo Font & Style: "WITH MUSCLE AVENUE!" */}
                    <div className="font-logo font-black italic uppercase tracking-wider text-2xl sm:text-3xl md:text-4xl lg:text-5xl select-none mt-1 drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)]">
                      <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-400 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] mr-2 sm:mr-3">
                        WITH
                      </span>
                      <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-300 drop-shadow-[0_2px_12px_rgba(255,255,255,0.4)] mr-2 sm:mr-3">
                        MUSCLE
                      </span>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-500 to-red-600 drop-shadow-[0_0_30px_rgba(239,68,68,0.95)] drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)]">
                        AVENUE!
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-4 sm:mt-6 flex flex-wrap items-center justify-center md:justify-start gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCtaClick('primary', slide);
                        }}
                        className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl font-display font-black text-xs sm:text-sm uppercase tracking-wider bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-600 hover:from-sky-500 hover:to-blue-700 text-slate-950 shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group/btn border border-white/30 backdrop-blur-sm"
                      >
                        <span>Shop All Supplements</span>
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigateToTab('offers');
                        }}
                        className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl font-display font-bold text-xs sm:text-sm tracking-wide bg-slate-900/80 hover:bg-slate-800 text-white border border-red-500/40 hover:border-red-500 backdrop-blur-sm transition-all hover:scale-105 active:scale-95"
                      >
                        View Offers
                      </button>
                    </div>

                  </div>
                </div>

                {/* Subtle bottom shadow vignette for indicators */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/85 to-transparent pointer-events-none" />
              </div>
            ) : (
              /* Standard Content Slide with perfectly-fitted background & content */
              <>
                {/* Background Image with Clean Dark Gradient Overlay */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out"
                  />
                  <div className={`absolute inset-0 ${
                    isDark 
                      ? 'bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-slate-950/40' 
                      : 'bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-900/35'
                  }`} />
                  <div className="absolute inset-0 bg-radial-gradient from-sky-500/15 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Slide Text Content */}
                <div className="relative z-10 max-w-2xl px-6 md:px-14 py-8 md:py-12 text-white">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 border border-sky-500/40 backdrop-blur-md text-sky-400 text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-2.5 animate-pulse">
                    <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                    {slide.badge}
                  </div>

                  {/* Title */}
                  <h1 className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white mb-2.5">
                    {slide.title.split(' ')[0]}{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-cyan-200 to-blue-400 drop-shadow-sm">
                      {slide.title.split(' ').slice(1).join(' ')}
                    </span>
                  </h1>

                  {/* Subtitle */}
                  <p className="text-slate-300 text-xs sm:text-sm md:text-base mb-4 max-w-xl font-normal leading-relaxed line-clamp-2 sm:line-clamp-none">
                    {slide.subtitle}
                  </p>

                  {/* Highlight Badges */}
                  <div className="hidden sm:flex flex-wrap items-center gap-3 mb-6 text-xs font-semibold text-slate-300">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/70 border border-slate-700/60 backdrop-blur-sm">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>100% Original Imported</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/70 border border-slate-700/60 backdrop-blur-sm">
                      <Truck className="w-4 h-4 text-amber-400" />
                      <span>Islandwide Delivery &amp; Self Pickup</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => handleCtaClick('primary', slide)}
                      className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl font-display font-bold text-xs sm:text-sm tracking-wide bg-gradient-to-r from-sky-400 to-blue-600 hover:from-sky-500 hover:to-blue-700 text-slate-950 shadow-lg shadow-sky-500/30 hover:shadow-sky-500/50 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group"
                    >
                      <span>{slide.ctaPrimary}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button
                      onClick={() => navigateToTab('offers')}
                      className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl font-display font-bold text-xs sm:text-sm tracking-wide bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700/80 hover:border-sky-500/60 backdrop-blur-sm transition-all hover:scale-105 active:scale-95"
                    >
                      {slide.ctaSecondary}
                    </button>
                  </div>
                </div>

                {/* Seamless Merged Promo Graphic (e.g. Official Koko Pay Astral Mascot Banner) */}
                {slide.promoImage && (
                  <div className="relative z-10 hidden md:flex items-center justify-center pr-8 lg:pr-14 shrink-0">
                    <div className="relative group">
                      {/* Radiant ambient glow */}
                      <div className="absolute -inset-4 bg-gradient-to-r from-pink-500/30 via-emerald-500/20 to-blue-500/30 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition duration-1000"></div>
                      
                      {/* Seamless merged card without harsh borders */}
                      <div className="relative overflow-hidden rounded-3xl shadow-2xl transition-transform duration-500 group-hover:scale-105 max-w-[220px] lg:max-w-[280px]">
                        <img
                          src={slide.promoImage}
                          alt={slide.title}
                          className="w-full h-auto object-contain block drop-shadow-md"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-900/80 hover:bg-sky-500 text-white hover:text-slate-950 border border-slate-700/60 flex items-center justify-center backdrop-blur-md transition-all hover:scale-110 active:scale-90 shadow-xl"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-900/80 hover:bg-sky-500 text-white hover:text-slate-950 border border-slate-700/60 flex items-center justify-center backdrop-blur-md transition-all hover:scale-110 active:scale-90 shadow-xl"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Slide Indicators / Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/70 backdrop-blur-md border border-slate-800 shadow-lg">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`transition-all duration-300 rounded-full ${
              currentSlide === idx
                ? 'w-7 h-2 bg-gradient-to-r from-sky-400 to-cyan-400'
                : 'w-2 h-2 bg-slate-600 hover:bg-slate-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

