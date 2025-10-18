// src/domain/models/notification.ts

export interface NotificationData {
  id: string;
  title: string;
  content: string;
  type: 'user_registration' | 'booking_new' | 'booking_cancelled' | 'studio_suspended' | 'studio_active';
  timestamp: string;
  isRead: boolean;
}

export type NotificationType = NotificationData['type'];
