# Configuration

This document describes how to configure the application.

All the configuration is possible via environment variables. The application automatically loads `.env` file if found, where you can define those variables as a code.

## Validation

All the environment variables are validated against `zod` schema defined [../src/infrastructure/config/index.ts](../src/infrastructure/config/index.ts).

## Using variables

Althought you can use those variables via `process.env` or `Bun.env` objects, I strictly recommend to use `config` object as the following.
By using this object you can be sure, that the variable is not only validated, but also transformed to the specific format/type (env variables are by default only string variables).

```typescript
import { config } from '@/infrastructure/config';

console.log(config.PORT);
```