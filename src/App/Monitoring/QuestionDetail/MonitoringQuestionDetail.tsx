import React from "react";
import { inject, observer } from "mobx-react";
import { RouterStore } from "mobx-react-router";
import { AppRoutes } from "../../../Routing/AppRoutes";
import { CaUiStore } from "../../../Stores/CaUiStore";
import { MonitoringQuestionDetailModel } from "./MonitoringQuestionDetailModel";
import { MonitoringQuestionDetailActionList } from "./DetailBoxes/MonitoringQuestionDetailActionList";
import { MonitoringQuestionDetailGenerailInfo } from "./DetailBoxes/MonitoringQuestionDetailGenerailInfo";
import { MonitoringQueryHandlers } from "../../../Stores/Monitoring/MonitoringQueryHandler";

interface MonitoringQuestionDetailProps {
    routing?: RouterStore;
    model: MonitoringQuestionDetailModel;
    caUiStore?: CaUiStore;
    MonitoringQueryHandlers?: MonitoringQueryHandlers;
}

export const MonitoringQuestionDetail = inject("routing", "caUiStore", "MonitoringQueryHandlers")(observer(
    class MonitoringQuestionDetail extends React.Component<MonitoringQuestionDetailProps> {

        componentDidMount() {
            const arr = this.props.routing?.location.pathname.split('/');
            if (arr) {
                const qId = arr[arr.length - 1];
                const monLibId = arr[arr.length - 3];
                const qh = this.props.MonitoringQueryHandlers;
                qh?.MonitoringLibrariesQueryHandler.getMonitoringQuestionDetail(monLibId, qId)
                    .finally(() => this.props.caUiStore?.setActualPosition(AppRoutes.MonitoringQuestionDetail));
            }
        }

        render() {
            document.title = AppRoutes.MonitoringQuestionDetail.displayName;
            const model = this.props.model;
            return (
                <React.Fragment>
                    <MonitoringQuestionDetailActionList model={model.MonitoringQuestionDetailActionListModel} />
                    <MonitoringQuestionDetailGenerailInfo model={model.MonitoringQuestionDetailGenerailInfoModel} />
                </React.Fragment>
            );
        }
    }
));