import { AbstractResponse, ResponseStatusEnum } from "./Abstract";
import { ILoginModel } from "./ILoginModel";

export class ACommandHandler {

    constructor(protected readonly LoginModel: ILoginModel) { }

    public async resolveStatusForNotification<T extends AbstractResponse>(response: T, succesMessage: string) {
        if (response.responseStatus === ResponseStatusEnum.OK) {
            console.log("Success", succesMessage);
        }
        else {
            const err = ResponseStatusEnum[response.responseStatus] + " " + response.errorCode;
            console.error("Error", err);
        }
        return response;
    }

    protected ReadTokenFromCookie(): string {
        return "token";
    }

    public checkTokenBeforeCmd(token: string | undefined) {
        if (token === undefined) {
            this.LoginModel.LogMeOut();
        }
    }

    public async resolveStatusForAuth<T extends AbstractResponse>(response: T) {
        if (response.responseStatus !== ResponseStatusEnum.OK) {
            this.LoginModel.LogMeOut();
        }
        return response;
    }

}