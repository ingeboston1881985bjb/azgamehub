
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from "sonner";

interface AdminCredentials {
  username: string;
  password: string;
}

interface AdminContextType {
  isAuthenticated: boolean;
  login: (credentials: AdminCredentials) => Promise<boolean>;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check if admin is already logged in
  useEffect(() => {
    const adminAuth = localStorage.getItem('azgaming-admin-auth');
    if (adminAuth) {
      try {
        const authData = JSON.parse(adminAuth);
        if (authData && authData.isAuthenticated) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Failed to parse admin auth data:', error);
        localStorage.removeItem('azgaming-admin-auth');
      }
    }
  }, []);

  const login = async (credentials: AdminCredentials): Promise<boolean> => {
    // For demo purposes, hardcoded credentials
    // In a real app, this would be an API call to validate credentials
    if (credentials.username === '68686868' && credentials.password === 'Abcd!123456789') {
      setIsAuthenticated(true);
      localStorage.setItem('azgaming-admin-auth', JSON.stringify({ isAuthenticated: true }));
      toast.success('Login successful!');
      return true;
    } else {
      toast.error('Invalid login credentials');
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('azgaming-admin-auth');
    toast.info('Logged out');
  };

  return (
    <AdminContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};
