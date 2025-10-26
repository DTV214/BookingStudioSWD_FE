// src/infrastructure/api/service/paymentHooks.ts

import { useState, useEffect } from 'react';
import { paymentService, Payment, PaymentStatusUpdate } from './paymentService';

/**
 * Hook để quản lý payments theo bookingId
 */
export const usePayments = (bookingId: string | null) => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch payments khi bookingId thay đổi
  useEffect(() => {
    if (!bookingId) {
      setPayments([]);
      return;
    }

    const fetchPayments = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await paymentService.getPaymentsByBookingId(bookingId);
        setPayments(data);
        console.log('usePayments - fetched payments:', data);
      } catch (err) {
        console.error('usePayments - error fetching payments:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch payments');
        setPayments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [bookingId]);

  // Function để cập nhật trạng thái payment
  const updatePaymentStatus = async (paymentId: string, status: 'PENDING' | 'SUCCESS' | 'FAILED') => {
    try {
      setLoading(true);
      setError(null);
      
      const statusUpdate: PaymentStatusUpdate = { status };
      const updatedPayment = await paymentService.updatePaymentStatus(paymentId, statusUpdate);
      
      // Cập nhật local state
      setPayments(prevPayments => 
        prevPayments.map(payment => 
          payment.id === paymentId ? updatedPayment : payment
        )
      );
      
      console.log('usePayments - updated payment status:', updatedPayment);
      return updatedPayment;
    } catch (err) {
      console.error('usePayments - error updating payment status:', err);
      setError(err instanceof Error ? err.message : 'Failed to update payment status');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Function để refresh payments
  const refreshPayments = async () => {
    if (!bookingId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await paymentService.getPaymentsByBookingId(bookingId);
      setPayments(data);
      console.log('usePayments - refreshed payments:', data);
    } catch (err) {
      console.error('usePayments - error refreshing payments:', err);
      setError(err instanceof Error ? err.message : 'Failed to refresh payments');
    } finally {
      setLoading(false);
    }
  };

  return {
    payments,
    loading,
    error,
    updatePaymentStatus,
    refreshPayments
  };
};
