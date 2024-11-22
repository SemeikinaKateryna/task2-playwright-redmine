import { test, expect } from "@playwright/test"
import { MainPage } from "../page-objects/Main.page.js"
import { LoginPage } from "../page-objects/Login.page.js"
import { RegisterPage } from "../page-objects/Register.page.js"
import { IssuesPage } from "../page-objects/Issues.page.js"
import { SearchPage } from "../page-objects/Search.page.js"
import { FaqPage } from "../page-objects/Faq.page.js"
import { InstallingPage } from "../page-objects/Installing.page.js"
import { userRegistrationDetails } from "./../test_data/user_details.js"
import  { userLoginDetails } from "./../test_data/user_details.js"
import { searchDetails } from "../test_data/search_details.js"

test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('load')
    await expect(page).toHaveTitle(/Redmine/)
})

test("should register with valid credentials without email confirmation", async ({ page }) => {
    const mainPage = new MainPage(page)
    await mainPage.isLinkVisible('Register')
    await mainPage.clickOnLink('Register')

    await expect(page).toHaveURL(/register$/);
    
    const registerPage = new RegisterPage(page)
    await expect(registerPage.headerRegister).toBeVisible()
    await expect(registerPage.headerRegister).toHaveText('Register')

    await registerPage.fillRegisterRequiredInputs(userRegistrationDetails.login, userRegistrationDetails.password, userRegistrationDetails.firstName, userRegistrationDetails.lastName, userRegistrationDetails.email)
    await expect(registerPage.loginInput).toHaveValue(/^some_user_[a-f0-9-]+$/)
    await expect(registerPage.passwordInput).toHaveValue(userRegistrationDetails.password)
    await expect(registerPage.passwordConfirmationInput).toHaveValue(userRegistrationDetails.password)
    await expect(registerPage.firstNameInput).toHaveValue(userRegistrationDetails.firstName)
    await expect(registerPage.lastNameInput).toHaveValue(userRegistrationDetails.lastName)
    await expect(registerPage.emailInput).toHaveValue(/^example_[a-f0-9-]+@example\.com$/)

    await registerPage.selectLanguage(userRegistrationDetails.language)
    await expect(registerPage.languageDropdown).toHaveValue(userRegistrationDetails.language)

    await registerPage.checkHideMyEmailAddressCheckbox(userRegistrationDetails.hideMyEmailAddressCheckboxState)
    expect(await registerPage.hideMyEmailAddressCheckbox.isChecked()).toBe(userRegistrationDetails.hideMyEmailAddressCheckboxState)

    await registerPage.submitRegistration()

    const loginPage = new LoginPage(page)
    await expect(page).toHaveURL(/login/);

    await expect(loginPage.confirmEmailMessage).toBeVisible()
    const regex = new RegExp(`^Account was successfully created\\. An email containing the instructions to activate your account was sent to ${userRegistrationDetails.email}\\.$`);
    await expect(loginPage.confirmEmailMessage).toHaveText(regex)
})

test("should not log in with invalid credentials", async ({ page }) => {
    const mainPage = new MainPage(page)
    await mainPage.isLinkVisible('Sign in')
    await mainPage.clickOnLink('Sign in')

    await expect(page).toHaveURL(/login$/);
    
    const loginPage = new LoginPage(page)
    await loginPage.isLoginPasswordInputsVisible()
    await loginPage.fillSignInRequiredInputs(userLoginDetails.login, userLoginDetails.password)
    await expect(loginPage.loginInput).toHaveValue(userLoginDetails.login)
    await expect(loginPage.passwordInput).toHaveValue(userLoginDetails.password)

    await loginPage.checkStayLoggedInCheckbox(userLoginDetails.stayLoggedInCheckboxState)
    expect(await loginPage.stayLoggedInCheckbox.isChecked()).toBe(userLoginDetails.stayLoggedInCheckboxState)

    await loginPage.submitLogin()

    await expect(loginPage.errorInvalidLoginOrPasswordMessage).toBeVisible()
    await expect(loginPage.errorInvalidLoginOrPasswordMessage).toHaveText('Invalid user or password')
})

