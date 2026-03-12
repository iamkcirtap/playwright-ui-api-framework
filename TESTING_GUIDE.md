# Testing Guide

## Testing Philosophy

This framework prioritizes confidence, speed, and maintainability.

Principles:

- validate UI/API behavior, not implementation details
- keep tests deterministic and isolated
- reuse page objects and fixtures
- fail with actionable diagnostics

## Current Strategy

1. SauceDemo UI coverage for working demo flows
2. API coverage retained as-is

## Framework Architecture

- `src/pages`: page objects (`LoginPage`, `InventoryPage`)
- `src/api/clients`: API abstraction layer (`BaseAPI`)
- `src/core/fixtures`: shared fixtures (`base.fixtures.ts`)
- `src/core/utils`: common utilities
- `src/config`: environment parsing and validation
- `tests/ui`: SauceDemo specs
- `tests/api`: API specs

## Writing UI Tests

Use `base.fixtures` and keep tests concise.

```ts
import { test, expect } from '../../src/core/fixtures/base.fixtures';
import { env } from '../../src/config/env';

test('SauceDemo inventory loads after login', async ({ loginPage, inventoryPage, page }) => {
  await loginPage.goto();
  await loginPage.login(env.USER_EMAIL!, env.USER_PASSWORD!);

  await inventoryPage.assertLoaded();
  await expect(page).toHaveURL(/inventory\.html/);
});
```

## Writing API Tests

Use API fixtures and verify status + payload behavior.

```ts
import { test, expect } from '../../src/core/fixtures/base.fixtures';

test('Orders endpoint', async ({ apiContext }) => {
  const response = await apiContext.get('/orders');
  expect(response.status()).toBe(200);
});
```

## Fixtures and Reusable Components

`base.fixtures.ts` provides:

- `apiContext`
- `apiClient`
- `loginPage`
- `inventoryPage`
- `authHelper`
- `authenticatedPage`

Add shared setup in `base.fixtures.ts` instead of duplicating test setup.

## Environment and Execution

- env file selection uses `ENV_NAME` (loads `.env.<ENV_NAME>`)
- SauceDemo run command: `npm run test:sauce`
- API-only run command: `npm run test:api`

## Parallel Test Execution

Parallel runs are enabled in Playwright config.

```bash
npx playwright test --workers=4
```

Guidelines:

- avoid shared mutable state across tests
- keep each test independent
- avoid order dependencies

## Debugging Failing Tests

```bash
npx playwright test --debug
npx playwright test --headed
npx playwright show-report
npx playwright show-trace <path-to-trace.zip>
```

## Handling Flaky Tests

1. reproduce locally with retries disabled
2. inspect trace/video/screenshot
3. verify selector stability
4. replace hard waits with state-based waits
5. isolate data and cross-test coupling
6. only then consider retries

## Best Practices

- keep assertions outcome-focused
- keep page objects domain-focused
- use stable selectors
- keep tests independent and parallel-safe
- update docs when framework behavior changes
