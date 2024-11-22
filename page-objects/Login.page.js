import { expect } from "@playwright/test"

export class LoginPage{
    constructor(page){
        this.page = page;
        this.loginInput = page.getByLabel('Login')
        this.passwordInput = page.getByLabel('Password')
        this.stayLoggedInCheckbox = page.getByText('Stay logged in')
        this.submitLoginBtn = page.getByRole('button', { name: 'Login' })
        this.errorInvalidLoginOrPasswordMessage = page.getByText('Invalid user or password')
        this.confirmEmailMessage = page.locator('div[id="content"] > div[id="flash_notice"]')
    }

    async isLoginPasswordInputsVisible(){
        await expect(this.loginInput).toBeVisible()
        await expect(this.passwordInput).toBeVisible()
    }

    async fillSignInRequiredInputs(loginValue, passwordValue){
        await this.loginInput.fill(loginValue)
        await this.passwordInput.fill(passwordValue)
    }

    async checkStayLoggedInCheckbox(stayLoggedInCheckboxState){
        await this.stayLoggedInCheckbox.setChecked(stayLoggedInCheckboxState)
    }

    async submitLogin(){
        await this.submitLoginBtn.click()
    }
}