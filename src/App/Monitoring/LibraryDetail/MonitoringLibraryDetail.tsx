import { RouterStore } from "mobx-react-router";
import { inject, observer } from "mobx-react";
import React from "react";
import { CaUiStore } from "../../../Stores/CaUiStore";
import { AppRoutes } from "../../../Routing/AppRoutes";
import { MonitoringLibraryDetailActionsBox } from "./DetailBoxes/MonitoringLibraryActions";
import { MonitoringLibraryGeneralInfoBox } from "./DetailBoxes/MonitoringLibraryGeneralInfoBox";
import { MonitoringLibraryQuestionsBox } from "./DetailBoxes/MonitoringLibraryQuestionsBox";
import { MonitoringLibraryDetailModel } from "../../../Stores/Monitoring/MonitoringLibraryDetailModel";
import { MonitoringQueryHandlers } from "../../../Stores/Monitoring/MonitoringQueryHandler";

interface MonitoringLibraryDetailProps {
    routing?: RouterStore;
    caUiStore?: CaUiStore;
    model: MonitoringLibraryDetailModel;
    MonitoringQueryHandlers?: MonitoringQueryHandlers;
}

export const MonitoringLibraryDetail = inject("routing", "caUiStore", "MonitoringQueryHandlers")(observer(
    class MonitoringLibraryDetail extends React.Component<MonitoringLibraryDetailProps> {

        componentDidMount() {
            const arr = this.props.routing?.location.pathname.split('/');
            if (arr) {
                const monLibId = arr[arr.length - 1];
                const qh = this.props.MonitoringQueryHandlers;
                qh?.MonitoringLibrariesQueryHandler.getMonitoringLibraryDetail(monLibId)
                    .finally(() => this.props.caUiStore?.setActualPosition(AppRoutes.MonitoringLibraryDetail));
            }
        }

        render() {
            const model = this.props.model;
            return (
                <React.Fragment>
                    <MonitoringLibraryDetailActionsBox model={model.MonitoringLibraryDetailActionsBoxModel} />
                    <MonitoringLibraryGeneralInfoBox model={model.MonitoringLibraryGeneralInfoBoxModel} />
                    <MonitoringLibraryQuestionsBox model={model.MonitoringLibraryQuestionsBoxModel} />
                </React.Fragment>
            );
        }
    }
));
