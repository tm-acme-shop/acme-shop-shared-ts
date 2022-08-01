# @acme-shop/shared

Shared TypeScript types and utilities for AcmeShop services.

## Installation

```bash
npm install @acme-shop/shared
```

## Usage

```typescript
import { User, UserV1 } from '@acme-shop/shared';
import { API_V1_USERS, API_V2_USERS } from '@acme-shop/shared/api';
```

## Packages

- `models` - Domain types (User, UserV1, Order, OrderV1, Payment, PaymentV1)
- `api` - API client and endpoint constants
- `utils` - Logging and validation utilities
- `constants` - Header names and configuration

## Migration Notes

### API v2 Migration
We are transitioning from v1 to v2 API types. Both are available during the transition period.
Use the v2 types (`User`, `Order`, `Payment`) for new development.
