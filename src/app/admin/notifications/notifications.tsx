// src/app/admin/notifications/notifications.tsx
import React from "react";
import NotificationsForm from "@/components/AdminPage/NotificationsForm";
import { NotificationData } from "@/domain/models/notification";

const Notifications: NotificationData[] = [
  {
    id: "1",
    title: "Người dùng mới đăng ký",
    content: "Người dùng Nguyễn Văn A đã đăng ký tài khoản mới với email nguyenvana@example.com",
    type: "user_registration",
    timestamp: "2024-01-15T10:30:00Z",
    isRead: false,
  },
  {
    id: "2",
    title: "Đơn đặt lịch mới",
    content: "Có đơn đặt lịch mới tại Studio A - Phòng 101 vào lúc 14:00 ngày 16/01/2024 từ khách hàng Trần Thị B",
    type: "booking_new",
    timestamp: "2024-01-15T09:15:00Z",
    isRead: false,
  },
  {
    id: "3",
    title: "Đơn đặt lịch bị hủy",
    content: "Đơn đặt lịch tại Studio B - Phòng 202 vào lúc 16:00 ngày 15/01/2024 đã bị hủy bởi khách hàng Lê Văn C",
    type: "booking_cancelled",
    timestamp: "2024-01-15T08:45:00Z",
    isRead: true,
  },
  {
    id: "4",
    title: "Studio tạm ngưng hoạt động",
    content: "Studio C đã được đánh dấu tạm ngưng hoạt động do bảo trì hệ thống. Thời gian dự kiến hoạt động trở lại: 18/01/2024",
    type: "studio_suspended",
    timestamp: "2024-01-15T07:20:00Z",
    isRead: false,
  },
  {
    id: "5",
    title: "Studio hoạt động trở lại",
    content: "Studio D đã hoạt động trở lại sau thời gian bảo trì. Tất cả các dịch vụ đã sẵn sàng phục vụ khách hàng",
    type: "studio_active",
    timestamp: "2024-01-14T20:30:00Z",
    isRead: true,
  },
];

export default function NotificationsContainer() {
  return <NotificationsForm notifications={Notifications} />;
}
