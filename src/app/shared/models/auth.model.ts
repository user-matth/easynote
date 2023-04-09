import { BaseResourceModel } from "./base-resource.model";

export class SignInModel extends BaseResourceModel {
    constructor(
        public login?: string,
        public name?: string
    ) {
        super()
    }
    static fromJson(json: any): SignInModel {
        return Object.assign(new SignInModel(), json);
    }
}

export class SignUpModel extends BaseResourceModel {
    constructor(
        public login?: string,
        public password?: string,
        public name?: string,
        public surname?: string
    ) {
        super()
    }
    static fromJson(json: any): SignUpModel {
        return Object.assign(new SignUpModel(), json);
    }
}