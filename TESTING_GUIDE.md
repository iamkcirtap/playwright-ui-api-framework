# Testing Guide

## Testing Philosophy

This framework prioritizes confidence, speed, and maintainability.

Principles:

- validate user and API behavior, not implementation details
- keep tests deterministic and isolated
- reuse framework components instead of duplicating logic
- fail with actionable diagnostics

## Test Pyramid Strategy

Use a balanced pyramid:

1. API tests (broad, fast coverage)
2. UI tests (critical user workflows)
3. Contract tests (schema and compatibility checks)

Prefer more API coverage where possible, and reserve UI tests for business-critical journeys.

## Framework Architecture

Core layers:

- `src/pages`: POM classes with locators/actions/assertions
- `src/api/clients`: API abstraction layer
- `src/core/fixtures`: shared setup and dependency injection
- `src/core/utils`: common utilities (waits, data, env)
- `src/config`: environment parsing and validation
- `tests`: domain test suites

## Page Object Model Usage

Each page object should contain:

- stable locators
- business actions
- assertion methods

Keep raw selector logic out of spec files.

## Writing UI Tests

Use UI fixtures and keep tests concise.

```ts
import { test, expect } from '../../src/core/fixtures/ui.fixtures';

test('Product search @smoke @ui', async ({ homePage }) => {
  await homePage.goto();
  await homePage.searchProduct('shoe');
  await homePage.assertSearchResultsContain('shoe');
});
```

## Writing API Tests

Use API fixtures and verify status + payload behavior.

```ts
import { test, expect } from '../../src/core/fixtures/base.fixtures';

test('Orders endpoint @regression @api', async ({ apiContext }) => {
  const response = await apiContext.get('/orders');
  expect(response.status()).toBe(200);
  expect(Array.isArray(await response.json())).toBeTruthy();
});
```

## Fixtures and Reusable Components

Use fixtures to share setup and minimize duplication:

- `base.fixtures.ts`: API context/client, auth helpers, base setup
- `ui.fixtures.ts`: page objects for UI tests

If you need new shared setup, extend fixtures instead of copy/pasting setup in tests.

## Test Data Management

- keep test data deterministic where possible
- generate unique data for parallel-safe scenarios
- avoid dependency on shared mutable records
- keep secrets in env variables, never in code

## Tagging Strategy

Use tags in test names:

- `@smoke`: critical checks run on pull requests
- `@regression`: broader suite for nightly/full runs
- optional: `@ui`, `@api`, `@contract`

Policy:

- every new/updated test must include `@smoke` or `@regression`
- reviewers enforce this during PR review
- missing lifecycle tags are a merge blocker

Examples:

```ts
test('Checkout flow @regression @ui', async () => {});
test('Create order API @smoke @api', async () => {});
```

## Parallel Test Execution

Parallel runs are enabled in Playwright config.

Run with custom workers:

```bash
npx playwright test --workers=4
```

Guidelines:

- avoid shared account/cart state across tests
- create/clean test data per test where feasible
- do not rely on test execution order

## Debugging Failing Tests

Debug mode:

```bash
npx playwright test --debug
```

Headed mode:

```bash
npx playwright test --headed
```

Open report:

```bash
npx playwright show-report
```

Open trace:

```bash
npx playwright show-trace <path-to-trace.zip>
```

## Handling Flaky Tests

When a test is flaky:

1. reproduce locally with retries disabled
2. inspect trace/video/screenshot
3. verify selector stability
4. replace hard waits with state-based waits
5. isolate data and remove cross-test coupling
6. only then consider retries as mitigation

## Best Practices

- keep assertions outcome-focused
- keep page objects small and domain-focused
- prefer explicit expectations over implicit waits
- use fixtures for setup reuse
- keep tests independent, idempotent, and parallel-safe
- update docs when framework behavior changes
