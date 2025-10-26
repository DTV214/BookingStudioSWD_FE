// Dashboard API Types
// Based on Swagger API documentation for /api/admin/dashboard

export interface DashboardStats {
  totalAccounts: number;
  totalStudios: number;
  totalBookings: number;
  totalPayments: number;
  totalRevenue: number;
}

export interface BookingStatusStats {
  IN_PROGRESS: number;
  CANCELLED: number;
  COMPLETED: number;
  AWAITING_REFUND: number;
}

export interface RevenueByMonth {
  [key: string]: number; // key format: "YYYY-MM", value: revenue amount
}

export interface TopService {
  topServiceName: string;
  topServiceUsage: number;
}

export interface DashboardData {
  totalAccounts: number;
  totalStudios: number;
  totalBookings: number;
  totalPayments: number;
  totalRevenue: number;
  bookingStatusStats: BookingStatusStats;
  revenueByMonth: RevenueByMonth;
  topServiceName: string;
  topServiceUsage: number;
}

export interface DashboardResponse {
  code: number;
  message: string;
  data: DashboardData;
}

// UI Component Types (for backward compatibility)
export interface Booking {
  id: string;
  customer: string;
  time: string;
  studio: string;
  status: string;
}

export interface StudioStatus {
  name: string;
  status: "Occupied" | "Vacant" | "Needs Cleaning" | "Occupied Soon";
}

export interface Stats {
  bookingsToday: number;
  revenueToday: number;
  notifications: number;
}

export interface DashProps {
  stats: Stats;
  bookings: Booking[];
  bookingsByStudio: Record<string, number>;
  studios: StudioStatus[];
  notifications: string[];
  // New API data
  dashboardData?: DashboardData;
}

