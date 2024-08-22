import { expect, type Locator, type Page } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }


  async fillShippingDetails(name: string, email: string, address: string) {
    await this.page.fill('input[data-qa="name"]', name);
    await this.page.fill('input[data-qa="email"]', email);
    await this.page.fill('textarea[data-qa="address"]', address);
  }

  async placeOrder() {
    await this.page.click('a.btn.btn-default.check_out');
  }
}