export const ENDPOINTS = {
  PROFILE: "/api/account/profile",
  ACCOUNT: "/api/account",
  STUDIO_TYPES: "/api/studio-types",
  LOCATIONS: "/api/locations",
  SERVICES: "/api/services",
  PRICE_ITEMS: "/api/price-items/price",
  BOOKINGS: "/api/admin/bookings",
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
