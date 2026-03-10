import { test, expect } from '../../src/core/fixtures/ui.fixtures';
import { env } from '../../src/config/env';

const credentials = {
  email: env.USER_EMAIL ?? 'test.user@example.com',
  password: env.USER_PASSWORD ?? 'Password123!'
};

const checkoutData = {
  shipping: {
    name: 'Jane Doe',
    address: '123 Test Street',
    city: 'Manila',
    zip: '1000',
    country: 'Philippines'
  },
  paymentMethod: 'Credit Card'
};

test.describe('Ecommerce UI Suite', () => {
  test.describe.configure({ mode: 'parallel' });

  test('User login @smoke', async ({ loginPage, page }) => {
    await loginPage.goto();
    await loginPage.assertLoaded();

    await loginPage.login(credentials.email, credentials.password);

    await expect(page).not.toHaveURL(/\/login/i);
  });

  test('Product search @smoke', async ({ homePage }) => {
    await homePage.goto();
    await homePage.assertLoaded();

    await homePage.searchProduct('shoe');
    await homePage.assertSearchResultsContain('shoe');
  });

  test('Add product to cart @regression', async ({ homePage, productPage, cartPage }) => {
    await homePage.goto();
    await homePage.searchProduct('shoe');
    await homePage.openProductByName('shoe');

    await productPage.assertLoaded();
    const productName = await productPage.getProductName();

    await productPage.addToCart({ quantity: 1 });
    await productPage.assertAddedToCart();

    await cartPage.goto();
    await cartPage.assertHasItem(productName || 'shoe');
  });

  test('Checkout flow @regression', async ({ cartPage, checkoutPage }) => {
    await cartPage.goto();
    await cartPage.proceedToCheckout();

    await checkoutPage.assertLoaded();
    await checkoutPage.fillShippingDetails(checkoutData.shipping);
    await checkoutPage.selectPaymentMethod(checkoutData.paymentMethod);

    await expect(checkoutPage.placeOrderButton).toBeEnabled();
  });

  test('Order confirmation @regression', async ({ checkoutPage }) => {
    await checkoutPage.goto();
    await checkoutPage.completeCheckout(checkoutData);

    await checkoutPage.assertOrderPlaced();
    const orderNumber = await checkoutPage.getOrderNumber();
    await expect(orderNumber).not.toEqual('');
  });
});
