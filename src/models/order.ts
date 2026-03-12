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
  subtotal: Money;
  tax: Money;
  total: Money;
  notes?: string;
}

export interface UpdateOrderStatusRequest {
  status: OrderStatus;
  notes?: string;
}

export interface OrderListFilter {
  userId?: string;
  status?: OrderStatus;
  startDate?: string;
  endDate?: string;
  limit: number;
  offset: number;
}

export interface OrderListResponse {
  orders: Order[];
  total: number;
  limit: number;
  offset: number;
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

export function canCancel(order: Order): boolean {
  return order.status === 'pending' || order.status === 'confirmed';
}

export function canRefund(order: Order): boolean {
  return order.status === 'delivered' && !!order.paymentId;
}

export function calculateTotal(items: OrderItem[], tax: Money, shippingCost: Money): Money {
  const subtotal = items.reduce((sum, item) => sum + item.total.amount, 0);
  return {
    amount: subtotal + tax.amount + shippingCost.amount,
    currency: items[0]?.unitPrice.currency || 'USD',
  };
}
