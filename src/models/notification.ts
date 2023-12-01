export type NotificationType = 'email' | 'sms' | 'push' | 'slack';

export type NotificationStatus =
  | 'pending'
  | 'sent'
  | 'delivered'
  | 'failed'
  | 'bounced';

export type NotificationPriority = 'low' | 'normal' | 'high' | 'critical';

export interface Notification {
  id: string;
  type: NotificationType;
  status: NotificationStatus;
  priority: NotificationPriority;
  recipient: string;
  subject?: string;
  body: string;
  templateId?: string;
  templateData?: Record<string, unknown>;
  metadata?: Record<string, string>;
  retryCount: number;
  maxRetries: number;
  errorMessage?: string;
  createdAt: string;
  sentAt?: string;
  deliveredAt?: string;
}

export interface SendNotificationRequest {
  type: NotificationType;
  priority: NotificationPriority;
  recipient: string;
  subject?: string;
  body?: string;
  templateId?: string;
  templateData?: Record<string, unknown>;
  metadata?: Record<string, string>;
}

export interface SendBatchRequest {
  notifications: SendNotificationRequest[];
}

export interface NotificationResult {
  notificationId: string;
  status: NotificationStatus;
  errorMessage?: string;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  htmlBody: string;
  textBody: string;
  variables: string[];
}

export function canRetry(notification: Notification): boolean {
  return notification.status === 'failed' && notification.retryCount < notification.maxRetries;
}

export function getDefaultPriority(type: NotificationType): NotificationPriority {
  switch (type) {
    case 'sms':
    case 'push':
      return 'high';
    case 'slack':
      return 'normal';
    case 'email':
    default:
      return 'normal';
  }
}
