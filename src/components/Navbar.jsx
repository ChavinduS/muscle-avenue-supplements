import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/supplementsData';
import { 
  Search, 
  ShoppingCart, 
  Menu, 
  Sun, 
  Moon, 
  User, 
  ShieldAlert, 
  ChevronDown, 
  Phone, 
  Flame, 
  Truck, 
  Clock, 
  Sparkles,
  Zap,
  Tag
} from 'lucide-react';

export default function Navbar() {
  const { 
    theme, 
    toggleTheme, 
    cartCount, 
    setIsCartOpen, 
    setIsBurgerOpen, 
    setIsAuthModalOpen,
    setAuthRole,
    user, 
    switchRole,
    activeTab, 
    navigateToTab, 
    selectedCategory,
    navigateToCategory, 
    searchQuery, 
    setSearchQuery,
    storeInfo,
    openOrderTracker
  } = useStore();

  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const isDark = theme === 'dark';

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigateToTab('supplements');
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-colors">
      {/* Top Announcement Bar */}
      <div className="w-full bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-600 text-slate-950 font-bold text-xs py-1.5 px-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 truncate">
            <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-black/20 text-white font-extrabold text-[10px] tracking-wider uppercase">
              100% Original
            </span>
            <span className="truncate">
              ⚡ Premium &amp; Original Imported Gym Supplements &bull; Islandwide Delivery &amp; Self Pickup Available!
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] shrink-0 font-bold">
            {/* Quick Track Order Link */}
            <button
              onClick={() => openOrderTracker()}
              className="flex items-center gap-1.5 hover:text-white transition-colors bg-black/15 hover:bg-black/25 px-2.5 py-0.5 rounded-full"
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Track Order Timeline</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className={`relative z-20 w-full border-b backdrop-blur-xl transition-colors duration-300 ${
        isDark 
          ? 'bg-slate-950/85 border-slate-800/80' 
          : 'bg-white/90 border-slate-200 shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 sm:h-28 flex items-center justify-between gap-4">
          
          {/* Left: Burger Menu Button & Brand Logo */}
          <div className="flex items-center gap-3 sm:gap-4 my-auto">
            {/* Burger Menu Button */}
            <button
              onClick={() => setIsBurgerOpen(true)}
              aria-label="Open menu"
              className={`p-2.5 sm:p-3 rounded-xl border transition-colors self-center ${
                isDark 
                  ? 'bg-slate-900 border-slate-800 hover:border-sky-500/50 text-white' 
                  : 'bg-slate-100 border-slate-200 hover:border-sky-500/50 text-slate-800'
              }`}
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-sky-500" />
            </button>

            {/* Brand Logo with Official Muscle Avenue Graphic - Big, Bold, Perfectly Centered */}
            <div
              onClick={() => navigateToTab('home')}
              className="flex items-center cursor-pointer group select-none py-2 my-auto"
            >
              <img
                src="/logo.png"
                alt="Muscle Avenue Supplements"
                className="h-16 sm:h-20 md:h-24 lg:h-26 max-h-[96px] w-auto max-w-[200px] sm:max-w-[280px] md:max-w-[320px] object-contain drop-shadow-2xl group-hover:scale-105 transition-transform"
              />
            </div>
          </div>

          {/* Center: Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search Creatine, Whey, Pre-Workout, C4, ON, Brands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => {
                  if (activeTab !== 'supplements') navigateToTab('supplements');
                }}
                className={`w-full pl-10 pr-4 py-2.5 rounded-full text-xs sm:text-sm border outline-none transition-all ${
                  isDark
                    ? 'bg-slate-900/90 border-slate-800 text-slate-100 placeholder-slate-500 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20'
                    : 'bg-slate-100 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20'
                }`}
              />
            </form>
          </div>

          {/* Right Navigation Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Desktop Direct Contacts */}
            <div className="hidden lg:flex items-center gap-2.5 mr-2">
              <a
                href={`tel:${storeInfo.phone}`}
                className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all ${
                  isDark
                    ? 'bg-slate-900 border-slate-800 text-slate-200 hover:border-sky-500/50 hover:text-white'
                    : 'bg-slate-100 border-slate-200 text-slate-800 hover:border-sky-500/50 hover:text-slate-950'
                }`}
              >
                <Phone className="w-3.5 h-3.5 text-sky-500" />
                <span>Call: {storeInfo.phoneFormatted}</span>
              </a>

              <a
                href={`https://wa.me/${storeInfo.whatsappRaw}?text=Hi%20Muscle%20Avenue%20Supplements,%20I%20have%20an%20inquiry%20about%20supplements`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-sm"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping inline-block" />
                <span>WhatsApp: {storeInfo.whatsapp}</span>
              </a>
            </div>

            {/* Dark / Light Mode Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark/light mode"
              className={`p-2.5 rounded-xl border transition-all ${
                isDark 
                  ? 'bg-slate-900 border-slate-800 hover:border-sky-500/50 text-amber-400' 
                  : 'bg-slate-100 border-slate-200 hover:border-sky-500/50 text-slate-700'
              }`}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* User Account / Role Switcher */}
            <div
              className="relative"
              onMouseLeave={() => setUserDropdownOpen(false)}
            >
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className={`flex items-center gap-2 p-2 sm:px-3 sm:py-2 rounded-xl border text-xs font-bold transition-all ${
                  user.role === 'admin'
                    ? 'bg-red-500/15 border-red-500/40 text-red-400'
                    : isDark 
                    ? 'bg-slate-900 border-slate-800 text-slate-200 hover:border-sky-500/50' 
                    : 'bg-slate-100 border-slate-200 text-slate-800 hover:border-sky-500/50'
                }`}
              >
                <User className="w-4 h-4 text-sky-500" />
                <span className="hidden sm:inline capitalize">
                  {user.role === 'admin' ? 'Admin Portal' : user.name.split(' ')[0]}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {/* User Dropdown */}
              {userDropdownOpen && (
                <div 
                  className="absolute right-0 top-full z-50 w-56 pt-2"
                >
                  <div className={`rounded-2xl border p-2 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 ${
                    isDark ? 'bg-slate-900/95 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-800'
                  }`}>
                  <div className="px-3 py-2 border-b border-slate-200 dark:border-slate-800/50 mb-1">
                    <p className="font-bold text-xs text-slate-900 dark:text-white">{user.name}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{user.email}</p>
                    <div className="mt-1.5 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-sky-500/20 text-sky-600 dark:text-sky-400">
                      Role: {user.role}
                    </div>
                  </div>

                  {user.role === 'admin' && (
                    <button
                      onClick={() => {
                        navigateToTab('admin');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold hover:bg-red-500/20 text-red-600 dark:text-red-400 flex items-center gap-2"
                    >
                      <ShieldAlert className="w-3.5 h-3.5" />
                      <span>Admin Inventory Panel</span>
                    </button>
                  )}

                  {user.role !== 'admin' ? (
                    <button
                      onClick={() => {
                        setAuthRole('admin');
                        setIsAuthModalOpen(true);
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold hover:bg-red-500/10 text-red-600 dark:text-red-400 flex items-center gap-2"
                    >
                      <ShieldAlert className="w-3.5 h-3.5" />
                      <span>Admin Login</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        switchRole('customer')
                          .then(() => {
                            navigateToTab('home');
                            setUserDropdownOpen(false);
                          })
                          .catch(error => {
                            console.error('Could not sign out of admin:', error);
                            window.alert('Could not sign out. Please try again.');
                          });
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold hover:bg-slate-500/10 text-slate-600 dark:text-slate-300"
                    >
                      Sign Out of Admin
                    </button>
                  )}

                  <button
                    onClick={() => {
                      openOrderTracker();
                      setUserDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors ${
                      isDark 
                        ? 'hover:bg-sky-500/10 text-slate-300 hover:text-sky-400' 
                        : 'hover:bg-sky-50 text-slate-700 hover:text-sky-600'
                    }`}
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span>Track My Order Timeline</span>
                  </button>

                  <button
                    onClick={() => {
                      setAuthRole('customer');
                      setIsAuthModalOpen(true);
                      setUserDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 border-t mt-1 transition-colors ${
                      isDark 
                        ? 'hover:bg-slate-800 text-slate-300 hover:text-white border-slate-800/60' 
                        : 'hover:bg-slate-100 text-slate-700 hover:text-slate-950 border-slate-200'
                    }`}
                  >
                    <span>Login / Register New Account</span>
                  </button>
                  </div>
                </div>
              )}
            </div>

            {user.role === 'admin' && (
              <button
                onClick={() => navigateToTab('admin')}
                className="px-2.5 sm:px-3 py-2 rounded-xl border border-red-500/40 bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 text-[10px] sm:text-xs font-bold whitespace-nowrap transition-colors"
                aria-label="Open admin dashboard"
              >
                Dashboard
              </button>
            )}

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="View shopping cart"
              className="relative p-2.5 sm:px-4 sm:py-2.5 rounded-xl bg-gradient-to-r from-sky-400 to-blue-600 hover:from-sky-500 hover:to-blue-700 text-slate-950 font-display font-black text-xs flex items-center gap-2 shadow-lg shadow-sky-500/25 hover:scale-105 active:scale-95 transition-all"
            >
              <ShoppingCart className="w-4 h-4 stroke-[2.5]" />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-slate-950 text-white text-[11px] font-black flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

          </div>
        </div>

        {/* Mobile Search Bar below header */}
        <div className="md:hidden px-4 pb-3">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search Creatines, Whey, C4, ON, Brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => {
                if (activeTab !== 'supplements') navigateToTab('supplements');
              }}
              className={`w-full pl-10 pr-4 py-2 rounded-xl text-xs border outline-none ${
                isDark
                  ? 'bg-slate-900 border-slate-800 text-slate-100 placeholder-slate-500'
                  : 'bg-slate-100 border-slate-200 text-slate-900 placeholder-slate-400'
              }`}
            />
          </form>
        </div>
      </div>

      {/* Top Category Tab Bar: In-line with visible separation */}
      <nav 
        aria-label="Category tabs navigation"
        className={`relative z-10 w-full border-b backdrop-blur-md transition-colors duration-300 ${
          isDark 
            ? 'bg-slate-950/90 border-slate-800' 
            : 'bg-slate-100/95 border-slate-200 shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center overflow-x-auto scrollbar-none py-2 gap-1 text-xs select-none">
            
            {/* All Supplements Tab */}
            <button
              onClick={() => navigateToTab('supplements')}
              className={`whitespace-nowrap shrink-0 px-3.5 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                activeTab === 'supplements'
                  ? 'bg-sky-500 text-slate-950 font-black shadow-md shadow-sky-500/25 ring-1 ring-sky-400'
                  : isDark
                  ? 'text-slate-300 hover:text-white hover:bg-slate-800'
                  : 'text-slate-700 hover:text-slate-950 hover:bg-slate-200'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-sky-500 fill-sky-500 shrink-0" />
              <span>All Supplements</span>
            </button>

            {/* Visible Separation Divider */}
            <span className="h-4 w-px bg-slate-300 dark:bg-slate-700 shrink-0 mx-1" aria-hidden="true" />

            {/* 7 Supplement Categories (Strictly In-line with no word breaking) */}
            {CATEGORIES.map((cat) => {
              const isCatActive = activeTab === 'category' && selectedCategory === cat.slug;
              return (
                <React.Fragment key={cat.id}>
                  <button
                    onClick={() => navigateToCategory(cat.slug)}
                    className={`whitespace-nowrap shrink-0 px-3.5 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                      isCatActive
                        ? 'bg-sky-500 text-slate-950 font-black shadow-md shadow-sky-500/25 ring-1 ring-sky-400'
                        : isDark
                        ? 'text-slate-300 hover:text-sky-400 hover:bg-slate-800'
                        : 'text-slate-700 hover:text-sky-600 hover:bg-slate-200'
                    }`}
                  >
                    <span>{cat.name}</span>
                  </button>
                  <span className="h-4 w-px bg-slate-300 dark:bg-slate-700 shrink-0 mx-1" aria-hidden="true" />
                </React.Fragment>
              );
            })}

            {/* Offers Tab (Hot) */}
            <button
              onClick={() => navigateToTab('offers')}
              className={`whitespace-nowrap shrink-0 px-3.5 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                activeTab === 'offers'
                  ? 'bg-red-600 text-white font-black shadow-md shadow-red-600/30'
                  : 'text-red-500 hover:bg-red-500/10'
              }`}
            >
              <Tag className="w-3.5 h-3.5 text-red-500 animate-bounce shrink-0" />
              <span>Offers</span>
              <span className="px-1.5 py-0.2 rounded-full text-[9px] font-black bg-red-600 text-white uppercase">
                Hot
              </span>
            </button>

            {/* Visible Separation Divider */}
            <span className="h-4 w-px bg-slate-300 dark:bg-slate-700 shrink-0 mx-1" aria-hidden="true" />

            {/* About Us */}
            <button
              onClick={() => navigateToTab('about')}
              className={`whitespace-nowrap shrink-0 px-3.5 py-1.5 rounded-lg font-bold transition-all ${
                activeTab === 'about'
                  ? 'bg-sky-500 text-slate-950 font-black shadow-md'
                  : isDark
                  ? 'text-slate-300 hover:text-white hover:bg-slate-800'
                  : 'text-slate-700 hover:text-slate-950 hover:bg-slate-200'
              }`}
            >
              About Us
            </button>

            {/* Visible Separation Divider */}
            <span className="h-4 w-px bg-slate-300 dark:bg-slate-700 shrink-0 mx-1" aria-hidden="true" />

            {/* Get Support */}
            <button
              onClick={() => navigateToTab('contact')}
              className={`whitespace-nowrap shrink-0 px-3.5 py-1.5 rounded-lg font-bold transition-all ${
                activeTab === 'contact'
                  ? 'bg-sky-500 text-slate-950 font-black shadow-md'
                  : isDark
                  ? 'text-slate-300 hover:text-white hover:bg-slate-800'
                  : 'text-slate-700 hover:text-slate-950 hover:bg-slate-200'
              }`}
            >
              Get Support
            </button>

          </div>
        </div>
      </nav>
    </header>
  );
}
