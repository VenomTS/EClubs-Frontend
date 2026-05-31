import { type Locator, type Page } from '@playwright/test';

export class LoginPage {
    readonly _page: Page;
    readonly _emailInput: Locator;
    readonly _passwordInput: Locator;
    readonly _loginButton: Locator;
    readonly _errorMessageWrongInputs: Locator;
    readonly _errorMessageNoInputs: Locator;

    //Locators:
    constructor(page: Page) {
        this._page = page;
        this._emailInput = page.locator('input[type="email"]');
        this._passwordInput = page.locator('input[type="password"]');
        this._loginButton = page.locator('[type="submit"]');
        this._errorMessageWrongInputs = page.getByText('Neispravan email ili lozinka');
        this._errorMessageNoInputs = page.getByText('Email i lozinka su obavezni.');
    }

    async goto() {
        await this._page.goto('http://localhost:3000/login');
    }

    async Login(email: string, password: string) {
        //NOTE: the sequence of inputs is mixed up to avoid browser's "manage passwords" pop-ups from blocking the buttons:
        await this._passwordInput.fill(password);
        await this._emailInput.fill(email);
        await this._loginButton.click();
    }
}