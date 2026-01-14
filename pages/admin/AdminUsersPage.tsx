
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import ConfirmationModal from '../../components/admin/ConfirmationModal';
import { User } from '../../types';

const AdminUsersPage: React.FC = () => {
  const { users, deleteUser, toggleUserBlockStatus, toggleUserVipStatus } = useAuth();
  const { deleteOrdersByUserId } = useData();
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
  };

  const confirmDelete = () => {
    if (userToDelete) {
        deleteOrdersByUserId(userToDelete.id); // Also delete user's orders
        deleteUser(userToDelete.id);
        setUserToDelete(null);
    }
  }

  return (
    <div>
      <ConfirmationModal
        isOpen={!!userToDelete}
        onClose={() => setUserToDelete(null)}
        onConfirm={confirmDelete}
        title="Delete User"
        message={`Are you sure you want to delete the user "${userToDelete?.name}"? This will permanently remove their account and all associated orders.`}
      />
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Users</h1>
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">VIP</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map(user => (
                <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-xs text-gray-500">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {user.status === 'active' ? 'Active' : 'Blocked'}
                        </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                        {user.isVIP && <StarIcon />}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                        <Link to={`/admin/users/${user.id}`} className="text-indigo-600 hover:text-indigo-900 font-semibold">View</Link>
                        <button onClick={() => toggleUserBlockStatus(user.id)} className="text-yellow-600 hover:text-yellow-900 font-semibold">{user.status === 'active' ? 'Block' : 'Unblock'}</button>
                        <button onClick={() => toggleUserVipStatus(user.id)} className="text-purple-600 hover:text-purple-900 font-semibold">{user.isVIP ? 'Remove VIP' : 'Make VIP'}</button>
                        <button onClick={() => handleDeleteClick(user)} className="text-red-600 hover:text-red-900 font-semibold">Delete</button>
                    </td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const StarIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400 mx-auto"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
);

export default AdminUsersPage;