
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_ITEMS } from '../constants';
import { Menu, X, Bell, User as UserIcon, LogOut, ShieldCheck, Users, BarChart3, TrendingUp, Package, ShoppingBag, FileText, Settings, LayoutDashboard } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (id: string) => void;
  user: any;
  onLogout: () => void;
  isAdmin?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, user, onLogout, isAdmin }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const adminNavItems = [
    { id: 'dashboard', label: 'Master Stats', icon: <BarChart3 size={20} /> },
    { id: 'all_users', label: 'Merchant List', icon: <Users size={20} /> },
    { id: 'products', label: 'Global Products', icon: <Package size={20} /> },
    { id: 'sales', label: 'Global Sales', icon: <TrendingUp size={20} /> },
    { id: 'purchases', label: 'Global Inbound', icon: <ShoppingBag size={20} /> },
    { id: 'documents', label: 'Archived Docs', icon: <FileText size={20} /> },
    { id: 'settings', label: 'Control Center', icon: <Settings size={20} /> },
  ];

  const currentNavItems = isAdmin ? adminNavItems : NAV_ITEMS;

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-hidden">
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 300 : 100 }}
        className="hidden md:flex flex-col bg-white border-r border-slate-100 z-30 transition-all duration-500 ease-in-out"
      >
        <div className="p-8 flex items-center gap-4 overflow-hidden">
          <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-2xl bg-black flex-shrink-0 flex items-center justify-center">
            <img 
                src="https://raw.githubusercontent.com/Akash-Ahmed-Official/Akash-Solution-Logo/main/logo.jpg" 
                alt="Logo" 
                className="w-full h-full object-cover"
                onError={(e) => {
                    e.currentTarget.src = "https://img.icons8.com/color/48/idea.png";
                }}
            />
          </div>
          {isSidebarOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="text-xl font-black text-slate-800 whitespace-nowrap overflow-hidden tracking-tighter uppercase">
                Akash All Solution
              </h1>
              {isAdmin && <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded-full">Master Admin</span>}
            </motion.div>
          )}
        </div>

        <nav className="flex-1 px-5 space-y-2 mt-6">
          {currentNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-5 px-5 py-4 rounded-2xl transition-all duration-300 group ${
                activeTab === item.id 
                  ? 'bg-slate-900 text-white shadow-2xl shadow-slate-200' 
                  : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <span className={`${activeTab === item.id ? 'text-white' : 'group-hover:text-slate-900 transition-colors'}`}>
                {item.icon}
              </span>
              {isSidebarOpen && (
                <span className="font-black whitespace-nowrap overflow-hidden uppercase text-[10px] tracking-widest">{item.label}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-5">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full flex items-center gap-5 px-5 py-4 rounded-2xl text-slate-400 hover:bg-slate-100 transition-all"
          >
            {isSidebarOpen ? <X size={20} className="text-slate-800" /> : <Menu size={20} className="text-slate-800" />}
            {isSidebarOpen && <span className="font-black uppercase text-[10px] tracking-widest">Toggle View</span>}
          </button>
        </div>
      </motion.aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-white border-b border-slate-50 flex items-center justify-between px-8 sticky top-0 z-20">
          <div className="flex items-center md:hidden">
            <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 text-slate-600">
              <Menu size={24} />
            </button>
            <span className="ml-4 font-black text-slate-800 truncate uppercase tracking-tighter">
              Akash All Solution
            </span>
          </div>
          
          <div className="hidden md:block">
            <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">
              {currentNavItems.find(item => item.id === activeTab)?.label}
            </h2>
          </div>

          <div className="flex items-center gap-6">
            <button className="p-3 text-slate-400 hover:bg-slate-50 rounded-2xl transition-all relative">
              <Bell size={20} />
              <span className="absolute top-3 right-3 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-4 p-1.5 pl-5 bg-slate-50 hover:bg-slate-100 rounded-2xl transition-all border border-slate-100"
              >
                <div className="hidden sm:block text-right">
                  <p className="text-[11px] font-black text-slate-800 uppercase tracking-tighter">{user?.name}</p>
                  <p className="text-[9px] text-slate-400 uppercase font-black tracking-widest">
                    {isAdmin ? 'Master User' : (user?.businessName || 'Agent')}
                  </p>
                </div>
                <img src={user?.avatar || "https://picsum.photos/40/40"} alt="Avatar" className="w-10 h-10 rounded-[1.25rem] border-2 border-white shadow-xl object-cover" />
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    className="absolute right-0 mt-3 w-64 bg-white border border-slate-100 rounded-[2rem] shadow-2xl p-4 z-50 overflow-hidden"
                  >
                    <div className="px-4 py-4 border-b border-slate-50 mb-2">
                      <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Session ID</p>
                      <p className="text-xs font-black truncate text-blue-600 uppercase">{user?.email}</p>
                    </div>
                    <button 
                      onClick={() => { setActiveTab('settings'); setIsProfileOpen(false); }}
                      className="w-full flex items-center gap-4 px-4 py-4 text-[10px] font-black text-slate-600 hover:bg-slate-50 rounded-2xl uppercase tracking-widest"
                    >
                      <UserIcon size={16} /> Registry
                    </button>
                    <button 
                      onClick={onLogout}
                      className="w-full flex items-center gap-4 px-4 py-4 text-[10px] font-black text-rose-600 hover:bg-rose-50 rounded-2xl uppercase tracking-widest"
                    >
                      <LogOut size={16} /> Terminate
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] md:hidden"
              />
              <motion.div 
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                className="fixed top-0 left-0 bottom-0 w-80 bg-white z-[110] md:hidden p-8 flex flex-col shadow-2xl"
              >
                <div className="flex items-center justify-between mb-10">
                  <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center overflow-hidden">
                    <img src="https://raw.githubusercontent.com/Akash-Ahmed-Official/Akash-Solution-Logo/main/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
                  </div>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-800 p-2">
                    <X size={28} />
                  </button>
                </div>
                <nav className="space-y-4 flex-1">
                  {currentNavItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }}
                      className={`w-full flex items-center gap-5 px-6 py-5 rounded-[1.5rem] font-black uppercase text-[11px] tracking-widest ${
                        activeTab === item.id ? 'bg-slate-900 text-white' : 'text-slate-400'
                      }`}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </button>
                  ))}
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <main className="flex-1 overflow-y-auto p-8 md:p-10 bg-slate-50/30">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'circOut' }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
