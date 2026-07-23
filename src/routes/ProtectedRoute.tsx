import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Loading } from '@/components/States';

export function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { admin, loading } = useAuth();
  const location = useLocation();
  if (loading) return <Loading label="Checking session…" />;
  // Remember where they were headed so login can return them there.
  if (!admin) return <Navigate to="/login" replace state={{ from: location }} />;
  return children;
}
