import Container, { Service } from "typedi";
import { ResponseStatusEnum } from "../../Abstract/Abstract";
import { AQueryHandler } from "../../Abstract/AQueryHandler";
import { ILoginModel } from "../../Abstract/ILoginModel";
import { MonitoringFetches } from "../../Fetches/MonitoringFetches";
import { Stores } from "../Stores";
import { MonitoringStore } from "./MonitoringStore";

@Service()
export class MonitoringQueryHandlers {

    MonitoringLibrariesQueryHandler: MonitoringLibrariesQueryHandler;

    constructor() {
        this.MonitoringLibrariesQueryHandler = new MonitoringLibrariesQueryHandler(
            Container.get(Stores).MonitoringStore,
            Container.get("MonitoringFetchesQueries"),
            Container.get("loginModel"));
    }

}

export class MonitoringLibrariesQueryHandler extends AQueryHandler {

    constructor(private MonitoringStore: MonitoringStore, private MonitoringQueries: MonitoringFetches.IQueries, LoginModel: ILoginModel) {
        super(LoginModel);
    }

    public async getMonitoringLibraries() {
        const lm = this.MonitoringStore.MonitoringLibrariesListModel;
        if (lm.ShouldRequestNewList) {
            const t = this.ReadTokenFromCookie();
            super.checkTokenBeforeQuery(t);
            lm.loading = true;
            await this.MonitoringQueries.getMonitoringLibrariesGridRows(t, {})
                .then(i => this.resolveStatusForAuth(i))
                .then((i) => {
                    if (i.responseStatus === ResponseStatusEnum.OK) {
                        lm.SetArray(i.data);
                        lm.loading = false;
                        return i;
                    }
                });
        }
    }

    public async getMonitoringLibraryQuestions(token: string | undefined, monLibId?: string) {
        const lm = this.MonitoringStore.MonitoringLibraryDetailModel.MonitoringQuestionsListModel;
        if (lm.ShouldRequestNewList || monLibId) {
            lm.loading = true;
            await this.MonitoringQueries.getMonitoringQuestionsGridRows(token, { libraryID: monLibId || "" })
                .then(i => {
                    lm.SetArray(i.data);
                    lm.loading = false;
                })
        }
    }

    public async getMonitoringLibraryDetail(monLibId: string) {
        const lm = this.MonitoringStore.MonitoringLibrariesListModel;
        if (lm.ShouldRequestNewList || monLibId) {
            const t = this.ReadTokenFromCookie();
            super.checkTokenBeforeQuery(t);
            lm.loading = true;
            await this.MonitoringQueries.getMonitoringLibrariesGridRows(t, {})
                .then(i => this.resolveStatusForAuth(i))
                .then((i) => {
                    if (i.responseStatus === ResponseStatusEnum.OK) {
                        lm.SetArray(i.data);
                        const dm = this.MonitoringStore.MonitoringLibraryDetailModel;
                        const find = lm.Items.find(j => j.libraryID === monLibId);
                        if (find) {
                            dm.setDto(find);
                        }
                        lm.loading = false;
                        return i;
                    }
                })
                .then(i => this.getMonitoringLibraryQuestions(t, monLibId))
        }
    }

    public async getMonitoringQuestionDetail(monLibId: string, qId: string) {
        const t = this.ReadTokenFromCookie();
        super.checkTokenBeforeQuery(t);

        const lm = this.MonitoringStore.MonitoringLibraryDetailModel.MonitoringQuestionsListModel;
        lm.loading = true;
        await this.MonitoringQueries.getMonitoringQuestionsGridRows(t, { libraryID: monLibId })
            .then(i => i && this.resolveStatusForAuth(i))
            .then(i => {
                lm.SetArray(i.data);
                lm.loading = false;

                const dm = this.MonitoringStore.MonitoringLibraryDetailModel.MonitoringQuestionDetailModel;
                const find = lm.Items.find(j => j.questionID === qId);
                if (find) {
                    dm.setDto(find)
                }

            });
    }
}