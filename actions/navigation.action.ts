import { type Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';

export class NavigationAction {
    private page: Page;
    private homePage: HomePage;
    private productsPage: ProductsPage;
    private cartPage: CartPage;

    constructor(page: Page) {
        this.page = page;
        this.homePage = new HomePage(page);
        this.productsPage = new ProductsPage(page);
        this.cartPage = new CartPage(page);
    }

    async navigateToHomePage(): Promise<void> {
        await this.page.goto('https://automationexercise.com/');
    }

    async navigateToProducts(): Promise<void> {
        await this.homePage.productsLink.click();
    }

    async addProductToCart(productName: string): Promise<void> {
        const addToCartButton = this.productsPage.getProductAddToCartButton(productName);
        await addToCartButton.click();
    }

    async viewCart(): Promise<void> {
        await this.productsPage.viewCartLink.click();
    }

    async navigateToCart(): Promise<void> {
        // Handle multiple cart links by checking visibility and clicking the first visible one
        const cartSelectors = [
            this.homePage.cartLink,
            this.homePage.cartLinkAlternative,
            this.homePage.cartIcon
        ];

        for (const selector of cartSelectors) {
            try {
                if (await selector.isVisible({ timeout: 2000 })) {
                    await selector.click();
                    return;
                }
            } catch (error) {
                // Continue to next selector
                continue;
            }
        }

        // If no cart link is found, navigate directly to cart URL
        console.log('No visible cart link found, navigating directly to cart URL');
        await this.page.goto('https://automationexercise.com/view_cart');
    }

    async navigateToRegisterLogin(): Promise<void> {
        await this.cartPage.registerLoginLink.click();
    }

    async completeProductSelection(productName: string): Promise<void> {
        await this.navigateToProducts();
        await this.addProductToCart(productName);
        await this.viewCart();
    }
}
