export class FaqPage{
    constructor(page){
        this.page = page
        this.header = page.getByRole('heading', { name: 'Frequently Asked Questions' })
        this.seactionOfQuestionLink = page.locator('ul[class="toc"] a[href="#Installing-and-Running-Redmine"]')
        this.seactionOfQuestionHeader = page.locator('div[class="wiki wiki-page"] h2:first-of-type')
        this.question = page.getByRole('heading', { name: 'Does Redmine work with Rails' })
        this.answer = page.locator('//h3[a[@href="#Does-Redmine-work-with-Rails-2xx"]]/following-sibling::p[1]')
        this.installationLink = page.locator('//h3[a[@href="#Does-Redmine-work-with-Rails-2xx"]]/following-sibling::p[1]/a')
    }

    async clickOnSectionOfQuestionLink(){
        await this.seactionOfQuestionLink.click()
    }

    async clickOnInstallationLink(){
        await this.installationLink.click()
    }
}