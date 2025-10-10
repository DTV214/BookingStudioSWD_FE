// src/infrastructure/api/httpClient.ts
import type { ApiResponse } from "@/domain/models/common";
import { ENV } from "../lib/env";
import { storage } from "@/infrastructure/utils/storage";

const BASE_URL = ENV.API_URL || process.env.NEXT_PUBLIC_API_URL || "";

/**
 * ✅ Xây dựng headers chuẩn, tự động lấy token từ localStorage nếu không truyền vào
 */
function buildHeaders(token?: string, isJSON = true): HeadersInit {
  const headers: HeadersInit = {};
  if (isJSON) headers["Content-Type"] = "application/json";

  // Ưu tiên token được truyền vào, nếu không có thì lấy từ storage
  const authToken = token || storage.getToken();
  if (authToken) headers["Authorization"] = `Bearer ${authToken}`;

  return headers;
}

/**
 * ✅ Xử lý phản hồi HTTP chung
 * - Tự động redirect khi 401
 * - Parse JSON an toàn
 */
async function handleResponse<T>(
  res: Response,
  url: string
): Promise<ApiResponse<T>> {
  // Trường hợp token hết hạn hoặc không hợp lệ
  if (res.status === 401) {
    console.warn(`[httpClient] 401 - Unauthorized for ${url}`);

    // Xóa token + chuyển hướng login
    storage.clearAll();

    if (typeof window !== "undefined") {
      window.location.href = "/auth/login";
    }

    throw new Error("Unauthorized. Token expired or invalid.");
  }

  if (!res.ok) {
    // Nếu backend trả về JSON lỗi, parse ra để debug dễ hơn
    try {
      const errorBody = await res.json();
      console.error(`[httpClient] Error ${res.status}:`, errorBody);
      throw new Error(
        errorBody?.message || `Request failed with ${res.statusText}`
      );
    } catch {
      // Nếu không parse được JSON
      const text = await res.text();
      throw new Error(`${res.status} ${res.statusText}: ${text}`);
    }
  }

  // ✅ Parse JSON an toàn
  try {
    const json = (await res.json()) as ApiResponse<T>;
    return json;
  } catch (e) {
    console.error(`[httpClient] Failed to parse JSON for ${url}:`, e);
    throw new Error("Invalid JSON response from server.");
  }
}

/**
 * ✅ HTTP Client – type-safe, có xử lý token, tự redirect khi 401
 */
export const httpClient = {
  async get<T>(url: string, token?: string): Promise<ApiResponse<T>> {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: "GET",
      headers: buildHeaders(token),
      credentials: "include", // cho phép gửi cookie nếu cần (đăng nhập Google, v.v.)
    });
    return handleResponse<T>(res, url);
  },

  async post<T>(
    url: string,
    data?: unknown,
    token?: string
  ): Promise<ApiResponse<T>> {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: "POST",
      headers: buildHeaders(token),
      body: data ? JSON.stringify(data) : undefined,
      credentials: "include",
    });
    return handleResponse<T>(res, url);
  },

  async put<T>(
    url: string,
    data?: unknown,
    token?: string
  ): Promise<ApiResponse<T>> {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: "PUT",
      headers: buildHeaders(token),
      body: data ? JSON.stringify(data) : undefined,
      credentials: "include",
    });
    return handleResponse<T>(res, url);
  },

  async delete<T>(url: string, token?: string): Promise<ApiResponse<T>> {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: "DELETE",
      headers: buildHeaders(token),
      credentials: "include",
    });
    return handleResponse<T>(res, url);
  },
};
