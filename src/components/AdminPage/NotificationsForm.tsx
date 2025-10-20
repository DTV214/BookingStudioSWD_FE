"use client";

// src/components/AdminPage/NotificationsForm.tsx

import React, { useState } from "react";
import Link from "next/link";
import { NotificationData } from "@/domain/models/notification";

// 2. Props cho component
type Props = {
  notifications: NotificationData[];
};

// 3. Component modal chi tiết thông báo
interface NotificationDetailModalProps {
  notification: NotificationData | null;
  isOpen: boolean;
  onClose: () => void;
}

function NotificationDetailModal({ notification, isOpen, onClose }: NotificationDetailModalProps) {
  if (!isOpen || !notification) return null;

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'user_registration':
        return 'Đăng ký người dùng';
      case 'booking_new':
        return 'Đặt lịch mới';
      case 'booking_cancelled':
        return 'Hủy đặt lịch';
      case 'studio_suspended':
        return 'Studio tạm ngưng';
      case 'studio_active':
        return 'Studio hoạt động';
      default:
        return 'Khác';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div 
      className="modal-overlay" 
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
      }}
    >
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'white',
          borderRadius: '12px',
          width: '90%',
          maxWidth: '600px',
          maxHeight: '80vh',
          overflowY: 'auto',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
        }}
      >
        <div className="modal-header" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1.5rem',
          borderBottom: '1px solid #e5e7eb'
        }}>
          <h2 style={{
            margin: 0,
            color: '#111827',
            fontSize: '1.25rem',
            fontWeight: 600
          }}>Chi tiết thông báo</h2>
          <button 
            className="close-button" 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#6b7280',
              padding: '0.25rem',
              borderRadius: '4px'
            }}
          >×</button>
        </div>
        <div className="modal-body" style={{ padding: '1.5rem' }}>
          <div className="notification-detail" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <div className="detail-row" style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.75rem'
            }}>
              <label style={{
                fontWeight: 600,
                color: '#374151',
                minWidth: '120px',
                fontSize: '0.9rem'
              }}>Tiêu đề:</label>
              <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>{notification.title}</span>
            </div>
            <div className="detail-row" style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.75rem'
            }}>
              <label style={{
                fontWeight: 600,
                color: '#374151',
                minWidth: '120px',
                fontSize: '0.9rem'
              }}>Loại thông báo:</label>
              <span className={`type-badge type-${notification.type}`} style={{
                padding: '0.25rem 0.6rem',
                borderRadius: '999px',
                fontSize: '0.8rem',
                fontWeight: 500,
                display: 'inline-block',
                backgroundColor: notification.type === 'user_registration' ? '#dbeafe' : 
                               notification.type === 'booking_new' ? '#dcfce7' :
                               notification.type === 'booking_cancelled' ? '#fee2e2' :
                               notification.type === 'studio_suspended' ? '#fef3c7' : '#dcfce7',
                color: notification.type === 'user_registration' ? '#1d4ed8' : 
                       notification.type === 'booking_new' ? '#166534' :
                       notification.type === 'booking_cancelled' ? '#991b1b' :
                       notification.type === 'studio_suspended' ? '#b45309' : '#166534'
              }}>
                {getTypeLabel(notification.type)}
              </span>
            </div>
            <div className="detail-row" style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.75rem'
            }}>
              <label style={{
                fontWeight: 600,
                color: '#374151',
                minWidth: '120px',
                fontSize: '0.9rem'
              }}>Thời gian:</label>
              <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>{formatTimestamp(notification.timestamp)}</span>
            </div>
            <div className="detail-row" style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.75rem'
            }}>
              <label style={{
                fontWeight: 600,
                color: '#374151',
                minWidth: '120px',
                fontSize: '0.9rem'
              }}>Trạng thái:</label>
              <span className={`status-badge ${notification.isRead ? 'read' : 'unread'}`} style={{
                padding: '0.25rem 0.6rem',
                borderRadius: '999px',
                fontSize: '0.8rem',
                fontWeight: 500,
                display: 'inline-block',
                backgroundColor: notification.isRead ? '#dbeafe' : '#fef3c7',
                color: notification.isRead ? '#1d4ed8' : '#b45309'
              }}>
                {notification.isRead ? 'Đã đọc' : 'Chưa đọc'}
              </span>
            </div>
            <div className="detail-row full-width" style={{
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              <label style={{
                fontWeight: 600,
                color: '#374151',
                minWidth: '120px',
                fontSize: '0.9rem'
              }}>Nội dung:</label>
              <div className="content-text" style={{
                backgroundColor: '#f8f9fa',
                padding: '1rem',
                borderRadius: '8px',
                borderLeft: '4px solid #2563eb',
                lineHeight: 1.6,
                fontSize: '0.9rem',
                color: '#374151'
              }}>{notification.content}</div>
            </div>
          </div>
        </div>
        <div className="modal-footer" style={{
          padding: '1.5rem',
          borderTop: '1px solid #e5e7eb',
          textAlign: 'right'
        }}>
          <button 
            className="btn secondary" 
            onClick={onClose}
            style={{
              background: '#6b7280',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: 500,
              transition: 'background 0.2s'
            }}
          >Đóng</button>
        </div>
      </div>
    </div>
  );
}

/**
 * 4. Presentation component: chỉ render UI dựa trên props
 */
export default function NotificationsForm({ notifications }: Props) {
  const [selectedNotification, setSelectedNotification] = useState<NotificationData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNotificationClick = (notification: NotificationData) => {
    setSelectedNotification(notification);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNotification(null);
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Vừa xong';
    } else if (diffInHours < 24) {
      return `${diffInHours} giờ trước`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} ngày trước`;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'user_registration':
        return '👤';
      case 'booking_new':
        return '📅';
      case 'booking_cancelled':
        return '❌';
      case 'studio_suspended':
        return '⏸️';
      case 'studio_active':
        return '▶️';
      default:
        return '📢';
    }
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
            <li>
              <Link href="/admin/bookinglist" className="menu-link">
                Bookings List
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
            <li className="active">
              <Link href="/admin/notifications" className="menu-link">
                Notifications
              </Link>
            </li>
            <li>
              <Link href="/admin/profile-setting" className="menu-link">
                Profile & Settings
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <section className="notification-root">
        {/* Header */}
        <div className="notification-header">
          <h1>Thông báo</h1>
          <div className="header-controls">
            <input className="search-input" placeholder="Tìm kiếm thông báo..." />
          </div>
        </div>

        {/* Table hiển thị notifications */}
        <div className="notification-card">
          <table className="notification-table" role="table">
            <thead>
              <tr>
                <th>Loại</th>
                <th>Tiêu đề</th>
                <th>Thời gian</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {notifications.map((notification) => (
                <tr key={notification.id} className={notification.isRead ? 'read' : 'unread'}>
                  <td>
                    <span className="type-icon">
                      {getTypeIcon(notification.type)}
                    </span>
                  </td>
                  <td className="title-cell">
                    <div className="notification-title">{notification.title}</div>
                    <div className="notification-preview">{notification.content.substring(0, 50)}...</div>
                  </td>
                  <td>{formatTimestamp(notification.timestamp)}</td>
                  <td>
                    <span className={`status-badge ${notification.isRead ? 'read' : 'unread'}`}>
                      {notification.isRead ? 'Đã đọc' : 'Chưa đọc'}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="btn primary"
                      onClick={() => handleNotificationClick(notification)}
                    >
                      Xem chi tiết
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Modal chi tiết thông báo */}
      <NotificationDetailModal
        notification={selectedNotification}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
}
