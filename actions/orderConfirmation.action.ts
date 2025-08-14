import { type Page, expect } from '@playwright/test';
import { PaymentDonePage } from '../pages/PaymentDonePage';

export class OrderConfirmationAction {
    private page: Page;
    private paymentDonePage: PaymentDonePage;

    constructor(page: Page) {
        this.page = page;
        this.paymentDonePage = new PaymentDonePage(page);
    }

    async verifyOrderPlaced(): Promise<void> {
        // Verify the order placed title is visible
        await expect(this.paymentDonePage.orderPlacedTitle).toBeVisible();
        
        // Verify the title text
        await expect(this.paymentDonePage.orderPlacedTitle).toHaveText('Order Placed!');
        
        // Verify congratulations message is visible
        await expect(this.paymentDonePage.congratulationsMessage).toBeVisible();
    }

    async verifyOrderConfirmationElements(): Promise<void> {
        // Verify all confirmation elements are present
        await expect(this.paymentDonePage.orderPlacedTitle).toBeVisible();
        await expect(this.paymentDonePage.congratulationsMessage).toBeVisible();
        await expect(this.paymentDonePage.downloadInvoiceButton).toBeVisible();
        await expect(this.paymentDonePage.continueButton).toBeVisible();
    }

    async downloadInvoice(): Promise<void> {
        await this.paymentDonePage.downloadInvoiceButton.click();
    }

    async clickContinue(): Promise<void> {
        await this.paymentDonePage.continueButton.click();
    }

    async completeOrderConfirmation(): Promise<void> {
        // Verify order confirmation
        await this.verifyOrderPlaced();
        
        // Click continue to finish the flow
        await this.clickContinue();
    }

    async getOrderPlacedText(): Promise<string> {
        return await this.paymentDonePage.orderPlacedTitle.textContent() || '';
    }

    async getCongratulationsText(): Promise<string> {
        return await this.paymentDonePage.congratulationsMessage.textContent() || '';
    }

    async isOrderConfirmationPageVisible(): Promise<boolean> {
        try {
            await this.paymentDonePage.orderPlacedTitle.waitFor({ state: 'visible', timeout: 10000 });
            return true;
        } catch {
            return false;
        }
    }
}
