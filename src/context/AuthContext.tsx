import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { adminApi } from '@/api/admin.api';
import { getToken, setToken } from '@/api/client';
import { Admin } from '@/api/types';

interface AuthValue {
  admin: Admin | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);

  // Restore session: if a token exists, verify it via /auth/me.
  useEffect(() => {
    let ignore = false;
    (async () => {
      if (!getToken()) {
        if (!ignore) setLoading(false);
        return;
      }
      try {
        const me = await adminApi.me();
        if (!ignore) setAdmin(me);
      } catch {
        setToken(null);
      } finally {
        if (!ignore) setLoading(false);
      }
    })();
    return () => {
      ignore = true;
    };
  }, []);

  const login = async (email: string, password: string) => {
    const { token, admin } = await adminApi.login(email, password);
    setToken(token);
    setAdmin(admin);
  };

  const logout = () => {
    setToken(null);
    setAdmin(null);
    location.assign('/login');
  };

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
