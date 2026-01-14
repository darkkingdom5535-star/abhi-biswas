
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import SearchOverlay from './SearchOverlay';

const Header: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  if (!user) return null;

  const getTitle = () => {
    const path = location.pathname;
    if (path === '/') return <span className="font-extrabold text-xl text-white italic">Flipkart</span>;
    if (path.startsWith('/category')) return 'Products';
    if (path.startsWith('/product')) return 'Product Details';
    if (path.startsWith('/cart')) return 'My Cart';
    if (path.startsWith('/checkout')) return 'Checkout';
    if (path.startsWith('/orders')) return 'My Orders';
    if (path.startsWith('/profile')) return 'Profile';
    return 'Flipkart';
  };

  const showBackButton = location.pathname !== '/';

  return (
    <>
      <header className="bg-flipkart-blue sticky top-0 z-50 shadow-md">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <button onClick={() => navigate(-1)} className="text-white">
                <ArrowLeftIcon />
              </button>
            )}
            <h1 className="text-white text-lg font-medium">{getTitle()}</h1>
          </div>
          <div className="flex items-center space-x-4 text-white">
            <button onClick={() => setIsSearchOpen(true)}><SearchIcon /></button>
            <button><BellIcon /></button>
          </div>
        </div>
      </header>
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

const ArrowLeftIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
);

const SearchIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
);

const BellIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
);

export default Header;
