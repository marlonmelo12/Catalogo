import { createContext, useState, useEffect, type ReactNode, useCallback } from 'react';
import { getCurrentUser, login as authLogin, logout as authLogout } from '../api/authService';
import type { LoginDto, Usuario } from '../types';

interface AuthContextType {
  user: Usuario | null;
  login: (credentials: LoginDto) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Usuario | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setIsLoading(false);
  }, []);
  
  const login = useCallback(async (credentials: LoginDto) => {
    const loggedInUser = await authLogin(credentials);
    setUser(loggedInUser);
  }, []);

  const logout = useCallback(() => {
    authLogout();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};