test("should sort issues by ID ASC", async ({ page }) => {
    const mainPage = new MainPage(page)
    await mainPage.isLinkVisible('Issues')
    await mainPage.clickOnLink('Issues')

    await expect(page).toHaveURL(/issues$/);

    const issuesPage = new IssuesPage(page)
    await expect(issuesPage.header).toBeVisible()
    await expect(issuesPage.header).toHaveText("Issues")

    await issuesPage.clickOnIdColumnLink()
    await expect(issuesPage.firstResultId).toBeVisible()
    
    const firstId = parseInt(await issuesPage.firstResultId.innerText(), 10)

    await issuesPage.goToTheLastResultsPage()
    await expect(issuesPage.lastResultId).toBeVisible()

    const lastId = parseInt(await issuesPage.lastResultId.innerText(), 10)

    expect(firstId).toBeLessThan(lastId)
})

test("should search by keyword with filters", async ({ page }) => {
    const mainPage = new MainPage(page)
    await mainPage.isLinkVisible('Search')
    await mainPage.clickOnLink('Search')

    await expect(page).toHaveURL(/search/);

    const searchPage = new SearchPage(page)
    await expect(searchPage.searchHeader).toBeVisible()
    await expect(searchPage.searchHeader).toHaveText('Search')

    await searchPage.fillSearchInput(searchDetails.keyword)
    await expect(searchPage.searchInput).toHaveValue(searchDetails.keyword)

    await searchPage.checkMultipleSearchCheckboxes(searchDetails.checkboxesToCheckTexts)
    for (let i = 0; i < searchDetails.checkboxesToCheckTexts.length; i++) {
        await expect(searchPage.getCheckboxByText(searchDetails.checkboxesToCheckTexts[i])).toBeChecked()
    }

    await searchPage.expandOptionsSection()

    await searchPage.checkOpenIssuesCheckbox(searchDetails.openIssuesOnlyCheckboxState)
    expect(await searchPage.openIssuesCheckbox.isChecked()).toBe(searchDetails.openIssuesOnlyCheckboxState)

    await searchPage.selectOptionRadioBtn(searchDetails.radioBtnToSelectText)
    await expect(searchPage.getRadioBtnOptionByText(searchDetails.radioBtnToSelectText)).toBeChecked()

    await searchPage.submitSearch()
    const regex = new RegExp(searchDetails.keyword, "i") 
    await expect(page).toHaveURL(regex)
    await expect(searchPage.firstSearchResult).toHaveText(regex)
})

test("should verify link to the installation guide in FAQ section", async({ page }) => {
    const mainPage = new MainPage(page)
    await mainPage.isLinkVisible('FAQ')
    await mainPage.clickOnLink('FAQ')

    const faqPage = new FaqPage(page)
    await expect(faqPage.header).toBeVisible()
    await expect(faqPage.header).toHaveText(/Frequently Asked Questions/)

    await faqPage.clickOnSectionOfQuestionLink()
    await expect(faqPage.seactionOfQuestionHeader).toBeInViewport()
    await expect(faqPage.seactionOfQuestionHeader).toHaveText(/Installing and Running Redmine/)

    await expect(faqPage.question).toBeInViewport()
    await expect(faqPage.question).toHaveText(/Does Redmine work with Rails 2.x.x?/)

    await expect(faqPage.answer).toBeInViewport()
    await expect(faqPage.answer).toHaveText(/Installation/)
    await expect(faqPage.installationLink).toBeVisible()

    await faqPage.clickOnInstallationLink()

    await expect(page).toHaveURL(/RedmineInstall$/)

    const installingPage = new InstallingPage(page)
    await expect(installingPage.header).toHaveText(/Installing Redmine/)
})

