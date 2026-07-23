export interface Paginated<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export type AuthProvider = 'PASSWORD' | 'PHONE' | 'GOOGLE';

export interface Overview {
  totalUsers: number;
  totalDrivers: number;
  onlineDrivers: number;
  totalRides: number;
  activeRides: number;
  totalRevenue: number;
}

export interface DaySeries {
  date: string;
  rides: number;
  revenue: number;
  users: number;
  drivers: number;
}
export interface StatusSlice {
  status: string;
  count: number;
}
export interface TopDriver {
  id: string;
  name: string;
  code: string;
  revenue: number;
  completedRides: number;
  rating: number;
  ratingCount: number;
  isAvailable: boolean;
  photoUrl: string | null;
}
export interface ChartStats {
  days: number;
  series: DaySeries[];
  statusBreakdown: StatusSlice[];
  topDrivers: TopDriver[];
}

export interface AdminUserRow {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  provider: AuthProvider | null;
  hasPassword: boolean;
  isPhoneVerified: boolean;
  walletBalance: number;
  ridesCount: number;
  createdAt: string;
}

export interface AdminDriverRow {
  id: string;
  code: string;
  name: string;
  email: string | null;
  phone: string | null;
  provider: AuthProvider | null;
  hasPassword: boolean;
  rating: number;
  ratingCount: number;
  isVerified: boolean;
  isAvailable: boolean;
  ridesCount: number;
  totalRevenue: number;
  createdAt: string;
}

export interface Ride {
  id: string;
  type: string;
  status: string;
  amount: number;
  paymentMethod: string | null;
  paymentStatus: string;
  distanceKm: number | null;
  pickupLabel: string | null;
  pickupAddress: string | null;
  destinationLabel: string | null;
  destinationAddress: string | null;
  scheduledAt: string | null;
  createdAt: string;
  driver: { id: string; name: string; code: string } | null;
  rider: { id: string; name: string | null; phone: string | null } | null;
}

export interface UserDetail {
  user: {
    id: string;
    name: string | null;
    email: string | null;
    phone: string | null;
    role: string;
    provider: AuthProvider | null;
    hasPassword: boolean;
    photoUrl: string | null;
    isPhoneVerified: boolean;
    walletBalance: number;
    createdAt: string;
  };
  stats: { totalRides: number; completedRides: number; totalSpent: number };
}

export interface DriverDetail {
  driver: {
    id: string;
    code: string;
    name: string;
    title: string;
    photoUrl: string | null;
    phone: string | null;
    email: string | null;
    provider: AuthProvider | null;
    hasPassword: boolean;
    rating: number;
    ratingCount: number;
    isVerified: boolean;
    isAvailable: boolean;
    lat: number | null;
    lng: number | null;
    createdAt: string;
  };
  stats: {
    totalRevenue: number;
    totalRides: number;
    completedRides: number;
    cancelledRides: number;
  };
}

export interface Admin {
  id: string;
  name: string | null;
  email: string | null;
  role: string;
}

export interface ListParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  order?: 'asc' | 'desc';
}
