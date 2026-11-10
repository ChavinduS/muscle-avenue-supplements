import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES, BRANDS } from '../data/supplementsData';
import ProductCard from '../components/ProductCard';
import { 
  Zap, 
  Search, 
  SlidersHorizontal, 
  X, 
  Package, 
  ArrowUpDown 
} from 'lucide-react';

export default function AllSupplementsPage() {
  const { 
    products, 
    searchQuery, 
    setSearchQuery, 
    theme 
  } = useStore();

  const isDark = theme === 'dark';

  const [categoryFilter, setCategoryFilter] = useState('all');
  const [brandFilter, setBrandFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState('all'); // 'all', 'in-stock', 'pre-order'
  const [sortBy, setSortBy] = useState('featured');

  // Filter products
  let filtered = products.filter(p => {
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchBrand = p.brand.toLowerCase().includes(q);
      const matchCat = p.category.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      if (!matchName && !matchBrand && !matchCat && !matchDesc) return false;
    }

    // Category
    if (categoryFilter !== 'all' && p.category !== categoryFilter) return false;

    // Brand
    if (brandFilter !== 'all' && p.brand !== brandFilter) return false;

    // Stock
    if (stockFilter === 'in-stock' && (p.stock <= 0 || p.isPreOrder)) return false;
    if (stockFilter === 'pre-order' && (p.stock > 0 && !p.isPreOrder)) return false;

    return true;
  });

  // Sorting
  filtered.sort((a, b) => {
    const priceA = a.offerPrice || a.price;
    const priceB = b.offerPrice || b.price;
    if (sortBy === 'price-low') return priceA - priceB;
    if (sortBy === 'price-high') return priceB - priceA;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // featured
  });

  const clearAllFilters = () => {
    setCategoryFilter('all');
    setBrandFilter('all');
    setStockFilter('all');
    setSearchQuery('');
  };

  const hasActiveFilters = categoryFilter !== 'all' || brandFilter !== 'all' || stockFilter !== 'all' || searchQuery.trim() !== '';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-500/20 text-sky-600 dark:text-sky-400 border border-sky-500/30 mb-2">
            <Zap className="w-3.5 h-3.5 text-sky-500" />
            <span>Complete Store Catalog</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-slate-900 dark:text-white">
            All Supplements & Accessories
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Browse our entire range without category restrictions. Check stock availability, discounts, and pre-orders.
          </p>
        </div>

        <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
          Showing <strong className="text-sky-500 text-sm">{filtered.length}</strong> of {products.length} products
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="space-y-4">
        
        {/* Search Input in Page */}
        <div className="relative max-w-xl">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Filter by name, brand, or ingredients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 rounded-xl text-xs sm:text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-sky-500 shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Filter Chips */}
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 block mb-2">
            Filter by Category:
          </span>
          <div className="flex flex-wrap gap-2 text-xs">
            <button
              onClick={() => setCategoryFilter('all')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all border ${
                categoryFilter === 'all'
                  ? 'bg-sky-500 text-slate-950 border-sky-500'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              All Categories ({products.length})
            </button>
            {CATEGORIES.map(c => {
              const count = products.filter(p => p.category === c.slug).length;
              return (
                <button
                  key={c.id}
                  onClick={() => setCategoryFilter(c.slug)}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all border ${
                    categoryFilter === c.slug
                      ? 'bg-sky-500 text-slate-950 border-sky-500'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  {c.name} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Brand & Stock Filters Bar */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-4 text-xs">
          {/* Brand select */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-600 dark:text-slate-400 font-bold">Brand:</span>
            <select
              value={brandFilter}
              onChange={(e) => setBrandFilter(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 outline-none"
            >
              <option value="all">All Brands</option>
              {BRANDS.map(b => (
                <option key={b.name} value={b.name}>{b.name}</option>
              ))}
              <option value="Muscle Avenue">Muscle Avenue</option>
            </select>
          </div>

          {/* Stock availability */}
          <div className="flex items-center gap-2">
            <span className="text-slate-600 dark:text-slate-400 font-bold">Stock Status:</span>
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 outline-none"
            >
              <option value="all">All Stock Statuses</option>
              <option value="in-stock">In Stock Only</option>
              <option value="pre-order">Pre-Orders Only</option>
            </select>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <span className="text-slate-600 dark:text-slate-400 font-bold">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 outline-none"
            >
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-xs text-sky-500 hover:text-sky-400 font-bold underline"
            >
              Clear All Filters
            </button>
          )}
        </div>

      </div>

      {/* Products Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="p-16 text-center rounded-3xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <Package className="w-14 h-14 text-slate-400 dark:text-slate-600 mx-auto" />
          <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">No products found</h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            We couldn't find any supplements matching your search query or filters.
          </p>
          <button
            onClick={clearAllFilters}
            className="px-6 py-2.5 rounded-xl bg-sky-500 text-slate-950 font-bold text-xs uppercase tracking-wider"
          >
            Reset All Filters
          </button>
        </div>
      )}

    </div>
  );
}

