// src/infrastructure/api/service/paymentService.ts

import { httpClient } from "@/infrastructure/api/httpClient";
import { ApiResponse } from "@/domain/models/common";
import { ENDPOINTS } from "@/infrastructure/lib/endpoints";

// Payment interfaces based on API response
export interface Payment {
  id: string;
  paymentMethod: string;
  status: 'PENDING' | 'SUCCESS' | 'FAILED';
  paymentType: string;
  paymentDate: string | null;
  amount: number;
  bookingId: string;
  bookingStatus: string;
  accountEmail: string;
  accountName: string;
}

export interface PaymentStatusUpdate {
  status: 'PENDING' | 'SUCCESS' | 'FAILED';
}

export interface PaymentResponse {
  code: number;
  message: string;
  data: Payment[];
}

/**
 * Service để xử lý các nghiệp vụ liên quan đến payment
 */
export const paymentService = {
  /**
   * Lấy danh sách payments theo bookingId
   * GET /api/payments/staff/booking/{bookingId}
   */
  getPaymentsByBookingId: async (bookingId: string): Promise<Payment[]> => {
    try {
      const response = await httpClient.get<Payment[]>(ENDPOINTS.USER_BOOKINGS.GET_PAYMENTS_FOR_BOOKING(bookingId));
      console.log("paymentService.getPaymentsByBookingId response:", response);
      return response.data;
    } catch (error) {
      console.error("Error fetching payments by booking ID:", error);
      throw error;
    }
  },

  /**
   * Cập nhật trạng thái payment
   * PUT /api/payments/{paymentId}/status
   */
  updatePaymentStatus: async (paymentId: string, status: PaymentStatusUpdate): Promise<Payment> => {
    try {
      const response = await httpClient.put<Payment>(`/api/payments/${paymentId}/status`, status);
      console.log("paymentService.updatePaymentStatus response:", response);
      return response.data;
    } catch (error) {
      console.error("Error updating payment status:", error);
      throw error;
    }
  },

  /**
   * Lấy tất cả payments
   * GET /api/payments
   */
  getAllPayments: async (): Promise<Payment[]> => {
    try {
      const response = await httpClient.get<Payment[]>('/api/payments');
      console.log("paymentService.getAllPayments response:", response);
      return response.data;
    } catch (error) {
      console.error("Error fetching all payments:", error);
      throw error;
    }
  }
};
