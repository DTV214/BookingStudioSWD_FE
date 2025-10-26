"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { AccountData, AccountStatistics, AccountCreateRequest, AccountUpdateRequest } from "@/infrastructure/AdminAPI/AccountManagementAPI";
import { LocationAPI } from "@/infrastructure/AdminAPI/Location/locationAPI";
import { LocationData } from "@/infrastructure/AdminAPI/Location/types";

interface Props {
  accounts: AccountData[];
  statistics: AccountStatistics | null;
  loading: boolean;
  error: string | null;
  onCreateAccount: (accountData: AccountCreateRequest) => Promise<AccountData>;
  onUpdateAccount: (accountId: string, accountData: AccountUpdateRequest) => Promise<AccountData>;
  onBanAccount: (accountId: string) => Promise<void>;
  onUnbanAccount: (accountId: string) => Promise<void>;
  onDeleteAccount: (accountId: string) => Promise<void>;
  onRefreshData: () => Promise<void>;
}

interface EditModalProps {
  account: AccountData | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedAccount: AccountData) => void;
}

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newAccount: AccountCreateRequest) => void;
}

interface FilterState {
  role: 'ALL' | 'ADMIN' | 'CUSTOMER' | 'STAFF';
  status: 'ALL' | 'ACTIVE' | 'BANNED' | 'INACTIVE';
  createdDateFrom: string;
  createdDateTo: string;
}

function EditModal({ account, isOpen, onClose, onSave }: EditModalProps) {
  const [formData, setFormData] = useState<AccountData | null>(null);

  React.useEffect(() => {
    if (account) {
      setFormData({ ...account });
    }
  }, [account]);

  const handleSave = () => {
    if (formData) {
      onSave(formData);
      onClose();
    }
  };

  const handleInputChange = (field: keyof AccountData, value: string) => {
    if (formData) {
      setFormData({ ...formData, [field]: value });
    }
  };

  if (!isOpen || !account || !formData) return null;

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
        maxWidth: '500px',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937' }}>Chỉnh sửa tài khoản</h2>
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
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'medium', color: '#374151' }}>
              Tên đầy đủ
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '1rem'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'medium', color: '#374151' }}>
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '1rem'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'medium', color: '#374151' }}>
              Số điện thoại
            </label>
            <input
              type="text"
              value={formData.phoneNumber || ''}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '1rem'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'medium', color: '#374151' }}>
              Vai trò
            </label>
            <select
              value={formData.accountRole}
              onChange={(e) => handleInputChange('accountRole', e.target.value as 'ADMIN' | 'CUSTOMER' | 'STAFF')}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '1rem'
              }}
            >
              <option value="ADMIN">Admin</option>
              <option value="STAFF">Staff</option>
              <option value="CUSTOMER">Customer</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'medium', color: '#374151' }}>
              Trạng thái
            </label>
            <select
              value={formData.status}
              onChange={(e) => handleInputChange('status', e.target.value as 'ACTIVE' | 'BANNED' | 'INACTIVE')}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '1rem'
              }}
            >
              <option value="ACTIVE">Hoạt động</option>
              <option value="BANNED">Bị khóa</option>
              <option value="INACTIVE">Không hoạt động</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'medium', color: '#374151' }}>
              Loại người dùng
            </label>
            <select
              value={formData.userType || 'PERSONAL'}
              onChange={(e) => handleInputChange('userType', e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '1rem'
              }}
            >
              <option value="PERSONAL">Cá nhân</option>
              <option value="BUSINESS">Doanh nghiệp</option>
            </select>
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

