import { Page } from '@playwright/test';

export class ProductsPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async addProductToCart(productName: string) {
    await this.page.click(`//div[contains(@class, 'productinfo') and .//p[contains(text(), '${productName}')]]//a[contains(text(), 'Add to cart')]`);
  }

  async viewCart() {
    await this.page.getByRole('link', { name: 'View Cart' }).click();
  }
}