import axios from 'axios';

const TOKEN_KEY = 'dd_admin_token';

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (t: string | null) =>
  t ? localStorage.setItem(TOKEN_KEY, t) : localStorage.removeItem(TOKEN_KEY);

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// On auth failure, drop the token and bounce to login.  
api.interceptors.response.use(
  (res) => res,
  (error) => {
    // 401 = bad/expired token; 403 = role revoked mid-session. Both invalidate the session.
    const status = error?.response?.status;
    if (status === 401 || status === 403) {
      setToken(null);
      if (!location.pathname.startsWith('/login')) location.assign('/login');
    }
    return Promise.reject(error);
  }
);

/** Unwrap the backend's { success, data } envelope. */
export function unwrap<T>(res: { data: { data: T } }): T {
  return res.data.data;
}

/** Human-readable message from an axios error. */
export function errMessage(e: any): string {
  return e?.response?.data?.error?.message || e?.message || 'Something went wrong';
}
