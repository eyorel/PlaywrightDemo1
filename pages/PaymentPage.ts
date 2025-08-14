import { type Locator, type Page } from '@playwright/test';

export class PaymentPage {
    readonly page: Page;
    
    // Payment Form Selectors
    readonly nameOnCardInput: Locator;
    readonly cardNumberInput: Locator;
    readonly cvcInput: Locator;
    readonly expiryMonthInput: Locator;
    readonly expiryYearInput: Locator;
    readonly payAndConfirmButton: Locator;
    
    // Success Message
    readonly successMessage: Locator;
    readonly paymentForm: Locator;

    constructor(page: Page) {
        this.page = page;
        
        // Payment form inputs
        this.nameOnCardInput = page.locator('input[data-qa="name-on-card"]');
        this.cardNumberInput = page.locator('input[data-qa="card-number"]');
        this.cvcInput = page.locator('input[data-qa="cvc"]');
        this.expiryMonthInput = page.locator('input[data-qa="expiry-month"]');
        this.expiryYearInput = page.locator('input[data-qa="expiry-year"]');
        
        // Action buttons
        this.payAndConfirmButton = page.locator('button[data-qa="pay-button"]');
        
        // Success elements
        this.successMessage = page.locator('#success_message');
        this.paymentForm = page.locator('#payment-form');
    }
}
