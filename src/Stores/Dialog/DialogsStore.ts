import { Service } from "typedi";
import { ModalDialogModel } from "../../Abstract/ModalDialogModel";
import { DeleteLibraryDialogModel } from "../../App/Monitoring/LibraryDetail/DeleteLibraryDialog";
import { NewMonitoringLibraryDialogModel } from "../../App/Monitoring/NewMonitoringLibraryDialog";
@Service()
export class DialogsStore {
  NewMonitoringLibraryDialogModel: NewMonitoringLibraryDialogModel;
  DeleteLibraryDialogModel: ModalDialogModel;

  constructor() {
    this.NewMonitoringLibraryDialogModel =
      new NewMonitoringLibraryDialogModel();
    this.DeleteLibraryDialogModel = new DeleteLibraryDialogModel();
  }
}