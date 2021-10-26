import { Button } from "@progress/kendo-react-buttons";
import { makeObservable, observable } from "mobx";
import { inject, observer } from "mobx-react";
import { RouterStore } from "mobx-react-router";
import React from "react";
import { ResponseStatusEnum } from "../../../../Abstract/Abstract";
import { ADetailModel } from "../../../../Abstract/ADetailModel";
import { CommandResponse } from "../../../../Abstract/Response";
import { MonitoringDtos } from "../../../../Dtos/Monitoring";
import { MonitoringCommandHandler } from "../../../../Stores/Monitoring/MonitoringCommandHandler";

export class MonitoringLibraryDetailActionsBoxModel extends ADetailModel<MonitoringDtos.LibraryGridRowDTO> {

    serverError?: string;

    deleteCommand: MonitoringDtos.RemoveLibraryCommand = {
        libraryID: "",
    };


    constructor() {
        super();
        makeObservable(this, {
            serverError: observable,
            deleteCommand: observable,
        });
    }

    async DeleteLibrary(id: string | undefined, MonitoringCommandHandler?: MonitoringCommandHandler) {
        if (this.Dto && id) {
            this.deleteCommand.libraryID = id;
            return await MonitoringCommandHandler?.monitoringLibraryRemove(this.deleteCommand)
                .then(i => {
                    if (i.responseStatus === ResponseStatusEnum.OK) {
                        this.deleteCommand = {
                            libraryID: ""
                        };
                    }
                    else {
                        this.serverError = ResponseStatusEnum[i.responseStatus] + " " + i.errorCode;
                    }
                    return i;
                });
        }
    }
}

interface MonitoringLibraryDetailActionsBoxProps {
    MonitoringCommandHandler?: MonitoringCommandHandler;
    model: MonitoringLibraryDetailActionsBoxModel;
    routing?: RouterStore;
}

export const MonitoringLibraryDetailActionsBox = inject("MonitoringCommandHandler", "routing")(observer(
    class MonitoringLibraryDetailActionsBox extends React.Component<MonitoringLibraryDetailActionsBoxProps> {
        render() {
            const model = this.props.model;
            return (
                <React.Fragment>
                    <div className="client-detail-box">
                        <Button onClick={() => {
                            if (model.Dto) {
                                model.DeleteLibrary(model.Dto?.libraryID, this.props.MonitoringCommandHandler).then((i: CommandResponse | undefined) => {
                                    if (i) {
                                        if (i.responseStatus !== ResponseStatusEnum.OK) {
                                            const em = ResponseStatusEnum[i.responseStatus] + " " + i.errorCode;
                                        }
                                        else {
                                            this.props.routing?.goBack();
                                        }
                                    }
                                });;
                            }
                        }}>Delete Library</Button>
                    </div>
                </React.Fragment>
            );
        }
    }
));