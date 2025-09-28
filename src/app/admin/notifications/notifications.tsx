// src/app/admin/notifications/notifications.tsx
import React from "react";
import NotificationsForm from "@/components/AdminPage/NotificationsForm";

// Mock data (thực tế sẽ fetch từ API)
const Notifications: Notification[] = [
  {
    name: "New booking",
    status: "Studio A at 10:00 AM",
    location: "2 hours ago",
  },
  {
    name: "Booking canceled",
    status: "Studio B at 1:00 PM",
    location: "3 hours ago",
  },
  { name: "New message from", status: "Customer", location: "4 hours ago" },
  { name: "Studio C needs cleaning", status: "-", location: "5 hours ago" },
];

export default function NotificationsContainer() {
  // Đây là nơi có thể xử lý fetch, filter, sort...
  const notifications = Notifications;

  return <NotificationsForm notifications={notifications} />;
}
