
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Product, Category, Order, User, CartItem } from '../types';
import { MOCK_PRODUCTS, MOCK_CATEGORIES, MOCK_ORDERS } from '../data/mockData';
import { useAuth } from './AuthContext';

interface DataContextType {
  products: Product[];
  categories: Category[];
  orders: Order[];
  users: User[]; // Users are now passed through from AuthContext
  upiId: string;
  qrCodeImageUrl: string;
  updateProduct: (product: Product) => void;
  addProduct: (product: Product) => void;
  deleteProduct: (productId: number) => void;
  updateCategory: (category: Category) => void;
  addCategory: (category: Category) => void;
  deleteCategory: (categoryId: number) => void;
  addOrder: (orderData: { userId: number; items: CartItem[]; totalAmount: number; address: string; }) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  deleteOrder: (orderId: string) => void;
  deleteOrdersByUserId: (userId: number) => void;
  updateUpiId: (id: string) => void;
  updateQrCodeImageUrl: (url: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { users } = useAuth(); // Get user list from AuthContext
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [categories, setCategories] = useState<Category[]>(MOCK_CATEGORIES);
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [upiId, setUpiId] = useState<string>('your-upi-id@oksbi');
  const [qrCodeImageUrl, setQrCodeImageUrl] = useState<string>('');

  // Product Management
  const updateProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };
  
  const addProduct = (newProduct: Product) => {
    setProducts(prev => [...prev, newProduct]);
  };

  const deleteProduct = (productId: number) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };
  
  // Category Management
  const updateCategory = (updatedCategory: Category) => {
    setCategories(prev => prev.map(c => c.id === updatedCategory.id ? updatedCategory : c));
  };
  
  const addCategory = (newCategory: Category) => {
    setCategories(prev => [...prev, newCategory]);
  };

  const deleteCategory = (categoryId: number) => {
    const fallbackCategoryId = categories.find(c => c.id !== categoryId)?.id || 0;
    setProducts(prev => prev.map(p => p.categoryId === categoryId ? {...p, categoryId: fallbackCategoryId} : p));
    setCategories(prev => prev.filter(c => c.id !== categoryId));
  };

  // Order Management
  const addOrder = (orderData: { userId: number; items: CartItem[]; totalAmount: number; address: string; }) => {
    const newOrder: Order = {
        ...orderData,
        id: `OD${Date.now()}`,
        status: 'Pending Confirmation',
        createdAt: new Date().toISOString(),
    };
    setOrders(prev => [newOrder, ...prev]);
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? {...o, status} : o));
  };
  
  const deleteOrder = (orderId: string) => {
    setOrders(prev => prev.filter(o => o.id !== orderId));
  };

  const deleteOrdersByUserId = (userId: number) => {
    setOrders(prev => prev.filter(o => o.userId !== userId));
  };
  
  // Settings
  const updateUpiId = (id: string) => {
    setUpiId(id);
  };
  
  const updateQrCodeImageUrl = (url: string) => {
    setQrCodeImageUrl(url);
  };


  return (
    <DataContext.Provider value={{ 
        products, 
        categories, 
        orders,
        users,
        upiId,
        qrCodeImageUrl,
        updateProduct, 
        addProduct, 
        deleteProduct,
        updateCategory,
        addCategory,
        deleteCategory,
        addOrder,
        updateOrderStatus,
        deleteOrder,
        deleteOrdersByUserId,
        updateUpiId,
        updateQrCodeImageUrl
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};