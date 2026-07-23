import { api, unwrap } from './client';
import {
  Admin,
  AdminDriverRow,
  AdminUserRow,
  ChartStats,
  DriverDetail,
  ListParams,
  Overview,
  Paginated,
  Ride,
  UserDetail,
} from './types';

// Strip undefined so the query string stays clean.
const params = (p: ListParams) =>
  Object.fromEntries(Object.entries(p).filter(([, v]) => v !== undefined && v !== ''));

export const adminApi = {
  async login(email: string, password: string): Promise<{ token: string; admin: Admin }> {
    return unwrap(await api.post('/admin/auth/login', { email, password }));
  },
  async me(): Promise<Admin> {
    return unwrap(await api.get('/admin/auth/me'));
  },
  async overview(): Promise<Overview> {
    return unwrap(await api.get('/admin/stats/overview'));
  },
  async chartStats(days = 14): Promise<ChartStats> {
    return unwrap(await api.get('/admin/stats/charts', { params: { days } }));
  },
  async recentBookings(p: ListParams): Promise<Paginated<Ride>> {
    return unwrap(await api.get('/admin/bookings', { params: params(p) }));
  },

  async users(p: ListParams): Promise<Paginated<AdminUserRow>> {
    return unwrap(await api.get('/admin/users', { params: params(p) }));
  },
  async user(id: string): Promise<UserDetail> {
    return unwrap(await api.get(`/admin/users/${id}`));
  },
  async userBookings(id: string, p: ListParams): Promise<Paginated<Ride>> {
    return unwrap(await api.get(`/admin/users/${id}/bookings`, { params: params(p) }));
  },

  async drivers(p: ListParams): Promise<Paginated<AdminDriverRow>> {
    return unwrap(await api.get('/admin/drivers', { params: params(p) }));
  },
  async driver(id: string): Promise<DriverDetail> {
    return unwrap(await api.get(`/admin/drivers/${id}`));
  },
  async driverBookings(id: string, p: ListParams): Promise<Paginated<Ride>> {
    return unwrap(await api.get(`/admin/drivers/${id}/bookings`, { params: params(p) }));
  },
};
