import { makeObservable, computed } from "mobx";
import { ListModelGeneric } from "../../Abstract/ListModelGeneric";
import { MonitoringDtos } from "../../Dtos/Monitoring";

export class MonitoringLibrariesListModel extends ListModelGeneric<MonitoringDtos.LibraryGridRowDTO> {

    constructor() {
        super();
        makeObservable(this, {
            Libraries: computed,
        });
    }

    get Libraries(): MonitoringDtos.LibraryGridRowDTO[] {
        return this.Items
            .filter((lib: MonitoringDtos.LibraryGridRowDTO) => lib.libraryName.toLowerCase().includes(this.findInput.toLowerCase()));
    }
}