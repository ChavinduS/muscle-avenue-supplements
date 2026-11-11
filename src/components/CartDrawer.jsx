import React from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  Truck, 
  Store, 
  ShieldCheck, 
  Tag, 
  Clock,
  Package
} from 'lucide-react';

export default function CartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    cartSubtotal,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    setIsCheckoutOpen,
    storeInfo,
    theme
  } = useStore();

  if (!isCartOpen) return null;

  const isDark = theme === 'dark';
  const freeShipping = cartSubtotal >= storeInfo.freeShippingThreshold;
  const remainingForFreeShipping = Math.max(0, storeInfo.freeShippingThreshold - cartSubtotal);

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`relative w-full max-w-md h-full shadow-2xl flex flex-col z-10 transition-colors ${
          isDark 
            ? 'bg-slate-900 border-l border-slate-800 text-slate-100' 
            : 'bg-white border-l border-slate-200 text-slate-900'
        }`}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-sky-500/20 flex items-center justify-center text-sky-500">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-extrabold text-lg leading-none">
                Your Supplement Cart
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {cart.length} item{cart.length === 1 ? '' : 's'} added
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs text-slate-400 hover:text-red-400 font-semibold px-2 py-1 rounded"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setIsCartOpen(false)}
              className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-sky-500 hover:text-slate-950 flex items-center justify-center transition-colors text-slate-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Free Shipping Progress */}
        <div className="p-4 bg-sky-500/10 border-b border-sky-500/20 text-xs">
          {freeShipping ? (
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <Truck className="w-4 h-4" />
              <span>You have unlocked FREE Islandwide Delivery!</span>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-1.5 text-slate-300 font-medium">
                <span>Add <strong>Rs. {remainingForFreeShipping.toLocaleString()}</strong> more for Free Delivery!</span>
                <span className="font-bold text-sky-400">
                  {Math.round((cartSubtotal / storeInfo.freeShippingThreshold) * 100)}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-sky-400 to-cyan-400 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (cartSubtotal / storeInfo.freeShippingThreshold) * 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Items List */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <ShoppingCart className="w-14 h-14 mx-auto mb-3 opacity-30 text-sky-500" />
              <p className="font-display font-bold text-base text-slate-300 mb-1">
                Your cart is empty!
              </p>
              <p className="text-xs max-w-xs mx-auto mb-6">
                Explore our authentic Creatines, Whey Proteins, Pre-Workouts and Gym Accessories.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-sky-500 hover:bg-sky-600 text-slate-950 transition-colors shadow-md"
              >
                Browse Supplements
              </button>
            </div>
          ) : (
            cart.map(item => (
              <div
                key={item.cartItemId}
                className={`p-3.5 rounded-2xl border flex gap-3 transition-colors ${
                  isDark ? 'bg-slate-800/60 border-slate-700/60' : 'bg-slate-50 border-slate-200'
                }`}
              >
                {/* Thumbnail */}
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-white shrink-0 relative">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain p-1"
                    />
                  ) : (
                    <Package className="absolute inset-0 m-auto w-8 h-8 text-slate-300" aria-label="No product image" />
                  )}
                  {item.isPreOrder && (
                    <span className="absolute bottom-0 inset-x-0 bg-purple-700/90 text-white text-[9px] font-black uppercase text-center py-0.5">
                      Pre-Order
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <span className="text-[10px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                        {item.brand}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="text-slate-500 hover:text-red-400 transition-colors p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <h4 className="font-display font-bold text-xs sm:text-sm line-clamp-1 text-slate-900 dark:text-white">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Variant: <span className="font-semibold text-slate-800 dark:text-slate-300">{item.flavor}</span>
                    </p>
                  </div>

                  {/* Quantity & Price */}
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200 dark:border-slate-700/50">
                    <div className="flex items-center border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-100 dark:bg-slate-900/60 text-slate-900 dark:text-white">
                      <button
                        onClick={() => updateCartQuantity(item.cartItemId, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center text-xs text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-7 text-center font-display font-bold text-xs">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.cartItemId, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center text-xs text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="font-display font-black text-sm text-sky-600 dark:text-sky-400">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Summary */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-950/40 space-y-3">
            {/* Subtotal */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500 dark:text-slate-400">Subtotal:</span>
              <span className="font-display font-black text-lg text-slate-900 dark:text-white">
                Rs. {cartSubtotal.toLocaleString()}
              </span>
            </div>

            {/* Delivery Notice */}
            <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
              <span>Order Fulfillment:</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                Self Pickup (Free) or Delivery
              </span>
            </div>

            {/* Koko Banner */}
            <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between text-xs">
              <span className="text-slate-700 dark:text-slate-300">Pay 3 x <strong>Rs. {Math.round(cartSubtotal / 3).toLocaleString()}</strong></span>
              <div className="flex items-center gap-1.5 bg-white rounded-md px-1.5 py-0.5 border border-slate-200 shadow-sm"><img src="/koko-logo.jpg" alt="Koko Pay" className="h-5 w-auto object-contain" /><span className="text-[10px] font-black text-emerald-700">3x</span></div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleProceedCheckout}
              className="w-full py-3.5 px-4 rounded-xl font-display font-black text-sm uppercase tracking-wider bg-gradient-to-r from-sky-400 to-blue-600 hover:from-sky-500 hover:to-blue-700 text-slate-950 shadow-xl shadow-sky-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

