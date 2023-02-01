# @acme-shop/shared

Shared TypeScript types and utilities for AcmeShop services.

## Installation

```bash
npm install @acme-shop/shared
```

## Usage

```typescript
import { User, UserV1, ApiClient } from '@acme-shop/shared';
import { API_V2_USERS } from '@acme-shop/shared/constants';
import { logger } from '@acme-shop/shared/utils';
```

## Packages

- `models` - Domain types (User, Order, Payment, Notification)
- `api` - API client and endpoint constants
- `utils` - Logging, validation, and formatting utilities
- `constants` - Header names, feature flags, and configuration

## Migration Notes

### API v2 Migration
`UserV1` and `getUserV1()` are deprecated. Migrate to `User` type and `getUser()` method.

### Logging Migration
Console-based logging is deprecated. Use the structured logger instead:

```typescript
// Old (deprecated)
console.log('User created:', userId);

// New
logger.info('User created', { userId });
```
