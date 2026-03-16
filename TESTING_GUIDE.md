# Testing Guide

## Testing Philosophy

This framework is built around a pretty standard QA goal: catch real issues without turning the test suite into something hard to trust or maintain.

Core ideas:

- verify behavior, not internal implementation details
- keep tests deterministic and isolated
- reuse page objects and fixtures instead of repeating setup
- fail with enough diagnostics that debugging is straightforward

## Current Strategy

1. Cover the main SauceDemo UI flows for the working demo
2. Keep API coverage in the project so the framework shows both UI and API testing patterns

## Framework Architecture

- `src/pages`: page objects (`LoginPage`, `InventoryPage`)
- `src/api/clients`: API abstraction layer (`BaseAPI`)
- `src/core/fixtures`: shared fixtures (`base.fixtures.ts`)
- `src/core/utils`: common utilities
- `src/config`: environment parsing and validation
- `tests/ui`: SauceDemo specs
- `tests/api`: API specs

## Writing UI Tests

Use `base.fixtures` and keep the spec focused on the user flow. If setup, selectors, or repeated actions start taking over the test, that logic probably belongs in a page object or fixture.

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

Use the shared API fixtures and assert the behavior that actually matters: status codes, payload shape, and meaningful response data.

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

If multiple tests need the same setup, add it once in `base.fixtures.ts` instead of copying it into every spec.

## Environment and Execution

- env file selection uses `ENV_NAME`, which loads `.env.<ENV_NAME>`
- SauceDemo command: `npm run test:sauce`
- API-only command: `npm run test:api`

## Parallel Test Execution

Parallel execution is enabled in Playwright config, so tests need to behave well when they run beside each other.

```bash
npx playwright test --workers=4
```

Keep these rules in mind:

- avoid shared mutable state across tests
- keep each test independent
- do not rely on execution order

## Debugging Failing Tests

When something fails, start with the trace before changing the test. It usually tells you whether the issue is bad data, a timing problem, or a broken selector.

```bash
npx playwright test --debug
npx playwright test --headed
npx playwright show-report
npx playwright show-trace <path-to-trace.zip>
```

## Handling Flaky Tests

1. reproduce locally with retries disabled
2. inspect trace, video, and screenshot artifacts
3. verify selector stability
4. replace hard waits with state-based waits
5. isolate data issues and cross-test coupling
6. only then consider retries

## Best Practices

- keep assertions focused on outcomes the user would notice
- keep page objects focused on business actions, not one-off script steps
- prefer stable selectors
- keep tests independent and parallel-safe
- update the docs when the framework behavior changes
