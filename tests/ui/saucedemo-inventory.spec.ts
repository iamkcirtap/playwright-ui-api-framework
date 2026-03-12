import { test, expect } from '../../src/core/fixtures/base.fixtures';
import { env } from '../../src/config/env';

test('SauceDemo inventory page loads correctly after login', async ({ loginPage, inventoryPage, page }) => {
  await loginPage.goto();
  await loginPage.assertLoaded();
  await loginPage.login(env.USER_EMAIL!, env.USER_PASSWORD!);

  await inventoryPage.assertLoaded();
  await expect(page).toHaveURL(/inventory\.html/);
  await expect(page.locator('.title')).toHaveText('Products');
});

test('SauceDemo inventory page sort products by price low to high', async ({ loginPage, inventoryPage, page }) => {
  await loginPage.goto();
  await loginPage.assertLoaded();
  await loginPage.login(env.USER_EMAIL!, env.USER_PASSWORD!);

  await inventoryPage.assertLoaded();
  await inventoryPage.filterProducts('lohi');

  const prices = await inventoryPage.productPrice.allInnerTexts();
  const priceValues = prices.map(price => parseFloat(price.replace('$', '')));
  const sortedPrices = [...priceValues].sort((a, b) => a - b);
  expect(priceValues).toEqual(sortedPrices);
});

test('SauceDemo inventory page sort products by Z to A', async ({ loginPage, inventoryPage, page }) => {
  await loginPage.goto();
  await loginPage.assertLoaded();
  await loginPage.login(env.USER_EMAIL!, env.USER_PASSWORD!);

  await inventoryPage.assertLoaded();
  await inventoryPage.filterProducts('za');

  const names = await inventoryPage.productName.allInnerTexts();
  const sortedNames = [...names].sort((a, b) => b.localeCompare(a));
  expect(names).toEqual(sortedNames);
});