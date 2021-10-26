import { ResponseStatusEnum } from "../../Abstract/Abstract";
import { ACommandHandler } from "../../Abstract/ACommandHandler";
import { ILoginModel } from "../../Abstract/ILoginModel";
import { CreateCommandResponse, CommandResponse } from "../../Abstract/Response";
import { MonitoringDtos } from "../../Dtos/Monitoring";
import { MonitoringFetches } from "../../Fetches/MonitoringFetches";
import { MonitoringStore } from "./MonitoringStore";

export class MonitoringCommandHandler extends ACommandHandler {

    constructor(
        loginModel: ILoginModel,
        private MonitoringFetches: MonitoringFetches.ICommands,
        public MonitoringStore: MonitoringStore
    ) {
        super(loginModel);
    }

    public async monitoringQuestionRemove(cmd: MonitoringDtos.RemoveQuestionCommand) {
        const t = this.ReadTokenFromCookie();
        return await this.MonitoringFetches.monitoringQuestionRemove(t, cmd)
    }

    public async monitoringQuestionChangeIsMandatory(cmd: MonitoringDtos.ChangeIsMandatoryCommand) {

    }

    public async monitoringLibraryChangeName(cmd: MonitoringDtos.ChangeLibraryNameCommand) {

    }

    public async monitoringLibraryChangeNote(cmd: MonitoringDtos.ChangeNoteCommand) {

    }

    public async monitoringLibraryCreate(cmd: MonitoringDtos.CreateLibraryCommand) {
        const t = this.ReadTokenFromCookie();
        super.checkTokenBeforeCmd(t);
        return await this.MonitoringFetches.monitoringLibraryCreate(t, cmd)
            .then(i => this.resolveStatusForAuth(i))
            .then(i => {
                if (i.responseStatus === ResponseStatusEnum.OK) {
                    const lm = this.MonitoringStore.MonitoringLibrariesListModel;
                    lm.AddItem({
                        libraryID: i.id,
                        libraryName: cmd.libraryName,
                        note: "",
                        poolCount: 0,
                        questionCount: 0,
                    });
                }
                return i;
            })
            .then(i => this.resolveStatusForNotification<CreateCommandResponse>(i, "Monitoring Library Created"));
    }

    public async monitoringLibraryRemove(cmd: MonitoringDtos.RemoveLibraryCommand) {
        const t = this.ReadTokenFromCookie();
        super.checkTokenBeforeCmd(t);
        return await this.MonitoringFetches.monitoringLibraryRemove(t, cmd)
            .then(i => this.resolveStatusForAuth(i))
            .then(i => {
                if (i.responseStatus === ResponseStatusEnum.OK) {
                    const lm = this.MonitoringStore.MonitoringLibrariesListModel;
                    const find = lm.Items.find(j => j.libraryID === cmd.libraryID);
                    if (find) {
                        lm.RemoveItem(find);
                    }
                }
                return i;
            })
            .then(i => this.resolveStatusForNotification<CommandResponse>(i, "Monitoring Library removed"));
    }
}