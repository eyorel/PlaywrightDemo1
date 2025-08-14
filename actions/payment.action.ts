import { type Page } from '@playwright/test';
import { PaymentPage } from '../pages/PaymentPage';

export class PaymentAction {
    private page: Page;
    private paymentPage: PaymentPage;

    constructor(page: Page) {
        this.page = page;
        this.paymentPage = new PaymentPage(page);
    }

    async fillPaymentDetails(paymentDetails: {
        nameOnCard: string;
        cardNumber: string;
        cvc: string;
        expiryMonth: string;
        expiryYear: string;
    }): Promise<void> {
        await this.paymentPage.nameOnCardInput.fill(paymentDetails.nameOnCard);
        await this.paymentPage.cardNumberInput.fill(paymentDetails.cardNumber);
        await this.paymentPage.cvcInput.fill(paymentDetails.cvc);
        await this.paymentPage.expiryMonthInput.fill(paymentDetails.expiryMonth);
        await this.paymentPage.expiryYearInput.fill(paymentDetails.expiryYear);
    }

    async payAndConfirmOrder(): Promise<void> {
        await this.paymentPage.payAndConfirmButton.click();
    }

    async completePayment(paymentDetails: {
        nameOnCard: string;
        cardNumber: string;
        cvc: string;
        expiryMonth: string;
        expiryYear: string;
    }): Promise<void> {
        await this.fillPaymentDetails(paymentDetails);
        await this.payAndConfirmOrder();
    }

    async completePaymentWithDefaults(): Promise<void> {
        const defaultPaymentDetails = {
            nameOnCard: 'John Doe',
            cardNumber: '4111111111111111', // Test Visa card number
            cvc: '123',
            expiryMonth: '12',
            expiryYear: '2025'
        };
        
        await this.completePayment(defaultPaymentDetails);
    }

    async isSuccessMessageVisible(): Promise<boolean> {
        try {
            return await this.paymentPage.successMessage.isVisible({ timeout: 5000 });
        } catch {
            return false;
        }
    }
}
