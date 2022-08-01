import { Money } from './order';

export type PaymentStatusV1 = 'pending' | 'completed' | 'failed' | 'refunded';

export interface PaymentV1 {
  id: string;
  order_id: string;
  amount: number;
  currency: string;
  status: PaymentStatusV1;
  card_last_four?: string;
  created_at: string;
}

export type PaymentStatus =
  | 'pending'
  | 'completed'
  | 'failed'
  | 'refunded'
  | 'cancelled';

export type PaymentMethod =
  | 'credit_card'
  | 'debit_card'
  | 'paypal'
  | 'bank_transfer';

export interface Payment {
  id: string;
  orderId: string;
  userId: string;
  amount: Money;
  method: PaymentMethod;
  status: PaymentStatus;
  providerId?: string;
  providerRef?: string;
  errorMessage?: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export interface ProcessPaymentRequest {
  orderId: string;
  userId: string;
  amount: Money;
  method: PaymentMethod;
  cardToken?: string;
  returnUrl?: string;
}

export interface ProcessPaymentResponse {
  paymentId: string;
  status: PaymentStatus;
  redirectUrl?: string;
  providerRef?: string;
}

export function isSuccessful(payment: Payment): boolean {
  return payment.status === 'completed';
}
