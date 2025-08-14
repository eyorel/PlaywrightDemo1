import { type Page } from '@playwright/test';
import { CheckoutPage } from '../pages/CheckoutPage';
import { CartPage } from '../pages/CartPage';

export class CheckoutAction {
    private page: Page;
    private checkoutPage: CheckoutPage;
    private cartPage: CartPage;

    constructor(page: Page) {
        this.page = page;
        this.checkoutPage = new CheckoutPage(page);
        this.cartPage = new CartPage(page);
    }

    async proceedToCheckoutFromCart(): Promise<void> {
        await this.cartPage.checkoutButton.click();
    }

    async fillShippingDetails(name: string, email: string, address: string): Promise<void> {
        await this.checkoutPage.nameInput.fill(name);
        await this.checkoutPage.emailInput.fill(email);
        await this.checkoutPage.addressTextarea.fill(address);
    }

    async placeOrder(): Promise<void> {
        await this.checkoutPage.placeOrderButton.click();
    }

    async completeCheckoutProcess(customerDetails: {
        name: string;
        email: string;
        address: string;
    }): Promise<void> {
        await this.proceedToCheckoutFromCart();
        await this.fillShippingDetails(
            customerDetails.name,
            customerDetails.email,
            customerDetails.address
        );
        await this.placeOrder();
    }

    async completeCheckoutForLoggedInUser(): Promise<void> {
        // For logged-in users, information should already be populated
        // Just proceed to place the order
        await this.proceedToCheckoutFromCart();
        await this.placeOrder();
    }

    async placeOrderDirectly(): Promise<void> {
        // Just click place order without filling details (for logged-in users)
        await this.checkoutPage.placeOrderButton.click();
    }
}
