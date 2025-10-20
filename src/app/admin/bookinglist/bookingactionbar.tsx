// src/app/admin/bookinglist/bookingactionbar.tsx
"use client";

import React from "react";

interface BookingActionBarProps {
  onViewDetails: () => void;
  onEdit: () => void;
  onDelete?: () => void;
  onApprove?: () => void;
  onCancel?: () => void;
  status: 'pending' | 'approved' | 'completed' | 'cancelled';
}

export default function BookingActionBar({ 
  onViewDetails, 
  onEdit, 
  onDelete, 
  onApprove, 
  onCancel, 
  status 
}: BookingActionBarProps) {
  return (
    <div className="flex items-center space-x-2">
      {/* View Details Button */}
      <button
        className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50 transition-colors duration-150"
        onClick={onViewDetails}
        title="Xem chi tiết"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      </button>

      {/* Edit Button */}
      <button
        className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50 transition-colors duration-150"
        onClick={onEdit}
        title="Chỉnh sửa"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
        </svg>
      </button>

      {/* Status-specific actions */}
      {status === 'pending' && onApprove && (
        <button
          className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50 transition-colors duration-150"
          onClick={onApprove}
          title="Duyệt đơn"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20,6 9,17 4,12"/>
          </svg>
        </button>
      )}

      {(status === 'pending' || status === 'approved') && onCancel && (
        <button
          className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50 transition-colors duration-150"
          onClick={onCancel}
          title="Hủy đơn"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      )}

      {/* Delete Button */}
      {onDelete && (
        <button
          className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50 transition-colors duration-150"
          onClick={onDelete}
          title="Xóa đơn"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="3,6 5,6 21,6"/>
            <path d="M19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"/>
          </svg>
        </button>
      )}
    </div>
  );
}