function AddModal({ isOpen, onClose, onSave }: AddModalProps) {
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    phoneNumber: '',
    role: 'CUSTOMER' as 'ADMIN' | 'CUSTOMER' | 'STAFF',
    status: 'ACTIVE' as 'ACTIVE' | 'BANNED' | 'INACTIVE',
    userType: 'PERSONAL' as 'PERSONAL' | 'BUSINESS',
    locationId: ''
  });

  const [locations, setLocations] = useState<LocationData[]>([]);
  const [locationsLoading, setLocationsLoading] = useState(false);

  // Fetch locations when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchLocations();
    }
  }, [isOpen]);

  const fetchLocations = async () => {
    try {
      setLocationsLoading(true);
      const locationsData = await LocationAPI.getAllLocations();
      setLocations(locationsData);
    } catch (error) {
      console.error('Error fetching locations:', error);
      // Set default locations if API fails
      setLocations([
        {
          id: 'a329d001-67c0-44bb-a4d2-5ae072515a4f',
          locationName: 'Phim Trường Xanh',
          address: 'Ngõ 120 Trường Chinh, Quận Đống Đa, Hà Nội',
          contactNumber: '02437830002',
          longitude: '105.8237',
          latitude: '21.0080',
          isDeleted: false
        },
        {
          id: 'eb12e949-3626-4cbc-9d30-506e0f4d9233',
          locationName: 'Studio B',
          address: '123 Hồ Hoàn Kiếm, Hà Nội',
          contactNumber: '090200000000',
          longitude: '105.8500',
          latitude: '21.0300',
          isDeleted: false
        }
      ]);
    } finally {
      setLocationsLoading(false);
    }
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
    // Reset form
    setFormData({
      email: '',
      fullName: '',
      phoneNumber: '',
      role: 'CUSTOMER',
      status: 'ACTIVE',
      userType: 'PERSONAL',
      locationId: ''
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

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
        maxWidth: '500px',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937' }}>Thêm tài khoản mới</h2>
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
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'medium', color: '#374151' }}>
              Email *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '1rem'
              }}
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'medium', color: '#374151' }}>
              Tên đầy đủ *
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '1rem'
              }}
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'medium', color: '#374151' }}>
              Số điện thoại *
            </label>
            <input
              type="text"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '1rem'
              }}
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'medium', color: '#374151' }}>
              Vai trò *
            </label>
            <select
              value={formData.role}
              onChange={(e) => handleInputChange('role', e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '1rem'
              }}
            >
              <option value="ADMIN">Admin</option>
              <option value="STAFF">Staff</option>
              <option value="CUSTOMER">Customer</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'medium', color: '#374151' }}>
              Trạng thái *
            </label>
            <select
              value={formData.status}
              onChange={(e) => handleInputChange('status', e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '1rem'
              }}
            >
              <option value="ACTIVE">Hoạt động</option>
              <option value="BANNED">Bị khóa</option>
              <option value="INACTIVE">Không hoạt động</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'medium', color: '#374151' }}>
              Loại người dùng *
            </label>
            <select
              value={formData.userType}
              onChange={(e) => handleInputChange('userType', e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '1rem'
              }}
            >
              <option value="PERSONAL">Cá nhân</option>
              <option value="BUSINESS">Doanh nghiệp</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'medium', color: '#374151' }}>
              Địa điểm *
            </label>
            <select
              value={formData.locationId}
              onChange={(e) => handleInputChange('locationId', e.target.value)}
              disabled={locationsLoading}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '1rem',
                backgroundColor: locationsLoading ? '#f9fafb' : 'white',
                opacity: locationsLoading ? 0.6 : 1
              }}
              required
            >
              <option value="">
                {locationsLoading ? 'Đang tải địa điểm...' : 'Chọn địa điểm'}
              </option>
              {locations.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.locationName} - {location.address}
                </option>
              ))}
            </select>
            {locationsLoading && (
              <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
                Đang tải danh sách địa điểm...
              </div>
            )}
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
            disabled={!formData.email || !formData.fullName || !formData.phoneNumber || !formData.locationId}
            style={{
              padding: '0.75rem 1.5rem',
              border: 'none',
              borderRadius: '6px',
              backgroundColor: '#3b82f6',
              color: 'white',
              cursor: 'pointer',
              fontSize: '1rem',
              opacity: (!formData.email || !formData.fullName || !formData.phoneNumber || !formData.locationId) ? 0.5 : 1
            }}
          >
            Tạo tài khoản
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AccountManagement({ 
  accounts, 
  statistics, 
  loading, 
  error, 
  onCreateAccount, 
  onUpdateAccount, 
  onBanAccount, 
  onUnbanAccount, 
  onDeleteAccount, 
  onRefreshData 
}: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingAccount, setEditingAccount] = useState<AccountData | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    role: 'ALL',
    status: 'ALL',
    createdDateFrom: '',
    createdDateTo: ''
  });

  // Filter and search accounts
  const filteredAccounts = useMemo(() => {
    return accounts.filter(account => {
      // Search filter
      const matchesSearch = searchTerm === '' || 
        account.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Role filter
      const matchesRole = filters.role === 'ALL' || account.accountRole === filters.role;
      
      // Status filter
      const matchesStatus = filters.status === 'ALL' || account.status === filters.status;
      
      // Date filter
      let matchesDate = true;
      if (filters.createdDateFrom) {
        matchesDate = matchesDate && new Date(account.createdDate) >= new Date(filters.createdDateFrom);
      }
      if (filters.createdDateTo) {
        matchesDate = matchesDate && new Date(account.createdDate) <= new Date(filters.createdDateTo);
      }
      
      return matchesSearch && matchesRole && matchesStatus && matchesDate;
    });
  }, [accounts, searchTerm, filters]);


  const handleSaveAccount = async (updatedAccount: AccountData) => {
    try {
      await onUpdateAccount(updatedAccount.id, {
        fullName: updatedAccount.fullName,
        phoneNumber: updatedAccount.phoneNumber || '',
        role: updatedAccount.accountRole,
        status: updatedAccount.status,
        userType: updatedAccount.userType || 'PERSONAL'
      });
      // onUpdateAccount already calls handleRefreshData, no need to call again
    } catch (error) {
      console.error('Error updating account:', error);
      // Show user-friendly error message
      const errorMessage = error instanceof Error ? error.message : 'Không thể cập nhật tài khoản';
      alert(`❌ ${errorMessage}`);
    }
  };

  const handleAddAccount = async (newAccountData: AccountCreateRequest) => {
    try {
      await onCreateAccount(newAccountData);
      // onCreateAccount already calls handleRefreshData, no need to call again
    } catch (error) {
      console.error('Error creating account:', error);
      // Show user-friendly error message
      const errorMessage = error instanceof Error ? error.message : 'Không thể tạo tài khoản mới';
      alert(errorMessage);
    }
  };

  const handleBanClick = async (accountId: string) => {
    try {
      await onBanAccount(accountId);
      // onBanAccount already calls handleRefreshData, no need to call again
    } catch (error) {
      console.error('Error banning account:', error);
      // Show user-friendly error message
      const errorMessage = error instanceof Error ? error.message : 'Không thể khóa tài khoản';
      alert(`❌ ${errorMessage}`);
    }
  };

  const handleUnbanClick = async (accountId: string) => {
    try {
      await onUnbanAccount(accountId);
      // onUnbanAccount already calls handleRefreshData, no need to call again
    } catch (error) {
      console.error('Error unbanning account:', error);
      // Show user-friendly error message
      const errorMessage = error instanceof Error ? error.message : 'Không thể mở khóa tài khoản';
      alert(`❌ ${errorMessage}`);
    }
  };

  const handleDeleteClick = async (accountId: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tài khoản này?')) {
      try {
        await onDeleteAccount(accountId);
        // onDeleteAccount already calls handleRefreshData, no need to call again
      } catch (error) {
        console.error('Error deleting account:', error);
        // Show user-friendly error message
        const errorMessage = error instanceof Error ? error.message : 'Không thể xóa tài khoản';
        alert(`❌ ${errorMessage}`);
      }
    }
  };

  const handleFilterChange = (filterType: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const getRoleDisplay = (role: string) => {
    switch (role) {
      case 'ADMIN': return 'Admin';
      case 'STAFF': return 'Staff';
      case 'CUSTOMER': return 'Customer';
      default: return role;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ADMIN': return 'bg-purple-100 text-purple-800';
      case 'STAFF': return 'bg-blue-100 text-blue-800';
      case 'CUSTOMER': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'Hoạt động';
      case 'BANNED': return 'Bị khóa';
      case 'INACTIVE': return 'Không hoạt động';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-100 text-green-800';
      case 'BANNED': return 'bg-red-100 text-red-800';
      case 'INACTIVE': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
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
                Bookings Management
              </Link>
            </li>
            <li className="active">
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
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 rounded-2xl mb-8 shadow-xl">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Account Management</h1>
              <p className="text-blue-100 text-lg">Quản lý tài khoản người dùng và phân quyền</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={onRefreshData}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-medium flex items-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl"
                disabled={loading}
              >
                <svg className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Làm mới</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Search and Filters Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="flex items-center mb-6">
            <div className="bg-blue-100 p-2 rounded-lg mr-3">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Tìm kiếm và Lọc</h2>
          </div>
          
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            <input
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all duration-200 text-lg"
                placeholder="Tìm kiếm theo tên hoặc email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
            
            {/* Filter Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vai trò</label>
                <select
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all duration-200"
                  value={filters.role}
                  onChange={(e) => handleFilterChange('role', e.target.value)}
                >
                  <option value="ALL">Tất cả vai trò</option>
                  <option value="ADMIN">Admin</option>
                  <option value="STAFF">Staff</option>
                  <option value="CUSTOMER">Customer</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Trạng thái</label>
                <select
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all duration-200"
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                >
                  <option value="ALL">Tất cả trạng thái</option>
                  <option value="ACTIVE">Hoạt động</option>
                  <option value="BANNED">Bị khóa</option>
                  <option value="INACTIVE">Không hoạt động</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Từ ngày</label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all duration-200"
                  value={filters.createdDateFrom}
                  onChange={(e) => handleFilterChange('createdDateFrom', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Đến ngày</label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all duration-200"
                  value={filters.createdDateTo}
                  onChange={(e) => handleFilterChange('createdDateTo', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Account Content with Tailwind CSS */}
        <div className="account-tailwind-container">
          {/* Loading State */}
          {loading && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 mb-8">
              <div className="flex flex-col items-center justify-center">
                <div className="relative">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                </div>
                <h3 className="mt-6 text-lg font-semibold text-gray-800">Đang tải dữ liệu...</h3>
                <p className="mt-2 text-gray-600">Vui lòng chờ trong giây lát</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-2xl p-6 mb-8 shadow-lg">
              <div className="flex items-center">
                <div className="bg-red-100 p-3 rounded-full mr-4">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-red-800">Có lỗi xảy ra</h3>
                  <p className="text-red-700 mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Statistics Cards */}
          {statistics && !loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-lg border border-blue-200 p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600 mb-1">Tổng tài khoản</p>
                    <p className="text-3xl font-bold text-blue-800">{statistics.totalAccounts}</p>
                    <p className="text-xs text-blue-500 mt-1">Tất cả người dùng</p>
                  </div>
                  <div className="bg-blue-500 p-4 rounded-xl">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl shadow-lg border border-purple-200 p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-600 mb-1">Admin</p>
                    <p className="text-3xl font-bold text-purple-800">{statistics.accountsByRole.ADMIN}</p>
                    <p className="text-xs text-purple-500 mt-1">Quản trị viên</p>
                  </div>
                  <div className="bg-purple-500 p-4 rounded-xl">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl shadow-lg border border-indigo-200 p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-indigo-600 mb-1">Staff</p>
                    <p className="text-3xl font-bold text-indigo-800">{statistics.accountsByRole.STAFF}</p>
                    <p className="text-xs text-indigo-500 mt-1">Nhân viên</p>
                  </div>
                  <div className="bg-indigo-500 p-4 rounded-xl">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-lg border border-green-200 p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600 mb-1">Customer</p>
                    <p className="text-3xl font-bold text-green-800">{statistics.accountsByRole.CUSTOMER}</p>
                    <p className="text-xs text-green-500 mt-1">Khách hàng</p>
                  </div>
                  <div className="bg-green-500 p-4 rounded-xl">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Bar */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Danh sách tài khoản</h2>
                <div className="flex items-center space-x-4">
                  <p className="text-gray-600">
                    Hiển thị <span className="font-semibold text-blue-600">{filteredAccounts.length}</span> tài khoản
                  </p>
                  {searchTerm && (
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      Tìm kiếm: &quot;{searchTerm}&quot;
                    </span>
                  )}
                </div>
              </div>
              <button 
                onClick={() => setIsAddModalOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-semibold flex items-center space-x-3 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14"/>
              </svg>
                <span>Thêm tài khoản</span>
            </button>
            </div>
          </div>

          {/* Accounts Table */}
          {!loading && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Tên</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Số điện thoại</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Vai trò</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Trạng thái</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Ngày tạo</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Thao tác</th>
                  </tr>
                </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {filteredAccounts.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="px-6 py-16 text-center">
                          <div className="flex flex-col items-center">
                            <div className="bg-gray-100 p-6 rounded-full mb-4">
                              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                              </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-600 mb-2">Chức năng quản lý tài khoản</h3>
                            <p className="text-gray-500 mb-6">API quản lý tài khoản hiện chưa khả dụng. Vui lòng liên hệ team backend để được hỗ trợ.</p>
                            <button 
                              onClick={() => setIsAddModalOpen(true)}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                            >
                              Thêm tài khoản đầu tiên
                            </button>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredAccounts.map((account, index) => (
                        <tr key={account.id} className={`hover:bg-gray-50 transition-all duration-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded-full">
                        {account.id}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="bg-gray-100 p-2 rounded-full mr-3">
                                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                              </div>
                              <div>
                                <div className="text-sm font-semibold text-gray-900">{account.fullName}</div>
                                <div className="text-xs text-gray-500">{account.userType || 'PERSONAL'}</div>
                              </div>
                            </div>
                      </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{account.email}</div>
                      </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-600">
                              {account.phoneNumber ? (
                                <span className="flex items-center">
                                  <svg className="w-4 h-4 text-gray-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                  </svg>
                                  {account.phoneNumber}
                                </span>
                              ) : (
                                <span className="text-gray-400 italic">Chưa cập nhật</span>
                              )}
                            </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getRoleColor(account.accountRole)}`}>
                              <div className={`w-2 h-2 rounded-full mr-2 ${
                                account.accountRole === 'ADMIN' ? 'bg-purple-500' : 
                                account.accountRole === 'STAFF' ? 'bg-blue-500' : 'bg-green-500'
                          }`}></div>
                              {getRoleDisplay(account.accountRole)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(account.status)}`}>
                              <div className={`w-2 h-2 rounded-full mr-2 ${
                                account.status === 'ACTIVE' ? 'bg-green-500' : 
                                account.status === 'BANNED' ? 'bg-red-500' : 'bg-gray-500'
                          }`}></div>
                              {getStatusDisplay(account.status)}
                        </span>
                      </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-600">
                              <div>{formatDate(account.createdDate)}</div>
                              <div className="text-xs text-gray-400">
                                {new Date(account.createdDate).toLocaleTimeString('vi-VN', { 
                                  hour: '2-digit', 
                                  minute: '2-digit' 
                                })}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                              {account.status === 'BANNED' ? (
                                <button
                                  className="bg-green-50 hover:bg-green-100 text-green-600 p-2 rounded-lg transition-all duration-200 hover:scale-105"
                                  onClick={() => handleUnbanClick(account.id)}
                                  title="Mở khóa"
                                >
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                                    <circle cx="12" cy="16" r="1"/>
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                                  </svg>
                                </button>
                              ) : (
                                <button
                                  className="bg-orange-50 hover:bg-orange-100 text-orange-600 p-2 rounded-lg transition-all duration-200 hover:scale-105"
                                  onClick={() => handleBanClick(account.id)}
                                  title="Khóa tài khoản"
                                >
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                                    <circle cx="12" cy="16" r="1"/>
                                    <path d="M7 11V7a5 5 0 0 1 9.9-1"/>
                                  </svg>
                                </button>
                              )}
                              
                          <button
                                className="bg-red-50 hover:bg-red-100 text-red-600 p-2 rounded-lg transition-all duration-200 hover:scale-105"
                                onClick={() => handleDeleteClick(account.id)}
                                title="Xóa tài khoản"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                                  <circle cx="12" cy="16" r="1"/>
                                  <path d="M7 11V7a5 5 0 0 1 9.9-1"/>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                      ))
                    )}
                </tbody>
              </table>
            </div>
          </div>
          )}
        </div>
      </section>

      {/* Edit Modal */}
      <EditModal
        account={editingAccount}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingAccount(null);
        }}
        onSave={handleSaveAccount}
      />

      {/* Add Modal */}
      <AddModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddAccount}
      />
    </div>
  );
}
