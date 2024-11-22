export class RegisterPage{
    constructor(page){
        this.page = page;
        this.headerRegister = page.getByRole('heading', { name: 'Register' });
        this.loginInput = page.getByLabel('Login *')
        this.passwordInput = page.getByLabel('Password *')
        this.passwordConfirmationInput = page.getByLabel('Confirmation *')
        this.firstNameInput = page.getByLabel('First name *')
        this.lastNameInput = page.getByLabel('Last name *')
        this.emailInput = page.getByLabel('Email *')
        this.hideMyEmailAddressCheckbox = page.getByLabel('Hide my email address')
        this.languageDropdown = page.getByLabel('Language')
        this.submitRegistrationBtn = page.getByRole('button', { name: 'Submit' })
    }

    async fillRegisterRequiredInputs(loginValue, passwordValue, firstNameValue, lastNameValue, emailValue){
        await this.loginInput.fill(loginValue)
        await this.passwordInput.fill(passwordValue)
        await this.passwordConfirmationInput.fill(passwordValue)
        await this.firstNameInput.fill(firstNameValue)
        await this.lastNameInput.fill(lastNameValue)
        await this.emailInput.fill(emailValue)
    }

    async selectLanguage(languageOptionValue){
        await this.languageDropdown.selectOption(languageOptionValue)
    }

    async checkHideMyEmailAddressCheckbox(hideMyEmailAddressCheckboxState){
        await this.hideMyEmailAddressCheckbox.setChecked(hideMyEmailAddressCheckboxState)
    }

    async submitRegistration(){
        await this.submitRegistrationBtn.click()
    }
}