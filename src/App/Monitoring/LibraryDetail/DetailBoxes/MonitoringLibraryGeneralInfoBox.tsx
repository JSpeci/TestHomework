import { inject, observer } from "mobx-react";
import React from "react";
import { ADetailModel } from "../../../../Abstract/ADetailModel";
import { MonitoringDtos } from "../../../../Dtos/Monitoring";
import { MonitoringCommandHandler } from "../../../../Stores/Monitoring/MonitoringCommandHandler";
import { TextBlock } from "../../../../TextBlock/TextBlock";

export class MonitoringLibraryGeneralInfoBoxModel extends ADetailModel<MonitoringDtos.LibraryGridRowDTO> {

    async NameChanged(newVal: string, MonitoringCommandHandler?: MonitoringCommandHandler) {
        if (this.Dto) {
            await MonitoringCommandHandler?.monitoringLibraryChangeName({ newLibraryName: newVal, libraryID: this.Dto.libraryID });
        }
        return undefined;
    }

    async NoteChanged(newVal: string, MonitoringCommandHandler?: MonitoringCommandHandler) {
        if (this.Dto) {
            await MonitoringCommandHandler?.monitoringLibraryChangeNote({ newNote: newVal, libraryID: this.Dto.libraryID });
        }
        return undefined;
    }
}

interface MonitoringLibraryGeneralInfoBoxProps {
    model: MonitoringLibraryGeneralInfoBoxModel;
    MonitoringCommandHandler?: MonitoringCommandHandler;
}


export const MonitoringLibraryGeneralInfoBox = inject("MonitoringCommandHandler")(observer(
    class MonitoringLibraryGeneralInfoBox extends React.Component<MonitoringLibraryGeneralInfoBoxProps> {
        render() {
            const model = this.props.model;
            return (

                <React.Fragment>
                    <div className="flex-container">
                        <TextBlock
                            label="Library Name"
                            // onSave={(e) => { model.NameChanged(e, this.props.MonitoringCommandHandler) }}>
                            value={model.Dto?.libraryName} />
                        <TextBlock
                            label="Library Note"
                            // onSave={(e) => { model.NoteChanged(e, this.props.MonitoringCommandHandler) }}>
                            value={model.Dto?.note} />
                    </div >
                </React.Fragment >
            );
        }
    }
));