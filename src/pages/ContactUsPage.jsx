import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Phone, 
  MessageSquare, 
  MapPin, 
  Clock, 
  Mail, 
  Send, 
  CheckCircle2, 
  Store, 
  Truck, 
  CreditCard,
  ChevronDown,
  HelpCircle
} from 'lucide-react';

export default function ContactUsPage() {
  const { storeInfo, theme } = useStore();
  const isDark = theme === 'dark';

  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formSubject, setFormSubject] = useState('Stock Inquiry');
  const [formMessage, setFormMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => {
      setFormName('');
      setFormPhone('');
      setFormMessage('');
    }, 1500);
  };

  const faqs = [
    {
      q: 'How fast is Islandwide Delivery in Sri Lanka?',
      a: 'We dispatch all confirmed supplement orders via express courier within 24 hours. Delivery takes 1-2 business days to major cities (Colombo, Kandy, Gampaha, Galle) and 2-3 days for outstation areas.'
    },
    {
      q: 'How does Self Pick Up work?',
      a: 'Choose "Self Pick Up" at checkout. Your order will be prepared, verified, and placed at our Colombo 03 flagship store counter within 2 hours. Bring your Order ID to collect free of any shipping charges.'
    },
    {
      q: 'How does Koko Pay 3-installment payment work?',
      a: 'Select Koko Pay at checkout. You only pay 1/3 of the total amount today using your debit or credit card, and the remaining 2 payments are automatically split across the next 60 days with 0% interest!'
    },
    {
      q: 'Are your supplements 100% genuine and original?',
      a: 'Yes, 100% Guaranteed. We only import original, factory-sealed supplements from authorized distributors of Applied Nutrition UK, Optimum Nutrition USA, Cellucor, Muscletech, and Wellcore. Every container includes verified batch codes.'
    }
  ];

  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-500/20 text-sky-600 dark:text-sky-400 border border-sky-500/30">
          <Phone className="w-3.5 h-3.5" />
          <span>Get Support & Store Contacts</span>
        </div>
        <h1 className="font-display font-black text-3xl sm:text-4xl text-slate-900 dark:text-white">
          Contact Muscle Avenue Supplements
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Have questions about supplement availability, self-pickup reservations, or order tracking? Reach out to our athlete support desk.
        </p>
      </div>

      {/* Primary Contact Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* WhatsApp Card */}
        <div className="p-6 md:p-8 rounded-3xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Instant Chat</span>
              <h3 className="font-display font-black text-xl text-slate-900 dark:text-white">WhatsApp Support</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Fastest response for stock inquiries, batch checks, and pickup orders.
            </p>
            <div className="font-display font-black text-xl text-emerald-600 dark:text-emerald-400">
              {storeInfo.whatsapp}
            </div>
          </div>

          <a
            href={`https://wa.me/${storeInfo.whatsappRaw}?text=Hi%20Muscle%20Avenue%20Supplements,%20I%20am%20inquiring%20about%20supplements`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Open WhatsApp Chat</span>
          </a>
        </div>

        {/* Phone Call Card */}
        <div className="p-6 md:p-8 rounded-3xl bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-500/30 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-sky-600 dark:text-sky-400">Direct Hotline</span>
              <h3 className="font-display font-black text-xl text-slate-900 dark:text-white">Phone Support</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Speak directly with our nutritionists and sales counter representatives.
            </p>
            <div className="font-display font-black text-xl text-sky-600 dark:text-sky-400">
              {storeInfo.phoneFormatted}
            </div>
          </div>

          <a
            href={`tel:${storeInfo.phone}`}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-400 to-blue-600 hover:from-sky-500 hover:to-blue-700 text-slate-950 font-display font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 transition-all"
          >
            <Phone className="w-4 h-4" />
            <span>Call {storeInfo.phoneFormatted}</span>
          </a>
        </div>

        {/* Flagship Store Card */}
        <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center">
              <Store className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">Flagship Counter</span>
              <h3 className="font-display font-black text-xl text-slate-900 dark:text-white">Colombo Store</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {storeInfo.address}
            </p>
            <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 pt-1">
              <Clock className="w-3.5 h-3.5 text-sky-500" />
              <span>{storeInfo.openingHours}</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-[11px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Store Open for Self Pickups</span>
          </div>
        </div>

      </div>

      {/* Contact Form & FAQs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Support Message Form */}
        <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="font-display font-black text-xl text-slate-900 dark:text-white mb-2">
            Send an Inquiry
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-6">
            Leave a message and our support team will get back to you via WhatsApp or phone.
          </p>

          {isSent ? (
            <div className="p-6 text-center rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 space-y-2">
              <CheckCircle2 className="w-10 h-10 mx-auto" />
              <h4 className="font-display font-bold text-base">Inquiry Sent Successfully!</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                We will reply to your contact number shortly. You can also message on WhatsApp for instant assistance.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sahan Perera"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Phone Number (WhatsApp) *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 077XXXXXXX"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Inquiry Topic</label>
                <select
                  value={formSubject}
                  onChange={(e) => setFormSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none"
                >
                  <option value="Stock Inquiry">Stock & Available Quantity Inquiry</option>
                  <option value="Self Pickup Reservation">Self Pick Up Order Reservation</option>
                  <option value="Pre-Order Request">Pre-Order An Incoming Brand/Item</option>
                  <option value="Payment / Koko Pay">Payment / Koko Pay Question</option>
                  <option value="Authenticity Check">Authenticity & Batch Code Verification</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Message Details</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Write your supplement questions or order details..."
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none resize-none focus:border-sky-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-display font-black text-xs uppercase tracking-wider bg-sky-500 hover:bg-sky-600 text-slate-950 transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>

        {/* Frequently Asked Questions */}
        <div className="space-y-4">
          <div className="mb-4">
            <h3 className="font-display font-black text-xl text-slate-900 dark:text-white mb-1">
              Frequently Asked Questions
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Instant answers about orders, payments, and store pickups.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                  className="w-full flex items-center justify-between text-left font-display font-bold text-sm text-slate-900 dark:text-white"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-sky-500 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && (
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 leading-relaxed">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}


