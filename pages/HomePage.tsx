
import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import ProductCard from '../components/ProductCard';
import { useAuth } from '../contexts/AuthContext';

const HomePage: React.FC = () => {
    const { user } = useAuth();
    const { products, categories } = useData();

    const featuredCategories = categories.filter(c => c.isFeatured);
    const featuredProducts = products.slice(0, 4);

  return (
    <div className="p-2 space-y-4">
      <div className="p-4 bg-white rounded-lg shadow">
        <h2 className="text-lg font-bold text-gray-800">Hello, {user?.name.split(' ')[0]}!</h2>
        <p className="text-sm text-gray-500">What are you looking for today?</p>
      </div>
      
      {/* Featured Categories Section */}
      {featuredCategories.length > 0 && (
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-bold text-md mb-3">Shop by Category</h3>
            <div className="grid grid-cols-4 gap-4 text-center">
              {featuredCategories.map(category => (
                <Link to={`/category/${category.id}`} key={category.id} className="flex flex-col items-center space-y-2">
                  <div className="w-16 h-16 rounded-full bg-flipkart-gray-light flex items-center justify-center">
                    <img src={category.image} alt={category.name} className="w-14 h-14 object-cover rounded-full" />
                  </div>
                  <span className="text-xs font-medium text-gray-700">{category.name}</span>
                </Link>
              ))}
            </div>
          </div>
      )}
      
      {/* Featured Products Section */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-bold text-md mb-3">Featured Products</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
