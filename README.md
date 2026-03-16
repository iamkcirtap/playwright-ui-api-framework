# Playwright Automation Framework

[![CI](https://github.com/iamkcirtap/playwright-ui-api-framework/actions/workflows/playwright.yml/badge.svg)](https://github.com/iamkcirtap/playwright-ui-api-framework/actions/workflows/playwright.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Issues](https://img.shields.io/github/issues/iamkcirtap/playwright-ui-api-framework)](https://github.com/iamkcirtap/playwright-ui-api-framework/issues)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)

This is a practical Playwright + TypeScript test framework with a working SauceDemo UI example and API test support. The main idea is to keep tests readable, reusable, and easy to troubleshoot when something fails.

## What This Repo Covers

- UI demo target: [SauceDemo](https://www.saucedemo.com/)
- API tests: included to show how UI and API coverage can live in one project
- Pattern: Page Object Model + shared fixtures

## Why You Might Use It

- SauceDemo-ready UI login and inventory coverage
- API tests in the same project
- Type-safe test code with TypeScript
- Reusable fixtures and helpers so setup does not get copied everywhere
- Environment-based configuration via `.env.<name>` files
- HTML reporting with trace, video, and screenshot artifacts when a test fails

## Stack

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

If you just want to get the demo running, this is the shortest path.

### macOS / Linux

```bash
git clone https://github.com/iamkcirtap/playwright-ui-api-framework.git
cd playwright-ui-api-framework
npm ci
cp .env.example .env
npx playwright install --with-deps
npm test -- --project=ui-chromium
```

### Windows PowerShell

```powershell
git clone https://github.com/iamkcirtap/playwright-ui-api-framework.git
cd playwright-ui-api-framework
npm ci
Copy-Item .env.example .env
.\node_modules\.bin\playwright.cmd install --with-deps
npm.cmd test -- --project=ui-chromium
```

## Environment Files

- `.env` is your default local file
- `.env.example` is the tracked demo template
- set `ENV_NAME` if you want to load something like `.env.staging` or another local variant

Example local demo config:

```env
ENV_NAME=local
UI_BASE_URL=https://www.saucedemo.com/
API_BASE_URL=
API_TOKEN=
USER_EMAIL=standard_user
USER_PASSWORD=secret_sauce
HEADLESS=true
```

## Running Tests

Run everything with the current or default env:

```bash
npm test
```

Run the SauceDemo-focused set:

```bash
npm run test:sauce
```

Run only the SauceDemo UI tests:

```bash
npm run test:sauce -- --project=ui-chromium
```

Run API tests only:

```bash
npm run test:api
```

Run one specific SauceDemo spec:

```bash
npm run test:sauce -- tests/ui/saucedemo-login.spec.ts --project=ui-chromium
```

If `npx` is blocked on Windows:

```powershell
.\node_modules\.bin\playwright.cmd test
```

## Reports and Artifacts

Open the Playwright HTML report:

```bash
npx playwright show-report
```

When a test fails, Playwright can keep:

- trace
- screenshot
- video

## Example Test

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

## Test Cases

If you want the manual or automation-ready SauceDemo scenarios, they live here:

- [docs/SAUCEDEMO_TEST_CASES.md](./docs/SAUCEDEMO_TEST_CASES.md)

## License

This project is licensed under the MIT License. See [LICENSE](./LICENSE).
