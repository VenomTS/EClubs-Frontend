import { test, expect } from '@playwright/test';
import {HomePage} from "../pages/HomePage";
import {LoginPage} from "../pages/LoginPage";

test.describe('Home Page Functionalities', () => {
    let homePage: HomePage;
    const clubName = `testClub ${Date.now()}`

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        homePage = new HomePage(page);
        await homePage.goto();

        await loginPage.Login("zemrija@gmail.com", "Zemrija123");
        test.setTimeout(10_000);
    });


    test('attempt to create without inputs', async () => {
        await homePage.CreateClub(''); //No inputs
        await expect(homePage._createClubErrorMessage).toBeVisible();
    });

    test('successfully create club', async () => {
        await homePage.CreateClub(clubName);
        await expect(homePage.getClubName(clubName)).toBeVisible();
    })

    test('open a created club', async ({page}) => {
        await homePage.getClubName(clubName).first().click();
        await expect(page).toHaveURL(/\/localhost:3000\/clubs\/.*/); //Since IDs are random, this is the only way to possibly checked if URL actually changes
    })

    test('send a message in stream', async () => {
        await homePage.getClubName(clubName).first().click();
        await homePage.WriteMessageOnStream("Test message")
        await expect(homePage._checkMessage).toBeVisible();
    })
});