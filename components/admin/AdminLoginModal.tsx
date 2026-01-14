
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Loader from '../Loader';

interface AdminLoginModalProps {
  onClose: () => void;
}

const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ onClose }) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { adminLogin } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    const success = await adminLogin(username, password);
    setIsLoading(false);
    if (success) {
      navigate('/admin');
      onClose();
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-[100]" onClick={onClose}>
      {isLoading && <Loader />}
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-sm m-4 relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 p-1 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Admin Login</h2>
          <p className="text-gray-500">Enter your credentials to continue</p>
        </div>
        
        {error && <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-sm text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-sm font-bold text-gray-600 block mb-2">Username</label>
            <input 
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)} 
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-flipkart-blue" 
              required 
              autoFocus
            />
          </div>
          <div>
            <label className="text-sm font-bold text-gray-600 block mb-2">Password</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-flipkart-blue" 
              required 
            />
          </div>
          <button type="submit" className="w-full bg-flipkart-blue text-white p-3 rounded-md font-bold hover:bg-blue-700 transition-colors">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginModal;
