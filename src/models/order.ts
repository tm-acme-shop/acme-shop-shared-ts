export type OrderStatusV1 = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderV1 {
  id: string;
  user_id: string;
  status: OrderStatusV1;
  items: OrderItemV1[];
  total: number;
  currency: string;
  shipping_address: string;
  created_at: string;
}

export interface OrderItemV1 {
  product_id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export interface Order {
  id: string;
  userId: string;
  status: OrderStatus;
  items: OrderItem[];
  shippingAddress: Address;
  billingAddress: Address;
  subtotal: Money;
  tax: Money;
  shippingCost: Money;
  total: Money;
  paymentId?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  shippedAt?: string;
  deliveredAt?: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: Money;
  total: Money;
}

export interface Address {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Money {
  amount: number;
  currency: string;
}

export interface CreateOrderRequest {
  userId: string;
  items: Omit<OrderItem, 'id'>[];
  shippingAddress: Address;
  billingAddress: Address;
  notes?: string;
}

export function toFloat(money: Money): number {
  return money.amount / 100;
}

export function fromFloat(amount: number, currency: string): Money {
  return {
    amount: Math.round(amount * 100),
    currency,
  };
}

export function formatMoney(money: Money): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: money.currency,
  });
  return formatter.format(toFloat(money));
}
