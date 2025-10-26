// src/app/admin/bookinglist/TransactionList.tsx
"use client";

import React, { useState } from "react";
import { Payment } from "@/infrastructure/api/service/paymentService";

interface TransactionListProps {
  payments: Payment[];
  loading: boolean;
  error: string | null;
  onUpdateStatus: (paymentId: string, status: 'PENDING' | 'SUCCESS' | 'FAILED') => Promise<Payment>;
}

export default function TransactionList({ 
  payments, 
  loading, 
  error, 
  onUpdateStatus 
}: TransactionListProps) {
  const [editingPaymentId, setEditingPaymentId] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<'PENDING' | 'SUCCESS' | 'FAILED'>('PENDING');

  // Function để xử lý cập nhật trạng thái
  const handleStatusUpdate = async (paymentId: string) => {
    try {
      await onUpdateStatus(paymentId, selectedStatus);
      setEditingPaymentId(null);
      console.log('TransactionList - status updated successfully');
    } catch (error) {
      console.error('TransactionList - error updating status:', error);
      // Có thể thêm toast notification ở đây
    }
  };

  // Function để bắt đầu edit
  const startEdit = (paymentId: string, currentStatus: 'PENDING' | 'SUCCESS' | 'FAILED') => {
    setEditingPaymentId(paymentId);
    setSelectedStatus(currentStatus);
  };

  // Function để hủy edit
  const cancelEdit = () => {
    setEditingPaymentId(null);
  };

  // Function để format số tiền
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  // Function để format ngày
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('vi-VN');
  };

  // Function để get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'SUCCESS':
        return 'bg-green-100 text-green-800';
      case 'FAILED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Function để get status text
  const getStatusText = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'Pending';
      case 'SUCCESS':
        return 'Success';
      case 'FAILED':
        return 'Failed';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div style={{ marginTop: '1.5rem' }}>
        <div style={{ backgroundColor: '#f0f9ff', padding: '1.5rem', borderRadius: '8px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>
            Danh sách giao dịch
          </h3>
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <div>Đang tải...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ marginTop: '1.5rem' }}>
        <div style={{ backgroundColor: '#f0f9ff', padding: '1.5rem', borderRadius: '8px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>
            Danh sách giao dịch
          </h3>
          <div style={{ textAlign: 'center', padding: '2rem', color: '#ef4444' }}>
            <div>Lỗi: {error}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ marginTop: '1.5rem' }}>
      <div style={{ backgroundColor: '#f0f9ff', padding: '1.5rem', borderRadius: '8px' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>
          Danh sách giao dịch
        </h3>
        
        {payments.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
            <div>Không có giao dịch nào</div>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ 
              width: '100%', 
              borderCollapse: 'collapse',
              fontSize: '0.875rem'
            }}>
              <thead>
                <tr style={{ backgroundColor: '#e5e7eb' }}>
                  <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #d1d5db', fontWeight: 'bold' }}>
                    ID
                  </th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #d1d5db', fontWeight: 'bold' }}>
                    PHƯƠNG THỨC
                  </th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #d1d5db', fontWeight: 'bold' }}>
                    LOẠI THANH TOÁN
                  </th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #d1d5db', fontWeight: 'bold' }}>
                    NGÀY THANH TOÁN
                  </th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #d1d5db', fontWeight: 'bold' }}>
                    SỐ TIỀN
                  </th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #d1d5db', fontWeight: 'bold' }}>
                    TRẠNG THÁI
                  </th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #d1d5db', fontWeight: 'bold' }}>
                    HÀNH ĐỘNG
                  </th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '0.75rem' }}>
                      <div style={{ fontWeight: 'bold' }}>{payment.id}</div>
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      {payment.paymentMethod}
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      {payment.paymentType}
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      {formatDate(payment.paymentDate)}
                    </td>
                    <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>
                      {formatAmount(payment.amount)}
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      {editingPaymentId === payment.id ? (
                        <select
                          value={selectedStatus}
                          onChange={(e) => setSelectedStatus(e.target.value as 'PENDING' | 'SUCCESS' | 'FAILED')}
                          style={{
                            padding: '0.25rem 0.5rem',
                            borderRadius: '4px',
                            border: '1px solid #d1d5db',
                            fontSize: '0.875rem'
                          }}
                        >
                          <option value="PENDING">Pending</option>
                          <option value="SUCCESS">Success</option>
                          <option value="FAILED">Failed</option>
                        </select>
                      ) : (
                        <span 
                          style={{
                            padding: '0.25rem 0.5rem',
                            borderRadius: '9999px',
                            fontSize: '0.75rem',
                            fontWeight: 'bold'
                          }}
                          className={getStatusColor(payment.status)}
                        >
                          {getStatusText(payment.status)}
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      {editingPaymentId === payment.id ? (
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button
                            onClick={() => handleStatusUpdate(payment.id)}
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
                            Lưu
                          </button>
                          <button
                            onClick={cancelEdit}
                            style={{
                              padding: '0.25rem 0.5rem',
                              backgroundColor: '#6b7280',
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px',
                              fontSize: '0.75rem',
                              cursor: 'pointer'
                            }}
                          >
                            Hủy
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => startEdit(payment.id, payment.status)}
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
                          Chỉnh sửa
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
