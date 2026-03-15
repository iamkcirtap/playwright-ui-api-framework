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
cd playwright-ui-api-framework
npm ci
cp .env.example .env
npx playwright install --with-deps
```

The tracked `.env.example` is runnable for the SauceDemo UI suite. Copy it to `.env` and adjust values only if you need a different target.

## Running Tests Locally

All tests (default env):

```bash
npm test
```

SauceDemo-focused run:

```bash
npm run test:sauce
```

UI only:

```bash
npm run test:sauce -- --project=ui-chromium
```

API only:

```bash
npm run test:api
```

Single SauceDemo spec:

```bash
npm run test:sauce -- tests/ui/saucedemo-login.spec.ts --project=ui-chromium
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

- `feat: add inventory sort coverage`
- `fix: stabilize saucedemo login assertion`
- `test: add saucedemo product detail test`
- `docs: update readme for sauce scope`

## Code Style Guidelines

- Use TypeScript strict typing.
- Keep selectors in page objects.
- Prefer stable selectors.
- Keep tests behavior-oriented and readable.
- Avoid duplicated setup; use fixtures/helpers.
- Use deterministic assertions.

## How to Create New Page Objects

1. Create file under `src/pages/<domain>/`.
2. Extend `BasePage`.
3. Add locators, business actions, and assertions.
4. Keep methods reusable and domain-focused.

## How to Add New Test Suites

1. Add spec files in:
- `tests/ui`
- `tests/api`

2. Import fixture:
- `src/core/fixtures/base.fixtures`

3. Validate locally before opening a PR.

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

## Definition of Done (Contributor Checklist)

- [ ] Code compiles (`npx tsc --noEmit`)
- [ ] Relevant tests pass locally
- [ ] No hardcoded secrets in code/tests/docs
- [ ] Documentation updated for behavior changes
- [ ] PR description includes validation evidence
