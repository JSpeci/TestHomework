import { AbstractResponse, ResponseStatusEnum } from "./Abstract";
import { ILoginModel } from "./ILoginModel";

export class AQueryHandler {

    constructor(private readonly LoginModel: ILoginModel) { }

    protected ReadTokenFromCookie(): string {
        // dummy
        return "token";
    }

    public checkTokenBeforeQuery(token: string | undefined) {
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