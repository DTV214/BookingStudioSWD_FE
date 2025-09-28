// src/app/admin/studios/studios.tsx
import React from "react";
import StudiosForm from "@/components/AdminPage/StudiosForm";

/**
 * Container component (server):
 * - Ở production bạn sẽ here fetch() từ API / DB
 * - Ở demo: trả về data mẫu
 */
type Studio = {
  name: string;
  status: "Occupied" | "Vacant" | "Needs Cleaning" | "Occupied Soon" | "Free";
  location: string;
};

export default async function StudiosContainer() {
  // Demo dữ liệu (thay bằng fetch thật khi cần)
  const studios: Studio[] = [
    { name: "Studio A", status: "Needs Cleaning", location: "Room 101" },
    { name: "Studio B", status: "Occupied", location: "Room 102" },
    { name: "Studio C", status: "Occupied", location: "Room 103" },
    { name: "Studio D", status: "Free", location: "Room 104" },
  ];

  return <StudiosForm studios={studios} />;
}
