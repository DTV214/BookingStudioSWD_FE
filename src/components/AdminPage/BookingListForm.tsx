"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";

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

interface Props {
  bookings: Booking[];
}

interface BookingDetailModalProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
}

interface BookingEditModalProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (booking: Booking) => void;
}

function BookingDetailModal({ booking, isOpen, onClose }: BookingDetailModalProps) {
  if (!isOpen || !booking) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

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
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937' }}>Chi tiết đơn đặt #{booking.id}</h2>
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
          {/* Thông tin khách hàng */}
          <div style={{ backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>
              Thông tin khách hàng
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div><strong>Tên:</strong> {booking.customer.name}</div>
              <div><strong>Email:</strong> {booking.customer.email}</div>
              <div><strong>SĐT:</strong> {booking.customer.phone}</div>
            </div>
          </div>

          {/* Thông tin studio */}
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

        {/* Dịch vụ kèm theo */}
        <div style={{ marginTop: '1.5rem', backgroundColor: '#f0fdf4', padding: '1.5rem', borderRadius: '8px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>
            Dịch vụ kèm theo
          </h3>
          {booking.services.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {booking.services.map((service, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{service.name}</span>
                  <span style={{ fontWeight: 'bold' }}>{formatPrice(service.price)}</span>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ color: '#6b7280', fontStyle: 'italic' }}>Không có dịch vụ kèm theo</div>
          )}
        </div>

        {/* Chi phí */}
        <div style={{ marginTop: '1.5rem', backgroundColor: '#fef3c7', padding: '1.5rem', borderRadius: '8px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>
            Chi phí
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Giá studio:</span>
              <span>{formatPrice(booking.pricing.studioPrice)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Giá dịch vụ:</span>
              <span>{formatPrice(booking.pricing.servicePrice)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Phụ phí thêm giờ:</span>
              <span>{formatPrice(booking.pricing.overtimeFee)}</span>
            </div>
            <hr style={{ margin: '0.5rem 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 'bold' }}>
              <span>Tổng cộng:</span>
              <span style={{ color: '#dc2626' }}>{formatPrice(booking.pricing.total)}</span>
            </div>
          </div>
        </div>

        {/* Ghi chú */}
        {booking.notes && (
          <div style={{ marginTop: '1.5rem', backgroundColor: '#f3e8ff', padding: '1.5rem', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>
              Ghi chú
            </h3>
            <p style={{ color: '#6b7280' }}>{booking.notes}</p>
          </div>
        )}

        {/* Trạng thái */}
        <div style={{ marginTop: '1.5rem', backgroundColor: '#f1f5f9', padding: '1.5rem', borderRadius: '8px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>
            Trạng thái
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              fontSize: '0.9rem',
              fontWeight: 'bold',
              backgroundColor: booking.status === 'pending' ? '#fef3c7' : 
                              booking.status === 'approved' ? '#dbeafe' :
                              booking.status === 'completed' ? '#dcfce7' : '#fee2e2',
              color: booking.status === 'pending' ? '#92400e' : 
                     booking.status === 'approved' ? '#1e40af' :
                     booking.status === 'completed' ? '#166534' : '#dc2626'
            }}>
              {booking.status === 'pending' ? 'Đang chờ xử lý' :
               booking.status === 'approved' ? 'Đã duyệt' :
               booking.status === 'completed' ? 'Đã hoàn thành' : 'Đã hủy'}
            </span>
            {booking.approvedBy && (
              <span style={{ color: '#6b7280' }}>Duyệt bởi: {booking.approvedBy}</span>
            )}
          </div>
        </div>

        {/* Lịch sử cập nhật */}
        <div style={{ marginTop: '1.5rem', backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: '8px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>
            Lịch sử cập nhật
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {booking.history.map((item, index) => (
              <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontWeight: 'bold' }}>{item.action}</span>
                  <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>{item.date}</div>
                </div>
                <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>{item.updatedBy}</span>
              </div>
            ))}
          </div>
        </div>

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

function BookingEditModal({ booking, isOpen, onClose, onSave }: BookingEditModalProps) {
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

  const handleInputChange = (field: string, value: string | number | boolean) => {
    if (formData) {
      setFormData({ ...formData, [field]: value });
    }
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
        maxWidth: '600px',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937' }}>Chỉnh sửa đơn đặt #{booking.id}</h2>
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

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Thông tin khách hàng */}
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#374151' }}>
              Thông tin khách hàng
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem', color: '#6b7280' }}>Tên</label>
                <input
                  type="text"
                  value={formData.customer.name}
                  onChange={(e) => handleCustomerChange('name', e.target.value)}
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
                  value={formData.customer.email}
                  onChange={(e) => handleCustomerChange('email', e.target.value)}
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
                  value={formData.customer.phone}
                  onChange={(e) => handleCustomerChange('phone', e.target.value)}
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

          {/* Thông tin studio */}
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#374151' }}>
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

          {/* Chi phí */}
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#374151' }}>
              Chi phí
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem', color: '#6b7280' }}>Giá studio</label>
                <input
                  type="number"
                  value={formData.pricing.studioPrice}
                  onChange={(e) => handlePricingChange('studioPrice', parseInt(e.target.value) || 0)}
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
                  value={formData.pricing.servicePrice}
                  onChange={(e) => handlePricingChange('servicePrice', parseInt(e.target.value) || 0)}
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
                  value={formData.pricing.overtimeFee}
                  onChange={(e) => handlePricingChange('overtimeFee', parseInt(e.target.value) || 0)}
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
                  value={formData.pricing.total}
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
          </div>

          {/* Trạng thái */}
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem', color: '#6b7280' }}>Trạng thái</label>
            <select
              value={formData.status}
              onChange={(e) => handleInputChange('status', e.target.value)}
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

          {/* Ghi chú */}
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem', color: '#6b7280' }}>Ghi chú</label>
            <textarea
              value={formData.notes || ''}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              rows={3}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '0.9rem',
                resize: 'vertical'
              }}
            />
          </div>
        </div>

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

export default function BookingListForm({ bookings }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [bookingsList, setBookingsList] = useState<Booking[]>(bookings);
  
  // New state for filters
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [bookingTypeFilter, setBookingTypeFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");
  
  // State for view mode (list or calendar)
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  
  // State for calendar view
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);

  // Advanced filtering logic
  const filteredBookings = useMemo(() => {
    return bookingsList.filter(booking => {
      // Search filter
      const matchesSearch = booking.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.studio.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Status filter
      const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
      
      // Date filter
      let matchesDate = true;
      if (dateFilter === 'today') {
        matchesDate = booking.studio.date === new Date().toISOString().split('T')[0];
      } else if (dateFilter === 'week') {
        const today = new Date();
        const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
        const bookingDate = new Date(booking.studio.date);
        matchesDate = bookingDate >= today && bookingDate <= weekFromNow;
      } else if (dateFilter === 'month') {
        const today = new Date();
        const monthFromNow = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
        const bookingDate = new Date(booking.studio.date);
        matchesDate = bookingDate >= today && bookingDate <= monthFromNow;
      }
      
      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [bookingsList, searchTerm, statusFilter, bookingTypeFilter, dateFilter]);

  // Statistics calculation
  const statistics = useMemo(() => {
    const total = filteredBookings.length;
    const byStatus = {
      pending: filteredBookings.filter(b => b.status === 'pending').length,
      approved: filteredBookings.filter(b => b.status === 'approved').length,
      completed: filteredBookings.filter(b => b.status === 'completed').length,
      cancelled: filteredBookings.filter(b => b.status === 'cancelled').length,
    };
    const totalRevenue = filteredBookings
      .filter(b => b.status === 'completed')
      .reduce((sum, b) => sum + b.pricing.total, 0);
    
    return { total, byStatus, totalRevenue };
  }, [filteredBookings]);

  // Approve and Cancel handlers
  const handleApprove = (bookingId: string) => {
    setBookingsList(prev =>
      prev.map(booking =>
        booking.id === bookingId
          ? { ...booking, status: 'approved' as const, approvedBy: 'Admin' }
          : booking
      )
    );
  };

  const handleCancel = (bookingId: string) => {
    setBookingsList(prev =>
      prev.map(booking =>
        booking.id === bookingId
          ? { ...booking, status: 'cancelled' as const }
          : booking
      )
    );
  };

  const handleBookingClick = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsDetailModalOpen(true);
  };

  const handleEditBooking = (booking: Booking) => {
    setEditingBooking(booking);
    setIsEditModalOpen(true);
  };

  const handleSaveBooking = (updatedBooking: Booking) => {
    setBookingsList(prev => 
      prev.map(booking => 
        booking.id === updatedBooking.id ? updatedBooking : booking
      )
    );
    setIsEditModalOpen(false);
    setEditingBooking(null);
  };

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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">Dashboard</h2>
        <nav>
          <ul>
            <li>
              <Link href="/admin/dashboard" className="menu-link">
                Dashboard
              </Link>
            </li>
            <li className="active">
              <Link href="/admin/bookinglist" className="menu-link">
                Booking Management
              </Link>
            </li>
            <li>
              <Link href="/admin/account" className="menu-link">
                Account Management
              </Link>
            </li>
            <li>
              <Link href="/admin/studios" className="menu-link">
                Studios
              </Link>
            </li>
            <li>
              <Link href="/admin/studio-types" className="menu-link">
                Studio Types
              </Link>
            </li>
            <li>
              <Link href="/admin/location" className="menu-link">
                Location Management
              </Link>
            </li>
            <li>
              <Link href="/admin/service" className="menu-link">
                Service Management
              </Link>
            </li>
            <li>
              <Link href="/admin/pricing" className="menu-link">
                Pricing Management
              </Link>
            </li>
            <li>
              <Link href="/admin/notifications" className="menu-link">
                Notifications
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <section className="dashboard-root">
        <header className="dashboard-header">
          <h1>Booking Management</h1>
          <div className="dashboard-search">
            <input
              aria-label="Search"
              placeholder="Search by customer name or studio"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-600">Total Bookings</div>
            <div className="text-2xl font-bold text-gray-800">{statistics.total}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-600">Pending</div>
            <div className="text-2xl font-bold text-yellow-600">{statistics.byStatus.pending}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-600">Completed</div>
            <div className="text-2xl font-bold text-green-600">{statistics.byStatus.completed}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-600">Revenue</div>
            <div className="text-2xl font-bold text-blue-600">{formatPrice(statistics.totalRevenue)}</div>
          </div>
        </div>

        {/* Filters and View Toggle */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-4">
              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>

              {/* Date Filter */}
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="all">All Dates</option>
                <option value="today">Today</option>
                <option value="week">Next 7 Days</option>
                <option value="month">Next 30 Days</option>
              </select>
            </div>

            {/* View Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  viewMode === 'list'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                List View
              </button>
              <button
                onClick={() => setViewMode('calendar')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  viewMode === 'calendar'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Calendar View
              </button>
            </div>
          </div>
        </div>

        {/* Content based on view mode */}
        {viewMode === 'list' ? (
          /* Existing table view */
          <div className="booking-tailwind-container">
            <div className="mb-6 flex justify-end">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors duration-200 shadow-lg hover:shadow-xl">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M5 12h14"/>
                </svg>
                <span>+ New Booking</span>
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                  </svg>
                  Booking Management
                </h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Studio</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date & Time</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Services</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Total</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredBookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 cursor-pointer hover:text-blue-800 hover:underline"
                            onClick={() => handleBookingClick(booking)}>
                          {booking.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{booking.customer.name}</div>
                          <div className="text-sm text-gray-500">{booking.customer.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{booking.studio.name}</div>
                          <div className="text-sm text-gray-500">{booking.studio.address}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div>{booking.studio.date}</div>
                          <div className="text-gray-500">{booking.studio.time} ({booking.studio.duration})</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {booking.services.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {booking.services.slice(0, 2).map((service, index) => (
                                <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  {service.name}
                                </span>
                              ))}
                              {booking.services.length > 2 && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                  +{booking.services.length - 2}
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="text-gray-400 italic">Không có</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">
                          {formatPrice(booking.pricing.total)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                            <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                              booking.status === 'pending' ? 'bg-yellow-400' :
                              booking.status === 'approved' ? 'bg-blue-400' :
                              booking.status === 'completed' ? 'bg-green-400' : 'bg-red-400'
                            }`}></div>
                            {getStatusDisplay(booking.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button
                              className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50 transition-colors duration-150"
                              onClick={() => handleBookingClick(booking)}
                              title="Xem chi tiết"
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                <circle cx="12" cy="12" r="3"/>
                              </svg>
                            </button>
                            <button
                              className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50 transition-colors duration-150"
                              onClick={() => handleEditBooking(booking)}
                              title="Chỉnh sửa"
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                              </svg>
                            </button>
                            {booking.status === 'pending' && (
                              <button
                                className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50 transition-colors duration-150"
                                onClick={() => handleApprove(booking.id)}
                                title="Duyệt đơn"
                              >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <polyline points="20,6 9,17 4,12"/>
                                </svg>
                              </button>
                            )}
                            {(booking.status === 'pending' || booking.status === 'approved') && (
                              <button
                                className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50 transition-colors duration-150"
                                onClick={() => handleCancel(booking.id)}
                                title="Hủy đơn"
                              >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <line x1="18" y1="6" x2="6" y2="18"/>
                                  <line x1="6" y1="6" x2="18" y2="18"/>
                                </svg>
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          /* Calendar View - Simple implementation */
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Calendar View</h2>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 mb-4"
            />
            <div className="grid grid-cols-1 gap-4">
              {filteredBookings
                .filter(booking => booking.studio.date === selectedDate)
                .map(booking => (
                  <div key={booking.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{booking.customer.name}</h3>
                        <p className="text-sm text-gray-600">{booking.studio.name}</p>
                        <p className="text-sm text-gray-500">{booking.studio.time} - {booking.studio.duration}</p>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                        {getStatusDisplay(booking.status)}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </section>

      {/* Detail Modal */}
      <BookingDetailModal
        booking={selectedBooking}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedBooking(null);
        }}
      />

      {/* Edit Modal */}
      <BookingEditModal
        booking={editingBooking}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingBooking(null);
        }}
        onSave={handleSaveBooking}
      />
    </div>
  );
}
