import React from "react";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { computed, makeObservable, action } from "mobx";
import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { inject, observer } from "mobx-react";
import { RouterStore } from "mobx-react-router";
import { NewMonitoringLibraryDialog, NewMonitoringLibraryDialogModel } from "./NewMonitoringLibraryDialog";
import { AppRoutes } from "../../Routing/AppRoutes";
import { MonitoringLibrariesListModel } from "../../Stores/Monitoring/MonitoringLibrariesListModel";
import { MonitoringLibrariesQueryHandler } from "../../Stores/Monitoring/MonitoringQueryHandler";
import { MonitoringDtos } from "../../Dtos/Monitoring";


interface MonitoringLibrariesListProps {
    MonitoringLibrariesListModel: MonitoringLibrariesListModel;
    MonitoringLibrariesQueryHandler?: MonitoringLibrariesQueryHandler;
    NewMonitoringLibraryDialogModel?: NewMonitoringLibraryDialogModel;
    routing?: RouterStore;
}

export const MonitoringLibrariesList = inject("routing")(observer(
    class MonitoringLibrariesList extends React.Component<MonitoringLibrariesListProps> {

        componentDidMount() {
            this.props.MonitoringLibrariesQueryHandler?.getMonitoringLibraries();
        }

        render() {
            const model = this.props.MonitoringLibrariesListModel;
            const dm = this.props.NewMonitoringLibraryDialogModel;
            return (
                <div className="company-admin-workspace-table">
                    {
                        dm && <NewMonitoringLibraryDialog model={dm} />
                    }
                    <h2 className="client-detail-box-header">Monitoring libraries</h2>
                    <Button className="new-button-on-list" onClick={() => dm?.show()} >New Monitoring Library</Button>
                    <div className="search-bar-in-ca">
                        <div className="search-container">
                            <Input type="text" placeholder="Search.." onChange={(e) => { model.SetFindInput(e.target.value as string) }} />
                            <Button className="button-in-app-header" disabled><FontAwesomeIcon icon={faSearch} /></Button>
                        </div>
                    </div>
                    <Grid
                        data={model.Libraries}
                        style={{ maxHeight: '800px', cursor: "pointer" }}
                        onRowClick={(row) => {
                            const id = (row.dataItem as MonitoringDtos.LibraryGridRowDTO).libraryID;
                            this.props.routing?.push(AppRoutes.MonitoringLibraryDetail.urlWithoutParams + id);
                        }}
                    >
                        <GridColumn field="libraryName" title="Name" />
                        <GridColumn field="poolCount" title="CountOfPools" />
                        <GridColumn field="questionCount" title="# Questions" />
                    </Grid>
                </div>
            );
        }

    }
));