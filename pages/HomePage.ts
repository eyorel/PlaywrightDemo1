import { type Locator, type Page } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    
    // Selectors
    readonly productsLink: Locator;
    readonly homeLink: Locator;
    readonly cartLink: Locator;
    readonly cartLinkAlternative: Locator;
    readonly cartIcon: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productsLink = page.locator('a[href="/products"]');
        this.homeLink = page.locator('a[href="/"]');
        // Multiple cart link options to handle different page states
        this.cartLink = page.locator('header a[href="/view_cart"]').first();
        this.cartLinkAlternative = page.getByRole('link', { name: 'Cart' }).first();
        this.cartIcon = page.locator('.fa-shopping-cart').first();
    }
}