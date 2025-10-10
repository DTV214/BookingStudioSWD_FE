// src/lib/utils.ts

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Gộp nhiều className lại (chuẩn của shadcn/ui)
 * Ví dụ:
 * cn("text-sm", condition && "text-red-500")
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Định dạng ngày tháng (optional, dùng cho UI)
 */
export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
