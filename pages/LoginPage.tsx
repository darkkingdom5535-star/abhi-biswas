
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Loader from '../components/Loader';
import Tabs from '../components/Tabs';

const LoginPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Login');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, signup } = useAuth();

  // Login form state
  const [loginEmail, setLoginEmail] = useState('john.doe@example.com');
  const [loginPassword, setLoginPassword] = useState('password');

  // Signup form state
  const [signupName, setSignupName] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    const { success, message } = await login(loginEmail, loginPassword);
    if (!success) {
      setError(message);
    }
    setIsLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    const success = await signup(signupName, signupPhone, signupEmail, signupPassword);
     if (!success) {
      setError('Signup failed. Please try again.');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      {isLoading && <Loader />}
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8">
            <h1 className="font-extrabold text-4xl text-flipkart-blue italic">Flipkart</h1>
            <p className="text-gray-500">Welcome Back!</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <Tabs tabs={['Login', 'Sign Up']} activeTab={activeTab} onTabClick={setActiveTab} />
            
            <div className="p-6">
                {error && <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-sm">{error}</p>}
                {activeTab === 'Login' ? (
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input type="email" placeholder="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-flipkart-blue" required/>
                        <input type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-flipkart-blue" required/>
                        <button type="submit" className="w-full bg-flipkart-blue text-white p-3 rounded-md font-bold hover:bg-blue-700 transition-colors">Login</button>
                    </form>
                ) : (
                    <form onSubmit={handleSignup} className="space-y-4">
                        <input type="text" placeholder="Name" value={signupName} onChange={(e) => setSignupName(e.target.value)} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-flipkart-blue" required/>
                        <input type="tel" placeholder="Phone" value={signupPhone} onChange={(e) => setSignupPhone(e.target.value)} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-flipkart-blue" required/>
                        <input type="email" placeholder="Email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-flipkart-blue" required/>
                        <input type="password" placeholder="Password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-flipkart-blue" required/>
                        <button type="submit" className="w-full bg-flipkart-yellow text-gray-800 p-3 rounded-md font-bold hover:bg-yellow-500 transition-colors">Sign Up</button>
                    </form>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;