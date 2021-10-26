import { DummyServer } from "../Dummies/DummyServer";
import { IApiServiceBase } from "./IApiServiceBase";

export class DummyApiService extends IApiServiceBase {

    private server: DummyServer;

    constructor() {
        super();
        this.server = new DummyServer();
    }

    public async makeApiRequest(url: string, token: string | undefined, body?: any): Promise<any> {

        // switch case url
        switch (url) {
            case ("api/q/adm/mon/q/l/GridRows"):
                return this.server.GetMonitoringLibraries();
            case ("api/q/adm/mon/q/GridRows"):
                return this.server.GetMonitoringQuestions(body);
        }

    }

}