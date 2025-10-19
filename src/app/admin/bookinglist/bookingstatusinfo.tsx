// src/app/admin/bookinglist/bookingstatusinfo.tsx
"use client";

import React from "react";

interface BookingHistory {
  date: string;
  action: string;
  updatedBy: string;
}

interface BookingStatusInfoProps {
  status: 'pending' | 'approved' | 'completed' | 'cancelled';
  approvedBy?: string;
  history: BookingHistory[];
  isEditable?: boolean;
  onStatusChange?: (status: string) => void;
}

export default function BookingStatusInfo({ 
  status, 
  approvedBy, 
  history, 
  isEditable = false, 
  onStatusChange 
}: BookingStatusInfoProps) {
  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'pending': return 'Đang chờ xử lý';
      case 'approved': return 'Đã duyệt';
      case 'completed': return 'Đã hoàn thành';
      case 'cancelled': return 'Đã hủy';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusDotColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-400';
      case 'approved': return 'bg-blue-400';
      case 'completed': return 'bg-green-400';
      case 'cancelled': return 'bg-red-400';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div style={{ backgroundColor: '#f1f5f9', padding: '1.5rem', borderRadius: '8px' }}>
      <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>
        Trạng thái
      </h3>
      
      {/* Status Display */}
      <div style={{ marginBottom: '1.5rem' }}>
        {isEditable ? (
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem', color: '#6b7280' }}>Trạng thái</label>
            <select
              value={status}
              onChange={(e) => onStatusChange && onStatusChange(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '0.9rem'
              }}
            >
              <option value="pending">Đang chờ xử lý</option>
              <option value="approved">Đã duyệt</option>
              <option value="completed">Đã hoàn thành</option>
              <option value="cancelled">Đã hủy</option>
            </select>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
              <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${getStatusDotColor(status)}`}></div>
              {getStatusDisplay(status)}
            </span>
            {approvedBy && (
              <span style={{ color: '#6b7280' }}>Duyệt bởi: {approvedBy}</span>
            )}
          </div>
        )}
      </div>

      {/* History */}
      <div>
        <h4 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#374151' }}>
          Lịch sử cập nhật
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {history.map((item, index) => (
            <div key={index} style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '0.5rem',
              backgroundColor: 'white',
              borderRadius: '4px',
              border: '1px solid #e5e7eb'
            }}>
              <div>
                <span style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{item.action}</span>
                <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>{item.date}</div>
              </div>
              <span style={{ fontSize: '0.8rem', color: '#6b7280' }}>{item.updatedBy}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
