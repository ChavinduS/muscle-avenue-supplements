import React from 'react';
import { useStore } from './context/StoreContext';
import BackgroundAnimation from './components/BackgroundAnimation';
import Navbar from './components/Navbar';
import BurgerMenu from './components/BurgerMenu';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import OrderTrackerModal from './components/OrderTrackerModal';
import ProductDetailModal from './components/ProductDetailModal';
import AuthModal from './components/AuthModal';
import WhatsAppFloating from './components/WhatsAppFloating';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import AllSupplementsPage from './pages/AllSupplementsPage';
import OffersPage from './pages/OffersPage';
import AboutUsPage from './pages/AboutUsPage';
import ContactUsPage from './pages/ContactUsPage';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  const { activeTab, theme } = useStore();

  const renderActivePage = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'category':
        return <CategoryPage />;
      case 'supplements':
        return <AllSupplementsPage />;
      case 'offers':
        return <OffersPage />;
      case 'about':
        return <AboutUsPage />;
      case 'contact':
        return <ContactUsPage />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className={`min-h-screen relative flex flex-col transition-colors duration-300 ${
      theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Dynamic Animated Gym Ambient Background */}
      <BackgroundAnimation />

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-col flex-1">
        {/* Navigation Bar */}
        <Navbar />

        {/* Dynamic Page Router */}
        <main className="flex-1">
          {renderActivePage()}
        </main>

        {/* Global Footer */}
        <Footer />
      </div>

      {/* Floating WhatsApp Quick Action Button */}
      <WhatsAppFloating />

      {/* Slide-out Burger Navigation Menu */}
      <BurgerMenu />

      {/* Slide-out Cart Drawer */}
      <CartDrawer />

      {/* Secure Checkout & Payment Modal */}
      <CheckoutModal />

      {/* Delivery Timeline Order Tracker Modal */}
      <OrderTrackerModal />

      {/* Product Quick View / Detail Modal */}
      <ProductDetailModal />

      {/* User Login & Register Auth Modal */}
      <AuthModal />
    </div>
  );
}
