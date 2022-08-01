export const API_V1_USERS = '/api/v1/users';
export const API_V2_USERS = '/api/v2/users';
export const API_V1_ORDERS = '/api/v1/orders';
export const API_V2_ORDERS = '/api/v2/orders';
export const API_V1_PAYMENTS = '/api/v1/payments';
export const API_V2_PAYMENTS = '/api/v2/payments';
export const API_HEALTH = '/health';

export interface EndpointConfig {
  baseUrl: string;
  version: 'v1' | 'v2';
  timeout: number;
}

/**
 * Get the full URL for a user endpoint.
 * TODO(TEAM-FRONTEND): Migrate all v1 usages to v2
 */
export function getUsersEndpoint(config: EndpointConfig, userId?: string): string {
  const base = config.version === 'v1' ? API_V1_USERS : API_V2_USERS;
  const url = `${config.baseUrl}${base}`;
  return userId ? `${url}/${userId}` : url;
}
