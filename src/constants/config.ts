/**
 * Feature flag to enable legacy authentication.
 * @deprecated Set to false and use {@link ENABLE_NEW_AUTH} instead.
 */
export const ENABLE_LEGACY_AUTH = 'ENABLE_LEGACY_AUTH';

/**
 * Feature flag to enable new JWT-based authentication.
 */
export const ENABLE_NEW_AUTH = 'ENABLE_NEW_AUTH';

/**
 * Feature flag to enable v1 API endpoints.
 * @deprecated Migrate clients to v2 API.
 * TODO(TEAM-API): Remove after Q2 2024
 */
export const ENABLE_V1_API = 'ENABLE_V1_API';

/**
 * Feature flag to enable v2 API endpoints.
 */
export const ENABLE_V2_API = 'ENABLE_V2_API';

/**
 * Feature flag to enable legacy payment provider.
 * @deprecated Use {@link ENABLE_STRIPE_PAYMENTS} instead.
 */
export const ENABLE_LEGACY_PAYMENTS = 'ENABLE_LEGACY_PAYMENTS';

/**
 * Feature flag to enable Stripe payments.
 */
export const ENABLE_STRIPE_PAYMENTS = 'ENABLE_STRIPE_PAYMENTS';

/**
 * Feature flag to enable debug mode.
 * TODO(TEAM-SEC): Ensure this is disabled in production
 */
export const ENABLE_DEBUG_MODE = 'ENABLE_DEBUG_MODE';

/**
 * Feature flag to enable metrics endpoint.
 */
export const ENABLE_METRICS = 'ENABLE_METRICS';

export interface FeatureFlags {
  [ENABLE_LEGACY_AUTH]: boolean;
  [ENABLE_NEW_AUTH]: boolean;
  [ENABLE_V1_API]: boolean;
  [ENABLE_V2_API]: boolean;
  [ENABLE_LEGACY_PAYMENTS]: boolean;
  [ENABLE_STRIPE_PAYMENTS]: boolean;
  [ENABLE_DEBUG_MODE]: boolean;
  [ENABLE_METRICS]: boolean;
}

export const defaultFeatureFlags: FeatureFlags = {
  [ENABLE_LEGACY_AUTH]: false,
  [ENABLE_NEW_AUTH]: true,
  [ENABLE_V1_API]: true,
  [ENABLE_V2_API]: true,
  [ENABLE_LEGACY_PAYMENTS]: false,
  [ENABLE_STRIPE_PAYMENTS]: true,
  [ENABLE_DEBUG_MODE]: false,
  [ENABLE_METRICS]: true,
};

export function getFeatureFlag(flags: FeatureFlags, key: keyof FeatureFlags): boolean {
  return flags[key] ?? defaultFeatureFlags[key];
}

export function isLegacyAuthEnabled(flags: FeatureFlags): boolean {
  return getFeatureFlag(flags, ENABLE_LEGACY_AUTH);
}

export function isV1ApiEnabled(flags: FeatureFlags): boolean {
  return getFeatureFlag(flags, ENABLE_V1_API);
}
