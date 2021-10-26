export interface ILoginModel {
    LogMeOut();
    get Token(): string | undefined;
}