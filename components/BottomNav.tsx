
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const BottomNav: React.FC = () => {
  const { cartCount } = useCart();
  const navLinkClass = "flex flex-col items-center justify-center text-xs gap-1";
  const activeClass = "text-flipkart-blue";
  const inactiveClass = "text-flipkart-gray";

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_5px_rgba(0,0,0,0.1)] h-16 z-50">
      <div className="flex justify-around items-center h-full max-w-lg mx-auto">
        <NavLink to="/" end className={({ isActive }) => `${navLinkClass} ${isActive ? activeClass : inactiveClass}`}>
            <HomeIcon />
            <span>Home</span>
        </NavLink>
        <NavLink to="/orders" className={({ isActive }) => `${navLinkClass} ${isActive ? activeClass : inactiveClass}`}>
            <PackageIcon />
            <span>Orders</span>
        </NavLink>
        <NavLink to="/cart" className={({ isActive }) => `${navLinkClass} ${isActive ? activeClass : inactiveClass}`}>
          <div className="relative">
            <ShoppingCartIcon />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          <span>Cart</span>
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => `${navLinkClass} ${isActive ? activeClass : inactiveClass}`}>
            <UserIcon />
            <span>Profile</span>
        </NavLink>
      </div>
    </nav>
  );
};


// SVG Icons
const HomeIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
);

const PackageIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16.5 9.4a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z"/><path d="M12 15.5a2.5 2.5 0 0 0-2.5 2.5V21h5v-3a2.5 2.5 0 0 0-2.5-2.5Z"/><path d="M21 13.3a9 9 0 1 0-18 0"/><path d="m7.5 13.5 3-2 2.5 2.5 3.5-3"/></svg>
);

const ShoppingCartIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.16"/></svg>
);

const UserIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);


export default BottomNav;
