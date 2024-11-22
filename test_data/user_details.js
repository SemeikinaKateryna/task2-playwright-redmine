import { GeneratorUniqueInputValue } from "../helper/generator_unique_input_value.js"

const generatorUniqueInputValue = new GeneratorUniqueInputValue()

export const userLoginDetails = {
    login: "some_user123",
    password: process.env.USER_PASSWORD,
    stayLoggedInCheckboxState: true
}

export const userRegistrationDetails = {
    login: generatorUniqueInputValue.generateUniqueLogin(),
    password: process.env.USER_PASSWORD,
    firstName: "John",
    lastName: "Doe",
    email: generatorUniqueInputValue.generateUniqueEmail(),
    language: "uk",
    hideMyEmailAddressCheckboxState: false
}