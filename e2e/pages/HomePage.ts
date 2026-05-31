import { type Locator, type Page } from '@playwright/test';

export class HomePage {
    readonly _page: Page;
    readonly _newClubButton: Locator;
    readonly _clubName: Locator;
    readonly _clubDay: Locator;
    readonly _clubTimeSlot: Locator;
    readonly _createButton: Locator;
    readonly _menuDay: Locator;
    readonly _menuTimeSlot: Locator;
    readonly _createClubErrorMessage: Locator;
    readonly _addMessageInput: Locator;
    readonly _sendMessageButton: Locator;
    readonly _checkMessage: Locator;


    //Locators:
    constructor(page: Page) {
        this._page = page;
        this._newClubButton = page.getByLabel("Create Club");
        this._clubName = page.getByPlaceholder("Šah klub...");
        this._clubDay = page.getByText("Odaberi Dan");
        this._menuDay = page.getByLabel("Ponedjeljak");
        this._clubTimeSlot = page.getByText("Odaberi čas");
        this._menuTimeSlot = page.getByText("čas");
        this._createButton = page.getByLabel("Kreiraj");
        this._createClubErrorMessage = page.getByText("Molimo popunite sva polja");
        this._addMessageInput = page.getByPlaceholder("Napiši poruku");
        this._sendMessageButton = page.getByText("Postavi");
        this._checkMessage = page.getByText("Test message"); //Same here
    }

    async goto() {
        await this._page.goto('http://localhost:3000/login');
    }

    getClubName(clubName: string)
    {
        return this._page.getByText(clubName);
    }

    async CreateClub(clubName: string) {
        await this._newClubButton.click();
        await this._clubName.fill(clubName);
        await this._clubDay.click();
        await this._menuDay.click();
        await this._clubTimeSlot.click();
        await this._menuTimeSlot.last().click();
        await this._createButton.click();
    }

    async WriteMessageOnStream(message: string)
    {
        await this._addMessageInput.click();
        await this._addMessageInput.fill(message);
        await this._sendMessageButton.click();
    }

}