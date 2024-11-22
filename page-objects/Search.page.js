export class SearchPage{
    constructor(page){
        this.page = page
        this.searchHeader = page.getByRole('heading', { name: 'Search' })
        this.searchInput = page.locator('input#search-input')
        this.allSearchCheckboxes = page.locator('input[type="checkbox"]')
        this.optionsSection = page.locator('legend[onclick="toggleFieldset(this);"]')
        this.openIssuesCheckbox = page.locator('input#open_issues[type="checkbox"]')
        this.submitSearchBtn = page.locator('input[type="submit"]')
        this.firstSearchResult = page.locator('dl#search-results dt:nth-child(1)')
    }

    getRadioBtnOptionByText(radioBtnText){
        return this.page.locator(`label:has-text("${radioBtnText}") input[type="radio"]`)
    }

    getCheckboxByText(checkboxText){
        return this.page.locator(`label:has-text("${checkboxText}") input[type="checkbox"]`);
    }

    async fillSearchInput(keyword){
        await this.searchInput.fill(keyword)
    }

    async checkMultipleSearchCheckboxes(checkboxesToCheckTexts = []) {
        await this.#uncheckAllCheckboxes()
    
        for (const text of checkboxesToCheckTexts) {
            const checkboxToCheck = this.getCheckboxByText(text)
            const checkboxCount = await checkboxToCheck.count();
            if (checkboxCount === 0) {
                console.warn(`Checkbox with label "${text}" not found`);
                continue;
            }
            await checkboxToCheck.setChecked(true);
        }
    }    

    async expandOptionsSection(){
        await this.optionsSection.click()
        await this.openIssuesCheckbox.waitFor('visible')
    }

    async checkOpenIssuesCheckbox(checkboxState){
        await this.openIssuesCheckbox.setChecked(checkboxState)
    }

    async selectOptionRadioBtn(radioBtnName){
        const radioBtnToSelect = this.getRadioBtnOptionByText(radioBtnName)
        radioBtnToSelect.waitFor("visible")
        await radioBtnToSelect.check()
    }

    async submitSearch(){
        await this.submitSearchBtn.click()
    }

    async #uncheckAllCheckboxes() {
        const count = await this.allSearchCheckboxes.count();
        for (let i = 0; i < count; i++) {
            const currentCheckbox = this.allSearchCheckboxes.nth(i);
            await currentCheckbox.setChecked(false);
        }
    }
}