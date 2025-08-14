import { type Locator, type Page } from '@playwright/test';

export class PaymentDonePage {
    readonly page: Page;
    
    // Order confirmation elements
    readonly orderPlacedTitle: Locator;
    readonly congratulationsMessage: Locator;
    readonly downloadInvoiceButton: Locator;
    readonly continueButton: Locator;

    constructor(page: Page) {
        this.page = page;
        
        // Order confirmation elements
        this.orderPlacedTitle = page.locator('h2[data-qa="order-placed"]');
        this.congratulationsMessage = page.locator('p').filter({ hasText: 'Congratulations! Your order has been confirmed!' });
        this.downloadInvoiceButton = page.locator('a.btn.btn-default.check_out').filter({ hasText: 'Download Invoice' });
        this.continueButton = page.locator('a[data-qa="continue-button"]');
    }
}
