import { type Locator, type Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    
    // Selectors
    readonly nameSignUp: Locator;
    readonly emailSignUp: Locator;
    readonly signUpButton: Locator;
    readonly registerLoginLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.nameSignUp = page.getByPlaceholder('Name');
        this.emailSignUp = page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address');
        this.signUpButton = page.locator('button[data-qa="signup-button"]');
        this.registerLoginLink = page.getByRole('link', { name: 'Register / Login' });
    }
}