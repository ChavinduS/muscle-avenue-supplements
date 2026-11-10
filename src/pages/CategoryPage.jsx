import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES, BRANDS } from '../data/supplementsData';
import ProductCard from '../components/ProductCard';
import { 
  Filter, 
  ArrowLeft, 
  Sparkles, 
  Check, 
  SlidersHorizontal,
  ChevronRight,
  Package
} from 'lucide-react';

export default function CategoryPage() {
  const { 
    products, 
    selectedCategory, 
    navigateToCategory, 
    navigateToTab, 
    theme 
  } = useStore();

  const isDark = theme === 'dark';

  // Filters state
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [stockFilter, setStockFilter] = useState('all'); // 'all', 'in-stock', 'pre-order'
  const [sortBy, setSortBy] = useState('featured');

  // Find active category
  const activeCategory = CATEGORIES.find(c => c.slug === selectedCategory) || CATEGORIES[0];

  // Filter products by active category
  let categoryProducts = products.filter(p => p.category === activeCategory.slug);

  // Filter by brand
  if (selectedBrand !== 'all') {
    categoryProducts = categoryProducts.filter(p => p.brand === selectedBrand);
  }

  // Filter by stock
  if (stockFilter === 'in-stock') {
    categoryProducts = categoryProducts.filter(p => p.stock > 0 && !p.isPreOrder);
  } else if (stockFilter === 'pre-order') {
    categoryProducts = categoryProducts.filter(p => p.stock <= 0 || p.isPreOrder);
  }

  // Sorting
  categoryProducts.sort((a, b) => {
    const priceA = a.offerPrice || a.price;
    const priceB = b.offerPrice || b.price;
    if (sortBy === 'price-low') return priceA - priceB;
    if (sortBy === 'price-high') return priceB - priceA;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // featured
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Category Header Banner */}
      <div className={`p-8 md:p-12 rounded-3xl border shadow-xl relative overflow-hidden ${
        isDark 
          ? 'bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border-slate-800' 
          : 'bg-gradient-to-r from-sky-50 via-white to-amber-50 border-slate-200'
      }`}>
        <div className="relative z-10 max-w-2xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
            <button onClick={() => navigateToTab('home')} className="hover:text-sky-500">Home</button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-sky-500 font-bold capitalize">Category: {activeCategory.name}</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-sky-500/20 text-sky-400 border border-sky-500/30 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Dedicated Category Store</span>
          </div>

          <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-slate-900 dark:text-white">
            {activeCategory.name}
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
            {activeCategory.description} All items are 100% original imported with verified batch numbers.
          </p>
        </div>
      </div>

      {/* Category Pills Navigation (Switch between dedicated pages) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => {
              navigateToCategory(cat.slug);
              setSelectedBrand('all');
            }}
            className={`px-4 py-2.5 rounded-xl font-display font-bold text-xs whitespace-nowrap transition-all border ${
              activeCategory.slug === cat.slug
                ? 'bg-sky-500 text-slate-950 border-sky-500 shadow-md shadow-sky-500/20'
                : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Filter and Sort Toolbar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-4">
        
        {/* Brand Filters */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-600 dark:text-slate-400 font-bold flex items-center gap-1.5 mr-1">
            <SlidersHorizontal className="w-3.5 h-3.5 text-sky-500" />
            Brand:
          </span>
          <button
            onClick={() => setSelectedBrand('all')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              selectedBrand === 'all'
                ? 'bg-sky-500 text-slate-950 font-bold'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            All Brands
          </button>
          {BRANDS.map(b => (
            <button
              key={b.name}
              onClick={() => setSelectedBrand(b.name)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                selectedBrand === b.name
                  ? 'bg-sky-500 text-slate-950 font-bold'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {b.name}
            </button>
          ))}
        </div>

        {/* Stock & Sort controls */}
        <div className="flex items-center gap-3 text-xs">
          {/* Stock Filter */}
          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 outline-none"
          >
            <option value="all">All Availability</option>
            <option value="in-stock">In Stock Only</option>
            <option value="pre-order">Pre-Order Only</option>
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 outline-none"
          >
            <option value="featured">Featured First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

      </div>

      {/* Product Grid */}
      {categoryProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categoryProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 space-y-3">
          <Package className="w-12 h-12 text-slate-400 dark:text-slate-600 mx-auto" />
          <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">No supplements match this filter</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Try switching the brand filter or view all available categories.</p>
          <button
            onClick={() => {
              setSelectedBrand('all');
              setStockFilter('all');
            }}
            className="px-5 py-2 rounded-xl bg-sky-500 text-slate-950 font-bold text-xs"
          >
            Reset Filters
          </button>
        </div>
      )}

    </div>
  );
}

