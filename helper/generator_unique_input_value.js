import { v4 as uuidv4 } from 'uuid';

export class GeneratorUniqueInputValue{
    constructor(){
        this.uniqueId = uuidv4()
    }

    generateUniqueLogin(){
        return "some_user_" + this.uniqueId
    }

    generateUniqueEmail(){
        return "example_" + this.uniqueId + "@example.com"
    }

}