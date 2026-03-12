import { test, expect } from '../../src/core/fixtures/base.fixtures';
import { env } from '../../src/config/env';

test('SauceDemo login happy path', async ({ loginPage, page }) => {
  const username = env.USER_EMAIL;

  if (!username || !env.USER_PASSWORD) {
    throw new Error('Set USERNAME (or USER_EMAIL) and USER_PASSWORD in your env file.');
  }

  await loginPage.goto();
  await loginPage.assertLoaded();
  await loginPage.login(username, env.USER_PASSWORD);

  await expect(page).toHaveURL(/inventory\.html/);
  await expect(page.locator('.title')).toHaveText('Products');
});

test('SauceDemo login with invalid credentials', async ({ loginPage, page }) => {
  await loginPage.goto();
  await loginPage.assertLoaded();
  await loginPage.login('invalid_user', 'invalid_password');

  await expect(loginPage.errorMessage).toBeVisible();
  await expect(loginPage.errorMessage).toHaveText(/Username and password do not match any user in this service/);
});

test('SauceDemo Login with a locked out user', async ({ loginPage, page }) => {
  await loginPage.goto();
  await loginPage.assertLoaded();
  await loginPage.login('locked_out_user', 'secret_sauce');

  await expect(loginPage.errorMessage).toBeVisible();
  await expect(loginPage.errorMessage).toHaveText(/Sorry, this user has been locked out/);
});

test('SauceDemo login with empty username', async ({ loginPage, page }) => {
  await loginPage.goto();
  await loginPage.assertLoaded();
  await loginPage.login('', 'secret_sauce');

  await expect(loginPage.errorMessage).toBeVisible();
  await expect(loginPage.errorMessage).toHaveText(/Username is required/);
});

test('SauceDemo login with empty password', async ({ loginPage, page }) => {
  await loginPage.goto();
  await loginPage.assertLoaded();
  await loginPage.login('standard_user', '');

  await expect(loginPage.errorMessage).toBeVisible();
  await expect(loginPage.errorMessage).toHaveText(/Password is required/);
});

