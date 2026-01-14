
import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { Product } from '../../types';
import ProductEditModal from '../../components/admin/ProductEditModal';

const AdminCategoryProductsPage: React.FC = () => {
    const { categoryId } = useParams();
    const { products, categories, addProduct, updateProduct, deleteProduct } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const numericCategoryId = parseInt(categoryId || '0');
    const category = categories.find(c => c.id === numericCategoryId);

    const categoryProducts = useMemo(() => {
        return products.filter(p => p.categoryId === numericCategoryId);
    }, [products, numericCategoryId]);

    const formatter = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
    });

    const handleOpenModal = (product: Product | null = null) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setEditingProduct(null);
        setIsModalOpen(false);
    };

    const handleSaveProduct = (product: Product) => {
        if (editingProduct) {
            updateProduct(product);
        } else {
            addProduct(product);
        }
    };

    const handleDeleteProduct = (productId: number) => {
        if(window.confirm('Are you sure you want to delete this product?')) {
            deleteProduct(productId);
        }
    };

    if (!category) {
        return (
            <div className="text-center p-8">
                <h1 className="text-2xl font-bold text-red-600">Category not found</h1>
                <Link to="/admin/categories" className="text-flipkart-blue hover:underline mt-4 inline-block">
                    Back to All Categories
                </Link>
            </div>
        );
    }

  return (
    <div>
      {isModalOpen && (
        <ProductEditModal 
            product={editingProduct} 
            onClose={handleCloseModal} 
            onSave={handleSaveProduct}
            defaultCategoryId={numericCategoryId}
        />
      )}
      <div className="flex justify-between items-center mb-6">
        <div>
            <Link to="/admin/categories" className="text-sm text-flipkart-blue hover:underline">
                &larr; All Categories
            </Link>
            <h1 className="text-2xl font-bold text-gray-800">
                Products in "{category.name}"
            </h1>
        </div>
        <button onClick={() => handleOpenModal()} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 font-semibold">
          Add Product to Category
        </button>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {categoryProducts.length > 0 ? categoryProducts.map(product => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img className="h-10 w-10 rounded-md object-cover" src={product.image} alt={product.name} />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{formatter.format(product.price)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{product.stock}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => handleOpenModal(product)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                  <button onClick={() => handleDeleteProduct(product.id)} className="ml-4 text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            )) : (
                <tr>
                    <td colSpan={4} className="text-center py-10 text-gray-500">
                        No products found in this category.
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCategoryProductsPage;
