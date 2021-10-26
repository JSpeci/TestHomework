import { ILoginModel } from "../Abstract/ILoginModel";

export class LoginModel implements ILoginModel {

    LogMeOut() {
        alert("Now you shold be logged out");
    }

    get Token(): string | undefined {
        return "token"
    }
}