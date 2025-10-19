// src/app/admin/bookinglist/bookingnotesection.tsx
"use client";

import React from "react";

interface BookingNoteSectionProps {
  notes?: string;
  isEditable?: boolean;
  onNotesChange?: (notes: string) => void;
}

export default function BookingNoteSection({ 
  notes, 
  isEditable = false, 
  onNotesChange 
}: BookingNoteSectionProps) {
  const handleNotesChange = (value: string) => {
    if (onNotesChange) {
      onNotesChange(value);
    }
  };

  return (
    <div style={{ backgroundColor: '#f3e8ff', padding: '1.5rem', borderRadius: '8px' }}>
      <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>
        Ghi chú
      </h3>
      
      {isEditable ? (
        <div>
          <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem', color: '#6b7280' }}>Ghi chú</label>
          <textarea
            value={notes || ''}
            onChange={(e) => handleNotesChange(e.target.value)}
            rows={3}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              fontSize: '0.9rem',
              resize: 'vertical'
            }}
            placeholder="Nhập ghi chú của khách hàng..."
          />
        </div>
      ) : (
        <div>
          {notes ? (
            <p style={{ color: '#6b7280', lineHeight: '1.5' }}>{notes}</p>
          ) : (
            <p style={{ color: '#9ca3af', fontStyle: 'italic' }}>Không có ghi chú</p>
          )}
        </div>
      )}
    </div>
  );
}
