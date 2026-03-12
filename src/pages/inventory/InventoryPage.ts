import { expect, Locator, Page } from '@playwright/test';
import { env } from '../../config/env';
import { BasePage } from '../common/BasePage';

export class InventoryPage extends BasePage {
    readonly itemList: Locator;
    readonly cartIcon: Locator;
    readonly filterButton: Locator;
    readonly productName: Locator;
    readonly productDescription: Locator;
    readonly productPrice: Locator;
    readonly productImage: Locator;
    readonly addToCartButton: Locator;
    readonly burgerMenu: Locator;

    constructor(page: Page) {
        super(page);
        this.itemList = page.locator('.inventory_list');
        this.cartIcon = page.locator('.shopping_cart_link');
        this.filterButton = page.locator('.product_sort_container');
        this.productName = page.locator('.inventory_item_name');
        this.productDescription = page.locator('.inventory_item_desc');
        this.productPrice = page.locator('.inventory_item_price');
        this.productImage = page.locator('.inventory_item_img');
        this.addToCartButton = page.locator('.btn_inventory');
        this.burgerMenu = page.locator('.bm-burger-button');
    }

    async goto(path: string): Promise<void> {
        await super.goto(path);
    }

    async assertLoaded(): Promise<void> {
        await expect(this.itemList).toBeVisible();
        await expect(this.cartIcon).toBeVisible();
        await expect(this.filterButton).toBeVisible();
    }

    async filterProducts(filterOption: string): Promise<void> {
        await this.filterButton.selectOption(filterOption);
    }
    
}
