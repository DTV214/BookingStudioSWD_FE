// src/infrastructure/api/httpClient.ts
import type { ApiResponse } from "@/domain/models/common";
import { ENV } from "../lib/env";
import { storage } from "@/infrastructure/utils/storage";

/**
 * Giả định ApiResponse<T> = { code: number; message: string; data: T }
 * Hỗ trợ cả trường hợp backend trả trực tiếp JSON array/object
 */

const RAW_BASE_URL: string =
  ENV.API_URL || process.env.NEXT_PUBLIC_API_URL || "https://bookingstudioswd-be.onrender.com";

/* -------------------- utils -------------------- */

function joinURL(base: string, path: string): string {
  if (!base) return path;
  return `${base.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
}

function hasBody(res: Response): boolean {
  if (res.status === 204 || res.status === 205) return false;
  const len = res.headers.get("content-length");
  if (len !== null) return Number(len) > 0;
  return true; // fallback cho transfer-encoding: chunked
}

function buildHeaders(token?: string, isJSON = true): HeadersInit {
  const headers: HeadersInit = { Accept: "application/json" };
  if (isJSON) headers["Content-Type"] = "application/json";

  const authToken = token ?? storage.getToken();
  if (authToken) headers["Authorization"] = `Bearer ${authToken}`;
  return headers;
}

class HttpError<T = unknown> extends Error {
  readonly status: number;
  readonly data?: T;
  constructor(status: number, message: string, data?: T) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

type RequestOptions<TBody> = {
  method: RequestMethod;
  url: string;
  token?: string;
  data?: TBody;
  signal?: AbortSignal;
  retries?: number; // retry nhẹ lỗi mạng/tạm thời
};

function toBody<TBody>(data: TBody | undefined): BodyInit | undefined {
  if (data === undefined) return undefined;
  if (typeof FormData !== "undefined" && data instanceof FormData) return data;
  return JSON.stringify(data);
}

function timeoutController(ms: number): {
  signal: AbortSignal;
  cancel: () => void;
} {
  const ctrl = new AbortController();
  const id = setTimeout(() => ctrl.abort(), ms);
  return { signal: ctrl.signal, cancel: () => clearTimeout(id) };
}

/* -------------------- core request -------------------- */

async function request<TRespData, TBody = unknown>(
  opts: RequestOptions<TBody>
): Promise<ApiResponse<TRespData>> {
  const { method, url, data, token, signal, retries = 1 } = opts;
  const fullUrl = joinURL(RAW_BASE_URL, url);
  const isJSON = !(typeof FormData !== "undefined" && data instanceof FormData);

  const external = Boolean(signal);
  const t = external ? null : timeoutController(15_000); // timeout 15s

  try {
    const res = await fetch(fullUrl, {
      method,
      headers: buildHeaders(token, isJSON),
      body: method === "GET" || method === "DELETE" ? undefined : toBody(data),
      credentials: "include",
      signal: signal ?? t?.signal,
    });

    // 401: token hết hạn hoặc sai
    if (res.status === 401) {
      storage.clearAll();
      throw new HttpError(401, "Unauthorized. Token expired or invalid.");
    }

    if (!res.ok) {
      let errJson: unknown = undefined;
      try {
        if (hasBody(res)) errJson = await res.json();
      } catch {
        // ignore parse fail
      }
      const message: string =
        typeof errJson === "object" && errJson !== null && "message" in errJson
          ? String((errJson as { message?: unknown }).message)
          : `${res.status} ${res.statusText}`;
      throw new HttpError(res.status, message, errJson);
    }

    if (!hasBody(res)) {
      return {
        code: 200,
        message: "No content",
        data: null as unknown as TRespData,
      };
    }

    // Parse JSON an toàn
    const json = (await res.json()) as unknown;

    /* -------------------- Tự động nhận diện kiểu dữ liệu -------------------- */
    // 1️⃣ Nếu backend trả mảng hoặc object (trực tiếp data)
    if (
      Array.isArray(json) ||
      (typeof json === "object" && json !== null && !("data" in json))
    ) {
      return {
        code: 200,
        message: "OK",
        data: json as TRespData,
      };
    }

    // 2️⃣ Nếu đúng chuẩn ApiResponse
    if (
      typeof json === "object" &&
      json !== null &&
      "code" in json &&
      "message" in json &&
      "data" in json
    ) {
      return json as ApiResponse<TRespData>;
    }

    throw new Error("Invalid JSON response shape.");
  } catch (err) {
    // Retry nhẹ nếu lỗi mạng/timeout/503
    const shouldRetry =
      retries > 0 &&
      ((err instanceof DOMException && err.name === "AbortError") ||
        (err instanceof HttpError &&
          (err.status === 429 || err.status === 503)));

    if (shouldRetry) {
      await new Promise((r) => setTimeout(r, 300));
      return request<TRespData, TBody>({ ...opts, retries: retries - 1 });
    }

    throw err;
  } finally {
    t?.cancel?.();
  }
}

/* -------------------- public API -------------------- */

export const httpClient = {
  get<TResp>(url: string, token?: string, signal?: AbortSignal) {
    return request<TResp>({ method: "GET", url, token, signal });
  },
  post<TResp, TBody = unknown>(
    url: string,
    data?: TBody,
    token?: string,
    signal?: AbortSignal
  ) {
    return request<TResp, TBody>({ method: "POST", url, data, token, signal });
  },
  put<TResp, TBody = unknown>(
    url: string,
    data?: TBody,
    token?: string,
    signal?: AbortSignal
  ) {
    return request<TResp, TBody>({ method: "PUT", url, data, token, signal });
  },
  delete<TResp>(url: string, token?: string, signal?: AbortSignal) {
    return request<TResp>({ method: "DELETE", url, token, signal });
  },

  qs(
    params?: Record<
      string,
      string | number | boolean | Array<string | number | boolean>
    >
  ) {
    if (!params) return "";
    const sp = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v === undefined || v === null) return;
      if (Array.isArray(v)) v.forEach((x) => sp.append(k, String(x)));
      else sp.append(k, String(v));
    });
    const s = sp.toString();
    return s ? `?${s}` : "";
  },

  HttpError,
};


