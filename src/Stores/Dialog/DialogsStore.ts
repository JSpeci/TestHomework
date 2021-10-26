import { Service } from "typedi";
import { NewMonitoringLibraryDialogModel } from "../../App/Monitoring/NewMonitoringLibraryDialog";

@Service()
export class DialogsStore {

    NewMonitoringLibraryDialogModel: NewMonitoringLibraryDialogModel;

    constructor() {
        this.NewMonitoringLibraryDialogModel = new NewMonitoringLibraryDialogModel();
    }
}