
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import ChatWidget from './components/ChatWidget';
import { useStore } from './hooks/useStore';
import { Category, UserRole } from './types';
import { 
  Package, Plus, Search, Trash2, ExternalLink, 
  TrendingUp, X, Upload, FileText, Loader2, Mail, Lock, 
  User as UserIcon, Camera, CheckCircle, RefreshCcw, 
  Database, ShieldAlert, Download, CloudSync, History, Sparkles, Image as ImageIcon, Users, BarChart3,
  Cpu, Zap, ShieldCheck, ShoppingBag
} from 'lucide-react';

export default function App() {
  const { 
    state, login, logout, updateUser, userProducts, userSales, userPurchases, userDocuments,
    addProduct, deleteProduct, clearProducts, loadDemoData, resetData, addSale, setLookerStudioUrl, addDocument,
    isAdmin, getAllUsers
  } = useStore();
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const productImgRef = useRef<HTMLInputElement>(null);

  // Login Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // New Product Form State
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: Category.OTHERS,
    purchase_price: 0,
    selling_price: 0,
    stock_quantity: 0,
    description: '',
    image_url: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) return;
    
    setIsLoginLoading(true);
    setTimeout(() => {
      // Hardcoded master password "akashalls" unlocks Admin mode
      if (loginPassword === 'akashalls') {
          login({ 
            id: 'admin-001', 
            name: 'Akash Ahmed', 
            email: loginEmail, 
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=akash`,
            businessName: 'Akash All Solution',
            role: 'ADMIN'
          });
      } else {
          login({ 
            id: 'u-' + Math.random().toString(36).substr(2, 5), 
            name: loginEmail.split('@')[0], 
            email: loginEmail, 
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${loginEmail}`,
            businessName: 'Akash All Solution',
            role: 'USER'
          });
      }
      setIsLoginLoading(false);
    }, 1200);
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      name: (e.target as any).elements.name.value,
      businessName: (e.target as any).elements.businessName.value,
      avatar: (e.target as any).elements.avatar.value
    });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleSyncRemote = () => {
    setIsSyncing(true);
    setTimeout(() => {
      loadDemoData();
      setIsSyncing(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 2000);
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      ...newProduct,
      image_url: newProduct.image_url || `https://picsum.photos/seed/${Math.random()}/200/200`
    };
    addProduct(productData);
    setIsAddModalOpen(false);
    setNewProduct({
      name: '',
      category: Category.OTHERS,
      purchase_price: 0,
      selling_price: 0,
      stock_quantity: 0,
      description: '',
      image_url: ''
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      addDocument({
        file_name: file.name,
        file_url: URL.createObjectURL(file),
        upload_date: new Date().toISOString(),
        related_to: 'General'
      });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleProductImgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct(prev => ({ ...prev, image_url: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (!state.user) {
    return (
      <div className="min-h-screen bg-white flex flex-col md:flex-row font-inter">
        {/* Left Side: Brand Visuals */}
        <div className="hidden md:flex flex-1 bg-[#020617] text-white p-24 flex-col justify-between relative overflow-hidden">
          <div className="absolute top-[-10%] right-[-10%] opacity-10 pointer-events-none">
            <Zap size={800} strokeWidth={0.5} />
          </div>
          <div className="relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-6 mb-20"
            >
              <div className="w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/40">
                <Cpu className="text-white" size={32} />
              </div>
              <h2 className="text-3xl font-[900] uppercase tracking-tighter">Akash All Solution</h2>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-8xl font-[900] leading-[0.95] mb-12 uppercase tracking-tighter"
            >
              Master Your <br /> 
              <span className="text-blue-500">Business</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-slate-400 text-2xl max-w-xl font-medium leading-relaxed"
            >
              The premium management hub for electric and electronic enterprises. 
              Precision inventory, analytics, and merchant tools.
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex gap-16 relative z-10"
          >
            <div className="flex flex-col gap-3">
              <ShieldCheck className="text-blue-500" size={32} />
              <p className="font-[900] text-[12px] uppercase tracking-[0.2em] text-slate-300">Military Grade Security</p>
            </div>
            <div className="flex flex-col gap-3">
              <TrendingUp className="text-emerald-500" size={32} />
              <p className="font-[900] text-[12px] uppercase tracking-[0.2em] text-slate-300">Quantum Analytics</p>
            </div>
          </motion.div>
        </div>

        {/* Right Side: High-Contrast Login Form */}
        <div className="flex-1 flex flex-col items-center justify-center p-12 bg-white relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-sm"
          >
            <div className="mb-20 text-center md:text-left">
              <h2 className="text-[56px] font-[900] text-slate-950 mb-4 uppercase tracking-tighter leading-none">
                Merchant Access
              </h2>
              <p className="text-slate-500 font-[800] uppercase text-[12px] tracking-[0.2em] ml-1">
                Enter credentials to initiate terminal
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-10">
              <div className="space-y-4">
                <label className="text-[11px] font-[950] text-slate-900 uppercase tracking-widest ml-1">Email</label>
                <div className="relative group">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                  <input 
                    required
                    type="email"
                    placeholder="akash@solution.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full pl-16 pr-8 py-7 bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] focus:ring-8 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all text-slate-950 font-[800] placeholder:text-slate-300 text-lg shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-4">
                 <label className="text-[11px] font-[950] text-slate-900 uppercase tracking-widest ml-1">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                  <input 
                    required
                    type="password"
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full pl-16 pr-8 py-7 bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] focus:ring-8 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all text-slate-950 font-[800] placeholder:text-slate-300 text-lg shadow-sm"
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={isLoginLoading}
                className="w-full py-8 px-8 bg-slate-950 text-white font-[950] rounded-[1.5rem] flex items-center justify-center gap-6 transition-all hover:bg-black hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 uppercase tracking-[0.2em] text-[14px]"
              >
                {isLoginLoading ? <Loader2 className="animate-spin" size={24} /> : "Initiate Dashboard"}
              </button>
            </form>

            <div className="mt-40 text-center">
              <p className="text-[10px] text-slate-300 uppercase tracking-[0.6em] font-[900]">
                Akash All Solution Infrastructure v3.5
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  const filteredProducts = userProducts.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab} user={state.user} onLogout={logout} isAdmin={isAdmin}>
      <AnimatePresence mode="wait">
        {activeTab === 'dashboard' && (
          <Dashboard products={userProducts} sales={userSales} purchases={userPurchases} isAdminMode={isAdmin} />
        )}

        {isAdmin && activeTab === 'all_users' && (
          <div className="space-y-6">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getAllUsers().map(uid => (
                   <div key={uid} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-6 group hover:shadow-2xl transition-all">
                      <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                         <UserIcon size={32} />
                      </div>
                      <div>
                         <p className="font-black text-slate-900 uppercase tracking-tighter text-lg">{uid}</p>
                         <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">Authorized Merchant</p>
                      </div>
                      <div className="ml-auto">
                         <button className="px-6 py-3 bg-slate-950 text-white text-[11px] font-black rounded-2xl uppercase tracking-widest hover:bg-black transition-all">Inspect</button>
                      </div>
                   </div>
                ))}
             </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="space-y-10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="relative w-full sm:w-[500px]">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={22} />
                <input 
                  type="text" 
                  placeholder="Scan inventory database..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-16 pr-8 py-5 bg-white border-2 border-slate-100 rounded-[2rem] outline-none focus:ring-8 focus:ring-blue-50 transition-all shadow-sm text-slate-950 font-[800] text-lg"
                />
              </div>
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <button 
                  onClick={() => setIsAddModalOpen(true)}
                  className="flex-1 sm:flex-none px-10 py-5 bg-blue-600 text-white font-[950] rounded-[2rem] flex items-center justify-center gap-4 hover:bg-blue-700 transition-all shadow-2xl shadow-blue-200 uppercase text-[12px] tracking-widest"
                >
                  <Plus size={20} /> Registry Entry
                </button>
                {!isAdmin && (
                  <button 
                    onClick={() => { if(confirm("Initiate data wipe?")) clearProducts(); }}
                    className="p-5 bg-rose-50 text-rose-600 border border-rose-100 rounded-[2rem] hover:bg-rose-100 transition-all shadow-sm"
                  >
                    <Trash2 size={28} />
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
              {filteredProducts.map((product) => (
                <motion.div 
                  key={product.id}
                  layout
                  className="bg-white rounded-[3rem] border border-slate-100 overflow-hidden group shadow-sm hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-700 flex flex-col"
                >
                  <div className="h-64 relative overflow-hidden bg-slate-50">
                    <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute top-6 left-6">
                      <span className="px-6 py-2 bg-white/95 backdrop-blur-md text-slate-950 text-[11px] font-black rounded-full uppercase tracking-widest shadow-2xl border border-white/20">
                        {product.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <h4 className="font-black text-slate-950 truncate pr-4 uppercase tracking-tighter text-xl">{product.name}</h4>
                        <button 
                          onClick={() => { if(confirm(`Purge ${product.name}?`)) deleteProduct(product.id); }} 
                          className="p-3 hover:bg-rose-50 text-slate-300 hover:text-rose-600 rounded-[1.25rem] transition-all"
                        >
                          <Trash2 size={22} />
                        </button>
                      </div>
                      <div className="space-y-6">
                        <div className="flex justify-between text-[13px] font-[900] uppercase tracking-widest">
                          <span className="text-slate-400">Inventory Units</span>
                          <span className={`${product.stock_quantity < 10 ? 'text-rose-600 animate-pulse' : 'text-slate-950'}`}>
                            {product.stock_quantity}
                          </span>
                        </div>
                        <div className="h-3 w-full bg-slate-50 rounded-full overflow-hidden shadow-inner">
                          <div 
                            className={`h-full rounded-full transition-all duration-1000 ${product.stock_quantity < 10 ? 'bg-rose-600' : 'bg-blue-600'}`}
                            style={{ width: `${Math.min(100, (product.stock_quantity / 50) * 100)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center pt-8 border-t border-slate-50 mt-10">
                      <div>
                        <p className="text-[11px] text-slate-400 uppercase font-black tracking-widest mb-2">Market Value</p>
                        <p className="text-3xl font-[950] text-blue-600 tracking-tighter">৳{product.selling_price.toLocaleString()}</p>
                      </div>
                      <button 
                        onClick={() => addSale({
                          product_id: product.id,
                          quantity: 1,
                          selling_price_per_unit: product.selling_price,
                          total_amount: product.selling_price,
                          customer_name: 'Terminal Sale',
                          date: new Date().toISOString(),
                          payment_method: 'Cash'
                        })}
                        className="px-8 py-4 bg-emerald-50 text-emerald-600 font-black text-[12px] rounded-[1.5rem] hover:bg-emerald-600 hover:text-white transition-all uppercase tracking-widest shadow-inner border border-emerald-100"
                      >
                        Execute
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        <AnimatePresence>
          {isAddModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsAddModalOpen(false)}
                className="absolute inset-0 bg-slate-950/90 backdrop-blur-2xl"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 40 }}
                className="relative bg-white w-full max-w-2xl rounded-[4rem] shadow-2xl overflow-hidden"
              >
                <div className="p-12 max-h-[85vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-12">
                    <h3 className="text-4xl font-[950] text-slate-950 uppercase tracking-tighter">New Entry</h3>
                    <button onClick={() => setIsAddModalOpen(false)} className="p-4 hover:bg-slate-50 rounded-full transition-all text-slate-950">
                      <X size={32} />
                    </button>
                  </div>
                  <form onSubmit={handleAddProduct} className="space-y-10">
                    <div className="flex flex-col items-center mb-10">
                      <div className="w-56 h-56 rounded-[4rem] bg-slate-50 border-4 border-dashed border-slate-200 flex flex-col items-center justify-center overflow-hidden relative group transition-all hover:border-blue-500 hover:bg-blue-50/20">
                        {newProduct.image_url ? (
                          <div className="w-full h-full relative">
                            <img src={newProduct.image_url} alt="Preview" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-blue-600/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <RefreshCcw className="text-white animate-spin-slow" size={48} />
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-6 text-center p-8">
                            <ImageIcon size={64} className="text-slate-300" />
                            <span className="text-[12px] font-black text-slate-950 uppercase tracking-widest">Select Visual</span>
                          </div>
                        )}
                        <input 
                          type="file" 
                          ref={productImgRef}
                          onChange={handleProductImgUpload}
                          className="absolute inset-0 opacity-0 cursor-pointer z-10"
                          accept="image/*"
                        />
                      </div>
                    </div>

                    <div className="space-y-8">
                        <div className="space-y-4">
                        <label className="text-[12px] font-[950] text-slate-950 uppercase tracking-widest ml-2">Official Name</label>
                        <input 
                            required
                            type="text" 
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                            className="w-full px-8 py-6 bg-slate-50 border-2 border-slate-100 rounded-[2rem] focus:ring-8 focus:ring-blue-50 outline-none text-slate-950 font-[800] text-lg"
                            placeholder="e.g. Philips Star LED Panel"
                        />
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <label className="text-[12px] font-[950] text-slate-950 uppercase tracking-widest ml-2">Category Segment</label>
                            <select 
                                value={newProduct.category}
                                onChange={(e) => setNewProduct({...newProduct, category: e.target.value as Category})}
                                className="w-full px-8 py-6 bg-slate-50 border-2 border-slate-100 rounded-[2rem] focus:ring-8 focus:ring-blue-50 outline-none appearance-none text-slate-950 font-[800] cursor-pointer"
                            >
                                {Object.values(Category).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>
                        <div className="space-y-4">
                            <label className="text-[12px] font-[950] text-slate-950 uppercase tracking-widest ml-2">Initial Units</label>
                            <input 
                            required
                            type="number" 
                            min="0"
                            value={newProduct.stock_quantity}
                            onChange={(e) => setNewProduct({...newProduct, stock_quantity: parseInt(e.target.value) || 0})}
                            className="w-full px-8 py-6 bg-slate-50 border-2 border-slate-100 rounded-[2rem] focus:ring-8 focus:ring-blue-50 outline-none text-slate-950 font-[800]"
                            />
                        </div>
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <label className="text-[12px] font-[950] text-slate-950 uppercase tracking-widest ml-2">Unit Cost (৳)</label>
                            <input 
                            required
                            type="number" 
                            min="0"
                            step="0.01"
                            value={newProduct.purchase_price}
                            onChange={(e) => setNewProduct({...newProduct, purchase_price: parseFloat(e.target.value) || 0})}
                            className="w-full px-8 py-6 bg-slate-50 border-2 border-slate-100 rounded-[2rem] focus:ring-8 focus:ring-blue-50 outline-none text-slate-950 font-[800]"
                            />
                        </div>
                        <div className="space-y-4">
                            <label className="text-[12px] font-[950] text-slate-950 uppercase tracking-widest ml-2">Market Price (৳)</label>
                            <input 
                            required
                            type="number" 
                            min="0"
                            step="0.01"
                            value={newProduct.selling_price}
                            onChange={(e) => setNewProduct({...newProduct, selling_price: parseFloat(e.target.value) || 0})}
                            className="w-full px-8 py-6 bg-slate-50 border-2 border-slate-100 rounded-[2rem] focus:ring-8 focus:ring-blue-50 outline-none text-slate-950 font-[800]"
                            />
                        </div>
                        </div>
                    </div>

                    <button type="submit" className="w-full py-8 bg-slate-950 text-white font-[950] rounded-[2.5rem] shadow-2xl hover:bg-black hover:scale-[1.02] active:scale-95 transition-all mt-8 uppercase tracking-[0.3em] text-[14px]">
                      Execute Submission
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Other tabs remain functionally same but follow branding */}
        {activeTab === 'sales' && (
          <div className="bg-white rounded-[3.5rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-12 border-b border-slate-50 flex justify-between items-center">
              <h3 className="text-3xl font-black text-slate-950 uppercase tracking-tighter">Terminal Ledger</h3>
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center shadow-inner">
                <TrendingUp size={32} />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50">
                  <tr>
                    <th className="px-12 py-8 text-[11px] font-[950] text-slate-900 uppercase tracking-widest">Timestamp</th>
                    <th className="px-12 py-8 text-[11px] font-[950] text-slate-900 uppercase tracking-widest">Entity Segment</th>
                    <th className="px-12 py-8 text-[11px] font-[950] text-slate-900 uppercase tracking-widest">SKU Details</th>
                    <th className="px-12 py-8 text-[11px] font-[950] text-slate-900 uppercase tracking-widest text-right">Settlement</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {userSales.length > 0 ? userSales.map(sale => (
                    <tr key={sale.id} className="hover:bg-slate-50/80 transition-all group">
                      <td className="px-12 py-8 text-slate-600 font-[800] text-sm uppercase">{new Date(sale.date).toLocaleString()}</td>
                      <td className="px-12 py-8 font-black text-slate-950 uppercase tracking-tighter text-lg">{sale.customer_name}</td>
                      <td className="px-12 py-8 text-slate-500 font-bold text-sm uppercase tracking-widest">
                        {userProducts.find(p => p.id === sale.product_id)?.name || 'Retired SKU'}
                      </td>
                      <td className="px-12 py-8 font-[950] text-emerald-600 text-right text-2xl tracking-tighter">৳{sale.total_amount.toLocaleString()}</td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={4} className="px-12 py-32 text-center text-slate-300 font-black uppercase text-sm tracking-[0.5em] italic">Database Empty</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'purchases' && (
          <div className="bg-white rounded-[3.5rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-12 border-b border-slate-50 flex justify-between items-center">
              <h3 className="text-3xl font-black text-slate-950 uppercase tracking-tighter">Logistics Stream</h3>
              <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center shadow-inner">
                <ShoppingBag size={32} />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50">
                  <tr>
                    <th className="px-12 py-8 text-[11px] font-[950] text-slate-900 uppercase tracking-widest">Ref Code</th>
                    <th className="px-12 py-8 text-[11px] font-[950] text-slate-900 uppercase tracking-widest">Vendor</th>
                    <th className="px-12 py-8 text-[11px] font-[950] text-slate-900 uppercase tracking-widest">SKU Entity</th>
                    <th className="px-12 py-8 text-[11px] font-[950] text-slate-900 uppercase tracking-widest text-right">Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {userPurchases.length > 0 ? userPurchases.map(p => (
                    <tr key={p.id} className="hover:bg-slate-50/80 transition-all">
                      <td className="px-12 py-8 font-mono text-[13px] font-black text-blue-600">#{p.invoice_number}</td>
                      <td className="px-12 py-8 font-black text-slate-950 uppercase tracking-tighter text-lg">{p.supplier_name}</td>
                      <td className="px-12 py-8 text-slate-500 font-bold text-sm uppercase tracking-widest">{userProducts.find(pr => pr.id === p.product_id)?.name || 'Purged'}</td>
                      <td className="px-12 py-8 font-[950] text-slate-950 text-right text-2xl tracking-tighter">৳{p.total_amount.toLocaleString()}</td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={4} className="px-12 py-32 text-center text-slate-300 font-black uppercase text-sm tracking-[0.5em] italic">No Stream Detected</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="space-y-12 pb-20">
            <div className="bg-white p-20 rounded-[4rem] border-2 border-slate-50 shadow-sm text-center relative overflow-hidden group">
              <div className="w-28 h-28 bg-blue-50 text-blue-600 rounded-[3rem] flex items-center justify-center mx-auto mb-10 shadow-inner border-2 border-white">
                <Upload size={56} />
              </div>
              <h3 className="text-5xl font-[950] text-slate-950 uppercase tracking-tighter mb-6">Central Vault</h3>
              <p className="text-slate-400 font-black uppercase text-sm tracking-[0.4em] mb-12 max-w-lg mx-auto">Upload licenses, certifications, and merchant logs</p>
              
              <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" id="file-upload" />
              <label 
                htmlFor="file-upload" 
                className="px-16 py-6 bg-slate-950 text-white font-[950] rounded-[2rem] hover:bg-black hover:shadow-2xl transition-all cursor-pointer inline-flex items-center gap-6 uppercase text-sm tracking-widest"
              >
                Sync with Cloud <CloudSync size={24} />
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {userDocuments.map(doc => (
                <div key={doc.id} className="bg-white p-10 rounded-[3.5rem] border border-slate-100 flex items-center gap-8 hover:shadow-2xl transition-all border-l-[12px] border-l-blue-600 shadow-sm">
                  <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition-colors shadow-inner">
                    <FileText size={40} />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="font-black text-slate-950 truncate text-xl uppercase tracking-tighter mb-2">{doc.file_name}</p>
                    <p className="text-[11px] text-slate-400 uppercase font-black tracking-widest">{doc.related_to} segment</p>
                  </div>
                  <a 
                    href={doc.file_url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-600 p-6 hover:bg-blue-50 rounded-[2rem] transition-all border border-blue-50 shadow-sm"
                  >
                    <ExternalLink size={24} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'profits' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pb-20">
            <div className="bg-slate-950 p-20 rounded-[5rem] text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
                 <Zap size={350} />
              </div>
              <div className="relative z-10">
                <p className="text-slate-400 text-[13px] font-[950] uppercase tracking-[0.5em] mb-6">Net Aggregated Terminal Profit</p>
                <h2 className="text-9xl font-[950] tracking-tighter mb-16">৳{(userSales.reduce((sum,s)=>sum+s.total_amount,0) - userPurchases.reduce((sum,p)=>sum+p.total_amount,0)).toLocaleString()}</h2>
                
                <div className="grid grid-cols-2 gap-10">
                  <div className="bg-white/5 backdrop-blur-3xl p-10 rounded-[3.5rem] border border-white/10 shadow-inner group hover:bg-white/10 transition-all">
                    <p className="text-emerald-500 text-[11px] font-[950] uppercase tracking-widest mb-4">Gross Inbound</p>
                    <p className="text-4xl font-[950] tracking-tighter">৳{userSales.reduce((sum,s)=>sum+s.total_amount,0).toLocaleString()}</p>
                  </div>
                  <div className="bg-white/5 backdrop-blur-3xl p-10 rounded-[3.5rem] border border-white/10 shadow-inner group hover:bg-white/10 transition-all">
                    <p className="text-rose-500 text-[11px] font-[950] uppercase tracking-widest mb-4">Total Logistics</p>
                    <p className="text-4xl font-[950] tracking-tighter">৳{userPurchases.reduce((sum,p)=>sum+p.total_amount,0).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-20 rounded-[5rem] border border-slate-100 shadow-sm flex flex-col justify-center text-center">
               <div className="w-28 h-28 bg-blue-600 text-white rounded-[3.5rem] flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-blue-100">
                  <BarChart3 size={56} />
               </div>
              <h3 className="text-5xl font-[950] text-slate-950 uppercase tracking-tighter mb-6">Quantum Intelligence</h3>
              <p className="text-slate-400 font-black text-[13px] uppercase tracking-[0.4em] mb-16 max-w-sm mx-auto">Proprietary visual data streams via Google Looker protocol</p>
              <a href={state.lookerStudioUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-6 px-16 py-8 bg-slate-950 text-white font-[950] rounded-[2.5rem] hover:bg-black hover:shadow-[0_30px_60px_rgba(0,0,0,0.3)] transition-all shadow-xl uppercase text-sm tracking-widest">
                Initiate Grow-Report <ExternalLink size={24} />
              </a>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-12 max-w-5xl mx-auto pb-40">
            <div className="bg-white p-16 rounded-[4rem] border-2 border-slate-50 shadow-sm">
                <h3 className="text-3xl font-[950] text-slate-950 mb-12 flex items-center gap-6 uppercase tracking-tighter">
                <UserIcon className="text-blue-600" size={40} /> Merchant Profile Registry
                </h3>
                <form onSubmit={handleUpdateProfile} className="space-y-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    <div className="space-y-4">
                        <label className="text-[12px] font-[950] text-slate-950 uppercase tracking-widest ml-2">Alias</label>
                        <input name="name" type="text" defaultValue={state.user?.name} className="w-full px-8 py-6 bg-slate-50 border-2 border-slate-100 rounded-[2rem] outline-none focus:ring-8 focus:ring-blue-50 transition-all text-slate-950 font-[800] text-lg" />
                    </div>
                    <div className="space-y-4">
                        <label className="text-[12px] font-[950] text-slate-950 uppercase tracking-widest ml-2">Entity Name</label>
                        <input name="businessName" type="text" defaultValue={state.user?.businessName} className="w-full px-8 py-6 bg-slate-50 border-2 border-slate-100 rounded-[2rem] outline-none focus:ring-8 focus:ring-blue-50 transition-all text-slate-950 font-[800] text-lg" />
                    </div>
                </div>
                <button type="submit" className="px-16 py-6 bg-blue-600 text-white font-[950] rounded-[2rem] hover:bg-blue-700 hover:shadow-2xl transition-all uppercase text-sm tracking-[0.2em] shadow-xl shadow-blue-100">
                    Commit Updates
                </button>
                </form>
            </div>
          </div>
        )}
      </AnimatePresence>

      <ChatWidget />
    </Layout>
  );
}
