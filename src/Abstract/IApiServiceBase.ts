export abstract class IApiServiceBase {
    public async makeApiRequest(url: string, token: string | undefined, body?: any): Promise<any> { }
}