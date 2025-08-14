import { type Locator, type Page } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    
    // Selectors
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly addressTextarea: Locator;
    readonly placeOrderButton: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.nameInput = page.locator('input[data-qa="name"]');
        this.emailInput = page.locator('input[data-qa="email"]');
        this.addressTextarea = page.locator('textarea[data-qa="address"]');
        this.placeOrderButton = page.locator('a.btn.btn-default.check_out');
        this.checkoutButton = page.locator('.check_out');
    }
}