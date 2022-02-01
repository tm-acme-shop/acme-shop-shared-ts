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
