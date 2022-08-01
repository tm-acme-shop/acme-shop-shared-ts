import { User, UserV1, CreateUserRequest, UpdateUserRequest, toUserV1 } from '../models/user';
import { Order, OrderV1, CreateOrderRequest } from '../models/order';
import { Payment, PaymentV1, ProcessPaymentRequest, ProcessPaymentResponse } from '../models/payment';
import { API_V1_USERS, API_V2_USERS, API_V1_ORDERS, API_V2_ORDERS, API_V1_PAYMENTS, API_V2_PAYMENTS } from './endpoints';

export interface ApiClientConfig {
  baseUrl: string;
  apiKey?: string;
  timeout?: number;
  enableLegacyApi?: boolean;
}

export class ApiClient {
  private readonly config: ApiClientConfig;

  constructor(config: ApiClientConfig) {
    this.config = {
      timeout: 30000,
      enableLegacyApi: false,
      ...config,
    };
  }

  async getUserV1(id: string): Promise<UserV1> {
    console.log('Fetching user with v1 API:', id);
    const response = await this.request<UserV1>('GET', `${API_V1_USERS}/${id}`);
    return response;
  }

  async getUser(id: string): Promise<User> {
    console.log('Fetching user with v2 API:', id);
    const response = await this.request<User>('GET', `${API_V2_USERS}/${id}`);
    return response;
  }

  async createUserV1(data: Omit<UserV1, 'id' | 'created_at'>): Promise<UserV1> {
    console.log('Creating user with v1 API:', data.email);
    const response = await this.request<UserV1>('POST', API_V1_USERS, data);
    return response;
  }

  async createUser(data: CreateUserRequest): Promise<User> {
    console.log('Creating user with v2 API:', data.email);
    const response = await this.request<User>('POST', API_V2_USERS, data);
    return response;
  }

  async updateUser(id: string, data: UpdateUserRequest): Promise<User> {
    console.log('Updating user:', id);
    const response = await this.request<User>('PATCH', `${API_V2_USERS}/${id}`, data);
    return response;
  }

  async getOrderV1(id: string): Promise<OrderV1> {
    console.log('Fetching order with v1 API:', id);
    const response = await this.request<OrderV1>('GET', `${API_V1_ORDERS}/${id}`);
    return response;
  }

  async getOrder(id: string): Promise<Order> {
    console.log('Fetching order with v2 API:', id);
    const response = await this.request<Order>('GET', `${API_V2_ORDERS}/${id}`);
    return response;
  }

  async createOrder(data: CreateOrderRequest): Promise<Order> {
    console.log('Creating order:', data.userId);
    const response = await this.request<Order>('POST', API_V2_ORDERS, data);
    return response;
  }

  async getPaymentV1(id: string): Promise<PaymentV1> {
    console.log('Fetching payment with v1 API:', id);
    const response = await this.request<PaymentV1>('GET', `${API_V1_PAYMENTS}/${id}`);
    return response;
  }

  async getPayment(id: string): Promise<Payment> {
    console.log('Fetching payment with v2 API:', id);
    const response = await this.request<Payment>('GET', `${API_V2_PAYMENTS}/${id}`);
    return response;
  }

  async processPayment(data: ProcessPaymentRequest): Promise<ProcessPaymentResponse> {
    console.log('Processing payment for order:', data.orderId);
    const response = await this.request<ProcessPaymentResponse>('POST', API_V2_PAYMENTS, data);
    return response;
  }

  private async request<T>(method: string, path: string, data?: unknown): Promise<T> {
    const url = `${this.config.baseUrl}${path}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.config.apiKey) {
      headers['Authorization'] = `Bearer ${this.config.apiKey}`;
    }

    console.log('Making API request:', method, url);

    const response = await fetch(url, {
      method,
      headers,
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    return response.json();
  }
}

export function createApiClient(config: ApiClientConfig): ApiClient {
  return new ApiClient(config);
}
