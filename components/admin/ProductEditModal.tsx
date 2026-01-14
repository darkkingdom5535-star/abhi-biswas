
import React, { useState, useEffect } from 'react';
import { Product, Category } from '../../types';
import { useData } from '../../contexts/DataContext';
import Loader from '../Loader';

interface ProductEditModalProps {
  product?: Product | null;
  onClose: () => void;
  onSave: (product: Product) => void;
  defaultCategoryId?: number;
}

const ProductEditModal: React.FC<ProductEditModalProps> = ({ product, onClose, onSave, defaultCategoryId }) => {
  const { categories } = useData();
  
  const getInitialFormData = (): Omit<Product, 'id'> | Product => {
    if (product) {
        return product;
    }
    return {
        name: '',
        description: '',
        price: 0,
        stock: 0,
        categoryId: defaultCategoryId || categories[0]?.id || 1,
        image: 'https://picsum.photos/id/50/400/400',
    };
  };

  const [formData, setFormData] = useState(getInitialFormData());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setFormData(getInitialFormData());
  }, [product, defaultCategoryId, categories]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isNumeric = type === 'number' || name === 'categoryId';
    setFormData(prev => ({
      ...prev,
      [name]: isNumeric ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
        const productToSave: Product = {
            ...(formData as Product),
            id: (product?.id) || Date.now(), // Use existing ID or generate a new one
        };
        onSave(productToSave);
        setIsLoading(false);
        onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-[100]" onClick={onClose}>
      {isLoading && <Loader text="Saving..." />}
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg m-4 relative max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-4">{product ? 'Edit Product' : 'Add New Product'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" required />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" rows={3} required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Price (INR)</label>
              <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" required />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Stock</label>
              <input type="number" name="stock" value={formData.stock} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" required />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Category</label>
            <select 
                name="categoryId" 
                value={formData.categoryId} 
                onChange={handleChange} 
                className="w-full mt-1 p-2 border rounded-md bg-white disabled:bg-gray-100" 
                required
                disabled={!!defaultCategoryId && !product}
            >
              {categories.map((cat: Category) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
           <div>
            <label className="text-sm font-medium text-gray-700">Image URL</label>
            <input type="text" name="image" value={formData.image} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" required />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-md font-semibold">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-flipkart-blue text-white rounded-md font-semibold">Save Product</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductEditModal;
