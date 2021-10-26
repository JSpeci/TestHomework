import { Button } from "@progress/kendo-react-buttons";
import { makeObservable, action, observable } from "mobx";
import { inject, observer } from "mobx-react";
import { RouterStore } from "mobx-react-router";
import React from "react";
import { ResponseStatusEnum } from "../../../../Abstract/Abstract";
import { ADetailModel } from "../../../../Abstract/ADetailModel";
import { CommandResponse } from "../../../../Abstract/Response";
import { MonitoringDtos } from "../../../../Dtos/Monitoring";
import { MonitoringCommandHandler } from "../../../../Stores/Monitoring/MonitoringCommandHandler";

export class MonitoringQuestionDetailActionListModel extends ADetailModel<MonitoringDtos.QuestionGridRowDTO>{

    libId?: string;
    constructor() {
        super();

        makeObservable(this, {
            Remove: action,
            libId: observable,
            setLibId: action,
        });
    }

    setLibId(id: string) {
        this.libId = id;
    }

    async Remove(MonitoringCommandHandler?: MonitoringCommandHandler) {
        if (this.Dto && this.libId) {
            return await MonitoringCommandHandler?.monitoringQuestionRemove({ questionID: this.Dto.questionID, libraryID: this.libId });
        }
        return undefined;
    }

}

interface MonitoringQuestionDetailBoxProps {
    model: MonitoringQuestionDetailActionListModel;
    MonitoringCommandHandler?: MonitoringCommandHandler;
    routing?: RouterStore;
}

export const MonitoringQuestionDetailActionList = inject("MonitoringCommandHandler", "routing")(observer(
    class MonitoringQuestionDetailActionList extends React.Component<MonitoringQuestionDetailBoxProps> {
        render() {
            const model = this.props.model;
            return (
                <div className="client-detail-box">
                    <div className="flex-container">
                        {/* Nejdriv ho odstrnis ze vsech knihoven a pak pujde delete */}
                        <Button
                            className="action-list-button"
                            onClick={() => {
                                if (model.Dto) {
                                    model.Remove(this.props.MonitoringCommandHandler).then((i: CommandResponse | undefined) => {
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
                            }}>Delete</Button>
                    </div>
                </div>
            );
        }
    }
));