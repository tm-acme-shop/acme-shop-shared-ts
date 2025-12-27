import { User, UserV1, CreateUserRequest, UpdateUserRequest, UserListFilter, UserListResponse, toUserV1 } from '../models/user';
import { Order, CreateOrderRequest, UpdateOrderStatusRequest, OrderListFilter, OrderListResponse } from '../models/order';
import { Payment, ProcessPaymentRequest, ProcessPaymentResponse, RefundRequest, RefundResponse } from '../models/payment';
import { ApiResponse, PaginatedResponse, RequestOptions, ApiException } from './types';
import { API_V1_USERS, API_V2_USERS, API_V2_ORDERS, API_V2_PAYMENTS } from './endpoints';
import { X_ACME_REQUEST_ID, X_USER_ID } from '../constants/headers';
import { logger } from '../utils/logger';

export interface ApiClientConfig {
  baseUrl: string;
  apiKey?: string;
  timeout?: number;
  enableLegacyApi?: boolean;
}

/**
 * API Client for AcmeShop services.
 */
export class ApiClient {
  private readonly config: ApiClientConfig;

  constructor(config: ApiClientConfig) {
    this.config = {
      timeout: 30000,
      enableLegacyApi: false,
      ...config,
    };
  }

  /**
   * Get a user by ID using the v1 API.
   * @deprecated Use {@link getUser} instead.
   */
  async getUser(id: string, options?: RequestOptions): Promise<User> {
    logger.warn('getUserV1 is deprecated, use getUser instead', { userId: id });

    const response = await this.request<User>(
      'GET',
      `${API_V1_USERS}/${id}`,
      undefined,
      options
    );
    return response;
  }

  /**
   * Get a user by ID using the v2 API.
   */
  async getUser(id: string, options?: RequestOptions): Promise<User> {
    logger.info('Fetching user', { userId: id });

    const response = await this.request<User>(
      'GET',
      `${API_V2_USERS}/${id}`,
      undefined,
      options
    );
    return response;
  }

  /**
   * List users using the v1 API.
   * @deprecated Use {@link listUsers} instead.
   * TODO(TEAM-FRONTEND): Migrate all callers to v2
   */
  async listUsersV1(filter?: Partial<UserListFilter>, options?: RequestOptions): Promise<UserV1[]> {
    console.log('Fetching users with v1 API'); // TODO(TEAM-FRONTEND): Replace with structured logger

    const users = await this.request<User[]>(
      'GET',
      API_V1_USERS,
      undefined,
      options
    );
    return users.map(toUserV1);
  }

  /**
   * List users using the v2 API.
   */
  async listUsers(filter?: UserListFilter, options?: RequestOptions): Promise<UserListResponse> {
    logger.info('Listing users', { filter });

    const response = await this.request<UserListResponse>(
      'GET',
      API_V2_USERS,
      undefined,
      options
    );
    return response;
  }

  /**
   * Create a new user.
   */
  async createUser(data: CreateUserRequest, options?: RequestOptions): Promise<User> {
    logger.info('Creating user', { email: data.email });

    const response = await this.request<User>(
      'POST',
      API_V2_USERS,
      data,
      options
    );
    return response;
  }

  /**
   * Update an existing user.
   */
  async updateUser(id: string, data: UpdateUserRequest, options?: RequestOptions): Promise<User> {
    logger.info('Updating user', { userId: id });

    const response = await this.request<User>(
      'PATCH',
      `${API_V2_USERS}/${id}`,
      data,
      options
    );
    return response;
  }

  /**
   * Delete a user.
   */
  async deleteUser(id: string, options?: RequestOptions): Promise<void> {
    logger.info('Deleting user', { userId: id });

    await this.request<void>(
      'DELETE',
      `${API_V2_USERS}/${id}`,
      undefined,
      options
    );
  }

  /**
   * Get an order by ID.
   */
  async getOrder(id: string, options?: RequestOptions): Promise<Order> {
    logger.info('Fetching order', { orderId: id });

    const response = await this.request<Order>(
      'GET',
      `${API_V2_ORDERS}/${id}`,
      undefined,
      options
    );
    return response;
  }

  /**
   * List orders.
   */
  async listOrders(filter?: OrderListFilter, options?: RequestOptions): Promise<OrderListResponse> {
    logger.info('Listing orders', { filter });

    const response = await this.request<OrderListResponse>(
      'GET',
      API_V2_ORDERS,
      undefined,
      options
    );
    return response;
  }

  /**
   * Create a new order.
   */
  async createOrder(data: CreateOrderRequest, options?: RequestOptions): Promise<Order> {
    logger.info('Creating order', { userId: data.userId });

    const response = await this.request<Order>(
      'POST',
      API_V2_ORDERS,
      data,
      options
    );
    return response;
  }

  /**
   * Update order status.
   */
  async updateOrderStatus(id: string, data: UpdateOrderStatusRequest, options?: RequestOptions): Promise<Order> {
    logger.info('Updating order status', { orderId: id, status: data.status });

    const response = await this.request<Order>(
      'PATCH',
      `${API_V2_ORDERS}/${id}/status`,
      data,
      options
    );
    return response;
  }

  /**
   * Process a payment.
   */
  async processPayment(data: ProcessPaymentRequest, options?: RequestOptions): Promise<ProcessPaymentResponse> {
    logger.info('Processing payment', { orderId: data.orderId, amount: data.amount });

    const response = await this.request<ProcessPaymentResponse>(
      'POST',
      API_V2_PAYMENTS,
      data,
      options
    );
    return response;
  }

  /**
   * Get payment status.
   */
  async getPayment(id: string, options?: RequestOptions): Promise<Payment> {
    logger.info('Fetching payment', { paymentId: id });

    const response = await this.request<Payment>(
      'GET',
      `${API_V2_PAYMENTS}/${id}`,
      undefined,
      options
    );
    return response;
  }

  /**
   * Request a refund.
   */
  async refundPayment(data: RefundRequest, options?: RequestOptions): Promise<RefundResponse> {
    logger.info('Processing refund', { paymentId: data.paymentId, amount: data.amount });

    const response = await this.request<RefundResponse>(
      'POST',
      `${API_V2_PAYMENTS}/${data.paymentId}/refund`,
      data,
      options
    );
    return response;
  }

  private async request<T>(
    method: string,
    path: string,
    data?: unknown,
    options?: RequestOptions
  ): Promise<T> {
    const url = `${this.config.baseUrl}${path}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...options?.headers,
    };

    if (this.config.apiKey) {
      headers['Authorization'] = `Bearer ${this.config.apiKey}`;
    }

    const requestId = generateRequestId();
    headers[X_ACME_REQUEST_ID] = requestId;

    logger.debug('Making API request', {
      method,
      url,
      requestId,
    });

    try {
      const response = await fetch(url, {
        method,
        headers,
        body: data ? JSON.stringify(data) : undefined,
        signal: options?.signal,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new ApiException(
          error.code || 'REQUEST_FAILED',
          error.message || 'Request failed',
          response.status,
          error.details
        );
      }

      if (response.status === 204) {
        return undefined as T;
      }

      return response.json();
    } catch (error) {
      logger.error('API request failed', { method, url, error: String(error) });
      throw error;
    }
  }
}

function generateRequestId(): string {
  return `req-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
}

/**
 * Create a new API client instance.
 */
export function createApiClient(config: ApiClientConfig): ApiClient {
  return new ApiClient(config);
}
