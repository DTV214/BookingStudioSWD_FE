// src/app/admin/location/location.tsx
"use client";

import React from "react";
// Import LocationManagement component
import LocationManagement from "@/components/AdminPage/LocationManagement";

interface Location {
  id: string;
  name: string;
  address: string;
  status: 'active' | 'inactive';
  latitude: number;
  longitude: number;
  createdAt: string;
  updatedAt: string;
}

const LocationData: Location[] = [
  {
    id: "LOC001",
    name: "Hồ Chí Minh",
    address: "123 Nguyễn Huệ, Quận 1, TP.HCM",
    status: "active",
    latitude: 10.7769,
    longitude: 106.7009,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T10:30:00Z"
  },
  {
    id: "LOC002", 
    name: "Đà Nẵng",
    address: "456 Lê Duẩn, Hải Châu, Đà Nẵng",
    status: "active",
    latitude: 16.0544,
    longitude: 108.2022,
    createdAt: "2024-01-02T00:00:00Z",
    updatedAt: "2024-01-16T10:30:00Z"
  },
  {
    id: "LOC003",
    name: "Hà Nội", 
    address: "789 Hoàng Hoa Thám, Ba Đình, Hà Nội",
    status: "active",
    latitude: 21.0285,
    longitude: 105.8542,
    createdAt: "2024-01-03T00:00:00Z",
    updatedAt: "2024-01-17T10:30:00Z"
  },
  {
    id: "LOC004",
    name: "Cần Thơ",
    address: "321 Nguyễn Văn Cừ, Ninh Kiều, Cần Thơ", 
    status: "inactive",
    latitude: 10.0452,
    longitude: 105.7469,
    createdAt: "2024-01-04T00:00:00Z",
    updatedAt: "2024-01-18T10:30:00Z"
  },
  {
    id: "LOC005",
    name: "Hải Phòng",
    address: "654 Lê Lợi, Ngô Quyền, Hải Phòng",
    status: "active", 
    latitude: 20.8449,
    longitude: 106.6881,
    createdAt: "2024-01-05T00:00:00Z",
    updatedAt: "2024-01-19T10:30:00Z"
  }
];

export default function LocationContainer() {
  return <LocationManagement locations={LocationData} />;
}
