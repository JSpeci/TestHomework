import React from 'react';
import { inject, observer } from 'mobx-react';
import { RouterStore } from 'mobx-react-router';
import { TabStrip, TabStripTab } from '@progress/kendo-react-layout'
import { Stores } from '../../Stores/Stores';
import { CaUiStore } from '../../Stores/CaUiStore';
import { MonitoringQueryHandlers } from '../../Stores/Monitoring/MonitoringQueryHandler';
import { AppRoutes } from '../../Routing/AppRoutes';
import { MonitoringLibrariesList } from '../Monitoring/MonitoringLibrariesList';
import { DialogsStore } from '../../Stores/Dialog/DialogsStore';

export interface CaWorkspaceProps {
    stores?: Stores;
    routing: RouterStore;
    caUiStore?: CaUiStore;
    MonitoringQueryHandlers?: MonitoringQueryHandlers;
    dialogsStore?: DialogsStore;
}

export const CaWorkspace = inject("stores", "caUiStore", "MonitoringQueryHandlers")
    (observer(class CaWorkspace extends React.Component<CaWorkspaceProps> {

        componentDidMount() {
            this.props.caUiStore?.setActualPosition(AppRoutes.HomeWorkspace);
        }

        render() {
            const stores = this.props.stores;
            const uiStore = this.props.caUiStore;
            return (
                <div className="App">
                    {
                        stores && uiStore &&
                        <div className="company-admin-workspace">
                            <TabStrip selected={uiStore.selectedTab} onSelect={uiStore.handleSelect}>
                                <TabStripTab title="Monitoring">
                                    <MonitoringLibrariesList
                                        NewMonitoringLibraryDialogModel={this.props.dialogsStore?.NewMonitoringLibraryDialogModel}
                                        MonitoringLibrariesQueryHandler={this.props.MonitoringQueryHandlers?.MonitoringLibrariesQueryHandler}
                                        MonitoringLibrariesListModel={stores.MonitoringStore.MonitoringLibrariesListModel} />
                                </TabStripTab>
                                <TabStripTab title="Another tabs">
                                </TabStripTab>
                            </TabStrip>
                        </div>
                    }
                </div>
            );
        }
    }));