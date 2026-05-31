import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';

test.describe('User Register Functionality', () => {
    let registerPage: RegisterPage;

    test.beforeEach(async ({ page }) => {
        registerPage = new RegisterPage(page);
        await registerPage.goto();
    });

    test('register successfully with valid credentials', async ({ page }) => {
        test.setTimeout(120_000);
        await registerPage.CreateAccount("Alex", "Smith",'alex@gmail.com', 'alex123');
        await expect(page).toHaveURL(/.*/);
    });

    test('register unsuccessfully with missing credentials', async () => {
        test.setTimeout(120_000)
        await registerPage.CreateAccount("", "", 'justmail@gmail.com', '');
        await expect(registerPage._errorMessage).toBeVisible();
    });

    test('register unsuccessfully without inputs', async () => {
        test.setTimeout(120_000)
        await registerPage.CreateAccount('', '', '', ''); //No inputs
        await expect(registerPage._errorMessage).toBeVisible();
    });

});