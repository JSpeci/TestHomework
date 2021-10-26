import { inject, observer } from "mobx-react";
import React from "react";
import { Checkbox } from "@progress/kendo-react-inputs";
import { MonitoringCommandHandler } from "../../../../Stores/Monitoring/MonitoringCommandHandler";
import { ADetailModel } from "../../../../Abstract/ADetailModel";
import { MonitoringDtos } from "../../../../Dtos/Monitoring";
import { MonitoringValids } from "../../../../Valids/MonitoringValids";
import { TextBlock } from "../../../../TextBlock/TextBlock";


export class MonitoringQuestionDetailGenerailInfoModel extends ADetailModel<MonitoringDtos.QuestionGridRowDTO>{

    nameValidator: MonitoringValids.MonitoringLibraryName;

    constructor() {
        super();

        this.nameValidator = new MonitoringValids.MonitoringLibraryName();
    }

    async MandatoryChanged(e: boolean, MonitoringCommandHandler?: MonitoringCommandHandler) {
        if (this.Dto) {
            return await MonitoringCommandHandler?.monitoringQuestionChangeIsMandatory({ questionID: this.Dto.questionID, isMandatory: e });
        }
        return undefined;
    }

    // async TypeChanged(e: DataSourcePair, MonitoringCommandHandler?: MonitoringCommandHandler) {
    //     if (this.Dto) {
    //         return await MonitoringCommandHandler?.monitoringQuestionChangeAnswerType({ questionID: this.Dto.questionID, answerType: e.id });
    //     }
    //     return undefined;
    // }

    // async NameChanged(e: string, MonitoringCommandHandler?: MonitoringCommandHandler) {
    //     if (this.Dto) {
    //         return await MonitoringCommandHandler?.monitoringQuestionChangeName({ questionID: this.Dto.questionID, newName: e });
    //     }
    //     return undefined;
    // }
}


interface MonitoringQuestionDetailGenerailInfoProps {
    model: MonitoringQuestionDetailGenerailInfoModel;
    MonitoringCommandHandler?: MonitoringCommandHandler;
}

export const MonitoringQuestionDetailGenerailInfo = inject("MonitoringCommandHandler")(observer(
    class MonitoringQuestionDetailGenerailInfo extends React.Component<MonitoringQuestionDetailGenerailInfoProps> {
        render() {
            const model = this.props.model;
            return (
                <div className="client-detail-box">
                    <div className="flex-container">
                        {
                            model.Dto &&
                            <React.Fragment>
                                <TextBlock
                                    // onSave={(e) => model.NameChanged(e, this.props.MonitoringCommandHandler)}
                                    label="Name">{model.Dto.questionName}</TextBlock>
                                <Checkbox style={{ marginTop: "13px" }} label="Is Mandatory" value={model.Dto.isMandatory} onChange={(e) => {
                                    model.MandatoryChanged(e.value, this.props.MonitoringCommandHandler)
                                }} />
                            </React.Fragment>
                        }
                    </div>
                </div>
            );
        }
    }
));
