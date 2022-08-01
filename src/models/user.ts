export type UserRole = 'admin' | 'customer' | 'vendor';

export interface UserV1 {
  id: string;
  email: string;
  name: string;
  password?: string;
  created_at: string;
}

/**
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

/**
 * Get the full name of a user.
 */
export function getFullName(user: User): string {
  return `${user.firstName} ${user.lastName}`;
}

/**
 * Convert a User to the legacy UserV1 format.
 * TODO(TEAM-FRONTEND): Remove after v1 API is disabled
 */
export function toUserV1(user: User): UserV1 {
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
export function fromUserV1(userV1: UserV1): User {
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
