import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { ProductsPage } from '../../pages/ProductsPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { LoginPage } from '../../pages/LoginPage';
import { TEST_DATA } from '../../utils/test-data';

test.describe('E-commerce Purchase Flow', () => {
    let homePage: HomePage;
    let productsPage: ProductsPage;
    let cartPage: CartPage;
    let checkoutPage: CheckoutPage;
    let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    loginPage = new LoginPage(page)

    await homePage.navigate();
  });

  test('should complete a purchase', async ({ page }) => {
    await homePage.clickProductsLink();
    await productsPage.addProductToCart(TEST_DATA.productName);
    await productsPage.viewCart();
    await cartPage.proceedToCheckout();
    await loginPage.signUpRandomUser();
    
    await checkoutPage.fillShippingDetails(
      TEST_DATA.customerName,
      TEST_DATA.customerEmail,
      TEST_DATA.shippingAddress
    );
    await checkoutPage.placeOrder();

    // Todo some assertions
  });
});