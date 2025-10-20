// src/app/admin/bookinglist/bookingeditmodal.tsx
"use client";

import React, { useState } from "react";
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

interface BookingEditModalProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (booking: Booking) => void;
}

export default function BookingEditModal({ 
  booking, 
  isOpen, 
  onClose, 
  onSave 
}: BookingEditModalProps) {
  const [formData, setFormData] = useState<Booking | null>(null);

  React.useEffect(() => {
    if (booking) {
      setFormData({ ...booking });
    }
  }, [booking]);

  const handleSave = () => {
    if (formData) {
      onSave(formData);
      onClose();
    }
  };

  const handleCancel = () => {
    setFormData(booking ? { ...booking } : null);
    onClose();
  };

  const handleCustomerChange = (field: string, value: string) => {
    if (formData) {
      setFormData({
        ...formData,
        customer: { ...formData.customer, [field]: value }
      });
    }
  };

  const handleStudioChange = (field: string, value: string) => {
    if (formData) {
      setFormData({
        ...formData,
        studio: { ...formData.studio, [field]: value }
      });
    }
  };

  const handlePricingChange = (field: string, value: number) => {
    if (formData) {
      const newPricing = { ...formData.pricing, [field]: value };
      newPricing.total = newPricing.studioPrice + newPricing.servicePrice + newPricing.overtimeFee;
      setFormData({ ...formData, pricing: newPricing });
    }
  };

  const handleStatusChange = (status: string) => {
    if (formData) {
      setFormData({ ...formData, status: status as 'pending' | 'approved' | 'completed' | 'cancelled' });
    }
  };

  const handleNotesChange = (notes: string) => {
    if (formData) {
      setFormData({ ...formData, notes });
    }
  };

  if (!isOpen || !booking || !formData) return null;

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
            Chỉnh sửa đơn đặt #{booking.id}
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
          {/* Customer Info - Editable */}
          <BookingCustomerInfo 
            customer={formData.customer}
            isEditable={true}
            onCustomerChange={handleCustomerChange}
          />

          {/* Studio Info - Editable */}
          <div style={{ backgroundColor: '#f0f9ff', padding: '1.5rem', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>
              Thông tin studio
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem', color: '#6b7280' }}>Tên studio</label>
                <input
                  type="text"
                  value={formData.studio.name}
                  onChange={(e) => handleStudioChange('name', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                    fontSize: '0.9rem'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem', color: '#6b7280' }}>Địa chỉ</label>
                <input
                  type="text"
                  value={formData.studio.address}
                  onChange={(e) => handleStudioChange('address', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                    fontSize: '0.9rem'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem', color: '#6b7280' }}>Ngày</label>
                <input
                  type="date"
                  value={formData.studio.date}
                  onChange={(e) => handleStudioChange('date', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                    fontSize: '0.9rem'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem', color: '#6b7280' }}>Giờ</label>
                <input
                  type="time"
                  value={formData.studio.time}
                  onChange={(e) => handleStudioChange('time', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                    fontSize: '0.9rem'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem', color: '#6b7280' }}>Thời gian</label>
                <input
                  type="text"
                  value={formData.studio.duration}
                  onChange={(e) => handleStudioChange('duration', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                    fontSize: '0.9rem'
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Service Info - Read Only (Services are usually predefined) */}
        <div style={{ marginTop: '1.5rem' }}>
          <BookingServiceInfo 
            services={formData.services}
            isEditable={false}
          />
        </div>

        {/* Cost Info - Editable */}
        <div style={{ marginTop: '1.5rem' }}>
          <BookingCostInfo 
            pricing={formData.pricing}
            isEditable={true}
            onPricingChange={handlePricingChange}
          />
        </div>

        {/* Notes - Editable */}
        <div style={{ marginTop: '1.5rem' }}>
          <BookingNoteSection 
            notes={formData.notes}
            isEditable={true}
            onNotesChange={handleNotesChange}
          />
        </div>

        {/* Status Info - Editable */}
        <div style={{ marginTop: '1.5rem' }}>
          <BookingStatusInfo 
            status={formData.status}
            approvedBy={formData.approvedBy}
            history={formData.history}
            isEditable={true}
            onStatusChange={handleStatusChange}
          />
        </div>

        {/* Action Buttons - Save and Cancel */}
        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', justifyContent: 'flex-end' }}>
          <button
            onClick={handleCancel}
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
            Hủy
          </button>
          
          <button
            onClick={handleSave}
            style={{
              padding: '0.75rem 1.5rem',
              border: 'none',
              borderRadius: '6px',
              backgroundColor: '#3b82f6',
              color: 'white',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}
