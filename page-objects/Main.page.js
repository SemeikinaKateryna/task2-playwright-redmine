import { expect } from "@playwright/test"

export class MainPage{

    constructor(page){
        this.page = page;
    }

    getLinkByName(linkName){
        return this.page.getByRole('link', { name: linkName })
    }

    async isLinkVisible(linkName){
        await expect(this.getLinkByName(linkName)).toBeVisible()
    }

    async clickOnLink(linkName){
        await this.getLinkByName(linkName).click()
    }
}

