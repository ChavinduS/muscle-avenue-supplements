import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  Truck, 
  CheckCircle2, 
  Clock, 
  Package, 
  Search, 
  MapPin, 
  Store, 
  CreditCard, 
  Phone, 
  MessageSquare,
  ExternalLink
} from 'lucide-react';

export default function OrderTrackerModal() {
  const { 
    isOrderTrackerOpen, 
    setIsOrderTrackerOpen, 
    orders, 
    trackingOrderId, 
    setTrackingOrderId,
    storeInfo,
    theme 
  } = useStore();

  const [searchInput, setSearchInput] = useState(trackingOrderId || '');
  const isDark = theme === 'dark';

  if (!isOrderTrackerOpen) return null;

  // Find order by ID
  const selectedOrder = orders.find(
    o => o.id.toLowerCase() === (searchInput || trackingOrderId).trim().toLowerCase()
  ) || orders[0];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setTrackingOrderId(searchInput.trim().toUpperCase());
    }
  };

  const isPickup = selectedOrder?.orderType === 'pickup';

  // Calculate timeline steps
  const steps = selectedOrder?.trackingSteps || [
    { step: 'Order Placed', time: 'Completed', completed: true },
    { step: 'Payment Verified', time: 'Completed', completed: true },
    { step: 'Order Packed', time: selectedOrder?.status === 'Packed' || selectedOrder?.status === 'Shipped' || selectedOrder?.status === 'Delivered' ? 'Completed' : 'Pending', completed: selectedOrder?.status === 'Packed' || selectedOrder?.status === 'Shipped' || selectedOrder?.status === 'Delivered' },
    { step: isPickup ? 'Ready for Pickup' : 'Out for Delivery', time: selectedOrder?.status === 'Shipped' || selectedOrder?.status === 'Delivered' ? 'In Transit' : 'Pending', completed: selectedOrder?.status === 'Shipped' || selectedOrder?.status === 'Delivered' },
    { step: isPickup ? 'Collected' : 'Delivered', time: selectedOrder?.status === 'Delivered' ? 'Delivered' : 'Pending', completed: selectedOrder?.status === 'Delivered' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div 
        className={`relative w-full max-w-2xl rounded-3xl border overflow-hidden shadow-2xl my-6 transition-colors ${
          isDark 
            ? 'bg-slate-900 border-slate-700 text-slate-100' 
            : 'bg-white border-slate-200 text-slate-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-800/80 flex items-center justify-between bg-gradient-to-r from-sky-500/10 to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white">
                Order Timeline & Tracking
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Live delivery status & pickup updates for your supplements
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsOrderTrackerOpen(false)}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 hover:dark:bg-sky-500 hover:text-slate-950 flex items-center justify-center transition-colors text-slate-700 dark:text-slate-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search by Order ID */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800/60">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Enter Order ID (e.g. MA-9841)"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm border outline-none font-mono ${
                  isDark
                    ? 'bg-slate-800/80 border-slate-700 text-slate-100 focus:border-sky-500'
                    : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-sky-500'
                }`}
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl font-display font-bold text-xs uppercase tracking-wider bg-sky-500 hover:bg-sky-600 text-slate-950 transition-colors shadow-md"
            >
              Track
            </button>
          </form>

          {/* Quick Order Selector */}
          {orders.length > 0 && (
            <div className="flex items-center gap-2 mt-3 overflow-x-auto text-[11px]">
              <span className="text-slate-500 dark:text-slate-400 shrink-0">Recent Orders:</span>
              {orders.slice(0, 4).map(o => (
                <button
                  key={o.id}
                  onClick={() => {
                    setSearchInput(o.id);
                    setTrackingOrderId(o.id);
                  }}
                  className={`px-2.5 py-1 rounded-lg border font-mono transition-colors shrink-0 ${
                    selectedOrder?.id === o.id
                      ? 'bg-sky-500/20 border-sky-500 text-sky-600 dark:text-sky-400 font-bold'
                      : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-500'
                  }`}
                >
                  {o.id} ({o.status})
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Order Details & Timeline */}
        {selectedOrder ? (
          <div className="p-6 space-y-6">
            
            {/* Top Order Badge Banner */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 shadow-sm">
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400">Tracking Order:</span>
                <div className="font-display font-black text-xl text-sky-600 dark:text-sky-400 tracking-wider">
                  {selectedOrder.id}
                </div>
                <div className="text-xs text-slate-700 dark:text-slate-300">
                  Recipient: <strong className="text-slate-900 dark:text-white">{selectedOrder.customerName}</strong> ({selectedOrder.phone})
                </div>
              </div>

              <div className="text-right">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                  selectedOrder.status === 'Delivered'
                    ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/40'
                    : selectedOrder.status === 'Packed'
                    ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/40'
                    : 'bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/40'
                }`}>
                  <span className="w-2 h-2 rounded-full bg-current animate-ping" />
                  Status: {selectedOrder.status}
                </span>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Type: <strong className="text-sky-500 dark:text-sky-400 uppercase">{selectedOrder.orderType === 'pickup' ? 'Self Pick Up' : 'Islandwide Delivery'}</strong>
                </div>
              </div>
            </div>

            {/* Stepped Timeline */}
            <div>
              <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-4">
                Delivery Timeline Progress:
              </h4>

              <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-300 dark:before:bg-slate-700">
                {steps.map((st, idx) => {
                  const isLast = idx === steps.length - 1;
                  return (
                    <div key={idx} className="relative flex items-start gap-4">
                      {/* Step Circle Indicator */}
                      <div className={`absolute -left-6 top-0.5 w-6 h-6 rounded-full flex items-center justify-center ring-4 transition-all ${
                        isDark ? 'ring-slate-900' : 'ring-white'
                      } ${
                        st.completed 
                          ? 'bg-sky-500 text-slate-950 font-bold' 
                          : 'bg-slate-300 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                      }`}>
                        {st.completed ? (
                          <CheckCircle2 className="w-4 h-4 fill-slate-950 stroke-sky-500" />
                        ) : (
                          <span className="text-[10px]">{idx + 1}</span>
                        )}
                      </div>

                      {/* Step Text Info */}
                      <div className="flex-1">
                        <div className="flex items-baseline justify-between">
                          <span className={`font-display font-bold text-sm ${
                            st.completed ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'
                          }`}>
                            {st.step}
                          </span>
                          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                            {st.time}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                          {idx === 0 && 'Order registered on Muscle Avenue Supplements system.'}
                          {idx === 1 && `Payment confirmed via ${selectedOrder.paymentMethod.toUpperCase()} (${selectedOrder.paymentStatus}).`}
                          {idx === 2 && 'Supplements verified for authenticity, batch codes checked, and safely packed in sealed box.'}
                          {idx === 3 && (isPickup ? 'Package is staged at Muscle Avenue Flagship Store pickup desk ready for collection.' : 'Handed over to islandwide express courier partner for rapid doorstep dispatch.')}
                          {idx === 4 && (isPickup ? 'Order successfully picked up by customer from store counter.' : 'Delivered to customer address.')}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Delivery / Store Address Information */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 text-xs">
              <div className="flex items-center gap-2 text-sky-500 dark:text-sky-400 font-bold mb-1">
                {isPickup ? <Store className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
                <span>{isPickup ? 'Self Pick Up Location:' : 'Delivery Destination Address:'}</span>
              </div>
              <p className="text-slate-800 dark:text-slate-200">
                {selectedOrder.deliveryAddress}
              </p>
              {isPickup && (
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  Opening Hours: {storeInfo.openingHours} • Bring your Order ID ({selectedOrder.id}) when picking up.
                </p>
              )}
            </div>

            {/* Ordered Items Summary */}
            <div className="border-t border-slate-200 dark:border-slate-800 pt-4">
              <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-400 mb-2">
                <span>Items in Order ({selectedOrder.items?.length || 0})</span>
                <span className="text-sky-500 font-display font-black text-sm">
                  Total: Rs. {selectedOrder.totalAmount?.toLocaleString()}
                </span>
              </div>
              <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                {selectedOrder.items?.map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-transparent">
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-slate-200 line-clamp-1">{item.name}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">Flavor: {item.flavor || 'Standard'} • Qty: {item.quantity}</div>
                    </div>
                    <span className="font-mono text-sky-600 dark:text-sky-400 font-semibold">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Need Direct Help Banner */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs">
              <span className="text-slate-700 dark:text-slate-300 font-medium">
                Need immediate update on this order?
              </span>
              <a
                href={`https://wa.me/${storeInfo.whatsappRaw}?text=Hi%20Muscle%20Avenue%20Supplements,%20checking%20status%20for%20order%20${selectedOrder.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-1.5 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Query</span>
              </a>
            </div>

          </div>
        ) : (
          <div className="p-8 text-center text-slate-500 dark:text-slate-400">
            <Package className="w-12 h-12 mx-auto mb-3 text-slate-400 dark:text-slate-600" />
            <p className="font-bold text-sm text-slate-800 dark:text-slate-200">Order not found</p>
            <p className="text-xs">Please verify your order number or check recent orders above.</p>
          </div>
        )}
      </div>
    </div>
  );
}

