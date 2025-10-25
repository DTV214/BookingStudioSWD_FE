// Account Management API Types
// Based on Swagger API documentation

export interface AccountData {
  id: string;
  email: string;
  fullName: string;
  phoneNumber: string | null;
  createdDate: string;
  updatedDate: string;
  accountRole: 'ADMIN' | 'CUSTOMER' | 'STAFF';
  status: 'ACTIVE' | 'BANNED' | 'INACTIVE';
  userType: 'PERSONAL' | 'BUSINESS' | null;
  locationId?: string; // Optional field from Swagger
}

export interface AccountListResponse {
  code: number;
  message: string;
  data: AccountData[];
}

export interface AccountResponse {
  code: number;
  message: string;
  data: AccountData | string; // Swagger shows data as "string" but likely means AccountData
}

export interface AccountUpdateRequest {
  fullName?: string;
  phoneNumber?: string;
  role?: 'ADMIN' | 'CUSTOMER' | 'STAFF';
  status?: 'ACTIVE' | 'BANNED' | 'INACTIVE';
  userType?: 'PERSONAL' | 'BUSINESS';
  email?: string;
  locationId?: string;
}

export interface AccountCreateRequest {
  id?: string; // Optional ID field for backend requirement
  email: string;
  fullName: string;
  phoneNumber?: string;
  role: 'ADMIN' | 'CUSTOMER' | 'STAFF';
  status: 'ACTIVE' | 'BANNED' | 'INACTIVE';
  userType?: 'PERSONAL' | 'BUSINESS';
  locationId?: string;
}

export interface AccountQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: 'ADMIN' | 'CUSTOMER' | 'STAFF';
  status?: 'ACTIVE' | 'BANNED' | 'INACTIVE';
  createdDateFrom?: string;
  createdDateTo?: string;
}

export interface AccountStatistics {
  totalAccounts: number;
  accountsByRole: {
    ADMIN: number;
    CUSTOMER: number;
    STAFF: number;
  };
  accountsByStatus: {
    ACTIVE: number;
    BANNED: number;
    INACTIVE: number;
  };
}
