import React, { createContext, useContext, useState, ReactNode } from 'react';
import { verifyAdminCredentials } from '@/lib/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem('admin_authenticated') === 'true';
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    const valid = await verifyAdminCredentials(email, password);
    if (valid) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_authenticated', 'true');
    }
    return valid;
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_authenticated');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}