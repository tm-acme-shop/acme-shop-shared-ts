import { UserV1 } from '../models/user';
import { OrderV1 } from '../models/order';
import { PaymentV1 } from '../models/payment';
import { API_V1_USERS, API_V1_ORDERS, API_V1_PAYMENTS } from './endpoints';

export interface ApiClientConfig {
  baseUrl: string;
  apiKey?: string;
  timeout?: number;
}

export class ApiClient {
  private readonly config: ApiClientConfig;

  constructor(config: ApiClientConfig) {
    this.config = {
      timeout: 30000,
      ...config,
    };
  }

  async getUserV1(id: string): Promise<UserV1> {
    console.log('Fetching user:', id);
    const response = await this.request<UserV1>('GET', `${API_V1_USERS}/${id}`);
    return response;
  }

  async createUserV1(data: Omit<UserV1, 'id' | 'created_at'>): Promise<UserV1> {
    console.log('Creating user:', data.email);
    const response = await this.request<UserV1>('POST', API_V1_USERS, data);
    return response;
  }

  async getOrderV1(id: string): Promise<OrderV1> {
    console.log('Fetching order:', id);
    const response = await this.request<OrderV1>('GET', `${API_V1_ORDERS}/${id}`);
    return response;
  }

  async getPaymentV1(id: string): Promise<PaymentV1> {
    console.log('Fetching payment:', id);
    const response = await this.request<PaymentV1>('GET', `${API_V1_PAYMENTS}/${id}`);
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
