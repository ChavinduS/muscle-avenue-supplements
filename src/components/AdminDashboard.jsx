import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES, BRANDS } from '../data/supplementsData';
import { 
  Plus, 
  Trash2, 
  Edit, 
  Package, 
  ShoppingBag, 
  TrendingUp, 
  AlertTriangle, 
  Check, 
  Truck, 
  Store, 
  DollarSign, 
  ArrowLeft,
  X,
  Clock
} from 'lucide-react';

export default function AdminDashboard() {
  const { 
    products, 
    orders, 
    addProduct, 
    deleteProduct, 
    updateProduct, 
    updateOrderStatus, 
    switchRole, 
    navigateToTab, 
    theme 
  } = useStore();

  const isDark = theme === 'dark';

  const [activeAdminTab, setActiveAdminTab] = useState('products'); // 'products' or 'orders'
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New product form state
  const [formData, setFormData] = useState({
    name: '',
    brand: 'Applied Nutrition',
    category: 'whey-proteins',
    price: '',
    offerPrice: '',
    stock: '15',
    weight: '2kg / 4.4 lbs',
    flavors: 'Chocolate, Vanilla, Strawberry',
    image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=700&q=80',
    description: '100% genuine imported supplement. Lab certified for maximum muscle protein synthesis.',
    isPreOrder: false,
    isBestSeller: true,
    isNewArrival: true
  });

  // Calculate metrics
  const totalProducts = products.length;
  const outOfStockCount = products.filter(p => p.stock <= 0).length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      alert('Please fill product name and price.');
      return;
    }

    const flavorsArray = formData.flavors
      ? formData.flavors.split(',').map(f => f.trim()).filter(Boolean)
      : ['Standard'];

    addProduct({
      ...formData,
      flavors: flavorsArray,
      supplementFacts: {
        servingSize: '1 Serving',
        servingsPerContainer: 30,
        qualityCertification: '100% Genuine Lab Certified'
      }
    });

    setIsAddModalOpen(false);
    setFormData({
      name: '',
      brand: 'Applied Nutrition',
      category: 'whey-proteins',
      price: '',
      offerPrice: '',
      stock: '15',
      weight: '2kg / 4.4 lbs',
      flavors: 'Chocolate, Vanilla, Strawberry',
      image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=700&q=80',
      description: '100% genuine imported supplement. Lab certified for maximum muscle protein synthesis.',
      isPreOrder: false,
      isBestSeller: false,
      isNewArrival: false
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black uppercase bg-red-600 text-white">
              Admin Portal
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">Inventory & Order Control</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-slate-900 dark:text-white">
            Muscle Avenue Store Management
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              switchRole('customer');
              navigateToTab('home');
            }}
            className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Switch to Customer Storefront</span>
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-slate-950 font-display font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-sky-500/20 transition-all"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Total Products</span>
            <div className="font-display font-black text-2xl text-slate-900 dark:text-white mt-1">{totalProducts}</div>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400">Across 7 Categories</span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Total Orders</span>
            <div className="font-display font-black text-2xl text-slate-900 dark:text-white mt-1">{totalOrders}</div>
            <span className="text-[11px] text-blue-600 dark:text-blue-400">Pickup & Islandwide</span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
            <Package className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Gross Orders Volume</span>
            <div className="font-display font-black text-2xl text-emerald-600 dark:text-emerald-400 mt-1">Rs. {totalRevenue.toLocaleString()}</div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Card, COD & Koko</span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Pre-Orders / Low Stock</span>
            <div className="font-display font-black text-2xl text-purple-600 dark:text-purple-400 mt-1">{outOfStockCount}</div>
            <span className="text-[11px] text-purple-600 dark:text-purple-400">Pre-order mode active</span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Tabs: Manage Products vs Manage Orders */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 mb-6 gap-6">
        <button
          onClick={() => setActiveAdminTab('products')}
          className={`pb-3 font-display font-bold text-sm tracking-wide border-b-2 transition-all ${
            activeAdminTab === 'products'
              ? 'border-sky-500 text-sky-600 dark:text-sky-400'
              : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
          }`}
        >
          Product Catalog & Stock Management ({products.length})
        </button>

        <button
          onClick={() => setActiveAdminTab('orders')}
          className={`pb-3 font-display font-bold text-sm tracking-wide border-b-2 transition-all ${
            activeAdminTab === 'orders'
              ? 'border-sky-500 text-sky-600 dark:text-sky-400'
              : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
          }`}
        >
          Customer Orders & Timeline Status ({orders.length})
        </button>
      </div>

      {/* Tab 1: Product Management */}
      {activeAdminTab === 'products' && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-950/80 text-slate-600 dark:text-slate-400 uppercase tracking-wider font-bold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">Product</th>
                  <th className="py-3.5 px-4">Brand</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Price / Offer</th>
                  <th className="py-3.5 px-4">Stock Level</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60">
                {products.map(p => (
                  <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    {/* Product item */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-10 h-10 rounded-lg object-cover bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800"
                        />
                        <div>
                          <div className="font-bold text-slate-900 dark:text-slate-200 line-clamp-1 max-w-xs">{p.name}</div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400">{p.weight}</div>
                        </div>
                      </div>
                    </td>

                    {/* Brand */}
                    <td className="py-3 px-4 font-semibold text-sky-600 dark:text-sky-400">
                      {p.brand}
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4 capitalize text-slate-700 dark:text-slate-300">
                      {p.category.replace('-', ' ')}
                    </td>

                    {/* Price */}
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900 dark:text-slate-200">
                        Rs. {(p.offerPrice || p.price).toLocaleString()}
                      </div>
                      {p.offerPrice && p.offerPrice < p.price && (
                        <div className="text-[10px] line-through text-slate-400">
                          Rs. {p.price.toLocaleString()} (-{p.discountPercent}%)
                        </div>
                      )}
                    </td>

                    {/* Stock editor */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => updateProduct(p.id, { stock: Math.max(0, p.stock - 1) })}
                          className="w-6 h-6 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center font-bold text-slate-700 dark:text-slate-300"
                        >
                          -
                        </button>
                        <span className={`w-8 text-center font-bold font-mono ${p.stock <= 0 ? 'text-purple-600 dark:text-purple-400' : p.stock <= 5 ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                          {p.stock}
                        </span>
                        <button
                          onClick={() => updateProduct(p.id, { stock: p.stock + 1 })}
                          className="w-6 h-6 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center font-bold text-slate-700 dark:text-slate-300"
                        >
                          +
                        </button>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4">
                      {p.stock <= 0 || p.isPreOrder ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-purple-500/10 text-purple-600 dark:text-purple-300 border border-purple-500/30">
                          Pre-Order
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                          In Stock
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to remove "${p.name}"?`)) {
                            deleteProduct(p.id);
                          }
                        }}
                        className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white transition-colors"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Orders & Timeline Management */}
      {activeAdminTab === 'orders' && (
        <div className="space-y-4">
          {orders.map(order => (
            <div
              key={order.id}
              className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 shadow-lg space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-500 flex items-center justify-center font-mono font-black text-sm">
                    {order.id}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-base text-slate-900 dark:text-white">
                      {order.customerName}
                    </h4>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                      Phone: {order.phone} • {order.email}
                    </span>
                  </div>
                </div>

                {/* Status Switcher for Admin */}
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-bold">Update Status:</span>
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-sky-600 dark:text-sky-400 outline-none"
                  >
                    <option value="Processing">Processing</option>
                    <option value="Packed">Packed</option>
                    <option value="Shipped">{order.orderType === 'pickup' ? 'Ready for Pickup' : 'Shipped / In Transit'}</option>
                    <option value="Delivered">{order.orderType === 'pickup' ? 'Collected at Store' : 'Delivered'}</option>
                  </select>
                </div>
              </div>

              {/* Order specifics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block mb-0.5">Fulfillment Mode:</span>
                  <strong className="text-slate-900 dark:text-white capitalize flex items-center gap-1.5">
                    {order.orderType === 'pickup' ? <Store className="w-4 h-4 text-sky-500" /> : <Truck className="w-4 h-4 text-sky-500" />}
                    {order.orderType === 'pickup' ? 'Self Pick Up' : 'Courier Delivery'}
                  </strong>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">{order.deliveryAddress}</p>
                </div>

                <div>
                  <span className="text-slate-500 dark:text-slate-400 block mb-0.5">Payment Details:</span>
                  <strong className="text-emerald-600 dark:text-emerald-400 uppercase">{order.paymentMethod}</strong> ({order.paymentStatus})
                  <div className="font-display font-black text-base text-slate-900 dark:text-white mt-1">
                    Total: Rs. {order.totalAmount?.toLocaleString()}
                  </div>
                </div>

                <div>
                  <span className="text-slate-500 dark:text-slate-400 block mb-1">Ordered Supplements:</span>
                  <div className="space-y-1">
                    {order.items?.map((item, idx) => (
                      <div key={idx} className="text-slate-700 dark:text-slate-300 font-medium">
                        • {item.name} ({item.flavor}) x {item.quantity}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-xl rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-6 md:p-8 shadow-2xl my-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-5">
              <h3 className="font-display font-black text-xl text-slate-900 dark:text-white">
                Add New Supplement
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-sky-500 hover:text-slate-950 flex items-center justify-center transition-colors text-slate-600 dark:text-slate-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Optimum Nutrition Gold Standard Whey"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Brand</label>
                  <select
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none"
                  >
                    {BRANDS.map(b => (
                      <option key={b.name} value={b.name}>{b.name}</option>
                    ))}
                    <option value="Muscle Avenue">Muscle Avenue</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none"
                  >
                    {CATEGORIES.map(c => (
                      <option key={c.slug} value={c.slug}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Regular Price (Rs.) *</label>
                  <input
                    type="number"
                    required
                    placeholder="32000"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Offer Price (Rs.)</label>
                  <input
                    type="number"
                    placeholder="27500"
                    value={formData.offerPrice}
                    onChange={(e) => setFormData({ ...formData, offerPrice: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Available Stock *</label>
                  <input
                    type="number"
                    required
                    placeholder="15"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Weight / Servings</label>
                  <input
                    type="text"
                    placeholder="e.g. 5 lbs (74 Servings)"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Flavors (Comma separated)</label>
                  <input
                    type="text"
                    placeholder="Chocolate, Vanilla, Strawberry"
                    value={formData.flavors}
                    onChange={(e) => setFormData({ ...formData, flavors: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Image URL</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Description</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none resize-none"
                />
              </div>

              {/* Checkboxes */}
              <div className="flex gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300 font-semibold">
                  <input
                    type="checkbox"
                    checked={formData.isPreOrder}
                    onChange={(e) => setFormData({ ...formData, isPreOrder: e.target.checked })}
                    className="rounded bg-slate-100 dark:bg-slate-800 text-sky-500 border-slate-300 dark:border-slate-700"
                  />
                  <span>Pre-Order Item</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300 font-semibold">
                  <input
                    type="checkbox"
                    checked={formData.isBestSeller}
                    onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                    className="rounded bg-slate-100 dark:bg-slate-800 text-sky-500 border-slate-300 dark:border-slate-700"
                  />
                  <span>Bestseller</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300 font-semibold">
                  <input
                    type="checkbox"
                    checked={formData.isNewArrival}
                    onChange={(e) => setFormData({ ...formData, isNewArrival: e.target.checked })}
                    className="rounded bg-slate-100 dark:bg-slate-800 text-sky-500 border-slate-300 dark:border-slate-700"
                  />
                  <span>New Arrival</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-3 rounded-xl font-display font-black text-xs uppercase tracking-wider bg-sky-500 hover:bg-sky-600 text-slate-950 transition-all shadow-md"
              >
                Add Product to Store
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

