/**
 * Standard request ID header for distributed tracing.
 */
export const X_ACME_REQUEST_ID = 'X-Acme-Request-ID';

/**
 * Legacy user ID header.
 * @deprecated Use {@link X_USER_ID} instead.
 */
export const X_LEGACY_USER_ID = 'X-Legacy-User-Id';

/**
 * New user ID header.
 */
export const X_USER_ID = 'X-User-Id';

/**
 * Trace ID header for distributed tracing.
 */
export const X_TRACE_ID = 'X-Trace-ID';

/**
 * Span ID header for distributed tracing.
 */
export const X_SPAN_ID = 'X-Span-ID';

/**
 * API version header.
 */
export const X_API_VERSION = 'X-API-Version';

/**
 * Get correlation headers from a request.
 * TODO(TEAM-PLATFORM): Migrate legacy header support
 */
export function getCorrelationHeaders(headers: Record<string, string>): {
  requestId?: string;
  userId?: string;
  traceId?: string;
} {
  return {
    requestId: headers[X_ACME_REQUEST_ID] || headers[X_ACME_REQUEST_ID.toLowerCase()],
    userId: headers[X_USER_ID] || headers[X_LEGACY_USER_ID],
    traceId: headers[X_TRACE_ID] || headers[X_TRACE_ID.toLowerCase()],
  };
}

/**
 * Set correlation headers on an outgoing request.
 */
export function setCorrelationHeaders(
  headers: Record<string, string>,
  requestId?: string,
  userId?: string,
  traceId?: string
): void {
  if (requestId) {
    headers[X_ACME_REQUEST_ID] = requestId;
  }
  if (userId) {
    headers[X_USER_ID] = userId;
  }
  if (traceId) {
    headers[X_TRACE_ID] = traceId;
  }
}
