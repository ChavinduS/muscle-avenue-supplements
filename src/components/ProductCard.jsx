import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingCart, Clock, Star, Zap, Check, Eye, Package } from 'lucide-react';

export default function ProductCard({ product }) {
  const { addToCart, setSelectedProduct, theme } = useStore();
  const [selectedFlavor, setSelectedFlavor] = useState(
    product.flavors && product.flavors.length > 0 ? product.flavors[0] : ''
  );
  const [isAddedAnim, setIsAddedAnim] = useState(false);
  const isDark = theme === 'dark';

  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;
  const hasOffer = product.offerPrice && product.offerPrice < product.price;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, selectedFlavor, 1, false);
    setIsAddedAnim(true);
    setTimeout(() => setIsAddedAnim(false), 1500);
  };

  const handlePreOrder = (e) => {
    e.stopPropagation();
    addToCart(product, selectedFlavor, 1, true);
    setIsAddedAnim(true);
    setTimeout(() => setIsAddedAnim(false), 1500);
  };

  return (
    <div
      onClick={() => setSelectedProduct(product)}
      className={`group relative flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl cursor-pointer ${
        isDark
          ? 'bg-slate-900/80 border-slate-800 hover:border-sky-500/50 hover:shadow-sky-500/10'
          : 'bg-white border-slate-200/90 hover:border-sky-500/50 hover:shadow-slate-300'
      }`}
    >
      {/* Top Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
        {hasOffer && (
          <span className="px-2.5 py-1 rounded-md text-[11px] font-black uppercase tracking-wider bg-gradient-to-r from-red-600 to-sky-600 text-white shadow-md">
            {product.discountPercent}% OFF
          </span>
        )}
        {product.isBestSeller && (
          <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-slate-950 flex items-center gap-1 shadow-md">
            <Star className="w-3 h-3 fill-slate-950" />
            Bestseller
          </span>
        )}
        {product.isNewArrival && (
          <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-600 text-white shadow-md">
            New
          </span>
        )}
      </div>

      {/* Stock status badge on top right */}
      <div className="absolute top-3 right-3 z-10 pointer-events-none">
        {isOutOfStock ? (
          <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wide bg-purple-600/90 backdrop-blur-md text-white shadow-md flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Pre-Order
          </span>
        ) : isLowStock ? (
          <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wide bg-amber-500/90 backdrop-blur-md text-slate-950 shadow-md animate-pulse">
            Only {product.stock} Left!
          </span>
        ) : (
          <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide bg-emerald-500/15 border border-emerald-500/30 backdrop-blur-md text-emerald-400">
            {product.stock} in stock
          </span>
        )}
      </div>

      {/* Product Image */}
      <div className="relative w-full aspect-square bg-white overflow-hidden flex items-center justify-center p-4">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain rounded-xl p-2 transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <Package className="w-16 h-16 text-slate-300" aria-label="No product image" />
        )}

        {/* Quick View Overlay Button */}
        <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProduct(product);
            }}
            className="px-4 py-2 rounded-xl bg-slate-900/90 text-white border border-slate-700/80 hover:bg-sky-500 hover:text-slate-950 text-xs font-bold tracking-wide flex items-center gap-1.5 transition-all shadow-lg"
          >
            <Eye className="w-4 h-4" />
            Quick View
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        {/* Brand & Weight */}
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="font-semibold text-sky-500 uppercase tracking-wider text-[11px]">
            {product.brand}
          </span>
          <span className="text-slate-500 dark:text-slate-400 text-[11px]">
            {product.weight}
          </span>
        </div>

        {/* Product Title */}
        <h3 className={`font-display font-bold text-sm sm:text-base line-clamp-2 leading-snug mb-2 group-hover:text-sky-500 transition-colors ${
          isDark ? 'text-white' : 'text-slate-900'
        }`}>
          {product.name}
        </h3>

        {/* Rating and reviews */}
        <div className="flex items-center gap-1.5 mb-3 text-xs">
          <div className="flex items-center text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.floor(product.rating)
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-slate-300 dark:text-slate-600'
                }`}
              />
            ))}
          </div>
          <span className="font-bold text-slate-700 dark:text-slate-300 text-[11px]">
            {product.rating.toFixed(1)}
          </span>
          <span className="text-slate-500 dark:text-slate-400 text-[11px]">
            ({product.reviewsCount})
          </span>
        </div>

        {/* Flavor Selector if multiple flavors */}
        {product.flavors && product.flavors.length > 1 && (
          <div className="mb-3" onClick={(e) => e.stopPropagation()}>
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1 block">
              Flavor / Variant:
            </label>
            <select
              value={selectedFlavor}
              onChange={(e) => setSelectedFlavor(e.target.value)}
              className={`w-full text-xs rounded-lg py-1.5 px-2.5 border outline-none transition-colors ${
                isDark 
                  ? 'bg-slate-800 border-slate-700 text-slate-200 focus:border-sky-500' 
                  : 'bg-slate-50 border-slate-300 text-slate-800 focus:border-sky-500'
              }`}
            >
              {product.flavors.map(flavor => (
                <option key={flavor} value={flavor}>
                  {flavor}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Price Section */}
        <div className="mt-auto pt-2 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="font-display font-black text-lg sm:text-xl text-sky-600 dark:text-sky-400">
              Rs. {(product.offerPrice || product.price).toLocaleString()}
            </span>
            {hasOffer && (
              <span className="text-xs line-through text-slate-400 dark:text-slate-500">
                Rs. {product.price.toLocaleString()}
              </span>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            {isOutOfStock || product.isPreOrder ? (
              <button
                onClick={handlePreOrder}
                className="w-full py-2.5 px-3 rounded-xl font-display font-bold text-xs tracking-wider uppercase bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md transition-all flex items-center justify-center gap-1.5 hover:scale-[1.02] active:scale-95"
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Place Pre-Order</span>
              </button>
            ) : (
              <button
                onClick={handleAddToCart}
                disabled={isAddedAnim}
                className={`w-full py-2.5 px-3 rounded-xl font-display font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 shadow-md ${
                  isAddedAnim
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gradient-to-r from-sky-400 to-blue-600 hover:from-sky-500 hover:to-blue-700 text-slate-950 hover:scale-[1.02] active:scale-95 shadow-sky-500/20'
                }`}
              >
                {isAddedAnim ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
