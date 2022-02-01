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
