import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  Store, 
  Truck, 
  CreditCard, 
  Banknote, 
  Smartphone, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  MapPin,
  Clock,
  Phone,
  Lock
} from 'lucide-react';

export default function CheckoutModal() {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cart, 
    cartSubtotal, 
    placeOrder, 
    storeInfo, 
    theme,
    openOrderTracker
  } = useStore();

  const isDark = theme === 'dark';

  // Form states
  const [orderType, setOrderType] = useState('delivery'); // 'delivery' or 'pickup'
  const [paymentMethod, setPaymentMethod] = useState('koko'); // 'card', 'cod', 'koko'
  
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [city, setCity] = useState('');
  const [notes, setNotes] = useState('');

  // Card details
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // Success state
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  const isFreeDelivery = orderType === 'pickup' || cartSubtotal >= storeInfo.freeShippingThreshold;
  const deliveryFee = isFreeDelivery ? 0 : storeInfo.islandwideShippingFee;
  const totalAmount = cartSubtotal + deliveryFee;
  const kokoInstallment = Math.round(totalAmount / 3);

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (!customerName || !phone) {
      alert('Please provide your name and contact phone number.');
      return;
    }
    if (orderType === 'delivery' && !deliveryAddress) {
      alert('Please provide your delivery address.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const order = placeOrder({
        customerName,
        phone,
        email,
        orderType,
        deliveryAddress: orderType === 'pickup' ? storeInfo.address : deliveryAddress,
        city: city || 'Colombo',
        paymentMethod,
        totalAmount,
        notes
      });
      setIsSubmitting(false);
      setConfirmedOrder(order);
    }, 1000);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setConfirmedOrder(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div 
        className={`relative w-full max-w-3xl rounded-3xl border overflow-hidden shadow-2xl my-6 transition-colors ${
          isDark 
            ? 'bg-slate-900 border-slate-700 text-slate-100' 
            : 'bg-white border-slate-200 text-slate-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800/80 flex items-center justify-between bg-gradient-to-r from-sky-500/10 to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500 flex items-center justify-center text-slate-950 font-bold">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-black text-xl leading-tight text-slate-900 dark:text-white">
                Secure Checkout & Payment
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Muscle Avenue Supplements &bull; 100% Genuine Guaranteed
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-sky-500 hover:text-slate-950 flex items-center justify-center transition-colors text-slate-700 dark:text-slate-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* If Order is Confirmed Screen */}
        {confirmedOrder ? (
          <div className="p-8 text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 block mb-1">
                Order Successfully Placed!
              </span>
              <h2 className="font-display font-black text-2xl md:text-3xl text-slate-900 dark:text-white">
                Thank You, {confirmedOrder.customerName}!
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto mt-2">
                Your supplement order has been recorded. Our store representative will verify your stock and dispatch via {confirmedOrder.orderType === 'pickup' ? 'Self Pickup' : 'Courier Delivery'}.
              </p>
            </div>

            {/* Order Receipt Box */}
            <div className="max-w-md mx-auto p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/70 text-left space-y-3 text-xs shadow-sm">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-700">
                <span className="text-slate-500 dark:text-slate-400">Order Reference ID:</span>
                <span className="font-mono font-black text-sky-500 text-sm">
                  {confirmedOrder.id}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-slate-400">Fulfillment Method:</span>
                <span className="font-bold text-slate-900 dark:text-white capitalize">{confirmedOrder.orderType === 'pickup' ? 'Self Pick Up' : 'Courier Delivery'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-slate-400">Payment Option:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 uppercase">{confirmedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-slate-400">Total Payable:</span>
                <span className="font-display font-black text-base text-slate-900 dark:text-white">
                  Rs. {confirmedOrder.totalAmount.toLocaleString()}
                </span>
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400">
                {confirmedOrder.orderType === 'pickup' ? (
                  <span>Pickup Location: <strong>{storeInfo.address}</strong> (Hours: {storeInfo.openingHours})</span>
                ) : (
                  <span>Deliver To: <strong>{confirmedOrder.deliveryAddress}</strong></span>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  handleClose();
                  openOrderTracker(confirmedOrder.id);
                }}
                className="px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-slate-950 font-display font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all"
              >
                <Truck className="w-4 h-4" />
                <span>Track Order Live Timeline</span>
              </button>

              <a
                href={`https://wa.me/${storeInfo.whatsappRaw}?text=Hi%20Muscle%20Avenue%20Supplements,%20I%20just%20placed%20order%20${confirmedOrder.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-display font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md"
              >
                <span>WhatsApp Confirmation</span>
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmitOrder} className="p-6 md:p-8 space-y-6">
            
            {/* Step 1: Choose Order Type (Pickup or Delivery) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-3">
                1. Select Fulfillment Mode:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Delivery Option */}
                <div
                  onClick={() => setOrderType('delivery')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    orderType === 'delivery'
                      ? 'bg-sky-500/15 border-sky-500 text-slate-900 dark:text-white shadow-md'
                      : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-500'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 font-display font-bold text-sm">
                      <Truck className={`w-5 h-5 ${orderType === 'delivery' ? 'text-sky-500' : 'text-slate-400'}`} />
                      <span>Islandwide Delivery</span>
                    </div>
                    <span className="text-[11px] font-bold text-sky-500 dark:text-sky-400">
                      {isFreeDelivery ? 'FREE' : `Rs. ${storeInfo.islandwideShippingFee}`}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Doorstep courier delivery across Sri Lanka within 24 - 48 hours.
                  </p>
                </div>

                {/* Self Pickup Option */}
                <div
                  onClick={() => setOrderType('pickup')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    orderType === 'pickup'
                      ? 'bg-sky-500/15 border-sky-500 text-slate-900 dark:text-white shadow-md'
                      : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-500'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 font-display font-bold text-sm">
                      <Store className={`w-5 h-5 ${orderType === 'pickup' ? 'text-sky-500' : 'text-slate-400'}`} />
                      <span>Self Pick Up (Store)</span>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                      FREE
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Collect from Muscle Avenue Flagship Store (Colombo 03) in ~2 hours.
                  </p>
                </div>
              </div>
            </div>

            {/* Self Pickup Store Location Details Banner */}
            {orderType === 'pickup' && (
              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-sky-500 dark:text-sky-400">
                  <MapPin className="w-4 h-4" />
                  <span>Pickup Counter Address:</span>
                </div>
                <p>{storeInfo.address}</p>
                <p className="text-slate-500 dark:text-slate-400 text-[11px]">Timings: {storeInfo.openingHours} &bull; Hotline: {storeInfo.phoneFormatted}</p>
              </div>
            )}

            {/* Step 2: Customer Contact & Delivery Info */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-3">
                2. Contact & Recipient Details:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Full Name *"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:border-sky-500 outline-none"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number (e.g. 077XXXXXXX) *"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:border-sky-500 outline-none"
                  />
                </div>
              </div>

              <div className="mb-3">
                <input
                  type="email"
                  placeholder="Email Address (for invoice & tracking updates)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:border-sky-500 outline-none"
                />
              </div>

              {orderType === 'delivery' && (
                <div className="space-y-3">
                  <textarea
                    required
                    rows={2}
                    placeholder="Complete Delivery Street Address (House No, Street, Landmark) *"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:border-sky-500 outline-none resize-none"
                  />
                  <input
                    type="text"
                    placeholder="City / District (e.g. Colombo, Kandy, Gampaha, Galle)"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:border-sky-500 outline-none"
                  />
                </div>
              )}
            </div>

            {/* Step 3: Payment Method */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-3">
                3. Select Payment Method:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                {/* Koko Pay */}
                <div
                  onClick={() => setPaymentMethod('koko')}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'koko'
                      ? 'bg-emerald-500/15 border-emerald-500 text-slate-900 dark:text-white shadow-md'
                      : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <img src="/koko-logo.jpg" alt="Koko Pay" className="h-6 w-auto object-contain bg-white rounded px-1" />
                      <span className="font-black text-xs uppercase text-emerald-600 dark:text-emerald-400">Koko Pay</span>
                    </div>
                    <span className="text-[10px] bg-emerald-500 text-slate-950 font-black px-1.5 py-0.2 rounded">
                      3 Parts
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Pay <strong>Rs. {kokoInstallment.toLocaleString()}</strong> today + 2 monthly installments. 0% Interest.
                  </p>
                </div>

                {/* Online Card */}
                <div
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'card'
                      ? 'bg-sky-500/15 border-sky-500 text-slate-900 dark:text-white shadow-md'
                      : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs">Card Payment</span>
                    <img src="/visa-mastercard.png" alt="Visa & Mastercard" className="h-5 w-auto object-contain" />
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Visa, MasterCard, Amex via secure 256-bit encrypted gateway.
                  </p>
                </div>

                {/* Cash on Delivery */}
                <div
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'cod'
                      ? 'bg-amber-500/15 border-amber-500 text-slate-900 dark:text-white shadow-md'
                      : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs">{orderType === 'pickup' ? 'Cash at Store' : 'Cash On Delivery'}</span>
                    <Banknote className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Pay with cash upon package receipt or store pickup collection.
                  </p>
                </div>
              </div>

              {/* Online Card Inputs (if selected) */}
              {paymentMethod === 'card' && (
                <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                    <span>Cardholder Information:</span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-bold">
                      <Lock className="w-3 h-3" /> SSL 256-Bit Encrypted
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder="Card Number (4000 1234 5678 9010)"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    maxLength={19}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-mono"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      maxLength={5}
                      className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-mono"
                    />
                    <input
                      type="password"
                      placeholder="CVV / CVC"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      maxLength={4}
                      className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-mono"
                    />
                  </div>
                </div>
              )}

              {/* Koko Explanation */}
              {paymentMethod === 'koko' && (
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                  <Smartphone className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-emerald-600 dark:text-emerald-400">Koko Buy Now, Pay Later:</strong>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      You will receive an instant payment request link on your mobile number ({phone || 'your phone'}). Pay 1/3 today (Rs. {kokoInstallment.toLocaleString()}), and remaining over 60 days.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Order Price Breakdown & Submit */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400">
                <span>Items Subtotal:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">Rs. {cartSubtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400">
                <span>Fulfillment ({orderType === 'pickup' ? 'Self Pickup' : 'Islandwide Courier'}):</span>
                <span>{deliveryFee === 0 ? <strong className="text-emerald-600 dark:text-emerald-400">FREE</strong> : `Rs. ${deliveryFee}`}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-800">
                <span>Total Amount:</span>
                <span className="font-display font-black text-xl text-sky-600 dark:text-sky-400">
                  Rs. {totalAmount.toLocaleString()}
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-4 py-3.5 px-4 rounded-xl font-display font-black text-sm uppercase tracking-wider bg-gradient-to-r from-sky-400 to-blue-600 hover:from-sky-500 hover:to-blue-700 text-slate-950 shadow-xl shadow-sky-500/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-98 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Processing Your Order...</span>
                ) : (
                  <>
                    <span>Confirm Order ({paymentMethod.toUpperCase()})</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}



