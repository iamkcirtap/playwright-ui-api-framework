import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../common/BasePage';

export class ProductPage extends BasePage {
  readonly productTitle: Locator;
  readonly productPrice: Locator;
  readonly quantityInput: Locator;
  readonly sizeDropdown: Locator;
  readonly colorOptions: Locator;
  readonly addToCartButton: Locator;
  readonly successToast: Locator;

  constructor(page: Page) {
    super(page);
    this.productTitle = page.locator('[data-testid="product-title"], h1.product-title');
    this.productPrice = page.locator('[data-testid="product-price"], .product-price');
    this.quantityInput = page.locator('[data-testid="quantity-input"], input[name="quantity"]');
    this.sizeDropdown = page.locator('[data-testid="size-select"], select[name="size"]');
    this.colorOptions = page.locator('[data-testid="color-option"], .color-option');
    this.addToCartButton = page.locator('[data-testid="add-to-cart"], button:has-text("Add to cart")');
    this.successToast = page.locator('[data-testid="add-to-cart-success"], .toast-success, .alert-success');
  }

  async goto(productSlug: string): Promise<void> {
    await super.goto(`/product/${productSlug}`);
  }

  async selectSize(size: string): Promise<void> {
    if (await this.sizeDropdown.isVisible()) {
      await this.sizeDropdown.selectOption({ label: size });
    }
  }

  async selectColor(colorName: string): Promise<void> {
    const color = this.colorOptions.filter({ hasText: colorName }).first();
    if (await color.isVisible()) {
      await this.click(color);
    }
  }

  async setQuantity(quantity: number): Promise<void> {
    await this.fill(this.quantityInput, String(quantity));
  }

  async addToCart(options?: { quantity?: number; size?: string; color?: string }): Promise<void> {
    if (options?.size) {
      await this.selectSize(options.size);
    }

    if (options?.color) {
      await this.selectColor(options.color);
    }

    if (options?.quantity) {
      await this.setQuantity(options.quantity);
    }

    await this.click(this.addToCartButton);
  }

  async getProductName(): Promise<string> {
    return this.getText(this.productTitle);
  }

  async getProductPrice(): Promise<string> {
    return this.getText(this.productPrice);
  }

  async assertLoaded(): Promise<void> {
    await expect(this.productTitle).toBeVisible();
    await expect(this.productPrice).toBeVisible();
    await expect(this.addToCartButton).toBeVisible();
  }

  async assertAddedToCart(): Promise<void> {
    await expect(this.successToast).toBeVisible();
  }
}
