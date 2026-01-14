
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Loader from '../../components/Loader';

const AdminLoginPage: React.FC = () => {
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
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {isLoading && <Loader />}
      <div className="w-full max-w-sm mx-auto">
        <div className="text-center mb-6">
          <h1 className="font-extrabold text-4xl text-flipkart-blue italic">Flipkart</h1>
          <p className="text-gray-600 font-semibold">Admin Panel Login</p>
        </div>
        <div className="bg-white rounded-lg shadow-xl p-8">
          {error && <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-sm text-center">{error}</p>}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="text-sm font-bold text-gray-600 block mb-2">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-flipkart-blue" 
                required 
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
    </div>
  );
};

export default AdminLoginPage;
