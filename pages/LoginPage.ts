import { expect, type Locator, type Page } from '@playwright/test';
import { generateRandomName, generateRandomEmail } from '../utils/test-utils';

export class LoginPage {
    readonly page: Page;
    readonly nameSignUp: Locator;
    readonly emailSignUp: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameSignUp = page.getByPlaceholder('Name') 
    this.emailSignUp = page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address')
  }
async signUpRandomUser(){
    const randomName = generateRandomName()
    const randomEmail = generateRandomEmail()
    await this.emailSignUp.fill(randomEmail)
    await this.nameSignUp.fill(randomName)
}


}