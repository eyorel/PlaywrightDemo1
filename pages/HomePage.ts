import { Page } from '@playwright/test';

export class HomePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('https://automationexercise.com/');
  }

  async clickProductsLink() {
    await this.page.click('a[href="/products"]');
  }
}