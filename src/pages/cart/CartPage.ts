import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../common/BasePage';

export class CartPage extends BasePage {
  readonly cartItems: Locator;
  readonly cartItemName: Locator;
  readonly cartItemPrice: Locator;
  readonly itemQuantityInput: Locator;
  readonly removeItemButton: Locator;
  readonly subtotalAmount: Locator;
  readonly checkoutButton: Locator;
  readonly emptyCartMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.cartItems = page.locator('[data-testid="cart-item"], .cart-item');
    this.cartItemName = page.locator('[data-testid="cart-item-name"], .cart-item-name');
    this.cartItemPrice = page.locator('[data-testid="cart-item-price"], .cart-item-price');
    this.itemQuantityInput = page.locator('[data-testid="cart-quantity"], input[name="quantity"]');
    this.removeItemButton = page.locator('[data-testid="remove-item"], button:has-text("Remove")');
    this.subtotalAmount = page.locator('[data-testid="cart-subtotal"], .cart-subtotal .amount');
    this.checkoutButton = page.locator('[data-testid="proceed-checkout"], button:has-text("Checkout")');
    this.emptyCartMessage = page.locator('[data-testid="empty-cart"], .empty-cart-message');
  }

  async goto(): Promise<void> {
    await super.goto('/cart');
  }

  async updateQuantity(itemIndex: number, quantity: number): Promise<void> {
    const quantityField = this.itemQuantityInput.nth(itemIndex);
    await this.fill(quantityField, String(quantity));
    await quantityField.press('Enter');
  }

  async removeItem(itemIndex = 0): Promise<void> {
    await this.click(this.removeItemButton.nth(itemIndex));
  }

  async proceedToCheckout(): Promise<void> {
    await this.click(this.checkoutButton);
  }

  async getSubtotal(): Promise<string> {
    return this.getText(this.subtotalAmount);
  }

  async getItemCount(): Promise<number> {
    return this.cartItems.count();
  }

  async assertHasItem(productName: string): Promise<void> {
    await expect(this.cartItemName.filter({ hasText: productName }).first()).toBeVisible();
  }

  async assertEmpty(): Promise<void> {
    await expect(this.emptyCartMessage).toBeVisible();
    await expect(this.cartItems).toHaveCount(0);
  }
}

