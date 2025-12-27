// PLAT-002: Initial shared TypeScript types for Acme Shop services
export type UserRole = 'admin' | 'customer' | 'vendor';

/**
 * @deprecated Use {@link User} instead. This type will be removed in v3.0.
 */
export interface UserV1 {
  id: string;
  email: string;
  name: string;
  /** @deprecated Password should not be in the model */
  password?: string;
  created_at: string;
}

/**
 * API-145: User type with migration helpers for v1 -> v2 transition
 * User represents a user in the system (v2 API).
 */
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  notificationsEnabled: boolean;
  theme: 'light' | 'dark' | 'system';
  locale: string;
  timezone: string;
}

export interface CreateUserRequest {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: UserRole;
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  active?: boolean;
  preferences?: Partial<UserPreferences>;
}

export interface UserListFilter {
  role?: UserRole;
  active?: boolean;
  search?: string;
  limit: number;
  offset: number;
}

export interface UserListResponse {
  users: User[];
  total: number;
  limit: number;
  offset: number;
}

/**
 * Get the full name of a user.
 */
export function getFullName(user: User): string {
  return `${user.firstName} ${user.lastName}`;
}

/**
 * Check if a user has admin role.
 */
export function isAdmin(user: User): boolean {
  return user.role === 'admin';
}

/**
 * Convert a User to the legacy UserV1 format.
 * @deprecated Use User directly instead of converting to V1.
 */
export function toUserV1(user: User): User {
  return {
    id: user.id,
    email: user.email,
    name: getFullName(user),
    created_at: user.createdAt,
  };
}

/**
 * Convert a UserV1 to the new User format.
 * TODO(TEAM-FRONTEND): Remove after v1 API is disabled
 */
export function fromUserV1(userV1: User): User {
  const nameParts = userV1.name.split(' ');
  return {
    id: userV1.id,
    email: userV1.email,
    firstName: nameParts[0] || '',
    lastName: nameParts.slice(1).join(' ') || '',
    role: 'customer',
    active: true,
    createdAt: userV1.created_at,
    updatedAt: userV1.created_at,
    preferences: {
      notificationsEnabled: true,
      theme: 'system',
      locale: 'en-US',
      timezone: 'UTC',
    },
  };
}
