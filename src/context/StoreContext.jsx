import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS, INITIAL_ORDERS, STORE_INFO } from '../data/supplementsData';

const StoreContext = createContext();

export function StoreProvider({ children }) {
  // Theme state: dark or light
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('ma_theme') || 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('ma_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Products state with localStorage persistence
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('ma_products_v2');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_PRODUCTS;
  });

  useEffect(() => {
    localStorage.setItem('ma_products_v2', JSON.stringify(products));
  }, [products]);

  // Orders state with localStorage persistence
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('ma_orders');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_ORDERS;
  });

  useEffect(() => {
    localStorage.setItem('ma_orders', JSON.stringify(orders));
  }, [orders]);

  // Cart state with localStorage persistence
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('ma_cart');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('ma_cart', JSON.stringify(cart));
  }, [cart]);

  // User & Roles (Customer vs Admin)
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('ma_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return {
      name: 'Guest Athlete',
      email: 'athlete@gmail.com',
      phone: '0771234567',
      role: 'customer', // 'customer' or 'admin'
      isLoggedIn: true
    };
  });

  useEffect(() => {
    localStorage.setItem('ma_user', JSON.stringify(user));
  }, [user]);

  // Navigation state
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'supplements', 'category', 'offers', 'about', 'contact', 'admin', 'account'
  const [selectedCategory, setSelectedCategory] = useState(null); // 'creatines', etc.
  const [searchQuery, setSearchQuery] = useState('');

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isOrderTrackerOpen, setIsOrderTrackerOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [trackingOrderId, setTrackingOrderId] = useState('MA-9841');

  // Cart operations
  const addToCart = (product, selectedFlavor = null, quantity = 1, isPreOrderMode = false) => {
    const flavor = selectedFlavor || (product.flavors && product.flavors[0]) || 'Standard';
    const cartItemId = `${product.id}-${flavor}-${isPreOrderMode ? 'preorder' : 'regular'}`;

    setCart(prev => {
      const existing = prev.find(item => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map(item =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, {
        cartItemId,
        id: product.id,
        name: product.name,
        brand: product.brand,
        category: product.category,
        price: product.offerPrice || product.price,
        originalPrice: product.price,
        image: product.image,
        flavor,
        quantity,
        isPreOrder: isPreOrderMode || product.isPreOrder,
        weight: product.weight
      }];
    });

    setIsCartOpen(true);
  };

  const updateCartQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const removeFromCart = (cartItemId) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Admin Product Management
  const addProduct = (newProduct) => {
    const created = {
      ...newProduct,
      id: `prod-${Date.now()}`,
      rating: 5.0,
      reviewsCount: 1,
      price: Number(newProduct.price),
      offerPrice: Number(newProduct.offerPrice || newProduct.price),
      stock: Number(newProduct.stock || 10),
      discountPercent: Math.round(((Number(newProduct.price) - Number(newProduct.offerPrice || newProduct.price)) / Number(newProduct.price)) * 100) || 0
    };
    setProducts(prev => [created, ...prev]);
    return created;
  };

  const updateProduct = (id, updatedFields) => {
    setProducts(prev =>
      prev.map(item => {
        if (item.id === id) {
          const price = Number(updatedFields.price ?? item.price);
          const offerPrice = Number(updatedFields.offerPrice ?? item.offerPrice ?? price);
          const discountPercent = Math.round(((price - offerPrice) / price) * 100) || 0;
          return {
            ...item,
            ...updatedFields,
            price,
            offerPrice,
            stock: Number(updatedFields.stock ?? item.stock),
            discountPercent
          };
        }
        return item;
      })
    );
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(item => item.id !== id));
  };

  // Admin Order Management
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev =>
      prev.map(order => {
        if (order.id === orderId) {
          const isPickup = order.orderType === 'pickup';
          const defaultSteps = isPickup
            ? [
                { step: 'Order Placed', time: 'Completed', completed: true },
                { step: 'Payment Verified', time: 'Completed', completed: true },
                { step: 'Ready for Self Pickup', time: newStatus === 'Packed' || newStatus === 'Shipped' || newStatus === 'Delivered' ? 'Ready at Store' : 'In Preparation', completed: newStatus === 'Packed' || newStatus === 'Shipped' || newStatus === 'Delivered' },
                { step: 'Collected at Store', time: newStatus === 'Delivered' ? 'Picked Up' : 'Pending', completed: newStatus === 'Delivered' }
              ]
            : [
                { step: 'Order Placed', time: 'Completed', completed: true },
                { step: 'Payment Verified', time: 'Completed', completed: true },
                { step: 'Order Packed', time: newStatus === 'Packed' || newStatus === 'Shipped' || newStatus === 'Delivered' ? 'Completed' : 'Pending', completed: newStatus === 'Packed' || newStatus === 'Shipped' || newStatus === 'Delivered' },
                { step: 'Out for Delivery / In Transit', time: newStatus === 'Shipped' || newStatus === 'Delivered' ? 'Courier Assigned' : 'Pending', completed: newStatus === 'Shipped' || newStatus === 'Delivered' },
                { step: 'Delivered', time: newStatus === 'Delivered' ? 'Delivered' : 'Pending', completed: newStatus === 'Delivered' }
              ];

          return {
            ...order,
            status: newStatus,
            trackingSteps: defaultSteps
          };
        }
        return order;
      })
    );
  };

  // Customer Place Order
  const placeOrder = (orderData) => {
    const newId = `MA-${Math.floor(1000 + Math.random() * 9000)}`;
    const isPickup = orderData.orderType === 'pickup';

    const newOrder = {
      id: newId,
      customerName: orderData.customerName,
      phone: orderData.phone,
      email: orderData.email,
      items: cart,
      orderType: orderData.orderType,
      deliveryAddress: isPickup ? 'Muscle Avenue Flagship Store - Self Pickup' : orderData.deliveryAddress,
      city: orderData.city || 'Colombo',
      paymentMethod: orderData.paymentMethod, // 'card', 'cod', 'koko'
      paymentStatus: orderData.paymentMethod === 'cod' ? 'Pending on Delivery' : 'Paid',
      totalAmount: orderData.totalAmount,
      status: 'Processing',
      notes: orderData.notes || '',
      trackingSteps: isPickup
        ? [
            { step: 'Order Placed', time: 'Just now', completed: true },
            { step: 'Payment Verified', time: 'Just now', completed: true },
            { step: 'Ready for Self Pickup', time: 'In Preparation (Approx 2 hrs)', completed: false },
            { step: 'Collected at Store', time: 'Pending', completed: false }
          ]
        : [
            { step: 'Order Placed', time: 'Just now', completed: true },
            { step: 'Payment Verified', time: 'Just now', completed: true },
            { step: 'Order Packed', time: 'Scheduled today', completed: false },
            { step: 'Out for Delivery / In Transit', time: 'Pending Dispatch', completed: false },
            { step: 'Delivered', time: 'Estimated 24-48 hrs', completed: false }
          ],
      createdAt: new Date().toISOString()
    };

    // Deduct stock for ordered items
    setProducts(prev =>
      prev.map(p => {
        const orderedItem = cart.find(ci => ci.id === p.id);
        if (orderedItem && !orderedItem.isPreOrder) {
          return {
            ...p,
            stock: Math.max(0, p.stock - orderedItem.quantity)
          };
        }
        return p;
      })
    );

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    setTrackingOrderId(newId);
    return newOrder;
  };

  // Switch role between customer and admin
  const switchRole = (role) => {
    setUser(prev => ({
      ...prev,
      role
    }));
  };

  // Navigation helpers
  const navigateToCategory = (catSlug) => {
    setSelectedCategory(catSlug);
    setActiveTab('category');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToTab = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openOrderTracker = (orderId = null) => {
    if (orderId) setTrackingOrderId(orderId);
    setIsOrderTrackerOpen(true);
  };

  return (
    <StoreContext.Provider
      value={{
        theme,
        toggleTheme,
        products,
        orders,
        cart,
        cartCount,
        cartSubtotal,
        user,
        setUser,
        switchRole,
        activeTab,
        navigateToTab,
        selectedCategory,
        navigateToCategory,
        searchQuery,
        setSearchQuery,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        addProduct,
        updateProduct,
        deleteProduct,
        updateOrderStatus,
        placeOrder,
        isCartOpen,
        setIsCartOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isOrderTrackerOpen,
        setIsOrderTrackerOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isBurgerOpen,
        setIsBurgerOpen,
        selectedProduct,
        setSelectedProduct,
        trackingOrderId,
        setTrackingOrderId,
        openOrderTracker,
        storeInfo: STORE_INFO
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
