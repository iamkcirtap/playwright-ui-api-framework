import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../common/BasePage';

export class CheckoutPage extends BasePage {
  readonly shippingNameInput: Locator;
  readonly shippingAddressInput: Locator;
  readonly shippingCityInput: Locator;
  readonly shippingZipInput: Locator;
  readonly shippingCountrySelect: Locator;
  readonly paymentMethodSelect: Locator;
  readonly placeOrderButton: Locator;
  readonly orderSuccessMessage: Locator;
  readonly orderNumber: Locator;
  readonly totalAmount: Locator;

  constructor(page: Page) {
    super(page);
    this.shippingNameInput = page.locator('[data-testid="shipping-name"], input[name="shippingName"]');
    this.shippingAddressInput = page.locator('[data-testid="shipping-address"], input[name="shippingAddress"]');
    this.shippingCityInput = page.locator('[data-testid="shipping-city"], input[name="shippingCity"]');
    this.shippingZipInput = page.locator('[data-testid="shipping-zip"], input[name="shippingZip"]');
    this.shippingCountrySelect = page.locator('[data-testid="shipping-country"], select[name="shippingCountry"]');
    this.paymentMethodSelect = page.locator('[data-testid="payment-method"], select[name="paymentMethod"]');
    this.placeOrderButton = page.locator('[data-testid="place-order"], button:has-text("Place order")');
    this.orderSuccessMessage = page.locator('[data-testid="order-success"], .order-success, .alert-success');
    this.orderNumber = page.locator('[data-testid="order-number"], .order-number');
    this.totalAmount = page.locator('[data-testid="checkout-total"], .checkout-total .amount');
  }

  async goto(): Promise<void> {
    await super.goto('/checkout');
  }

  async fillShippingDetails(details: {
    name: string;
    address: string;
    city: string;
    zip: string;
    country?: string;
  }): Promise<void> {
    await this.fill(this.shippingNameInput, details.name);
    await this.fill(this.shippingAddressInput, details.address);
    await this.fill(this.shippingCityInput, details.city);
    await this.fill(this.shippingZipInput, details.zip);

    if (details.country && (await this.shippingCountrySelect.isVisible())) {
      await this.shippingCountrySelect.selectOption({ label: details.country });
    }
  }

  async selectPaymentMethod(method: string): Promise<void> {
    if (await this.paymentMethodSelect.isVisible()) {
      await this.paymentMethodSelect.selectOption({ label: method });
    }
  }

  async placeOrder(): Promise<void> {
    await this.click(this.placeOrderButton);
  }

  async completeCheckout(payload: {
    shipping: { name: string; address: string; city: string; zip: string; country?: string };
    paymentMethod: string;
  }): Promise<void> {
    await this.fillShippingDetails(payload.shipping);
    await this.selectPaymentMethod(payload.paymentMethod);
    await this.placeOrder();
  }

  async getOrderNumber(): Promise<string> {
    return this.getText(this.orderNumber);
  }

  async getTotalAmount(): Promise<string> {
    return this.getText(this.totalAmount);
  }

  async assertLoaded(): Promise<void> {
    await expect(this.shippingNameInput).toBeVisible();
    await expect(this.placeOrderButton).toBeVisible();
  }

  async assertOrderPlaced(): Promise<void> {
    await expect(this.orderSuccessMessage).toBeVisible();
    await expect(this.orderNumber).toBeVisible();
  }
}
