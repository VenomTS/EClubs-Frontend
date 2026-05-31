import { type Locator, type Page } from '@playwright/test';

export class RegisterPage {
    readonly _page: Page;
    readonly _firstNameInput: Locator;
    readonly _lastNameInput: Locator;
    readonly _emailInput: Locator;
    readonly _passwordInput: Locator;
    readonly _registerButton: Locator;
    readonly _errorMessage: Locator;

    //Locators:
    constructor(page: Page) {
        this._page = page;
        this._firstNameInput = page.getByPlaceholder('John');
        this._lastNameInput = page.getByPlaceholder('Doe');
        this._emailInput = page.locator('input[type="email"]');
        this._passwordInput = page.locator('input[type="password"]');
        this._registerButton = page.locator('[type="submit"]');
        this._errorMessage = page.getByText('All fields are required.');
    }

    async goto() {
        await this._page.goto('http://localhost:3000/register');
    }

    async CreateAccount(firstName: string, lastName: string, email: string, password: string) {
        //NOTE: the sequence of inputs is mixed up to avoid browser's "manage passwords" pop-ups from blocking the buttons:
        await this._firstNameInput.fill(firstName);
        await this._lastNameInput.fill(lastName);
        await this._passwordInput.fill(password);
        await this._emailInput.fill(email);
        await this._registerButton.click();
    }

}