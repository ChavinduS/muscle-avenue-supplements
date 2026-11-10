import React from 'react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/supplementsData';
import { 
  X, 
  Phone, 
  MessageSquare, 
  Truck, 
  Clock, 
  ShieldCheck, 
  Tag, 
  Zap, 
  User, 
  Sun, 
  Moon, 
  ChevronRight, 
  Store,
  MapPin
} from 'lucide-react';

export default function BurgerMenu() {
  const {
    isBurgerOpen,
    setIsBurgerOpen,
    navigateToCategory,
    navigateToTab,
    openOrderTracker,
    theme,
    toggleTheme,
    storeInfo,
    user,
    switchRole
  } = useStore();

  if (!isBurgerOpen) return null;

  const isDark = theme === 'dark';

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsBurgerOpen(false)}
      />

      {/* Slide-out Menu Panel */}
      <div
        className={`relative ml-0 mr-auto w-full max-w-sm sm:max-w-md h-full shadow-2xl flex flex-col z-10 overflow-y-auto transition-colors ${
          isDark 
            ? 'bg-slate-900 border-r border-slate-800 text-slate-100' 
            : 'bg-white border-r border-slate-200 text-slate-900'
        }`}
      >
        {/* Header with Official Muscle Avenue Logo */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800/60 flex items-center justify-between">
          <div 
            onClick={() => {
              navigateToTab('home');
              setIsBurgerOpen(false);
            }}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <img
              src="/logo.png"
              alt="Muscle Avenue Supplements"
              className="h-16 sm:h-20 w-auto max-w-[220px] object-contain drop-shadow-xl"
            />
          </div>

          <button
            onClick={() => setIsBurgerOpen(false)}
            aria-label="Close menu"
            className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 hover:dark:bg-sky-500 text-slate-700 dark:text-slate-300 flex items-center justify-center transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 flex-1 space-y-6">
          
          {/* Quick Order Timeline Tracking Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-sky-500/15 via-cyan-500/10 to-transparent border border-sky-500/30">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-sky-400 font-display font-bold text-xs uppercase tracking-wider">
                <Truck className="w-4 h-4 text-sky-400" />
                <span>Delivery & Shipping Timeline</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-400 font-bold">
                Live
              </span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 mb-3 leading-relaxed">
              Track your supplement order through: <strong>Processing âž” Packed âž” In Transit âž” Delivered / Ready for Pickup</strong>.
            </p>
            <button
              onClick={() => {
                setIsBurgerOpen(false);
                openOrderTracker();
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-slate-950 font-display font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <Clock className="w-4 h-4" />
              <span>Open Order Status Tracker</span>
            </button>
          </div>

          {/* Quick Main Links */}
          <div className="space-y-1">
            <button
              onClick={() => {
                navigateToTab('home');
                setIsBurgerOpen(false);
              }}
              className="w-full text-left px-3.5 py-2.5 rounded-xl font-display font-bold text-sm flex items-center justify-between text-slate-800 dark:text-slate-200 hover:bg-sky-500/10 hover:text-sky-500 transition-colors"
            >
              <span>Home</span>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>

            <button
              onClick={() => {
                navigateToTab('supplements');
                setIsBurgerOpen(false);
              }}
              className="w-full text-left px-3.5 py-2.5 rounded-xl font-display font-bold text-sm flex items-center justify-between text-slate-800 dark:text-slate-200 hover:bg-sky-500/10 hover:text-sky-500 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-sky-500" />
                <span>All Supplements (No Filter)</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>

            <button
              onClick={() => {
                navigateToTab('offers');
                setIsBurgerOpen(false);
              }}
              className="w-full text-left px-3.5 py-2.5 rounded-xl font-display font-bold text-sm flex items-center justify-between bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20 transition-colors border border-red-500/20"
            >
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-red-500 animate-bounce" />
                <span>Special Offers & Discounts</span>
              </div>
              <span className="text-[10px] font-black px-2 py-0.5 rounded bg-red-600 text-white uppercase">
                Up to 30% Off
              </span>
            </button>
          </div>

          {/* All Supplements Categories list */}
          <div>
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                All Supplements Categories
              </span>
              <span className="text-[10px] font-semibold text-sky-500">
                7 Categories
              </span>
            </div>

            <div className="space-y-1.5">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => {
                    navigateToCategory(cat.slug);
                    setIsBurgerOpen(false);
                  }}
                  className={`w-full text-left p-3 rounded-xl text-xs font-bold flex items-center justify-between border transition-all ${
                    isDark 
                      ? 'bg-slate-800/50 border-slate-700/50 hover:border-sky-500/50 hover:bg-slate-800 text-slate-200' 
                      : 'bg-slate-50 border-slate-200 hover:border-sky-500/50 hover:bg-sky-50/50 text-slate-800'
                  }`}
                >
                  <span className="flex items-center gap-2.5 whitespace-nowrap font-bold">
                    <span className="w-2 h-2 rounded-full bg-sky-500 shrink-0" />
                    <span>{cat.name}</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400">
                      {cat.count} items
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Delivery & Shipping Information Details */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 text-xs space-y-2.5">
            <h4 className="font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Store className="w-4 h-4" />
              <span>Delivery & Shipping Options:</span>
            </h4>
            <ul className="space-y-1.5 text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">âœ”</span>
                <span><strong>Self Pick Up:</strong> Free pickup from Colombo Store (Galle Rd) ready within 2 hours.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">âœ”</span>
                <span><strong>Islandwide Delivery:</strong> Fast courier dispatch to any address in Sri Lanka (24-48 hrs).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">âœ”</span>
                <span><strong>Payment Methods:</strong> Online Card, Cash on Delivery (COD) or Koko Pay (3 Installments).</span>
              </li>
            </ul>
          </div>

          {/* About Us & Contact Details */}
          <div className="space-y-1">
            <button
              onClick={() => {
                navigateToTab('about');
                setIsBurgerOpen(false);
              }}
              className="w-full text-left px-3.5 py-2.5 rounded-xl font-display font-bold text-sm flex items-center justify-between text-slate-800 dark:text-slate-200 hover:bg-sky-500/10 hover:text-sky-500 transition-colors"
            >
              <span>About Us (Original Imported)</span>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>

            <button
              onClick={() => {
                navigateToTab('contact');
                setIsBurgerOpen(false);
              }}
              className="w-full text-left px-3.5 py-2.5 rounded-xl font-display font-bold text-sm flex items-center justify-between text-slate-800 dark:text-slate-200 hover:bg-sky-500/10 hover:text-sky-500 transition-colors"
            >
              <span>Contact Us & Store Support</span>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>
          </div>

          {/* Direct Contact Buttons */}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-2">
            <a
              href={`https://wa.me/${storeInfo.whatsappRaw}?text=Hi%20Muscle%20Avenue%20Supplements,%20I%20have%20an%20inquiry`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat WhatsApp: {storeInfo.whatsapp}</span>
            </a>

            <a
              href={`tel:${storeInfo.phone}`}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold text-xs flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700 transition-all"
            >
              <Phone className="w-4 h-4 text-sky-500" />
              <span>Call Direct: {storeInfo.phoneFormatted}</span>
            </a>
          </div>

        </div>

        {/* Footer in drawer with Theme and Role toggles */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-950/40 flex items-center justify-between">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            <span>{isDark ? 'Light Theme' : 'Dark Theme'}</span>
          </button>

          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-500 dark:text-slate-400 text-[11px]">Role:</span>
            <button
              onClick={() => switchRole(user.role === 'admin' ? 'customer' : 'admin')}
              className={`px-2 py-0.5 rounded font-black text-[10px] uppercase transition-colors ${
                user.role === 'admin'
                  ? 'bg-red-600 text-white'
                  : 'bg-sky-500 text-slate-950'
              }`}
            >
              {user.role}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


