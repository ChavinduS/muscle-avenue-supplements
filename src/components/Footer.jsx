import React from 'react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/supplementsData';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  CreditCard, 
  Truck, 
  Store, 
  ChevronRight,
  MessageSquare
} from 'lucide-react';

export default function Footer() {
  const { navigateToCategory, navigateToTab, openOrderTracker, storeInfo, theme } = useStore();
  const isDark = theme === 'dark';

  return (
    <footer className={`border-t transition-colors mt-20 relative z-10 ${
      isDark 
        ? 'bg-slate-950/95 border-slate-800 text-slate-300' 
        : 'bg-slate-900 text-slate-200 border-slate-800'
    }`}>
      {/* Top Value Banner */}
      <div className="border-b border-slate-800/80 py-8 bg-gradient-to-r from-sky-500/15 via-cyan-500/10 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-white">100% Original Imported</h4>
              <p className="text-xs text-slate-400">Directly from USA &amp; UK certified brand distributors</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-white">Islandwide Courier</h4>
              <p className="text-xs text-slate-400">Speedy delivery across all 25 districts of Sri Lanka</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Store className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-white">Store Self Pick Up</h4>
              <p className="text-xs text-slate-400">Collect order in 2 hours at Colombo 03 flagship store</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center shrink-0 overflow-hidden">
              <img src="/koko-logo.jpg" alt="Koko Pay" className="w-10 h-10 object-contain rounded-xl" />
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-white flex items-center gap-2">
                Koko Pay &amp; Cards &amp; COD
              </h4>
              <p className="text-xs text-slate-400">Pay in 3 installments or Cash on Delivery</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        
        {/* Brand Information with Official Muscle Avenue Logo */}
        <div className="lg:col-span-2 space-y-4">
          <div 
            onClick={() => navigateToTab('home')}
            className="cursor-pointer group inline-block"
          >
            <img
              src="/logo.png"
              alt="Muscle Avenue Supplements"
              className="h-20 sm:h-24 md:h-28 w-auto max-w-[280px] object-contain drop-shadow-2xl group-hover:scale-105 transition-transform"
            />
          </div>

          <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
            <strong>Muscle Avenue Supplements</strong> is Sri Lanka&apos;s premier gym nutrition powerhouse. We provide <strong>Premium And Original Imported Supplements</strong> from top brands including Optimum Nutrition, Applied Nutrition, Cellucor, Muscletech, and Wellcore.
          </p>

          <div className="pt-2 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <Phone className="w-4 h-4 text-sky-400 shrink-0" />
              <span>Contact Hotline: <strong>{storeInfo.phoneFormatted}</strong></span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>WhatsApp Orders: <strong>{storeInfo.whatsappFormatted}</strong></span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Mail className="w-4 h-4 text-purple-400 shrink-0" />
              <span>{storeInfo.email}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <MapPin className="w-4 h-4 text-red-400 shrink-0" />
              <span>{storeInfo.address}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Clock className="w-4 h-4 text-blue-400 shrink-0" />
              <span>{storeInfo.openingHours}</span>
            </div>
          </div>
        </div>

        {/* All Categories Links */}
        <div>
          <h4 className="font-display font-bold text-xs uppercase tracking-wider text-sky-400 mb-4">
            Supplements Categories
          </h4>
          <ul className="space-y-2 text-xs">
            {CATEGORIES.map(cat => (
              <li key={cat.id}>
                <button
                  onClick={() => navigateToCategory(cat.slug)}
                  className="hover:text-sky-400 transition-colors text-left flex items-center gap-1.5 group"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-sky-500/70 group-hover:text-sky-400 transition-transform group-hover:translate-x-0.5 shrink-0" />
                  <span>{cat.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display font-bold text-xs uppercase tracking-wider text-sky-400 mb-4">
            Quick Navigation
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button
                onClick={() => navigateToTab('supplements')}
                className="hover:text-sky-400 transition-colors"
              >
                All Supplements (No Filter)
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateToTab('offers')}
                className="hover:text-red-400 transition-colors font-bold text-red-400"
              >
                Hot Offers &amp; Deals
              </button>
            </li>
            <li>
              <button
                onClick={() => openOrderTracker()}
                className="hover:text-sky-400 transition-colors"
              >
                Track Order Timeline
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateToTab('about')}
                className="hover:text-sky-400 transition-colors"
              >
                About Us (Original Guarantee)
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateToTab('contact')}
                className="hover:text-sky-400 transition-colors"
              >
                Contact Us &amp; Support
              </button>
            </li>
          </ul>
        </div>

        {/* Payment Methods & Accreditations */}
        <div>
          <h4 className="font-display font-bold text-xs uppercase tracking-wider text-sky-400 mb-4">
            Payment &amp; Delivery
          </h4>
          <p className="text-xs text-slate-400 mb-4 leading-relaxed">
            We accept all major payment methods with 100% security:
          </p>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            {/* Visa + Mastercard logo */}
            <div className="bg-white rounded-lg px-2 py-1 flex items-center shadow-sm border border-slate-200">
              <img src="/visa-mastercard.png" alt="Visa &amp; Mastercard" className="h-7 w-auto object-contain" />
            </div>
            {/* Koko Pay logo */}
            <div className="bg-white rounded-lg px-2 py-1 flex items-center shadow-sm border border-slate-200">
              <img src="/koko-logo.jpg" alt="Koko Pay" className="h-7 w-auto object-contain" />
              <span className="ml-1.5 text-[10px] font-black text-emerald-700 whitespace-nowrap">3x Pay</span>
            </div>
            <span className="px-2.5 py-1 rounded bg-amber-500 text-slate-950 font-black text-xs">
              Cash on Delivery
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-[11px] text-slate-400 flex items-center gap-2">
            <Truck className="w-4 h-4 text-sky-400 shrink-0" />
            <span>Self Pick Up available at our Colombo Flagship Store.</span>
          </div>
        </div>

      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-slate-800/80 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>&copy; {new Date().getFullYear()} Muscle Avenue Supplements. All rights reserved.</p>
          <p className="text-[11px]">Premium And Original Imported Supplements &bull; Colombo, Sri Lanka</p>
        </div>
      </div>
    </footer>
  );
}

