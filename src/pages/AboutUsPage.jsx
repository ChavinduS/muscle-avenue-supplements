import React from 'react';
import { useStore } from '../context/StoreContext';
import { BRANDS } from '../data/supplementsData';
import { 
  ShieldCheck, 
  Award, 
  Dumbbell, 
  Truck, 
  Store, 
  CheckCircle2, 
  Flame, 
  Users, 
  ArrowRight,
  Phone,
  MessageSquare
} from 'lucide-react';

export default function AboutUsPage() {
  const { storeInfo, navigateToTab, theme } = useStore();
  const isDark = theme === 'dark';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Hero Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/20 text-sky-400 font-bold text-xs uppercase tracking-wider border border-sky-500/30">
          <ShieldCheck className="w-4 h-4 text-sky-400" />
          <span>Our Uncompromising Guarantee</span>
        </div>

        <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-slate-900 dark:text-white tracking-tight">
          Premium And Original Imported Supplements
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          At <strong>Muscle Avenue Supplements</strong>, our mission is straightforward: supply Sri Lanka's athletes, bodybuilders, and fitness enthusiasts with <strong>100% genuine, lab-certified, direct-imported gym nutrition</strong> — free from compromises, counterfeit risks, or middleman markups.
        </p>
      </div>

      {/* The Muscle Avenue Standard Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-500">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-display font-black text-lg text-slate-900 dark:text-white">
            100% Authenticity Verified
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Every product carries verifiable batch codes, factory tamper-evident safety seals, and direct import documentation. We inspect every container before it enters our temperature-controlled inventory.
          </p>
        </div>

        <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
            <Store className="w-6 h-6" />
          </div>
          <h3 className="font-display font-black text-lg text-slate-900 dark:text-white">
            Self Pickup or Express Delivery
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Need your pre-workout today? Pick up within 2 hours from our Colombo 03 flagship store counter, or choose Islandwide Delivery to any district in Sri Lanka within 24 to 48 hours.
          </p>
        </div>

        <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500">
            <Dumbbell className="w-6 h-6" />
          </div>
          <h3 className="font-display font-black text-lg text-slate-900 dark:text-white">
            Athlete Consultation & Support
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Our staff are competitive lifters and nutrition coaches who guide you on optimal creatine loading, protein intake, intra-workout hydration, and safe cutting stacks.
          </p>
        </div>
      </div>

      {/* Official Brands Section */}
      <div className="p-8 md:p-12 rounded-3xl bg-white dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-sky-500">
            AUTHORIZED DISTRIBUTION PARTNERS
          </span>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900 dark:text-white">
            World&apos;s Most Prestigious Brands
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Imported directly from certified facilities in the USA and United Kingdom.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {BRANDS.map(brand => (
            <div
              key={brand.name}
              className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center font-display font-black text-sky-500 text-xs">
                {brand.name.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                  {brand.name}
                </h4>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  Origin: {brand.country} &bull; {brand.slogan}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Flagship Store & Verification Contact */}
      <div className="p-8 md:p-10 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="font-display font-black text-xl sm:text-2xl text-slate-900 dark:text-white">
            Visit Our Flagship Store in Colombo
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-lg">
            Address: <strong>{storeInfo.address}</strong><br />
            Opening Hours: {storeInfo.openingHours}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href={`https://wa.me/${storeInfo.whatsappRaw}?text=Hi%20Muscle%20Avenue%20Supplements,%20I%20have%20an%20authenticity%20inquiry`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-display font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp: {storeInfo.whatsapp}</span>
          </a>

          <a
            href={`tel:${storeInfo.phone}`}
            className="px-5 py-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-slate-950 font-display font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-sky-500/20 transition-all"
          >
            <Phone className="w-4 h-4" />
            <span>Call: {storeInfo.phoneFormatted}</span>
          </a>
        </div>
      </div>

    </div>
  );
}

