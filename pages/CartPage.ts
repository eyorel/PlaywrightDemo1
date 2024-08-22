import { Page } from '@playwright/test';

export class CartPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async proceedToCheckout() {
    await this.page.click('.check_out');
    await this.page.getByRole('link', { name: 'Register / Login' }).click()
  }
}