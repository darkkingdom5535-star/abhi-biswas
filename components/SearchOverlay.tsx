
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useData } from '../contexts/DataContext';
import { Link, useNavigate } from 'react-router-dom';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const { products, categories } = useData();
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setTimeout(() => inputRef.current?.focus(), 100);
        } else {
            document.body.style.overflow = 'auto';
        }
        
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        
        return () => { 
            document.body.style.overflow = 'auto'; 
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);
    
    const handleLinkClick = (path: string) => {
        navigate(path);
        onClose();
    };

    const searchResults = useMemo(() => {
        if (!searchTerm.trim()) {
            return { products: [], categories: [] };
        }
        const lowercasedTerm = searchTerm.toLowerCase();
        const filteredProducts = products.filter(p => 
            p.name.toLowerCase().includes(lowercasedTerm) || 
            p.description.toLowerCase().includes(lowercasedTerm)
        ).slice(0, 5); // Limit results
        const filteredCategories = categories.filter(c => 
            c.name.toLowerCase().includes(lowercasedTerm)
        ).slice(0, 3); // Limit results
        return { products: filteredProducts, categories: filteredCategories };
    }, [searchTerm, products, categories]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-white z-[100] flex flex-col animate-fade-in">
            <div className="flex-shrink-0 flex items-center p-3 border-b space-x-3">
                <button onClick={onClose} className="text-gray-600">
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
                </button>
                <input
                    ref={inputRef}
                    type="search"
                    placeholder="Search for Products, Brands and More"
                    className="w-full text-md outline-none bg-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="flex-grow overflow-y-auto p-4">
                {searchTerm && searchResults.categories.length === 0 && searchResults.products.length === 0 && (
                    <div className="text-center text-gray-500 py-10">No results found for "{searchTerm}"</div>
                )}
                {searchResults.categories.length > 0 && (
                    <div className="mb-6">
                        <h3 className="font-bold text-gray-700 mb-2 px-3">Categories</h3>
                        <div className="space-y-1">
                            {searchResults.categories.map(cat => (
                                <div key={cat.id} onClick={() => handleLinkClick(`/category/${cat.id}`)} className="p-3 rounded-lg flex items-center space-x-3 hover:bg-gray-100 cursor-pointer">
                                    <img src={cat.image} alt={cat.name} className="w-10 h-10 rounded-md object-cover" />
                                    <span className="font-semibold">{cat.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {searchResults.products.length > 0 && (
                    <div>
                        <h3 className="font-bold text-gray-700 mb-2 px-3">Products</h3>
                        <div className="space-y-1">
                            {searchResults.products.map(prod => (
                                <div key={prod.id} onClick={() => handleLinkClick(`/product/${prod.id}`)} className="p-3 rounded-lg flex items-center space-x-3 hover:bg-gray-100 cursor-pointer">
                                    <img src={prod.image} alt={prod.name} className="w-12 h-12 rounded-md object-cover" />
                                    <div>
                                        <p className="font-semibold">{prod.name}</p>
                                        <p className="text-sm text-gray-500">{prod.description.substring(0, 50)}...</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchOverlay;
