# Playwright Automation Framework

[![CI](https://github.com/iamkcirtap/playwright-ui-api-framework/actions/workflows/playwright.yml/badge.svg)](https://github.com/iamkcirtap/playwright-ui-api-framework/actions/workflows/playwright.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Issues](https://img.shields.io/github/issues/iamkcirtap/playwright-ui-api-framework)](https://github.com/iamkcirtap/playwright-ui-api-framework/issues)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)

A scalable Playwright + TypeScript framework with a working SauceDemo UI demo and API test support.

## Current Scope

- UI demo target: [SauceDemo](https://www.saucedemo.com/)
- API tests: kept as-is for framework demonstration
- Pattern: Page Object Model + shared fixtures

## Key Features

- SauceDemo-ready UI login and inventory tests
- API testing in the same project
- Type-safe test code with TypeScript
- Reusable fixtures and helpers
- Environment-based configuration via `.env.<name>` files
- HTML reporting with trace/video/screenshot artifacts

## Technology Stack

- [Playwright](https://playwright.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/)
- [dotenv](https://github.com/motdotla/dotenv)
- [zod](https://zod.dev/)
- [GitHub Actions](https://docs.github.com/actions)

## Project Structure

```text
playwright-ui-api-framework/
├─ .github/workflows/
├─ docs/
│  └─ SAUCEDEMO_TEST_CASES.md
├─ src/
│  ├─ api/clients/               # Base API client
│  ├─ config/                    # env loading + validation
│  ├─ core/
│  │  ├─ auth/                   # auth helper
│  │  ├─ fixtures/               # base fixtures (UI + API)
│  │  └─ utils/
│  └─ pages/
│     ├─ auth/                   # SauceDemo login page object
│     ├─ inventory/              # SauceDemo inventory page object
│     └─ common/
├─ tests/
│  ├─ ui/                        # SauceDemo UI specs
│  └─ api/                       # API specs
├─ playwright.config.ts
├─ package.json
└─ tsconfig.json
```

## Quick Start

### macOS / Linux

```bash
git clone https://github.com/iamkcirtap/playwright-ui-api-framework.git
cd playwright-ui-api-framework
npm ci
cp .env.example .env.sauce
npx playwright install --with-deps
npm run test:sauce
```

### Windows PowerShell

```powershell
git clone https://github.com/iamkcirtap/playwright-ui-api-framework.git
cd playwright-ui-api-framework
npm ci
Copy-Item .env.example .env.sauce
.\node_modules\.bin\playwright.cmd install --with-deps
npm.cmd run test:sauce
```

## Environment Files

- `.env` for default local runs
- `.env.sauce` for SauceDemo runs
- select env by setting `ENV_NAME`, example: `ENV_NAME=sauce`

Sample SauceDemo env:

```env
ENV_NAME=sauce
UI_BASE_URL=https://www.saucedemo.com/
USER_EMAIL=standard_user
USER_PASSWORD=secret_sauce
HEADLESS=true
```

## Run Tests

Run all tests with current/default env:

```bash
npm test
```

Run SauceDemo UI + API using Sauce env:

```bash
npm run test:sauce
```

Run only SauceDemo UI tests:

```bash
npm run test:sauce -- --project=ui-chromium
```

Run API tests only:

```bash
npm run test:api
```

Run a specific SauceDemo test file:

```bash
npm run test:sauce -- tests/ui/saucedemo-login.spec.ts --project=ui-chromium
```

Windows fallback if `npx` is blocked:

```powershell
.\node_modules\.bin\playwright.cmd test
```

## Reports and Artifacts

Open Playwright report:

```bash
npx playwright show-report
```

Artifacts on failure:

- trace
- screenshot
- video

## Example Test (Current Fixtures)

```ts
import { test, expect } from '../../src/core/fixtures/base.fixtures';
import { env } from '../../src/config/env';

test('SauceDemo login happy path', async ({ loginPage, page }) => {
  await loginPage.goto();
  await loginPage.login(env.USER_EMAIL!, env.USER_PASSWORD!);

  await expect(page).toHaveURL(/inventory\.html/);
  await expect(page.locator('.title')).toHaveText('Products');
});
```

## Test Cases Document

Detailed manual/automation-ready test cases are maintained in:

- [docs/SAUCEDEMO_TEST_CASES.md](./docs/SAUCEDEMO_TEST_CASES.md)

## License

This project is licensed under the MIT License. See [LICENSE](./LICENSE).
