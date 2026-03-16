# Contributing

Thanks for contributing. This project is meant to stay approachable, so this guide is here to help you get set up quickly and keep changes clean, testable, and easy to review.

## Development Environment Setup

You will need:

- Node.js 20+
- npm 10+
- Git

Setup steps:

```bash
git clone <your-repo-url>
cd playwright-ui-api-framework
npm ci
cp .env.example .env
npx playwright install --with-deps
```

The tracked `.env.example` already works for the SauceDemo UI suite. In most cases, copying it to `.env` is enough to get started.

## Running Tests Locally

Run the full suite with the default env:

```bash
npm test
```

Run the SauceDemo-focused suite:

```bash
npm run test:sauce
```

Run UI only:

```bash
npm run test:sauce -- --project=ui-chromium
```

Run API only:

```bash
npm run test:api
```

Run a single SauceDemo spec:

```bash
npm run test:sauce -- tests/ui/saucedemo-login.spec.ts --project=ui-chromium
```

Run type-checking:

```bash
npx tsc --noEmit
```

## Branching Strategy

Use short-lived branches from `main`:

- `feature/<short-name>`
- `fix/<short-name>`
- `test/<short-name>`
- `docs/<short-name>`

Try to keep each PR focused on one concern. Small PRs are faster to review and easier to trust.

## Commit Message Guidelines

Conventional Commits are preferred:

- `feat: add inventory sort coverage`
- `fix: stabilize saucedemo login assertion`
- `test: add saucedemo product detail test`
- `docs: update readme for sauce scope`

## Code Style Guidelines

- Use TypeScript strict typing.
- Keep selectors in page objects.
- Prefer stable selectors.
- Keep tests behavior-oriented and easy to read.
- Avoid duplicated setup; use fixtures/helpers.
- Use deterministic assertions.

## How to Create New Page Objects

1. Create the file under `src/pages/<domain>/`.
2. Extend `BasePage`.
3. Add locators, business actions, and assertions.
4. Keep methods reusable and domain-focused.

## How to Add New Test Suites

1. Add spec files in:
- `tests/ui`
- `tests/api`

2. Import the shared fixture:
- `src/core/fixtures/base.fixtures`

3. Validate locally before opening a PR.

## Pull Request Process

Before opening a PR:

- run the tests relevant to your change
- run type-check
- update docs when behavior changes

Your PR should include:

- problem statement
- solution summary
- risk or impact
- validation evidence such as test output or report screenshots

Use the PR template at `.github/pull_request_template.md`.

## Code Review Expectations

Reviewers usually focus on:

- correctness and reliability
- architectural consistency (POM + fixtures)
- selector robustness
- parallel safety and test isolation
- readability and maintainability

## Definition of Done (Contributor Checklist)

- [ ] Code compiles (`npx tsc --noEmit`)
- [ ] Relevant tests pass locally
- [ ] No hardcoded secrets in code, tests, or docs
- [ ] Documentation is updated for behavior changes
- [ ] PR description includes validation evidence
