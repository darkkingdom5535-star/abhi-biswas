
import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { Order, User } from '../../types';
import ConfirmationModal from '../../components/admin/ConfirmationModal';

const AdminUserDetailPage: React.FC = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const { users, deleteUser, toggleUserBlockStatus, toggleUserVipStatus } = useAuth();
    const { orders, deleteOrdersByUserId } = useData();
    const [userToDelete, setUserToDelete] = useState<User | null>(null);

    const user = useMemo(() => users.find(u => u.id === parseInt(userId || '0')), [users, userId]);
    const userOrders = useMemo(() => orders.filter(o => o.userId === user?.id), [orders, user]);

    if (!user) {
        return (
            <div className="text-center p-8">
                <h1 className="text-2xl font-bold text-red-600">User not found</h1>
                <Link to="/admin/users" className="text-flipkart-blue hover:underline mt-4 inline-block">
                    &larr; Back to All Users
                </Link>
            </div>
        );
    }

    const confirmDelete = () => {
        if (userToDelete) {
            deleteOrdersByUserId(userToDelete.id); // Also delete user's orders
            deleteUser(userToDelete.id);
            setUserToDelete(null);
            navigate('/admin/users');
        }
    };
    
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

    const formatter = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
    });

    return (
        <div>
             <ConfirmationModal
                isOpen={!!userToDelete}
                onClose={() => setUserToDelete(null)}
                onConfirm={confirmDelete}
                title="Delete User"
                message={`Are you sure you want to delete the user "${userToDelete?.name}"? This will permanently remove their account and all associated orders.`}
            />
            <div className="mb-6">
                 <Link to="/admin/users" className="text-sm text-flipkart-blue hover:underline">
                    &larr; All Users
                </Link>
                <h1 className="text-2xl font-bold text-gray-800">User Details</h1>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <div className="w-24 h-24 rounded-full bg-flipkart-blue text-white flex items-center justify-center text-4xl font-bold mx-auto mb-4">
                            {user.name.charAt(0)}
                        </div>
                        <h2 className="text-xl font-bold">{user.name}</h2>
                        <p className="text-sm text-gray-500">{user.email}</p>
                        <p className="text-sm text-gray-500">{user.phone}</p>
                        <div className="mt-4 flex gap-4 justify-center">
                            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {user.status === 'active' ? 'Active' : 'Blocked'}
                            </span>
                            {user.isVIP && (
                                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800 flex items-center gap-1">
                                    <StarIcon /> VIP
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-bold mb-4">Actions</h3>
                        <div className="space-y-3">
                            <button onClick={() => toggleUserBlockStatus(user.id)} className="w-full text-center px-4 py-2 bg-yellow-500 text-white rounded-md font-semibold hover:bg-yellow-600">{user.status === 'active' ? 'Block User' : 'Unblock User'}</button>
                            <button onClick={() => toggleUserVipStatus(user.id)} className="w-full text-center px-4 py-2 bg-purple-500 text-white rounded-md font-semibold hover:bg-purple-600">{user.isVIP ? 'Remove VIP' : 'Make VIP'}</button>
                            <button onClick={() => setUserToDelete(user)} className="w-full text-center px-4 py-2 bg-red-500 text-white rounded-md font-semibold hover:bg-red-600">Delete User</button>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-bold mb-4">Order History ({userOrders.length})</h3>
                    <div className="overflow-x-auto max-h-96">
                       <table className="w-full table-auto">
                          <thead className="bg-gray-50 sticky top-0">
                            <tr>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {userOrders.length > 0 ? userOrders.map(order => (
                              <tr key={order.id}>
                                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{new Date(order.createdAt).toLocaleDateString()}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{formatter.format(order.totalAmount)}</td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                                    {order.status}
                                  </span>
                                </td>
                              </tr>
                            )) : (
                                <tr>
                                    <td colSpan={4} className="text-center py-10 text-gray-500">This user has not placed any orders.</td>
                                </tr>
                            )}
                          </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StarIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-800"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
);

export default AdminUserDetailPage;