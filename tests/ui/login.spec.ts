import { test, expect } from '../../src/core/fixtures/base.fixtures';

test('user can open login page', async ({ loginPage }) => {
  await loginPage.goto();
  await expect(loginPage.emailInput).toBeVisible();
  await expect(loginPage.passwordInput).toBeVisible();
  await expect(loginPage.submitButton).toBeVisible();
});
