
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User } from '../types';
import { MOCK_USERS } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  users: User[];
  isAdmin: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; message: string; }>;
  signup: (name: string, phone: string, email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updatedUser: User) => void;
  adminLogin: (username: string, pass: string) => Promise<boolean>;
  adminLogout: () => void;
  deleteUser: (userId: number) => void;
  toggleUserBlockStatus: (userId: number) => void;
  toggleUserVipStatus: (userId: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [isAdmin, setIsAdmin] = useState(false);

  const login = async (email: string, pass: string): Promise<{ success: boolean; message: string; }> => {
    console.log(`Attempting login for ${email}`);
    
    return new Promise(resolve => {
      setTimeout(() => {
        const userToLogin = users.find(u => u.email === email);

        if (!userToLogin) {
            resolve({ success: false, message: 'Invalid email or password.' });
            return;
        }
        
        if (userToLogin.status === 'blocked') {
            resolve({ success: false, message: 'Your account has been blocked due to a report. Please contact support.' });
            return;
        }

        if (pass === 'password') { // Mock password check
          setUser(userToLogin);
          resolve({ success: true, message: 'Login successful!' });
        } else {
          resolve({ success: false, message: 'Invalid email or password.' });
        }
      }, 1000);
    });
  };
  
  const signup = async (name: string, phone: string, email: string, pass: string): Promise<boolean> => {
    console.log(`Attempting signup for ${email}`);
    return new Promise(resolve => {
        setTimeout(() => {
            const newUser: User = { 
                id: Date.now(), 
                name, 
                phone, 
                email, 
                address: '',
                isVIP: false,
                status: 'active'
            };
            setUsers(prev => [...prev, newUser]);
            setUser(newUser);
            resolve(true);
        }, 1000);
    });
  }

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
  };
  
  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
  }

  const adminLogin = async (username: string, pass: string): Promise<boolean> => {
    return new Promise(resolve => {
        setTimeout(() => {
            if (username === 'admin' && pass === 'password') {
                setIsAdmin(true);
                resolve(true);
            } else {
                resolve(false);
            }
        }, 1000);
    });
  }

  const adminLogout = () => {
    setIsAdmin(false);
  }

  // Admin user management functions
  const deleteUser = (userId: number) => {
    setUsers(prev => prev.filter(u => u.id !== userId));
  };
  
  const toggleUserBlockStatus = (userId: number) => {
     const userToBlock = users.find(u => u.id === userId);
     // If the user being blocked is the currently logged-in user, and they are currently active, log them out.
    if (user && user.id === userId && userToBlock?.status === 'active') {
        logout();
    }

    setUsers(prev => prev.map(u => 
        u.id === userId ? { ...u, status: u.status === 'active' ? 'blocked' : 'active' } : u
    ));
  };

  const toggleUserVipStatus = (userId: number) => {
    setUsers(prev => prev.map(u => 
        u.id === userId ? { ...u, isVIP: !u.isVIP } : u
    ));
  };


  return (
    <AuthContext.Provider value={{ 
        user, 
        users,
        isAdmin, 
        login, 
        signup, 
        logout, 
        updateUser, 
        adminLogin, 
        adminLogout,
        deleteUser,
        toggleUserBlockStatus,
        toggleUserVipStatus
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};