# Playwright Automation Framework

[![CI](https://github.com/OWNER/REPO/actions/workflows/playwright.yml/badge.svg)](https://github.com/OWNER/REPO/actions/workflows/playwright.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Issues](https://img.shields.io/github/issues/OWNER/REPO)](https://github.com/OWNER/REPO/issues)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)

A scalable Playwright + TypeScript test automation framework for modern ecommerce applications, with support for UI and API testing, reusable fixtures, and CI-ready execution.

## Problem This Framework Solves

Teams often struggle with brittle UI tests, duplicated setup code, and slow feedback loops. This framework solves that by providing:

- a consistent Page Object Model (POM) structure
- reusable fixtures for setup and shared dependencies
- environment-based configuration
- parallelized execution and CI reporting

## Key Features

- UI and API testing in one project
- Type-safe test code with TypeScript
- Page Object Model for maintainability
- reusable fixtures and helpers
- smoke vs regression tagging strategy
- parallel test execution
- HTML reporting with trace/video/screenshot artifacts
- GitHub Actions pipeline support

## Technology Stack

- [Playwright](https://playwright.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/)
- [dotenv](https://github.com/motdotla/dotenv)
- [zod](https://zod.dev/)
- [GitHub Actions](https://docs.github.com/actions)

## Architecture Overview

The framework is layered for scale:

- `src/pages`: UI page abstractions using POM
- `src/api/clients`: API request abstractions
- `src/core/fixtures`: reusable Playwright fixtures
- `src/core/utils`: waits, random data, env helpers
- `src/config`: environment loading and validation
- `tests`: UI/API/contract test suites

## Project Folder Structure

```text
playwright-full-tests/
├─ .github/workflows/             # CI pipeline
├─ src/
│  ├─ api/clients/                # BaseAPI + domain clients
│  ├─ config/                     # env loading + validation
│  ├─ core/
│  │  ├─ auth/                    # auth helpers
│  │  ├─ fixtures/                # reusable fixtures
│  │  └─ utils/                   # waits, data, env utilities
│  └─ pages/                      # page objects by domain
├─ tests/
│  ├─ ui/                         # UI test suites
│  ├─ api/                        # API test suites
│  └─ contract/                   # contract tests
├─ playwright.config.ts
├─ package.json
└─ tsconfig.json
```

## First 10 Minutes

### macOS / Linux

```bash
git clone https://github.com/OWNER/REPO.git
cd REPO
npm ci
cp .env.example .env
npx playwright install --with-deps
npx playwright test --grep "@smoke"
npx playwright show-report
```

### Windows PowerShell

```powershell
git clone https://github.com/OWNER/REPO.git
cd REPO
npm ci
Copy-Item .env.example .env
.\node_modules\.bin\playwright.cmd install --with-deps
.\node_modules\.bin\playwright.cmd test --grep "@smoke"
.\node_modules\.bin\playwright.cmd show-report
```

## Quick Start

```bash
npm ci
cp .env.example .env
npx playwright install --with-deps
npm test
```

## Installation

1. Clone the repo.
2. Install dependencies with `npm ci`.
3. Create env file: `cp .env.example .env`.
4. Update `.env` values.
5. Install Playwright browsers.

## Run Tests

Run all tests:

```bash
npm test
```

Run smoke tests:

```bash
npx playwright test --grep "@smoke"
```

Run tests in parallel (custom workers):

```bash
npx playwright test --workers=4
```

Run a specific suite:

```bash
npx playwright test tests/ui/ecommerce.spec.ts
```

Windows PowerShell fallback if `npx` is blocked:

```powershell
.\node_modules\.bin\playwright.cmd test
```

## Generate and View Reports

After a run, open the HTML report:

```bash
npx playwright show-report
```

Artifacts on failure (configured in Playwright):

- trace
- screenshot
- video

## Example Test

```ts
import { test, expect } from '../../src/core/fixtures/ui.fixtures';

test('User login @smoke', async ({ loginPage, page }) => {
  await loginPage.goto();
  await loginPage.login('qa@example.com', 'Password123!');
  await expect(page).not.toHaveURL(/\/login/i);
});
```

## Screenshots / Report Examples

![Playwright HTML Report](./docs/assets/playwright-report-example.png)

## Roadmap

- [ ] Add domain-specific API clients beyond `BaseAPI`
- [ ] Add contract/schema validation suite
- [ ] Add sharded CI execution for large regression packs
- [ ] Add authenticated `storageState` setup project
- [ ] Add visual regression checks for critical pages

## License

This project is licensed under the MIT License. See [LICENSE](./LICENSE).
