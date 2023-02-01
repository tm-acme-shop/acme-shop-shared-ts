export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  meta?: ResponseMeta;
}

export interface ApiError {
  code: string;
  message: string;
  details?: string;
  field?: string;
}

export interface ResponseMeta {
  requestId: string;
  timestamp: string;
  duration: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: PaginationInfo;
}

export interface PaginationInfo {
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
}

export interface RequestOptions {
  headers?: Record<string, string>;
  timeout?: number;
  retries?: number;
  signal?: AbortSignal;
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface RequestConfig {
  method: HttpMethod;
  url: string;
  data?: unknown;
  params?: Record<string, string | number | boolean>;
  options?: RequestOptions;
}

export class ApiException extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly statusCode: number,
    public readonly details?: string
  ) {
    super(message);
    this.name = 'ApiException';
  }

  static fromApiError(error: ApiError, statusCode: number): ApiException {
    return new ApiException(error.code, error.message, statusCode, error.details);
  }
}

export function isApiError(response: ApiResponse<unknown>): boolean {
  return !response.success && !!response.error;
}

export function unwrapResponse<T>(response: ApiResponse<T>): T {
  if (!response.success || !response.data) {
    throw new ApiException(
      response.error?.code || 'UNKNOWN',
      response.error?.message || 'Unknown error',
      500,
      response.error?.details
    );
  }
  return response.data;
}
