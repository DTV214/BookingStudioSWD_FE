// src/app/admin/bookinglist/bookingviewmodal.tsx
"use client";

import React from "react";
import BookingCustomerInfo from "./bookingcustomerinfo";
import BookingServiceInfo from "./bookingserviceinfo";
import BookingCostInfo from "./bookingcostinfo";
import BookingStatusInfo from "./bookingstatusinfo";
import BookingNoteSection from "./bookingnotesection";

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
              Thông tin studio
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div><strong>Tên studio:</strong> {booking.studio.name}</div>
              <div><strong>Địa chỉ:</strong> {booking.studio.address}</div>
              <div><strong>Ngày:</strong> {booking.studio.date}</div>
              <div><strong>Giờ:</strong> {booking.studio.time}</div>
              <div><strong>Thời gian:</strong> {booking.studio.duration}</div>
            </div>
          </div>
        </div>

        {/* Service Info - Read Only */}
        <div style={{ marginTop: '1.5rem' }}>
          <BookingServiceInfo 
            services={booking.services}
            isEditable={false}
          />
        </div>

        {/* Cost Info - Read Only */}
        <div style={{ marginTop: '1.5rem' }}>
          <BookingCostInfo 
            pricing={booking.pricing}
            isEditable={false}
          />
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
