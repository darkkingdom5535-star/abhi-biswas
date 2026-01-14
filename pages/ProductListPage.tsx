
import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import ProductCard from '../components/ProductCard';

const ProductListPage: React.FC = () => {
  const { categoryId } = useParams();
  const { products, categories } = useData();
  const [sortOption, setSortOption] = useState('new');

  const category = categories.find(c => c.id === parseInt(categoryId || '0'));
  
  const filteredProducts = useMemo(() => {
    let categoryProducts = products.filter(p => p.categoryId === parseInt(categoryId || '0'));

    if (sortOption === 'price_asc') {
      categoryProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price_desc') {
      categoryProducts.sort((a, b) => b.price - a.price);
    }
    // 'new' is default, no sorting needed as data is static
    return categoryProducts;
  }, [categoryId, sortOption, products]);

  if (!category) {
    return <div className="p-4 text-center">Category not found.</div>;
  }

  return (
    <div className="p-2">
      <div className="p-4 bg-white rounded-lg shadow mb-4">
        <h2 className="text-xl font-bold">{category.name}</h2>
        <div className="mt-4">
          <label htmlFor="sort" className="text-sm font-medium text-gray-600 mr-2">Sort by:</label>
          <select 
            id="sort" 
            value={sortOption} 
            onChange={(e) => setSortOption(e.target.value)}
            className="p-2 border rounded-md bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-flipkart-blue"
          >
            <option value="new">Newest</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
            ))
        ) : (
            <p className="col-span-full text-center text-gray-500 py-8">No products found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default ProductListPage;
