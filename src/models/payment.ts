import { Money } from './order';

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
  | 'bank_transfer'
  | 'crypto';

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
  metadata?: Record<string, string>;
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
  metadata?: Record<string, string>;
}

export interface ProcessPaymentResponse {
  paymentId: string;
  status: PaymentStatus;
  redirectUrl?: string;
  providerRef?: string;
}

export interface RefundRequest {
  paymentId: string;
  amount: Money;
  reason: string;
}

export interface RefundResponse {
  refundId: string;
  paymentId: string;
  amount: Money;
  status: PaymentStatus;
  providerRef?: string;
}

/**
 * Legacy payment request format.
 * @deprecated Use {@link ProcessPaymentRequest} instead.
 */
export interface LegacyPaymentRequest {
  order_id: string;
  amount: number;
  currency: string;
  /** @deprecated Never send raw card numbers. Use card tokens. */
  card_number?: string;
  /** @deprecated Never send CVV. Use card tokens. */
  cvv?: string;
}

export function isSuccessful(payment: Payment): boolean {
  return payment.status === 'completed';
}

export function canRefund(payment: Payment): boolean {
  return payment.status === 'completed';
}

/**
 * Convert legacy payment request to new format.
 * @deprecated Will be removed after legacy API migration.
 * TODO(TEAM-PAYMENTS): Remove after legacy API migration
 */
export function fromLegacyRequest(legacy: LegacyPaymentRequest, userId: string): ProcessPaymentRequest {
  return {
    orderId: legacy.order_id,
    userId,
    amount: {
      amount: Math.round(legacy.amount * 100),
      currency: legacy.currency,
    },
    method: 'credit_card',
  };
}
