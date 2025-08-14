import { type Locator, type Page } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    
    // Selectors
    readonly checkoutButton: Locator;
    readonly registerLoginLink: Locator;
    readonly cartTable: Locator;
    readonly removeProductButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkoutButton = page.locator('.check_out');
        this.registerLoginLink = page.getByRole('link', { name: 'Register / Login' });
        this.cartTable = page.locator('#cart_info_table');
        this.removeProductButton = page.locator('.cart_quantity_delete');
    }
}