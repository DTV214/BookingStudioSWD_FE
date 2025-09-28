// src/app/admin/notifications/notifications.tsx
import React from "react";
import NotificationsForm from "@/components/AdminPage/NotificationsForm";

interface NotificationData {
  name: string;
  status: string;
  location: string;
}

const Notifications: NotificationData[] = [
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
  return <NotificationsForm notifications={Notifications} />;
}
