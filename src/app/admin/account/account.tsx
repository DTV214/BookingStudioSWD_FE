"use client";

import React from "react";
// Import AccountManagement component
import AccountManagement from "@/components/AdminPage/AccountManagement";

interface Account {
  id: string;
  name: string;
  email: string;
  role: 'staff' | 'employee' | 'customer';
  status: 'active' | 'inactive';
  phone?: string;
  createdAt: string;
}

const AccountData: Account[] = [
  {
    id: "01",
    name: "Trần Thiện Nam",
    email: "trantiennam@gmail.com",
    role: "staff",
    status: "active",
    phone: "0123-456-789",
    createdAt: "2024-01-01"
  },
  {
    id: "02", 
    name: "Lê Bảo Bình",
    email: "lebaobinh@gmail.com",
    role: "employee",
    status: "active",
    phone: "0987-654-321",
    createdAt: "2024-01-02"
  },
  {
    id: "03",
    name: "Nguyễn Thị An",
    email: "nguyenthian@gmail.com", 
    role: "customer",
    status: "active",
    phone: "0456-789-123",
    createdAt: "2024-01-03"
  },
  {
    id: "04",
    name: "Phạm Văn Cường",
    email: "phamvancuong@gmail.com",
    role: "staff",
    status: "inactive",
    phone: "0789-123-456",
    createdAt: "2024-01-04"
  },
  {
    id: "05",
    name: "Hoàng Thị Dung",
    email: "hoangthidung@gmail.com",
    role: "employee", 
    status: "active",
    phone: "0321-654-987",
    createdAt: "2024-01-05"
  },
  {
    id: "06",
    name: "Võ Minh Đức",
    email: "vominhduc@gmail.com",
    role: "customer",
    status: "active",
    phone: "0654-321-789",
    createdAt: "2024-01-06"
  },
  {
    id: "07",
    name: "Đặng Thị Em",
    email: "dangthiem@gmail.com",
    role: "employee",
    status: "inactive",
    phone: "0987-123-456",
    createdAt: "2024-01-07"
  },
  {
    id: "08",
    name: "Bùi Văn Phúc",
    email: "buivanphuc@gmail.com",
    role: "customer",
    status: "active",
    phone: "0123-987-654",
    createdAt: "2024-01-08"
  },
  {
    id: "09",
    name: "Lý Thị Giang",
    email: "lythigiang@gmail.com",
    role: "staff",
    status: "active",
    phone: "0456-123-789",
    createdAt: "2024-01-09"
  }
];

export default function AccountContainer() {
  return <AccountManagement accounts={AccountData} />;
}
