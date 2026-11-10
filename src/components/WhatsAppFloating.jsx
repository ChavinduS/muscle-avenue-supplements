import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { MessageSquare, Phone, X, Dumbbell } from 'lucide-react';

export default function WhatsAppFloating() {
  const { storeInfo } = useStore();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Expanded Quick Contact Chat Popover */}
      {isOpen && (
        <div className="mb-3 w-80 rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden text-white animate-in fade-in zoom-in-95 duration-200">
          <div className="p-4 bg-gradient-to-r from-emerald-600 to-teal-700 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-white rotate-45" />
              </div>
              <div>
                <h4 className="font-display font-black text-sm">Muscle Avenue Support</h4>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-100">
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                  <span>Online & Ready to Help</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 space-y-3 bg-slate-900/90 text-xs">
            <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60 text-slate-300 text-xs leading-relaxed">
              👋 Hey Athlete! Have questions about imported Whey, Creatine dosage, Pre-Workouts, or Self Pickup? Chat directly with our certified supplement specialists!
            </div>

            <div className="space-y-2">
              <a
                href={`https://wa.me/${storeInfo.whatsappRaw}?text=Hi%20Muscle%20Avenue%20Supplements,%20I%20want%20to%20inquire%20about%20your%20genuine%20supplements`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp: {storeInfo.whatsapp}</span>
              </a>

              <a
                href={`tel:${storeInfo.phone}`}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-slate-700 transition-all"
              >
                <Phone className="w-4 h-4 text-sky-400" />
                <span>Call Hotline: {storeInfo.phoneFormatted}</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Contact via WhatsApp"
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-xl shadow-emerald-600/30 hover:shadow-emerald-600/50 flex items-center justify-center hover:scale-110 active:scale-95 transition-all group relative border-2 border-white/20"
      >
        <MessageSquare className="w-7 h-7 fill-white/20 stroke-[2.2]" />
        
        {/* Pulsing ring */}
        <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-25 pointer-events-none" />

        {/* Small badge */}
        <span className="absolute -top-1 -left-1 px-1.5 py-0.5 rounded-full bg-sky-500 text-slate-950 font-black text-[9px] uppercase tracking-wider shadow">
          Chat
        </span>
      </button>
    </div>
  );
}

