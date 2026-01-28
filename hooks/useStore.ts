
import { useState, useEffect } from 'react';
import { User, Product, Purchase, Sale, Document, AppState, Category, UserRole } from '../types';
import { MOCK_PRODUCTS } from '../constants';

const STORAGE_KEY = 'akash_all_solution_data_v3';

export const useStore = () => {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse storage", e);
      }
    }
    return {
      user: null,
      products: [],
      purchases: [],
      sales: [],
      documents: [],
      lookerStudioUrl: 'https://lookerstudio.google.com/reporting/example'
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const login = (user: User) => {
    setState(prev => ({ ...prev, user }));
  };

  const logout = () => {
    setState(prev => ({ ...prev, user: null }));
  };

  const updateUser = (updates: Partial<User>) => {
    setState(prev => {
      if (!prev.user) return prev;
      return {
        ...prev,
        user: { ...prev.user, ...updates }
      };
    });
  };

  const addProduct = (product: Omit<Product, 'id' | 'userId'>) => {
    setState(prev => {
      const newProduct = {
        ...product,
        id: Math.random().toString(36).substr(2, 9),
        userId: prev.user?.id || 'guest'
      };
      return { ...prev, products: [...prev.products, newProduct] };
    });
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setState(prev => ({
      ...prev,
      products: prev.products.map(p => {
        // RLS Check: Only owner or admin can update
        const isAuthorized = p.userId === prev.user?.id || prev.user?.role === 'ADMIN';
        if (p.id === id && isAuthorized) {
          return { ...p, ...updates };
        }
        return p;
      })
    }));
  };

  const deleteProduct = (id: string) => {
    setState(prev => {
      // Find the product and check authorization
      const products = prev.products.filter(p => {
        if (p.id !== id) return true;
        // If it is the product, only keep it if the user is NOT authorized to delete it
        const isAuthorized = p.userId === prev.user?.id || prev.user?.role === 'ADMIN';
        return !isAuthorized; 
      });
      return { ...prev, products };
    });
  };

  const clearProducts = () => {
    setState(prev => ({
      ...prev,
      products: prev.products.filter(p => p.userId !== prev.user?.id)
    }));
  };

  const loadDemoData = () => {
    setState(prev => {
      if (!prev.user) return prev;
      const initialProducts = MOCK_PRODUCTS.map(p => ({ 
        ...p, 
        id: 'demo-' + Math.random().toString(36).substr(2, 5),
        category: p.category as Category,
        userId: prev.user!.id 
      }));
      return { ...prev, products: [...prev.products, ...initialProducts] };
    });
  };

  const resetData = () => {
    localStorage.removeItem(STORAGE_KEY);
    window.location.reload();
  };

  const addPurchase = (purchase: Omit<Purchase, 'id' | 'userId'>) => {
    setState(prev => {
        const newPurchase = {
          ...purchase,
          id: Math.random().toString(36).substr(2, 9),
          userId: prev.user?.id || 'guest'
        };
        const updatedProducts = prev.products.map(p => 
            p.id === purchase.product_id && (p.userId === prev.user?.id || prev.user?.role === 'ADMIN')
                ? { ...p, stock_quantity: p.stock_quantity + purchase.quantity, purchase_price: purchase.purchase_price_per_unit } 
                : p
        );
        return { 
            ...prev, 
            purchases: [...prev.purchases, newPurchase],
            products: updatedProducts
        };
    });
  };

  const addSale = (sale: Omit<Sale, 'id' | 'userId'>) => {
    setState(prev => {
        const newSale = {
          ...sale,
          id: Math.random().toString(36).substr(2, 9),
          userId: prev.user?.id || 'guest'
        };
        const updatedProducts = prev.products.map(p => 
            p.id === sale.product_id && (p.userId === prev.user?.id || prev.user?.role === 'ADMIN')
                ? { ...p, stock_quantity: p.stock_quantity - sale.quantity } 
                : p
        );
        return { 
            ...prev, 
            sales: [...prev.sales, newSale],
            products: updatedProducts
        };
    });
  };

  const addDocument = (doc: Omit<Document, 'id' | 'userId'>) => {
    setState(prev => {
      const newDoc = {
          ...doc,
          id: Math.random().toString(36).substr(2, 9),
          userId: prev.user?.id || 'guest'
      };
      return { ...prev, documents: [...prev.documents, newDoc] };
    });
  };

  const setLookerStudioUrl = (url: string) => {
    setState(prev => ({ ...prev, lookerStudioUrl: url }));
  };

  const isAdmin = state.user?.role === 'ADMIN';

  // Computed views based on auth
  const userProducts = isAdmin ? state.products : state.products.filter(p => p.userId === state.user?.id);
  const userPurchases = isAdmin ? state.purchases : state.purchases.filter(p => p.userId === state.user?.id);
  const userSales = isAdmin ? state.sales : state.sales.filter(p => p.userId === state.user?.id);
  const userDocuments = isAdmin ? state.documents : state.documents.filter(d => d.userId === state.user?.id);

  const getAllUsers = () => {
    const userIds = new Set(state.products.map(p => p.userId));
    state.sales.forEach(s => userIds.add(s.userId));
    state.purchases.forEach(p => userIds.add(p.userId));
    return Array.from(userIds);
  };

  return {
    state,
    userProducts,
    userPurchases,
    userSales,
    userDocuments,
    isAdmin,
    login,
    logout,
    updateUser,
    addProduct,
    updateProduct,
    deleteProduct,
    clearProducts,
    loadDemoData,
    resetData,
    addPurchase,
    addSale,
    addDocument,
    setLookerStudioUrl,
    getAllUsers
  };
};
