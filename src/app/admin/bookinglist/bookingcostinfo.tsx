// src/app/admin/bookinglist/bookingcostinfo.tsx
"use client";

import React from "react";

interface Pricing {
  studioPrice: number;
  servicePrice: number;
  overtimeFee: number;
  total: number;
}

interface BookingCostInfoProps {
  pricing: Pricing;
  isEditable?: boolean;
  onPricingChange?: (field: string, value: number) => void;
}

export default function BookingCostInfo({ 
  pricing, 
  isEditable = false, 
  onPricingChange 
}: BookingCostInfoProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const handleInputChange = (field: string, value: string) => {
    if (onPricingChange) {
      onPricingChange(field, parseInt(value) || 0);
    }
  };

  return (
    <div style={{ backgroundColor: '#fef3c7', padding: '1.5rem', borderRadius: '8px' }}>
      <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>
        Chi phí
      </h3>
      
      {isEditable ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem', color: '#6b7280' }}>Giá studio</label>
            <input
              type="number"
              value={pricing.studioPrice}
              onChange={(e) => handleInputChange('studioPrice', e.target.value)}
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
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem', color: '#6b7280' }}>Giá dịch vụ</label>
            <input
              type="number"
              value={pricing.servicePrice}
              onChange={(e) => handleInputChange('servicePrice', e.target.value)}
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
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem', color: '#6b7280' }}>Phụ phí thêm giờ</label>
            <input
              type="number"
              value={pricing.overtimeFee}
              onChange={(e) => handleInputChange('overtimeFee', e.target.value)}
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
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem', color: '#6b7280' }}>Tổng cộng</label>
            <input
              type="number"
              value={pricing.total}
              readOnly
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '0.9rem',
                backgroundColor: '#f3f4f6'
              }}
            />
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Giá studio:</span>
            <span>{formatPrice(pricing.studioPrice)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Giá dịch vụ:</span>
            <span>{formatPrice(pricing.servicePrice)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Phụ phí thêm giờ:</span>
            <span>{formatPrice(pricing.overtimeFee)}</span>
          </div>
          <hr style={{ margin: '0.5rem 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 'bold' }}>
            <span>Tổng cộng:</span>
            <span style={{ color: '#dc2626' }}>{formatPrice(pricing.total)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
