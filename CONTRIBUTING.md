# Contributing

Thanks for contributing. This guide helps you set up locally, follow project conventions, and submit high-quality pull requests.

## Development Environment Setup

Prerequisites:

- Node.js 20+
- npm 10+
- Git

Setup:

```bash
git clone <your-repo-url>
cd playwright-full-tests
npm ci
cp .env.example .env
npx playwright install --with-deps
```

Create `.env` before running tests and update required values.

## Installing Dependencies

```bash
npm ci
```

## Running Tests Locally

All tests:

```bash
npm test
```

Smoke tests:

```bash
npx playwright test --grep "@smoke"
```

Single file:

```bash
npx playwright test tests/ui/ecommerce.spec.ts
```

Type-check:

```bash
npx tsc --noEmit
```

## Branching Strategy

Use short-lived branches from `main`:

- `feature/<short-name>`
- `fix/<short-name>`
- `test/<short-name>`
- `docs/<short-name>`

Keep PRs focused on one concern.

## Commit Message Guidelines

Prefer Conventional Commits:

- `feat: add checkout page object`
- `fix: stabilize cart assertion`
- `test: add smoke login scenario`
- `docs: update testing guide`

## Code Style Guidelines

- Use TypeScript strict typing.
- Keep selectors in page objects only.
- Prefer `data-testid` selectors.
- Keep tests behavior-oriented and readable.
- Avoid duplicated setup; use fixtures/helpers.
- Use clear, deterministic assertions.

## How to Create New Page Objects

1. Create file under `src/pages/<domain>/`.
2. Extend `BasePage`.
3. Add locators, business actions, and page assertions.
4. Keep methods reusable (`addToCart`, `completeCheckout`) rather than low-level only.

## How to Add New Test Suites

1. Add spec files in the correct folder:

- `tests/ui`
- `tests/api`
- `tests/contract`

2. Import the right fixture:

- UI tests: `src/core/fixtures/ui.fixtures`
- API tests: `src/core/fixtures/base.fixtures`

3. Apply required tags (see tag policy).
4. Validate locally before opening a PR.

## Tag Policy Enforcement Notes

Required for every new or modified test:

- Include at least one lifecycle tag: `@smoke` or `@regression`

Recommended scope tags:

- `@ui`, `@api`, `@contract`

Enforcement expectations:

- PR reviewers will request changes if lifecycle tags are missing
- CI command filters depend on correct tagging
- Untagged tests may be excluded from intended pipelines

## Pull Request Process

Before opening PR:

- run tests relevant to your change
- run type-check
- update docs when behavior changes

PR should include:

- problem statement
- solution summary
- risk/impact
- validation evidence (test output/report screenshots)

Use the PR template at `.github/pull_request_template.md`.

## Code Review Expectations

Reviewers focus on:

- correctness and reliability
- architectural consistency (POM + fixtures)
- selector robustness
- parallel safety and test isolation
- readability and maintainability

Authors are expected to address feedback promptly and keep discussions technical and collaborative.

## Definition of Done (Contributor Checklist)

- [ ] Code compiles (`npx tsc --noEmit`)
- [ ] Relevant tests pass locally
- [ ] New/updated tests include required lifecycle tag(s)
- [ ] No hardcoded secrets in code/tests/docs
- [ ] Documentation updated for behavior changes
- [ ] PR description includes validation evidence
