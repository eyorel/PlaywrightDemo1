import { type Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { generateRandomName, generateRandomEmail, generateSimpleRandomEmail } from '../utils/test-utils';

export class LoginAction {
    private page: Page;
    private loginPage: LoginPage;
    private registrationPage: RegistrationPage;

    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.registrationPage = new RegistrationPage(page);
    }

    async navigateToRegisterLogin(): Promise<void> {
        await this.loginPage.registerLoginLink.click();
    }

    async signUpWithRandomUser(): Promise<{ name: string; email: string }> {
        const randomName = generateRandomName();
        const randomEmail = generateRandomEmail();
        
        await this.loginPage.emailSignUp.fill(randomEmail);
        await this.loginPage.nameSignUp.fill(randomName);
        
        // Click signup button if it exists
        if (await this.loginPage.signUpButton.isVisible()) {
            await this.loginPage.signUpButton.click();
        }

        return { name: randomName, email: randomEmail };
    }

    async signUpWithCryptoRandomUser(): Promise<{ name: string; email: string }> {
        const randomName = generateRandomName();
        const randomEmail = generateSimpleRandomEmail();
        
        await this.loginPage.emailSignUp.fill(randomEmail);
        await this.loginPage.nameSignUp.fill(randomName);
        
        // Click signup button if it exists
        if (await this.loginPage.signUpButton.isVisible()) {
            await this.loginPage.signUpButton.click();
        }

        return { name: randomName, email: randomEmail };
    }

    async signUpWithCredentials(name: string, email: string): Promise<void> {
        await this.loginPage.emailSignUp.fill(email);
        await this.loginPage.nameSignUp.fill(name);
        
        if (await this.loginPage.signUpButton.isVisible()) {
            await this.loginPage.signUpButton.click();
        }
    }

    async completeRegistrationForm(userDetails: {
        password: string;
        firstName: string;
        lastName: string;
        address: string;
        city: string;
        state: string;
        zipcode: string;
        mobileNumber: string;
    }): Promise<void> {
        // Fill account information
        await this.registrationPage.titleMr.click(); // Select Mr.
        await this.registrationPage.passwordInput.fill(userDetails.password);
        
        // Set date of birth (over 19 years old)
        await this.registrationPage.daySelect.selectOption('15');
        await this.registrationPage.monthSelect.selectOption('6'); // June
        await this.registrationPage.yearSelect.selectOption('1990'); // 33 years old
        
        // Fill address information
        await this.registrationPage.firstNameInput.fill(userDetails.firstName);
        await this.registrationPage.lastNameInput.fill(userDetails.lastName);
        await this.registrationPage.address1Input.fill(userDetails.address);
        await this.registrationPage.countrySelect.selectOption('United States');
        await this.registrationPage.stateInput.fill(userDetails.state);
        await this.registrationPage.cityInput.fill(userDetails.city);
        await this.registrationPage.zipcodeInput.fill(userDetails.zipcode);
        await this.registrationPage.mobileNumberInput.fill(userDetails.mobileNumber);
        
        // Create account
        await this.registrationPage.createAccountButton.click();
    }

    async signUpAndCompleteRegistration(): Promise<{ name: string; email: string }> {
        const randomName = generateRandomName();
        const randomEmail = generateRandomEmail();
        
        // Step 1: Fill signup form
        await this.loginPage.emailSignUp.fill(randomEmail);
        await this.loginPage.nameSignUp.fill(randomName);
        
        if (await this.loginPage.signUpButton.isVisible()) {
            await this.loginPage.signUpButton.click();
        }

        // Step 2: Complete registration form
        const [firstName, lastName] = randomName.split(' ');
        await this.completeRegistrationForm({
            password: 'TestPassword123!',
            firstName: firstName || 'Test',
            lastName: lastName || 'User',
            address: '123 Test Street',
            city: 'Test City',
            state: 'Test State',
            zipcode: '12345',
            mobileNumber: '1234567890'
        });

        return { name: randomName, email: randomEmail };
    }

    async signUpAndCompleteRegistrationWithCrypto(): Promise<{ name: string; email: string }> {
        const randomName = generateRandomName();
        const randomEmail = generateSimpleRandomEmail();
        
        // Step 1: Fill signup form
        await this.loginPage.emailSignUp.fill(randomEmail);
        await this.loginPage.nameSignUp.fill(randomName);
        
        if (await this.loginPage.signUpButton.isVisible()) {
            await this.loginPage.signUpButton.click();
        }

        // Step 2: Complete registration form
        const [firstName, lastName] = randomName.split(' ');
        await this.completeRegistrationForm({
            password: 'TestPassword123!',
            firstName: firstName || 'Test',
            lastName: lastName || 'User',
            address: '123 Test Street',
            city: 'Test City',
            state: 'Test State',
            zipcode: '12345',
            mobileNumber: '1234567890'
        });

        return { name: randomName, email: randomEmail };
    }
}
