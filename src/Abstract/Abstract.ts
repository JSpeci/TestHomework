export enum ResponseStatusEnum {
    OK = 0,
    ValidationError = 1,
    ServerError = 2,
    AuthenticationFailed = 3,
    AuthenticationExpired = 4
}

export interface AbstractResponse {
    responseStatus: ResponseStatusEnum,
    errorCode?: any;
}

export interface AbstractQuery {

}

export interface AbstractRequest {

}