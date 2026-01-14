
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { Category } from '../../types';
import CategoryEditModal from '../../components/admin/CategoryEditModal';
import ConfirmationModal from '../../components/admin/ConfirmationModal';

const AdminCategoriesPage: React.FC = () => {
    const { categories, addCategory, updateCategory, deleteCategory } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);

    const handleOpenModal = (category: Category | null = null) => {
        setEditingCategory(category);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setEditingCategory(null);
        setIsModalOpen(false);
    };

    const handleSaveCategory = (category: Category) => {
        if (editingCategory) {
            updateCategory(category);
        } else {
            addCategory(category);
        }
    };

    const handleDeleteClick = (category: Category) => {
        if(categories.length <= 1) {
            alert("You cannot delete the last category.");
            return;
        }
        setCategoryToDelete(category);
        setIsConfirmModalOpen(true);
    };

    const confirmDeleteCategory = () => {
        if (categoryToDelete) {
            deleteCategory(categoryToDelete.id);
        }
    };

  return (
    <div>
      {isModalOpen && <CategoryEditModal category={editingCategory} onClose={handleCloseModal} onSave={handleSaveCategory} />}
      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={confirmDeleteCategory}
        title="Delete Category"
        message={`Are you sure you want to delete the category "${categoryToDelete?.name}"? Products within it will be moved to a default category.`}
      />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manage Categories</h1>
        <button onClick={() => handleOpenModal()} className="bg-flipkart-blue text-white px-4 py-2 rounded-md hover:bg-blue-700 font-semibold">
          Add New Category
        </button>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Homepage</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {categories.map(category => (
              <tr key={category.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link to={`/admin/categories/${category.id}`} className="flex items-center group">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img className="h-10 w-10 rounded-md object-cover" src={category.image} alt={category.name} />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 group-hover:text-flipkart-blue">{category.name}</div>
                    </div>
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                    {category.isFeatured ? 
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Visible</span> : 
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">Hidden</span>
                    }
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link to={`/admin/categories/${category.id}`} className="text-gray-600 hover:text-flipkart-blue font-semibold">Manage Products</Link>
                  <button onClick={() => handleOpenModal(category)} className="ml-4 text-indigo-600 hover:text-indigo-900">Edit</button>
                  <button onClick={() => handleDeleteClick(category)} className="ml-4 text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCategoriesPage;
