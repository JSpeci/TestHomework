import { MonitoringLibrariesListModel } from "./MonitoringLibrariesListModel";
import { MonitoringLibraryDetailModel } from "./MonitoringLibraryDetailModel";

export class MonitoringStore {

    MonitoringLibrariesListModel: MonitoringLibrariesListModel;
    MonitoringLibraryDetailModel: MonitoringLibraryDetailModel;

    constructor() {
        this.MonitoringLibrariesListModel = new MonitoringLibrariesListModel();
        this.MonitoringLibraryDetailModel = new MonitoringLibraryDetailModel();
    }

}