
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User } from '../types';
import AdminLoginModal from '../components/admin/AdminLoginModal';

const ProfilePage: React.FC = () => {
  const { user, updateUser, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<User>(user as User);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  
  if(!user) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSave = () => {
    updateUser(formData);
    setIsEditing(false);
  }

  return (
    <>
      {showAdminLogin && <AdminLoginModal onClose={() => setShowAdminLogin(false)} />}
      <div className="p-4 space-y-6">
        <div className={`p-4 bg-white rounded-lg shadow relative ${user.isVIP ? 'border-2 border-yellow-400' : ''}`}>
           {user.isVIP && (
             <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
                <StarIcon />
                VIP Member
             </div>
           )}
           <div className="flex flex-col items-center space-y-2 pt-4">
              <div className="w-24 h-24 rounded-full bg-flipkart-blue text-white flex items-center justify-center text-4xl font-bold">
                  {user.name.charAt(0)}
              </div>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-gray-500">{user.email}</p>
            </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">Personal Information</h3>
              <button onClick={() => setIsEditing(!isEditing)} className="text-flipkart-blue font-semibold text-sm">
                  {isEditing ? 'Cancel' : 'Edit'}
              </button>
          </div>
          <div className="space-y-4">
              <div>
                  <label className="text-xs text-gray-500">Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} disabled={!isEditing} className="w-full p-2 border-b disabled:bg-white disabled:border-gray-200"/>
              </div>
              <div>
                  <label className="text-xs text-gray-500">Phone</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} disabled={!isEditing} className="w-full p-2 border-b disabled:bg-white disabled:border-gray-200"/>
              </div>
              <div>
                  <label className="text-xs text-gray-500">Address</label>
                  <textarea name="address" value={formData.address} onChange={handleInputChange} disabled={!isEditing} className="w-full p-2 border-b disabled:bg-white disabled:border-gray-200" rows={2}/>
              </div>
          </div>
          {isEditing && (
              <button onClick={handleSave} className="w-full mt-6 bg-flipkart-blue text-white p-3 rounded-md font-bold">Save Changes</button>
          )}
        </div>

        <div className="bg-white rounded-lg shadow divide-y">
          <button className="w-full text-left text-gray-800 font-medium p-4 hover:bg-gray-50">Change Password</button>
          <button className="w-full text-left text-gray-800 font-medium p-4 hover:bg-gray-50">Settings</button>
          <button 
            onClick={() => setShowAdminLogin(true)} 
            className="w-full text-left text-gray-600 font-medium p-4 flex items-center space-x-3 hover:bg-gray-50"
          >
            <AdminIcon />
            <span>Admin Login</span>
          </button>
        </div>

        <div className="bg-white rounded-lg shadow">
          <button onClick={logout} className="w-full text-left text-red-500 font-bold p-4 hover:bg-red-50">
              Logout
          </button>
        </div>
      </div>
    </>
  );
};

const AdminIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
);
const StarIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
)

export default ProfilePage;