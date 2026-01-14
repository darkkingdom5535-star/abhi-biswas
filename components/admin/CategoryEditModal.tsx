
import React, { useState, useEffect } from 'react';
import { Category } from '../../types';
import Loader from '../Loader';

interface CategoryEditModalProps {
  category?: Category | null;
  onClose: () => void;
  onSave: (category: Category) => void;
}

const CategoryEditModal: React.FC<CategoryEditModalProps> = ({ category, onClose, onSave }) => {
  const [formData, setFormData] = useState<Omit<Category, 'id'> | Category>({
    name: '',
    image: 'https://picsum.photos/id/10/100/100',
    isFeatured: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (category) {
      setFormData(category);
    }
  }, [category]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
        const categoryToSave: Category = {
            ...(formData as Category),
            id: (category?.id) || Date.now(),
        };
        onSave(categoryToSave);
        setIsLoading(false);
        onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-[100]" onClick={onClose}>
      {isLoading && <Loader text="Saving..." />}
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md m-4 relative" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-4">{category ? 'Edit Category' : 'Add New Category'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Category Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" required />
          </div>
           <div>
            <label className="text-sm font-medium text-gray-700">Image URL</label>
            <input type="text" name="image" value={formData.image} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" required />
          </div>
          <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
            <label htmlFor="isFeatured" className="text-sm font-medium text-gray-700">Show on Homepage</label>
            <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" id="isFeatured" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-flipkart-blue"></div>
            </label>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-md font-semibold">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-flipkart-blue text-white rounded-md font-semibold">Save Category</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryEditModal;
