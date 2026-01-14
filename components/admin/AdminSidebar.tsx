
import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminSidebar: React.FC = () => {
  const commonClasses = "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors";
  const activeClass = "bg-flipkart-blue text-white shadow-lg";
  const inactiveClass = "text-gray-600 hover:bg-gray-200";

  return (
    <aside className="w-64 bg-white shadow-lg flex-shrink-0">
      <div className="p-4 border-b">
        <h2 className="text-2xl font-extrabold text-flipkart-blue italic text-center">Flipkart</h2>
        <p className="text-center text-xs text-gray-500 uppercase">Admin Panel</p>
      </div>
      <nav className="p-4 space-y-2">
        <NavLink 
          to="/admin" 
          end 
          className={({ isActive }) => `${commonClasses} ${isActive ? activeClass : inactiveClass}`}
        >
          <DashboardIcon />
          <span className="font-semibold">Dashboard</span>
        </NavLink>
        <NavLink 
          to="/admin/products" 
          className={({ isActive }) => `${commonClasses} ${isActive ? activeClass : inactiveClass}`}
        >
          <ProductIcon />
          <span className="font-semibold">Products</span>
        </NavLink>
        <NavLink 
          to="/admin/categories" 
          className={({ isActive }) => `${commonClasses} ${isActive ? activeClass : inactiveClass}`}
        >
          <CategoryIcon />
          <span className="font-semibold">Categories</span>
        </NavLink>
        <NavLink 
          to="/admin/orders" 
          className={({ isActive }) => `${commonClasses} ${isActive ? activeClass : inactiveClass}`}
        >
          <OrderIcon />
          <span className="font-semibold">Orders</span>
        </NavLink>
        <NavLink 
          to="/admin/users" 
          className={({ isActive }) => `${commonClasses} ${isActive ? activeClass : inactiveClass}`}
        >
          <UsersIcon />
          <span className="font-semibold">Users</span>
        </NavLink>
        <NavLink 
          to="/admin/settings" 
          className={({ isActive }) => `${commonClasses} ${isActive ? activeClass : inactiveClass}`}
        >
          <SettingsIcon />
          <span className="font-semibold">Settings</span>
        </NavLink>
      </nav>
    </aside>
  );
};

// SVG Icons for Sidebar
const DashboardIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>;
const ProductIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>;
const CategoryIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8a13 13 0 0 1 12.95 20M2 4a17 17 0 0 1 16.95 20"/><path d="M2 20h20"/></svg>;
const OrderIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>;
const UsersIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
const SettingsIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>;

export default AdminSidebar;
