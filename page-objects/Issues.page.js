export class IssuesPage{
    constructor(page){
        this.page = page
        this.header = page.locator('div#content h2')
        this.idLink = page.locator('th.id > a')
        this.firstResultId = page.locator('tbody > tr:nth-child(1) > td.id > a')
        this.lastPageOfResults = page.locator('//li[@class="next page"]/preceding-sibling::li[1]')
        this.lastResultId = page.locator('tbody > tr:last-child > td.id > a')
    }

    async clickOnIdColumnLink(){
        await this.idLink.click()
    }

    async goToTheLastResultsPage(){
        await this.lastPageOfResults.click()
    }
}