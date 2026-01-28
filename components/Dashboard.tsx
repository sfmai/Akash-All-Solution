
import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, Cell, PieChart, Pie
} from 'recharts';
import { 
  ArrowUpRight, ArrowDownRight, TrendingUp, ShoppingBag, Package, 
  AlertTriangle, CreditCard, DollarSign, Users, Globe, CheckCircle
} from 'lucide-react';
import { Product, Sale, Purchase } from '../types';

interface DashboardProps {
  products: Product[];
  sales: Sale[];
  purchases: Purchase[];
  isAdminMode?: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ products, sales, purchases, isAdminMode }) => {
  const totalSalesAmount = sales.reduce((sum, s) => sum + s.total_amount, 0);
  const totalPurchasesAmount = purchases.reduce((sum, p) => sum + p.total_amount, 0);
  const totalProfit = totalSalesAmount - totalPurchasesAmount;
  const lowStockProducts = products.filter(p => p.stock_quantity < 10);
  const inventoryValue = products.reduce((acc, p) => acc + (p.purchase_price * p.stock_quantity), 0);

  // Simulated chart data
  const salesData = [
    { name: '01', amount: totalSalesAmount * 0.1 },
    { name: '02', amount: totalSalesAmount * 0.15 },
    { name: '03', amount: totalSalesAmount * 0.12 },
    { name: '04', amount: totalSalesAmount * 0.18 },
    { name: '05', amount: totalSalesAmount * 0.22 },
    { name: '06', amount: totalSalesAmount * 0.13 },
    { name: '07', amount: totalSalesAmount * 0.1 },
  ];

  const categoryData = [
    { name: 'Fans', value: products.filter(p => p.category.includes('Fan')).length },
    { name: 'Bulbs', value: products.filter(p => p.category.includes('Bulb')).length },
    { name: 'Power', value: products.filter(p => p.category.includes('Battery')).length },
    { name: 'Others', value: products.filter(p => !p.category.includes('Fan') && !p.category.includes('Bulb') && !p.category.includes('Battery')).length },
  ].filter(c => c.value > 0);

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  const stats = [
    { 
      label: isAdminMode ? 'Global Revenue' : 'Total Revenue', 
      value: `৳${totalSalesAmount.toLocaleString()}`, 
      icon: isAdminMode ? <Globe className="text-blue-600" /> : <TrendingUp className="text-blue-600" />, 
      color: 'bg-blue-50', 
      trend: '+12%', 
      trendUp: true 
    },
    { 
      label: isAdminMode ? 'Global COGS' : 'Gross Purchases', 
      value: `৳${totalPurchasesAmount.toLocaleString()}`, 
      icon: <ShoppingBag className="text-emerald-600" />, 
      color: 'bg-emerald-50', 
      trend: '+5%', 
      trendUp: true 
    },
    { 
      label: isAdminMode ? 'Global Profit' : 'Net Profit', 
      value: `৳${totalProfit.toLocaleString()}`, 
      icon: <DollarSign className="text-amber-600" />, 
      color: 'bg-amber-50', 
      trend: '+18%', 
      trendUp: true 
    },
    { 
      label: isAdminMode ? 'Total Users' : 'Inventory Value', 
      value: isAdminMode ? `${new Set(sales.map(s => s.userId)).size}` : `৳${inventoryValue.toLocaleString()}`, 
      icon: isAdminMode ? <Users className="text-indigo-600" /> : <Package className="text-indigo-600" />, 
      color: 'bg-indigo-50', 
      trend: isAdminMode ? '+2' : '-2%', 
      trendUp: true 
    },
  ];

  return (
    <div className="space-y-10">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.6, ease: 'circOut' }}
            className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-50 flex flex-col justify-between hover:shadow-2xl transition-all group"
          >
            <div className="flex items-center justify-between mb-8">
              <div className={`p-4 rounded-2xl ${stat.color} group-hover:scale-110 transition-transform`}>
                {stat.icon}
              </div>
              <div className={`flex items-center text-[10px] font-black uppercase tracking-widest ${stat.trendUp ? 'text-emerald-600' : 'text-rose-600'}`}>
                {stat.trendUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.trend}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{stat.label}</p>
              <h3 className="text-3xl font-black text-slate-800 tracking-tighter">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Performance Chart */}
        <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] shadow-sm border border-slate-50">
          <div className="flex items-center justify-between mb-10">
            <div>
                <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">Growth Dynamics</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Transaction cycle analytics</p>
            </div>
            <select className="bg-slate-50 border-none text-[10px] font-black uppercase tracking-widest text-slate-500 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer">
              <option>Real-time Stream</option>
              <option>Monthly Batch</option>
            </select>
          </div>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="#f8fafc" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 900}} dy={15} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 900}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)', padding: '20px' }}
                />
                <Area type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={5} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Inventory Criticality */}
        <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-50">
          <div className="flex items-center justify-between mb-10">
            <div>
                <h3 className="text-xl font-black text-slate-800 uppercase tracking-tighter">Critical Stock</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Replenishment needed</p>
            </div>
            <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center">
                <AlertTriangle size={24} />
            </div>
          </div>
          <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scroll">
            {lowStockProducts.length > 0 ? lowStockProducts.map((p) => (
              <div key={p.id} className="flex items-center gap-6 p-5 bg-slate-50/50 rounded-3xl border border-slate-100 group hover:bg-white hover:shadow-xl transition-all">
                <div className="w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-white shadow-sm">
                  <img src={p.image_url} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-black text-slate-800 uppercase tracking-tighter truncate">{p.name}</p>
                  {isAdminMode && <p className="text-[8px] font-black text-blue-500 uppercase mt-0.5">OWNER: {p.userId}</p>}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${p.stock_quantity < 5 ? 'bg-rose-500' : 'bg-amber-500'}`}
                        style={{ width: `${Math.min(100, (p.stock_quantity / 20) * 100)}%` }}
                      ></div>
                    </div>
                    <span className="text-[9px] font-black text-slate-500 uppercase">{p.stock_quantity} Units</span>
                  </div>
                </div>
              </div>
            )) : (
              <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full mb-6 shadow-inner">
                  {/* FIXED: CheckCircle is now imported from lucide-react */}
                  <CheckCircle size={32} />
                </div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Inventory Fully Optimal</p>
              </div>
            )}
          </div>
          <button className="w-full mt-10 py-5 text-blue-600 font-black text-[10px] bg-blue-50 hover:bg-blue-600 hover:text-white rounded-2xl transition-all uppercase tracking-widest shadow-inner">
            Master Reorder Interface
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-10">
        {/* Ledger */}
        <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-50 overflow-hidden">
          <div className="flex items-center justify-between mb-10">
             <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">Live Sales Ledger</h3>
             <TrendingUp size={24} className="text-slate-200" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-y-4">
              <thead>
                <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <th className="pb-4 px-4">Merchant/Client</th>
                  <th className="pb-4 px-4">Entity SKU</th>
                  <th className="pb-4 px-4 text-right">Value</th>
                  <th className="pb-4 px-4 text-center">Protocol</th>
                </tr>
              </thead>
              <tbody>
                {sales.slice(-5).reverse().map((sale) => (
                  <tr key={sale.id} className="group bg-slate-50/50 hover:bg-white hover:shadow-xl transition-all rounded-3xl overflow-hidden">
                    <td className="py-6 px-4 rounded-l-3xl">
                      <p className="text-xs font-black text-slate-800 uppercase tracking-tighter">{sale.customer_name}</p>
                      <p className="text-[8px] font-black text-slate-400 uppercase mt-0.5">{new Date(sale.date).toLocaleDateString()}</p>
                    </td>
                    <td className="py-6 px-4 text-[10px] font-black text-blue-500 uppercase tracking-widest">
                        {isAdminMode ? sale.userId : `SKU-${sale.product_id.substr(0,4)}`}
                    </td>
                    <td className="py-6 px-4 text-sm font-black text-emerald-600 text-right tracking-tighter">৳{sale.total_amount.toLocaleString()}</td>
                    <td className="py-6 px-4 rounded-r-3xl text-center">
                      <span className="px-3 py-1 bg-white border border-slate-100 text-slate-500 text-[8px] font-black rounded-full uppercase tracking-widest shadow-sm">{sale.payment_method}</span>
                    </td>
                  </tr>
                ))}
                {sales.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-20 text-center text-slate-300 font-black uppercase text-[10px] tracking-[0.3em] italic">Void Ledger</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Market Composition */}
        <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-50">
          <h3 className="text-2xl font-black text-slate-800 mb-10 uppercase tracking-tighter">Entity Composition</h3>
          <div className="h-[350px] w-full flex items-center justify-between">
            <div className="flex-1 h-full">
                <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={8}
                    dataKey="value"
                    stroke="none"
                    >
                    {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="w-2/5 flex flex-col gap-5 pr-4">
              {categoryData.map((cat, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest truncate">{cat.name}</span>
                  </div>
                  <span className="text-xs font-black text-slate-800">{cat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
