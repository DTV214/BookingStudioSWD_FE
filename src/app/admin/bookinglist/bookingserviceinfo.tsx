// src/app/admin/bookinglist/bookingserviceinfo.tsx
"use client";

import React from "react";

interface Service {
  name: string;
  price: number;
}

interface BookingServiceInfoProps {
  services: Service[];
  isEditable?: boolean;
  onServicesChange?: (services: Service[]) => void;
}

export default function BookingServiceInfo({ 
  services
}: BookingServiceInfoProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const calculateServicePrice = () => {
    return services.reduce((total, service) => total + service.price, 0);
  };

  return (
    <div style={{ backgroundColor: '#f0fdf4', padding: '1.5rem', borderRadius: '8px' }}>
      <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>
        Dịch vụ kèm theo
      </h3>
      
      {services.length > 0 ? (
        <div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
            {services.map((service, index) => (
              <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {service.name}
                </span>
                <span style={{ fontWeight: 'bold', color: '#059669' }}>
                  {formatPrice(service.price)}
                </span>
              </div>
            ))}
          </div>
          
          <div style={{ 
            borderTop: '1px solid #d1d5db', 
            paddingTop: '0.5rem',
            display: 'flex', 
            justifyContent: 'space-between',
            fontWeight: 'bold',
            color: '#374151'
          }}>
            <span>Tổng dịch vụ:</span>
            <span style={{ color: '#059669' }}>{formatPrice(calculateServicePrice())}</span>
          </div>
        </div>
      ) : (
        <div style={{ color: '#6b7280', fontStyle: 'italic' }}>
          Không có dịch vụ kèm theo
        </div>
      )}
    </div>
  );
}
