// src/app/admin/bookinglist/bookingviewmodal.tsx
"use client";

import React from "react";
import BookingCustomerInfo from "./bookingcustomerinfo";
import BookingStatusInfo from "./bookingstatusinfo";
import BookingNoteSection from "./bookingnotesection";
import TransactionList from "./TransactionList";
import { usePayments } from "@/infrastructure/api/service/paymentHooks";

interface Customer {
  name: string;
  email: string;
  phone: string;
}

interface Studio {
  name: string;
  address: string;
  date: string;
  time: string;
  duration: string;
}

interface Service {
  name: string;
  price: number;
}

interface Pricing {
  studioPrice: number;
  servicePrice: number;
  overtimeFee: number;
  total: number;
}

interface BookingHistory {
  date: string;
  action: string;
  updatedBy: string;
}

interface Booking {
  id: string;
  customer: Customer;
  studio: Studio;
  services: Service[];
  pricing: Pricing;
  notes?: string;
  status: 'pending' | 'approved' | 'completed' | 'cancelled';
  approvedBy?: string;
  history: BookingHistory[];
  createdAt: string;
}

interface BookingViewModalProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingViewModal({ 
  booking, 
  isOpen, 
  onClose
}: BookingViewModalProps) {
  const { payments, loading, error, updatePaymentStatus } = usePayments(booking?.id || null);

  // Debug logs
  console.log('BookingViewModal - isOpen:', isOpen);
  console.log('BookingViewModal - booking:', booking);
  console.log('BookingViewModal - payments:', payments);
  console.log('BookingViewModal - loading:', loading);
  console.log('BookingViewModal - error:', error);

  if (!isOpen || !booking) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '12px',
        width: '90%',
        maxWidth: '800px',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937' }}>
            Chi tiết đơn đặt #{booking.id}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: '#6b7280'
            }}
          >
            ×
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {/* Customer Info - Read Only */}
          <BookingCustomerInfo 
            customer={booking.customer}
            isEditable={false}
          />

          {/* Studio Info - Read Only */}
          <div style={{ backgroundColor: '#f0f9ff', padding: '1.5rem', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>
              Thông tin loại studio
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div><strong>Tên:</strong> {booking.studio.name}</div>
              <div><strong>Ngày:</strong> {booking.studio.date}</div>
              <div><strong>Giờ:</strong> {booking.studio.time}</div>
            </div>
          </div>
        </div>

        {/* Cost Info - Read Only */}
        <div style={{ marginTop: '1.5rem' }}>
          <div style={{ backgroundColor: '#f0f9ff', padding: '1.5rem', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>
              Tổng tiền
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                <strong>Tổng:</strong> {new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND'
                }).format(booking.pricing.total)}
              </div>
            </div>
          </div>
        </div>

        {/* Notes - Read Only */}
        <div style={{ marginTop: '1.5rem' }}>
          <BookingNoteSection 
            notes={booking.notes}
            isEditable={false}
          />
        </div>

        {/* Status Info - Read Only */}
        <div style={{ marginTop: '1.5rem' }}>
          <BookingStatusInfo 
            status={booking.status}
            approvedBy={booking.approvedBy}
            history={booking.history}
            isEditable={false}
          />
        </div>

        {/* Registered Studios Section */}
        <div style={{ marginTop: '1.5rem' }}>
          <div style={{ backgroundColor: '#f0f9ff', padding: '1.5rem', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>
              Những studio đã đăng kí
            </h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ 
                width: '100%', 
                borderCollapse: 'collapse',
                fontSize: '0.875rem'
              }}>
                <thead>
                  <tr style={{ backgroundColor: '#e5e7eb' }}>
                    <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #d1d5db', fontWeight: 'bold' }}>
                      STUDIO NAME
                    </th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #d1d5db', fontWeight: 'bold' }}>
                      START TIME
                    </th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #d1d5db', fontWeight: 'bold' }}>
                      END TIME
                    </th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #d1d5db', fontWeight: 'bold' }}>
                      STUDIO AMOUNT
                    </th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #d1d5db', fontWeight: 'bold' }}>
                      SERVICE AMOUNT
                    </th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #d1d5db', fontWeight: 'bold' }}>
                      STATUS
                    </th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #d1d5db', fontWeight: 'bold' }}>
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '0.75rem' }}>
                      {booking.studio.name}
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      {booking.studio.time} {booking.studio.date}
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      {/* Calculate end time - assuming 2 hours duration */}
                      {new Date(new Date(`${booking.studio.date}T${booking.studio.time}`).getTime() + 2 * 60 * 60 * 1000).toLocaleString('vi-VN', {
                        hour: '2-digit',
                        minute: '2-digit',
                        day: '2-digit',
                        month: '2-digit',
                        year: '2-digit'
                      })}
                    </td>
                    <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND'
                      }).format(booking.pricing.studioPrice)}
                    </td>
                    <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND'
                      }).format(booking.pricing.servicePrice)}
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      <span 
                        style={{
                          padding: '0.25rem 0.5rem',
                          borderRadius: '9999px',
                          fontSize: '0.75rem',
                          fontWeight: 'bold',
                          backgroundColor: booking.status === 'pending' ? '#fef3c7' : 
                                         booking.status === 'approved' ? '#d1fae5' : 
                                         booking.status === 'completed' ? '#dbeafe' : '#fee2e2',
                          color: booking.status === 'pending' ? '#92400e' : 
                                 booking.status === 'approved' ? '#065f46' : 
                                 booking.status === 'completed' ? '#1e40af' : '#991b1b'
                        }}
                      >
                        {booking.status === 'pending' ? 'Sắp tới' : 
                         booking.status === 'approved' ? 'Đã duyệt' : 
                         booking.status === 'completed' ? 'Hoàn thành' : 'Đã hủy'}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          style={{
                            padding: '0.25rem 0.5rem',
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            cursor: 'pointer'
                          }}
                        >
                          Xem
                        </button>
                        <button
                          style={{
                            padding: '0.25rem 0.5rem',
                            backgroundColor: '#10b981',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            cursor: 'pointer'
                          }}
                        >
                          Chỉnh sửa
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Transaction List */}
        <TransactionList 
          payments={payments}
          loading={loading}
          error={error}
          onUpdateStatus={updatePaymentStatus}
        />

        {/* Action Buttons - Only Close */}
        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
            style={{
              padding: '0.75rem 1.5rem',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              backgroundColor: 'white',
              color: '#374151',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
