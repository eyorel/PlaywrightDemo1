import { type Locator, type Page } from '@playwright/test';

export class ProductsPage {
    readonly page: Page;
    
    // Selectors
    readonly viewCartLink: Locator;
    readonly continueShoppingButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.viewCartLink = page.getByRole('link', { name: 'View Cart' });
        this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
    }

    // Dynamic selector methods
    getProductAddToCartButton(productName: string): Locator {
        return this.page.locator(`//div[contains(@class, 'productinfo') and .//p[contains(text(), '${productName}')]]//a[contains(text(), 'Add to cart')]`);
    }

    getProductByName(productName: string): Locator {
        return this.page.locator(`//div[contains(@class, 'productinfo') and .//p[contains(text(), '${productName}')]]`);
    }
}