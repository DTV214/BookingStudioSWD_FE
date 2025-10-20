// src/app/admin/bookinglist/bookingcustomerinfo.tsx
"use client";

import React from "react";

interface Customer {
  name: string;
  email: string;
  phone: string;
}

interface BookingCustomerInfoProps {
  customer: Customer;
  isEditable?: boolean;
  onCustomerChange?: (field: string, value: string) => void;
}

export default function BookingCustomerInfo({ 
  customer, 
  isEditable = false, 
  onCustomerChange 
}: BookingCustomerInfoProps) {
  const handleInputChange = (field: string, value: string) => {
    if (onCustomerChange) {
      onCustomerChange(field, value);
    }
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: '8px' }}>
      <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>
        Thông tin khách hàng
      </h3>
      
      {isEditable ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem', color: '#6b7280' }}>Tên</label>
            <input
              type="text"
              value={customer.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
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
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem', color: '#6b7280' }}>Email</label>
            <input
              type="email"
              value={customer.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
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
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem', color: '#6b7280' }}>SĐT</label>
            <input
              type="text"
              value={customer.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
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
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div><strong>Tên:</strong> {customer.name}</div>
          <div><strong>Email:</strong> {customer.email}</div>
          <div><strong>SĐT:</strong> {customer.phone}</div>
        </div>
      )}
    </div>
  );
}
