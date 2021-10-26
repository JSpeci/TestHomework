import { observer } from 'mobx-react';
import React from 'react';
import { Redirect, Route, Router } from 'react-router';
import '@progress/kendo-theme-default/dist/all.css';
import '../ca-main.css';
import { RouterStore } from 'mobx-react-router';
import { Stores } from '../Stores/Stores';
import { CaUiStore } from '../Stores/CaUiStore';
import { CaWorkspace } from './Workspace/CaWorkspace';
import { RootStore } from '../StoreRegistrator';
import { AppRoutes } from '../Routing/AppRoutes';
import { MonitoringLibraryDetail } from './Monitoring/LibraryDetail/MonitoringLibraryDetail';
import { MonitoringQuestionDetail } from './Monitoring/QuestionDetail/MonitoringQuestionDetail';

interface AppProps {
    stores: Stores;
    routing: RouterStore;
    caUiStore: CaUiStore;
}

export const App = observer(class App extends React.Component<AppProps> {

    render() {
        console.log(this.props.routing.location.pathname);
        console.log(AppRoutes.HomeWorkspace.url);
        const stores = this.props.stores;
        if (document.title != AppRoutes.AppName) {
            document.title = AppRoutes.AppName;
        }
        return (
            <Router history={RootStore.history}>
                <Route exact path={AppRoutes.HomeWorkspace.url}>
                    <CaWorkspace routing={RootStore.routing} />
                </Route>
                <Route exact path={AppRoutes.MonitoringLibraryDetail.url}>
                    <MonitoringLibraryDetail model={stores.MonitoringStore.MonitoringLibraryDetailModel} />
                </Route>
                <Route exact path={AppRoutes.MonitoringQuestionDetail.url}>
                    <MonitoringQuestionDetail model={stores.MonitoringStore.MonitoringLibraryDetailModel.MonitoringQuestionDetailModel} />
                </Route>
            </Router>
        );
    }
});

export default App;