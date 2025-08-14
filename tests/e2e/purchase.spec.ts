import { test, expect } from '@playwright/test';
import { NavigationAction } from '../../actions/navigation.action';
import { LoginAction } from '../../actions/login.action';
import { CheckoutAction } from '../../actions/checkout.action';
import { PaymentAction } from '../../actions/payment.action';
import { OrderConfirmationAction } from '../../actions/orderConfirmation.action';
import { TEST_DATA } from '../../utils/test-data';

test.describe('E-commerce Purchase Flow', () => {
    let navigationAction: NavigationAction;
    let loginAction: LoginAction;
    let checkoutAction: CheckoutAction;
    let paymentAction: PaymentAction;
    let orderConfirmationAction: OrderConfirmationAction;

    test.beforeEach(async ({ page }) => {
        navigationAction = new NavigationAction(page);
        loginAction = new LoginAction(page);
        checkoutAction = new CheckoutAction(page);
        paymentAction = new PaymentAction(page);
        orderConfirmationAction = new OrderConfirmationAction(page);

        await navigationAction.navigateToHomePage();
    });

    test('should complete a purchase', async ({ page }) => {
        // Navigate to products and add item to cart
        await navigationAction.completeProductSelection(TEST_DATA.productName);
        
        // Proceed to checkout and handle registration
        await checkoutAction.proceedToCheckoutFromCart();
        await navigationAction.navigateToRegisterLogin();
        
        // Complete full registration process
        const userCredentials = await loginAction.signUpAndCompleteRegistration();
        
        // After successful registration, user should be logged in
        // Navigate back to cart and complete checkout
        await navigationAction.navigateToHomePage();
        await navigationAction.navigateToCart();
        
        // For logged-in users, just proceed to place order directly
        await checkoutAction.completeCheckoutForLoggedInUser();
        
        // Complete payment process
        await paymentAction.completePayment(TEST_DATA.payment);

        // Verify order confirmation page and complete the flow
        await orderConfirmationAction.verifyOrderConfirmationElements();
        await orderConfirmationAction.completeOrderConfirmation();
        
        // Final verification
        console.log('✅ Purchase completed successfully!');
    });

    test('should complete a purchase with crypto-random user', async ({ page }) => {
        // Navigate to products and add item to cart
        await navigationAction.completeProductSelection(TEST_DATA.productName);
        
        // Proceed to checkout and handle registration with crypto-random user
        await checkoutAction.proceedToCheckoutFromCart();
        await navigationAction.navigateToRegisterLogin();
        
        // Complete full registration process with crypto-random user
        const userCredentials = await loginAction.signUpAndCompleteRegistrationWithCrypto();
        
        // After successful registration, user should be logged in
        // Navigate back to cart and complete checkout
        await navigationAction.navigateToHomePage();
        await navigationAction.navigateToCart();
        
        // For logged-in users, just proceed to place order directly
        await checkoutAction.completeCheckoutForLoggedInUser();
        
        // Complete payment process
        await paymentAction.completePayment(TEST_DATA.payment);

        // Verify order confirmation page and complete the flow
        await orderConfirmationAction.verifyOrderConfirmationElements();
        await orderConfirmationAction.completeOrderConfirmation();
        
        // Final verification
        console.log(`✅ Purchase completed successfully with user: ${userCredentials.name}, email: ${userCredentials.email}`);
    });
});