import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Star, ShoppingCart, Clock, ShieldCheck, Truck, Store, Zap, Check, ArrowRight, Package } from 'lucide-react';

export default function ProductDetailModal() {
  const { selectedProduct, setSelectedProduct, addToCart, theme, navigateToCategory } = useStore();
  const isDark = theme === 'dark';

  if (!selectedProduct) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedFlavor, setSelectedFlavor] = useState(
    selectedProduct.flavors && selectedProduct.flavors.length > 0 ? selectedProduct.flavors[0] : 'Standard'
  );
  const [added, setAdded] = useState(false);

  const price = selectedProduct.offerPrice || selectedProduct.price;
  const isOutOfStock = selectedProduct.stock <= 0;
  const kokoInstallment = Math.round(price / 3);

  const handleAdd = (isPreOrder = false) => {
    addToCart(selectedProduct, selectedFlavor, quantity, isPreOrder);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setSelectedProduct(null);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div 
        className={`relative w-full max-w-4xl rounded-3xl border overflow-hidden shadow-2xl my-8 transition-colors ${
          isDark 
            ? 'bg-slate-900 border-slate-700 text-slate-100' 
            : 'bg-white border-slate-200 text-slate-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-950/50 hover:bg-sky-500 text-white hover:text-slate-950 flex items-center justify-center transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column: Image & Badges */}
          <div className="p-6 md:p-8 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950/30 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800">
            <div className="relative w-full aspect-square max-w-sm rounded-2xl overflow-hidden shadow-inner bg-white">
              {selectedProduct.image ? (
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className={`w-full h-full object-contain ${
                    selectedProduct.id === 'prod-pw-1' ? 'scale-[1.15]' : 'p-4'
                  }`}
                />
              ) : (
                <Package className="absolute inset-0 m-auto w-20 h-20 text-slate-300" aria-label="No product image" />
              )}
              {selectedProduct.discountPercent > 0 && (
                <span className="absolute top-3 left-3 px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider bg-red-600 text-white shadow-md">
                  {selectedProduct.discountPercent}% OFF
                </span>
              )}
            </div>

            {/* Quick Guarantees */}
            <div className="grid grid-cols-2 gap-3 w-full mt-6 text-xs">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>100% Original Imported</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                <Store className="w-4 h-4 shrink-0" />
                <span>Self Pickup Available</span>
              </div>
            </div>
          </div>

          {/* Right Column: Details & Actions */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              {/* Category & Brand tags */}
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase bg-sky-500/20 text-sky-600 dark:text-sky-400 border border-sky-500/30">
                  {selectedProduct.brand}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 capitalize">
                  {selectedProduct.category.replace('-', ' ')}
                </span>
              </div>

              {/* Title */}
              <h2 className="font-display font-extrabold text-2xl md:text-3xl leading-snug mb-2 text-slate-900 dark:text-white">
                {selectedProduct.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(selectedProduct.rating) ? 'fill-amber-500' : 'text-slate-300 dark:text-slate-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-bold text-sm text-slate-800 dark:text-slate-200">{selectedProduct.rating.toFixed(1)}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">({selectedProduct.reviewsCount} verified customer reviews)</span>
              </div>

              {/* Pricing & Koko Pay */}
              <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/20 mb-5">
                <div className="flex items-baseline gap-3 mb-1.5">
                  <span className="font-display font-black text-3xl text-sky-600 dark:text-sky-400">
                    Rs. {price.toLocaleString()}
                  </span>
                  {selectedProduct.offerPrice && (
                    <span className="text-base line-through text-slate-400 dark:text-slate-500">
                      Rs. {selectedProduct.price.toLocaleString()}
                    </span>
                  )}
                </div>
                {/* Koko Pay installment banner */}
                <div className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                  <div className="bg-white rounded px-1.5 py-0.5 border border-slate-200 shadow-sm flex items-center gap-1">
                    <img src="/koko-logo.jpg" alt="Koko Pay" className="h-5 w-auto object-contain" />
                    <span className="text-[10px] font-black text-emerald-700">3x</span>
                  </div>
                  <span>Or 3 interest-free installments of <strong>Rs. {kokoInstallment.toLocaleString()}</strong></span>
                </div>
              </div>

              {/* Stock availability */}
              <div className="mb-5 flex items-center justify-between p-3 rounded-xl bg-slate-100 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 text-xs">
                <span className="text-slate-600 dark:text-slate-400">Stock Availability:</span>
                {isOutOfStock ? (
                  <span className="font-bold text-purple-600 dark:text-purple-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> Out of stock - Pre-Order Open
                  </span>
                ) : (
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> {selectedProduct.stock} units currently in stock
                  </span>
                )}
              </div>

              {/* Flavors Selector */}
              {selectedProduct.flavors && selectedProduct.flavors.length > 0 && (
                <div className="mb-5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                    Select Flavor / Variant:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.flavors.map(flavor => (
                      <button
                        key={flavor}
                        type="button"
                        onClick={() => setSelectedFlavor(flavor)}
                        className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                          selectedFlavor === flavor
                            ? 'bg-sky-500 text-slate-950 border-sky-500 font-bold shadow-md'
                            : isDark
                            ? 'bg-slate-800 border-slate-700 text-slate-300 hover:border-sky-500/50'
                            : 'bg-slate-100 border-slate-300 text-slate-700 hover:border-sky-500/50'
                        }`}
                      >
                        {flavor}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mb-5 leading-relaxed">
                {selectedProduct.description}
              </p>

              {/* Supplement Facts / Specs Preview */}
              {selectedProduct.supplementFacts && (
                <div className="mb-6 p-4 rounded-xl bg-slate-100 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/40">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-2">
                    Key Supplement Profile:
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {Object.entries(selectedProduct.supplementFacts).map(([key, val]) => (
                      <div key={key} className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800">
                        <span className="text-slate-600 dark:text-slate-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                        <span className="font-semibold text-slate-900 dark:text-slate-200">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-4 mb-4">
                {/* Quantity */}
                <div className="flex items-center border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-100 dark:bg-slate-800/60 p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-display font-bold text-sm text-slate-900 dark:text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart or Pre-order */}
                {isOutOfStock || selectedProduct.isPreOrder ? (
                  <button
                    onClick={() => handleAdd(true)}
                    className="flex-1 py-3.5 px-6 rounded-xl font-display font-bold text-sm uppercase tracking-wider bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Clock className="w-4 h-4" />
                    <span>{added ? 'Pre-Order Added!' : 'Pre-Order Now'}</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleAdd(false)}
                    className="flex-1 py-3.5 px-6 rounded-xl font-display font-bold text-sm uppercase tracking-wider bg-gradient-to-r from-sky-400 to-blue-600 hover:from-sky-500 hover:to-blue-700 text-slate-950 shadow-lg shadow-sky-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>{added ? 'Added to Cart!' : 'Add to Cart'}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
