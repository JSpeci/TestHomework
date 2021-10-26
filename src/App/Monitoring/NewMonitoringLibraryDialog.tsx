import React from "react";
import { action, computed, makeObservable, observable } from "mobx";
import { inject, observer } from "mobx-react";
import { MonitoringCommandHandler } from "../../Stores/Monitoring/MonitoringCommandHandler";
import { MonitoringDtos } from "../../Dtos/Monitoring";
import { ResponseStatusEnum } from "../../Abstract/Abstract";
import { Input } from "@progress/kendo-react-inputs";
import { MonitoringValids } from "../../Valids/MonitoringValids";
import { MultifieldValidResult } from "../../Abstract/ValidResult";
import { ModalDialog, ModalDialogButton } from "../../Abstract/ModalDialog";
import { ModalDialogModel } from "../../Abstract/ModalDialogModel";

export class NewMonitoringLibraryDialogModel extends ModalDialogModel {

    command: MonitoringDtos.CreateLibraryCommand;
    validator: MonitoringValids.CreateMonitoringLibraryCommand;
    error?: string;

    constructor() {
        super();

        makeObservable(this, {
            saveClicked: action,
            nameChanged: action.bound,
            command: observable,
            ValidAll: computed,
            Validator: computed,
            error: observable,
        });

        this.command = {
            libraryName: "",
        }
        this.validator = new MonitoringValids.CreateMonitoringLibraryCommand();
    }

    hide() {
        this.command = {
            libraryName: "",
        }
        this.error = undefined;
        super.hide();
    }

    nameChanged(v: string) {
        this.command.libraryName = v;
    }

    async saveClicked(MonitoringCommandHandler?: MonitoringCommandHandler) {
        await MonitoringCommandHandler?.monitoringLibraryCreate(this.command)
            .then(i => {
                if (i.responseStatus === ResponseStatusEnum.OK) {
                    this.hide();
                }
                else {
                    this.error = ResponseStatusEnum[i.responseStatus] + " " + i.errorCode;
                }
            });
    }

    get ValidAll(): MultifieldValidResult {
        const res = this.validator.Valid(this.command);
        return res;
    }

    get Validator(): MonitoringValids.CreateMonitoringLibraryCommand {
        return this.validator;
    }
}

interface NewMonitoringLibraryDialogProps {
    model: NewMonitoringLibraryDialogModel;
    MonitoringCommandHandler?: MonitoringCommandHandler;
}

export const NewMonitoringLibraryDialog = inject("MonitoringCommandHandler")(observer(class NewMonitoringLibraryDialog extends React.Component<NewMonitoringLibraryDialogProps> {
    render() {
        const model = this.props.model;
        const saveButton: ModalDialogButton = { onclick: () => { model.saveClicked(this.props.MonitoringCommandHandler) }, title: "Create", disabled: !model.ValidAll.validAll }
        return (
            <ModalDialog
                title="New monitoring library"
                model={model}
                buttons={[saveButton]}
                height={300}
            >
                <div className="dialog-form">
                    <div className="dialog-column">
                        <Input label="Library Name" value={model.command.libraryName} onChange={(e) => model.nameChanged(e.target.value as string)} />

                        <p>
                            {
                                model.Validator.name.Valid(model.command.libraryName).valid ?
                                    <span>Valid</span>
                                    :
                                    <span>{model.Validator.name.Valid(model.command.libraryName).message}</span>
                            }
                        </p>
                    </div>
                    {
                        model.error !== undefined &&
                        <div>
                            <h2>Error Message</h2>
                            {
                                <p>{model.error}</p>
                            }
                        </div>
                    }
                </div>
            </ModalDialog>
        );
    }
}));