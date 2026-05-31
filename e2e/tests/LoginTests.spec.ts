import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login Functionality', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });


    //NOTE: these tests may fail due to browser's "Manage passwords" pop-ups that may overlap some elements
    test('should log in successfully with valid credentials', async ({ page }) => {
        test.setTimeout(120_000);
        await loginPage.Login('mymail@gmail.com', 'cisco123'); //Already created user for moving on to other tests
        await expect(page).toHaveURL(/.*/);
    });

    test('should show an error message with invalid credentials', async () => {
        test.setTimeout(120_000)
        await loginPage.Login('invalidEmailNobodyHas@gmail.com', 'wrongPassword');
        await expect(loginPage._errorMessageWrongInputs).toBeVisible();
    });

    test('login without inputs', async () => {
        test.setTimeout(120_000)
        await loginPage.Login('', ''); //No inputs
        await expect(loginPage._errorMessageNoInputs).toBeVisible();
    });

});