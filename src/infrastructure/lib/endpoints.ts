export const ENDPOINTS = {
  // Authentication endpoints
  AUTH: {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",
    LOGOUT: "/api/auth/logout",
    REFRESH: "/api/auth/refresh",
    VALIDATE: "/api/auth/validate",
    CHANGE_PASSWORD: "/api/auth/change-password",
    FORGOT_PASSWORD: "/api/auth/forgot-password",
    RESET_PASSWORD: "/api/auth/reset-password",
  },

  PROFILE: "/api/account/profile",
  ACCOUNT: "/api/account",
  STUDIO_TYPES: "/api/studio-types",
  LOCATIONS: "/api/locations",
  SERVICES: "/api/services",
  PRICE_ITEMS: "/api/price-items/price",
  BOOKINGS: "/api/bookings",
  USER_BOOKINGS: {
    /**
     * GET: Lấy danh sách booking của user đã đăng nhập
     * API: /api/bookings/profile
     */
    GET_BY_PROFILE: "/api/bookings/profile",

    /**
     * GET: Lấy chi tiết studio assigns của một booking
     * API: /api/studio-assigns/booking/{bookingId}
     */
    GET_DETAILS: (bookingId: string) =>
      `/api/studio-assigns/booking/${bookingId}`,
    GET_SERVICES_FOR_SLOT: (studioAssignId: string) =>
      `/api/service-assigns/studio-assign/${studioAssignId}`,
    GET_PAYMENTS_FOR_BOOKING: (bookingId: string) =>
      `/api/payments/staff/booking/${bookingId}`,
    CANCEL_BOOKING: (bookingId: string, note: string) =>
      `/api/bookings/${bookingId}/cancel?note=${encodeURIComponent(note)}`,
  },

  // --- THÊM CÁC ENDPOINTS MỚI ---
  PRICE_TABLES: {
    // GET /api/price-tables/studio-types/{id}
    GET_BY_STUDIO_TYPE: (studioTypeId: string) =>
      `/api/price-tables/studio-types/${studioTypeId}`,
  },
  PRICE_RULES: {
    // GET /api/price-rules
    GET_RULES: (studioTypeId: string, priceTableId: string) =>
      `/api/price-rules?studioTypeId=${studioTypeId}&priceTableId=${priceTableId}`,
  },
};
