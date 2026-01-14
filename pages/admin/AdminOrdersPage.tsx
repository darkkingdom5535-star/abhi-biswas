
import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { Order } from '../../types';
import Tabs from '../../components/Tabs';

const AdminOrdersPage: React.FC = () => {
    const { orders, updateOrderStatus, deleteOrder } = useData();
    const [searchParams, setSearchParams] = useSearchParams();

    // Tabs and Filtering
    const tabs = ['All', 'Pending', 'Active', 'Completed'];
    const initialTab = searchParams.get('status') === 'pending' ? 'Pending' : 'All';
    const [activeTab, setActiveTab] = useState(initialTab);

    // Confirmation Modal State
    type ModalAction = 'confirm' | 'reject' | 'delete';
    const [confirmationModal, setConfirmationModal] = useState<{
        isOpen: boolean;
        orderId: string | null;
        action: ModalAction | null;
        message: string;
    }>({ isOpen: false, orderId: null, action: null, message: '' });

    const filteredOrders = useMemo(() => {
        if (activeTab === 'Pending') {
            return orders.filter(o => o.status === 'Pending Confirmation');
        }
        if (activeTab === 'Active') {
            return orders.filter(o => o.status === 'Placed' || o.status === 'Dispatched');
        }
        if (activeTab === 'Completed') {
            return orders.filter(o => o.status === 'Delivered' || o.status === 'Cancelled');
        }
        return orders;
    }, [orders, activeTab]);
    
    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
        if(tab !== 'Pending' && searchParams.get('status')) {
            setSearchParams({}, { replace: true });
        }
    };
    
    const openConfirmationModal = (orderId: string, action: ModalAction) => {
        let message = '';
        switch(action) {
            case 'confirm':
                message = 'Are you sure you want to confirm payment for this order?';
                break;
            case 'reject':
                message = 'Are you sure you want to reject this payment and cancel the order?';
                break;
            case 'delete':
                message = 'Are you sure you want to permanently delete this order? This action cannot be undone.';
                break;
        }
        setConfirmationModal({ isOpen: true, orderId, action, message });
    };

    const closeConfirmationModal = () => {
        setConfirmationModal({ isOpen: false, orderId: null, action: null, message: '' });
    }

    const handleConfirmAction = () => {
        if (!confirmationModal.orderId || !confirmationModal.action) return;

        switch (confirmationModal.action) {
            case 'confirm':
                updateOrderStatus(confirmationModal.orderId, 'Placed');
                break;
            case 'reject':
                updateOrderStatus(confirmationModal.orderId, 'Cancelled');
                break;
            case 'delete':
                deleteOrder(confirmationModal.orderId);
                break;
        }
        closeConfirmationModal();
    }

    const formatter = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
    });
    
    const getStatusColor = (status: Order['status']) => {
        switch (status) {
            case 'Pending Confirmation': return 'bg-purple-100 text-purple-800';
            case 'Placed': return 'bg-blue-100 text-blue-800';
            case 'Dispatched': return 'bg-yellow-100 text-yellow-800';
            case 'Delivered': return 'bg-green-100 text-green-800';
            case 'Cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

  return (
    <div>
      {confirmationModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md m-4">
            <h3 className="text-lg font-bold mb-4">Confirm Action</h3>
            <p className="text-gray-700 mb-6">{confirmationModal.message}</p>
            <div className="flex justify-end space-x-4">
              <button onClick={closeConfirmationModal} className="px-4 py-2 bg-gray-200 rounded-md font-semibold hover:bg-gray-300">Cancel</button>
              <button 
                onClick={handleConfirmAction} 
                className={`px-4 py-2 text-white rounded-md font-semibold ${
                    confirmationModal.action === 'confirm' 
                    ? 'bg-green-500 hover:bg-green-600' 
                    : 'bg-red-500 hover:bg-red-600'
                }`}
              >
                Yes, Proceed
              </button>
            </div>
          </div>
        </div>
      )}

      <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Orders</h1>
      
      <div className="bg-white rounded-lg shadow-md mb-4">
        <Tabs tabs={tabs} activeTab={activeTab} onTabClick={handleTabClick} />
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredOrders.length > 0 ? filteredOrders.map(order => (
              <tr key={order.id} className={order.status === 'Pending Confirmation' ? 'bg-purple-50' : ''}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{formatter.format(order.totalAmount)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  {order.status === 'Pending Confirmation' ? (
                    <>
                        <button onClick={() => openConfirmationModal(order.id, 'confirm')} className="bg-green-500 text-white px-3 py-1 rounded-md text-xs font-semibold hover:bg-green-600">Confirm Payment</button>
                        <button onClick={() => openConfirmationModal(order.id, 'reject')} className="bg-red-500 text-white px-3 py-1 rounded-md text-xs font-semibold hover:bg-red-600">Reject</button>
                    </>
                  ) : (
                    <>
                        <select 
                            value={order.status} 
                            onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                            className="p-1 border rounded-md bg-gray-50 text-xs focus:outline-none focus:ring-1 focus:ring-flipkart-blue"
                            disabled={order.status === 'Cancelled' || order.status === 'Delivered'}
                        >
                            <option value="Placed">Placed</option>
                            <option value="Dispatched">Dispatched</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                        {(order.status === 'Placed' || order.status === 'Dispatched') && (
                            <button onClick={() => updateOrderStatus(order.id, 'Cancelled')} className="text-yellow-600 hover:text-yellow-900 text-xs font-semibold">Cancel</button>
                        )}
                        <button onClick={() => openConfirmationModal(order.id, 'delete')} className="text-red-600 hover:text-red-900 text-xs font-semibold">Delete</button>
                    </>
                  )}
                </td>
              </tr>
            )) : (
                <tr>
                    <td colSpan={5} className="text-center py-10 text-gray-500">
                        No orders in this category.
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrdersPage;
