import { inject, observer } from "mobx-react";
import React from "react";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { computed, makeObservable } from "mobx";
import { RouterStore } from "mobx-react-router";
import { AppRoutes } from "../../../../Routing/AppRoutes";
import { MonitoringQuestionsListModel } from "../../../../Stores/Monitoring/MonitoringQuestionsListModel";
import { ADetailModel } from "../../../../Abstract/ADetailModel";
import { MonitoringDtos } from "../../../../Dtos/Monitoring";

export class MonitoringLibraryQuestionsBoxModel extends ADetailModel<MonitoringDtos.LibraryGridRowDTO> {

    constructor(private readonly MonitoringQuestionsListModel: MonitoringQuestionsListModel) {
        super();

        makeObservable(this, {
            LibraryQuestions: computed,
        });
    }

    get LibraryQuestions(): MonitoringDtos.QuestionGridRowDTO[] {
        return this.MonitoringQuestionsListModel.Questions;
    }
}

interface MonitoringLibraryQuestionsBoxProps {
    model: MonitoringLibraryQuestionsBoxModel;
    routing?: RouterStore;
}

export const MonitoringLibraryQuestionsBox = inject("routing")(observer(
    class MonitoringLibraryQuestionsBox extends React.Component<MonitoringLibraryQuestionsBoxProps> {
        render() {
            const model = this.props.model;
            return (
                <div className="client-detail-box">
                    <h2 className="client-detail-box-header">Monitoring Questions in library</h2>
                    <Grid
                        data={model.LibraryQuestions}
                        style={{ maxHeight: '800px' }}
                        onRowClick={(row) => {
                            const id = (row.dataItem as MonitoringDtos.QuestionGridRowDTO).questionID;
                            const libId = model.Dto?.libraryID;
                            this.props.routing?.push(
                                AppRoutes.MonitoringLibraryDetail.urlWithoutParams + libId +
                                AppRoutes.MonitoringQuestionDetail.urlWithoutParams + id);
                        }}
                    >
                        <GridColumn field="questionName" title="Name" />
                        <GridColumn field="isMandatory" title="Is Mandatory" />
                        <GridColumn field="answerType" title="Answer Type" cell={(e) => {
                            return (
                                <td>
                                    {
                                        e.dataItem.answerType
                                    }
                                </td>
                            )

                        }} />
                    </Grid>
                </div>
            );
        }
    }
));