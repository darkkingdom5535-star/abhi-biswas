
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  });

  return (
    <Link to={`/product/${product.id}`} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300">
      <div className="w-full h-40 bg-gray-200">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
      </div>
      <div className="p-3 flex flex-col flex-grow">
        <h3 className="font-semibold text-sm text-gray-700 truncate">{product.name}</h3>
        <p className="text-xs text-gray-500 mt-1 flex-grow">{product.description.substring(0, 40)}...</p>
        <div className="flex items-center justify-between mt-2">
            <span className="text-md font-bold text-gray-900">{formatter.format(product.price)}</span>
            <span className="text-xs text-green-600 font-semibold">In Stock</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
