
import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  TrendingUp, 
  FileText, 
  Settings, 
  BarChart3,
  LogOut,
  User,
  Plus,
  Search,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Calendar
} from 'lucide-react';

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
  { id: 'products', label: 'Products', icon: <Package size={20} /> },
  { id: 'purchases', label: 'Purchases', icon: <ShoppingBag size={20} /> },
  { id: 'sales', label: 'Sales', icon: <TrendingUp size={20} /> },
  { id: 'documents', label: 'Documents', icon: <FileText size={20} /> },
  { id: 'profits', label: 'Profits & Reports', icon: <BarChart3 size={20} /> },
  { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
];

export const MOCK_PRODUCTS = [
  {
    id: 'p1',
    name: 'SuperCool Ceiling Fan',
    category: 'Electrical',
    purchase_price: 3500,
    selling_price: 4500,
    stock_quantity: 15,
    description: 'Energy efficient ceiling fan with 5 stars rating.',
    image_url: 'https://picsum.photos/seed/fan1/200/200'
  },
  {
    id: 'p2',
    name: 'Lumax LED 12W',
    category: 'Electrical',
    purchase_price: 120,
    selling_price: 180,
    stock_quantity: 8,
    description: 'Bright white LED bulb, durable.',
    image_url: 'https://picsum.photos/seed/bulb1/200/200'
  },
  {
    id: 'p3',
    name: 'QuickCharge Pro',
    category: 'Accessories',
    purchase_price: 450,
    selling_price: 850,
    stock_quantity: 45,
    description: 'Fast charging adapter compatible with all Type-C devices.',
    image_url: 'https://picsum.photos/seed/charger1/200/200'
  },
  {
    id: 'p4',
    name: 'Smart Television 43"',
    category: 'Electronics',
    purchase_price: 25000,
    selling_price: 32000,
    stock_quantity: 5,
    description: '4K Ultra HD Smart TV with Android OS.',
    image_url: 'https://picsum.photos/seed/tv1/200/200'
  }
];
