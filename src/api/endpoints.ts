/**
 * API v2 Users endpoint.
 */
export const API_V2_USERS = '/api/v2/users';

/**
 * API v1 Orders endpoint.
 * @deprecated Use {@link API_V2_ORDERS} instead.
 */
export const API_V1_ORDERS = '/api/v1/orders';

/**
 * API v2 Orders endpoint.
 */
export const API_V2_ORDERS = '/api/v2/orders';

/**
 * API v1 Payments endpoint.
 * @deprecated Use {@link API_V2_PAYMENTS} instead.
 */
export const API_V1_PAYMENTS = '/api/v1/payments';

/**
 * API v2 Payments endpoint.
 */
export const API_V2_PAYMENTS = '/api/v2/payments';

/**
 * API v1 Notifications endpoint.
 * @deprecated Use {@link API_V2_NOTIFICATIONS} instead.
 */
export const API_V1_NOTIFICATIONS = '/api/v1/notifications';

/**
 * API v2 Notifications endpoint.
 */
export const API_V2_NOTIFICATIONS = '/api/v2/notifications';

export const API_HEALTH = '/health';
export const API_METRICS = '/metrics';
export const API_READY = '/ready';

export interface EndpointConfig {
  baseUrl: string;
  version: 'v1' | 'v2';
  timeout: number;
}

/**
 * Get the full URL for a user endpoint.
 */
export function getUsersEndpoint(config: EndpointConfig, userId?: string): string {
  const base = API_V2_USERS;
  const url = `${config.baseUrl}${base}`;
  return userId ? `${url}/${userId}` : url;
}

export function getOrdersEndpoint(config: EndpointConfig, orderId?: string): string {
  const base = config.version === 'v1' ? API_V1_ORDERS : API_V2_ORDERS;
  const url = `${config.baseUrl}${base}`;
  return orderId ? `${url}/${orderId}` : url;
}

export function getPaymentsEndpoint(config: EndpointConfig, paymentId?: string): string {
  const base = config.version === 'v1' ? API_V1_PAYMENTS : API_V2_PAYMENTS;
  const url = `${config.baseUrl}${base}`;
  return paymentId ? `${url}/${paymentId}` : url;
}
