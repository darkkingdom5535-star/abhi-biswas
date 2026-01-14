
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { useCart } from '../contexts/CartContext';
import { generateAIRecommendations } from '../services/geminiService';
import { AIRecommendation } from '../types';

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams();
  const { products } = useData();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [isLoadingRecs, setIsLoadingRecs] = useState(false);
  const [notification, setNotification] = useState('');

  // State and ref for animation
  const [animationState, setAnimationState] = useState<'idle' | 'start' | 'end'>('idle');
  const [startRect, setStartRect] = useState<DOMRect | null>(null);
  const productImageRef = useRef<HTMLImageElement>(null);

  const product = products.find(p => p.id === parseInt(productId || '0'));

  useEffect(() => {
    if (product) {
        setIsLoadingRecs(true);
        generateAIRecommendations(product)
            .then(setRecommendations)
            .finally(() => setIsLoadingRecs(false));
    }
  }, [product]);

  // useEffect for managing animation lifecycle
  useEffect(() => {
    if (animationState === 'start') {
      const timer = setTimeout(() => setAnimationState('end'), 10);
      return () => clearTimeout(timer);
    }
    if (animationState === 'end') {
      const timer = setTimeout(() => {
        setAnimationState('idle');
        setStartRect(null);
      }, 1000); // Must match animation duration
      return () => clearTimeout(timer);
    }
  }, [animationState]);


  if (!product) {
    return <div className="p-4 text-center">Product not found.</div>;
  }
  
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  });

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setNotification(`${quantity} x ${product.name} added to cart!`);
    setTimeout(() => setNotification(''), 3000);

    // Trigger animation
    const rect = productImageRef.current?.getBoundingClientRect();
    if (rect) {
      setStartRect(rect);
      setAnimationState('start');
    }
  };

  // Flying image component for animation
  const FlyingImage = () => {
    if (!product || animationState === 'idle' || !startRect) return null;

    const cartIconPos = {
      top: window.innerHeight - 48,
      left: window.innerWidth * 0.625,
    };

    const style: React.CSSProperties = {
      position: 'fixed',
      zIndex: 100,
      transition: 'all 1s cubic-bezier(0.5, 0, 1, 0.5)',
      top: startRect.top,
      left: startRect.left,
      width: startRect.width,
      height: startRect.height,
      opacity: 1,
    };

    if (animationState === 'end') {
      style.top = cartIconPos.top;
      style.left = cartIconPos.left;
      style.width = 0;
      style.height = 0;
      style.opacity = 0;
      style.transform = 'rotate(360deg) scale(0.2)';
    }

    return (
      <img
        src={product.image}
        alt="flying product"
        style={style}
        className="object-cover rounded-lg"
      />
    );
  };

  return (
    <div className="bg-white min-h-full">
      <FlyingImage />
      <div className={`fixed top-0 left-0 right-0 bg-green-500 text-white p-3 text-center z-[101] transform transition-transform duration-300 shadow-lg ${notification ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="flex items-center justify-center">
            <CheckCircleIcon />
            <span className="ml-2 font-semibold">{notification}</span>
        </div>
      </div>

      <div className="w-full h-64 bg-gray-200">
        <img ref={productImageRef} src={product.image} alt={product.name} className="w-full h-full object-cover" />
      </div>
      
      <div className="p-4 space-y-4">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="text-3xl font-bold text-flipkart-blue">{formatter.format(product.price)}</p>
        <p className="text-green-600 font-semibold">{product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}</p>
        
        <div className="border-t pt-4">
          <h2 className="font-semibold text-lg mb-2">Description</h2>
          <p className="text-gray-600">{product.description}</p>
        </div>

        {/* AI Recommendations */}
        <div className="border-t pt-4">
            <h2 className="font-semibold text-lg mb-2 flex items-center">
                <SparklesIcon /> <span className="ml-2">You Might Also Like</span>
            </h2>
            {isLoadingRecs ? (
                <div className="flex justify-center items-center h-24">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
            ) : (
                <div className="space-y-3">
                    {recommendations.map(rec => (
                        <div key={rec.name} className="bg-gray-50 p-3 rounded-lg border">
                            <h4 className="font-semibold">{rec.name}</h4>
                            <p className="text-sm text-gray-500">{rec.reason}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>

      </div>

      <div className="sticky bottom-16 left-0 right-0 bg-white p-3 border-t flex items-center gap-4">
        <div className="flex items-center border rounded-md">
          <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-3 py-2 text-lg">-</button>
          <span className="px-4 py-2 font-bold">{quantity}</span>
          <button onClick={() => setQuantity(q => Math.min(product.stock, q + 1))} className="px-3 py-2 text-lg">+</button>
        </div>
        <button 
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
          className="flex-grow bg-flipkart-yellow text-gray-900 p-3 rounded-md font-bold disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <ShoppingCartIcon />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

const ShoppingCartIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.16"/></svg>
);
const SparklesIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>
);

const CheckCircleIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
);

export default ProductDetailPage;
