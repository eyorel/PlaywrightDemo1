# PlaywrightDemo

Quick demo for a Playwright automation framework using Page Object Model + Actions pattern.

## First Time Setup

### Prerequisites
- Node.js (version 16 or higher)
- VS Code or Cursor IDE

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/eyorel/PlaywrightDemo1.git
   cd PlaywrightDemo1
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npx playwright install
   ```

4. **Install Playwright Extension (VS Code/Cursor)**
   - Open VS Code or Cursor
   - Go to Extensions (Ctrl+Shift+X / Cmd+Shift+X)
   - Search for "Playwright Test for VSCode"
   - Install the official Microsoft Playwright extension
   - This enables test running, debugging, and test generation directly from the IDE

### Project Structure

This project follows a **Page Object Model + Actions** pattern:

```
├── pages/                  # Page objects (selectors only)
│   ├── HomePage.ts
│   ├── LoginPage.ts
│   ├── RegistrationPage.ts
│   ├── ProductsPage.ts
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   ├── PaymentPage.ts
│   └── PaymentDonePage.ts
├── actions/               # Action classes (business logic)
│   ├── login.action.ts
│   ├── checkout.action.ts
│   ├── payment.action.ts
│   ├── orderConfirmation.action.ts
│   └── navigation.action.ts
├── tests/e2e/            # Test specifications
│   └── purchase.spec.ts
├── utils/                # Utilities and test data
│   ├── test-data.ts
│   └── test-utils.ts
└── playwright.config.ts  # Playwright configuration
```

### Running Tests

1. **Run all tests**
   ```bash
   npx playwright test
   ```

2. **Run tests in headed mode**
   ```bash
   npx playwright test --headed
   ```

3. **Run specific test file**
   ```bash
   npx playwright test tests/e2e/purchase.spec.ts
   ```

4. **Run tests with UI mode**
   ```bash
   npx playwright test --ui
   ```

5. **Generate test report**
   ```bash
   npx playwright show-report
   ```

### Architecture

- **Pages**: Contain only element selectors and basic element interactions
- **Actions**: Contain business logic and complex workflows
- **Tests**: Orchestrate actions to create end-to-end test scenarios

This separation provides better maintainability and reusability of test components.

### Test Data Generation

The framework includes robust random data generation to avoid conflicts:

- **Unique Email Generation**: Uses timestamp + crypto randomness to ensure truly unique emails
- **Random Names**: Combines common names with unique identifiers
- **Multiple Randomization Methods**: 
  - `generateRandomEmail()`: Timestamp-based uniqueness
  - `generateSimpleRandomEmail()`: Crypto-based randomness using `crypto.getRandomValues()`

This prevents "email already exists" errors during test execution.

### Registration Flow

The framework handles the complete user registration process:

1. **Initial Signup**: Fill name and email on the signup form
2. **Complete Registration**: After clicking signup, fill the complete registration form including:
   - Password (secure default provided)
   - Date of birth (set to over 19 years old)
   - Address information (first name, last name, address, city, state, zipcode)
   - Mobile number
3. **Account Creation**: Click "Create Account" to complete registration
4. **Auto Login**: User is automatically logged in after successful registration

This ensures tests don't timeout waiting for checkout buttons when the user needs to complete registration first.

### Handling Multiple Elements

The framework includes robust handling for pages with multiple similar elements:

- **Cart Navigation**: Uses multiple fallback selectors to handle different page states
- **Strict Mode Compliance**: Avoids "strict mode violation" errors by trying specific selectors first
- **Graceful Fallbacks**: If element selectors fail, falls back to direct URL navigation
- **Visibility Checks**: Only interacts with visible elements to avoid conflicts

This prevents "locator resolved to multiple elements" errors during test execution.

### Checkout Flow Optimization

The framework handles different checkout scenarios appropriately:

- **Guest Users**: Fill shipping details form before placing order
- **Logged-in Users**: Skip shipping details (already populated from registration) and proceed directly to place order
- **Smart Detection**: Automatically determines the appropriate flow based on user state
- **Timeout Prevention**: Avoids waiting for elements that don't exist in the current flow

This prevents timeout errors when trying to fill forms that aren't present for logged-in users.

### Payment Processing

The framework includes complete payment form handling:

- **Payment Page**: Dedicated page object for credit card form elements
- **Payment Action**: Handles filling payment details and order confirmation
- **Test Data**: Includes valid test credit card information
- **Success Verification**: Confirms successful order placement
- **Default Payment**: Provides default test payment details for quick testing

**Payment Form Fields:**
- Name on Card
- Card Number (Test Visa: 4111111111111111)
- CVC Code
- Expiration Month/Year
- Pay and Confirm Order button

The framework automatically fills all payment fields and confirms the order completion.

### Order Confirmation

The framework includes comprehensive order confirmation handling:

- **Order Confirmation Page**: Dedicated page object for final order confirmation elements
- **Order Verification**: Validates "Order Placed!" message and confirmation text
- **Element Validation**: Confirms all confirmation page elements are present
- **Final Actions**: Handles download invoice and continue button interactions
- **Complete Flow**: Ensures the entire purchase process is completed successfully

**Order Confirmation Elements:**
- "Order Placed!" title (green text)
- "Congratulations! Your order has been confirmed!" message
- Download Invoice button
- Continue button (final step)

The framework verifies successful order placement and completes the entire e-commerce flow.

## Version Control

### Git Ignore

The project includes a comprehensive `.gitignore` file that excludes:

- **Node.js**: `node_modules/`, npm logs, yarn logs
- **Playwright**: `test-results/`, `playwright-report/`, trace files, screenshots
- **Environment**: `.env` files, local configuration files
- **IDE**: `.vscode/`, `.idea/`, editor swap files
- **OS**: `.DS_Store`, `Thumbs.db`, system files
- **Build**: `dist/`, `build/`, TypeScript cache files
- **Logs**: All log files and temporary directories

### Best Practices

- **Commit Source Code**: All `.ts` files, `package.json`, `playwright.config.ts`
- **Ignore Test Artifacts**: Test results, reports, and screenshots are generated locally
- **Environment Variables**: Use `.env.example` for documentation, never commit actual `.env` files
- **Browser Downloads**: Playwright browsers can be re-downloaded, optionally ignore `/ms-playwright/`
