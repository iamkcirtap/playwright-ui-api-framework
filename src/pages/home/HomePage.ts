import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../common/BasePage';

export class HomePage extends BasePage {
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly productCards: Locator;
  readonly cartLink: Locator;
  readonly categoryMenu: Locator;
  readonly featuredSection: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = page.locator('[data-testid="search-input"], input[type="search"], input[name="q"]');
    this.searchButton = page.locator('[data-testid="search-button"], button[aria-label="Search"]');
    this.productCards = page.locator('[data-testid="product-card"], .product-card');
    this.cartLink = page.locator('[data-testid="cart-link"], a[href*="cart"]');
    this.categoryMenu = page.locator('[data-testid="category-menu"], nav.categories');
    this.featuredSection = page.locator('[data-testid="featured-products"], section.featured-products');
  }

  async goto(): Promise<void> {
    await super.goto('/');
  }

  async searchProduct(keyword: string): Promise<void> {
    await this.fill(this.searchInput, keyword);
    if (await this.searchButton.isVisible()) {
      await this.click(this.searchButton);
      return;
    }

    await this.searchInput.press('Enter');
  }

  async openProductByName(productName: string): Promise<void> {
    const product = this.page.locator('[data-testid="product-card"], .product-card').filter({ hasText: productName }).first();
    await this.click(product);
  }

  async openCart(): Promise<void> {
    await this.click(this.cartLink);
  }

  async assertLoaded(): Promise<void> {
    await expect(this.categoryMenu).toBeVisible();
    await expect(this.featuredSection.or(this.productCards.first())).toBeVisible();
  }

  async assertSearchResultsContain(productName: string): Promise<void> {
    const matchedProduct = this.productCards.filter({ hasText: productName }).first();
    await expect(matchedProduct).toBeVisible();
  }
}
