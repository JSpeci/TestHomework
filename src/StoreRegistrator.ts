import 'reflect-metadata';
import MobxReactRouter, { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { createBrowserHistory } from 'history';
import { Stores } from './Stores/Stores';
import { CaUiStore } from './Stores/CaUiStore';
import Container from 'typedi';
import { MonitoringQueryHandlers } from './Stores/Monitoring/MonitoringQueryHandler';
import { MonitoringCommandHandler } from './Stores/Monitoring/MonitoringCommandHandler';
import { ILoginModel } from './Abstract/ILoginModel';
import { LoginModel as DummyLoginModel } from './Dummies/LoginModel';
import { MonitoringFetches } from './Fetches/MonitoringFetches';
import { DialogsStore } from './Stores/Dialog/DialogsStore';
import { CommandHandlers } from './Stores/CommandHandlers';

const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();
const history = syncHistoryWithStore(browserHistory, routingStore);

export const loginModel: ILoginModel = new DummyLoginModel();
Container.set('loginModel', loginModel);
Container.set('MonitoringFetchesQueries', new MonitoringFetches.Queries());
Container.set('MonitoringFetchesCommands', new MonitoringFetches.Commands());

export const caUiStore: CaUiStore = new CaUiStore(routingStore);
Container.set('caUiStore', caUiStore);


export const RootStore: CaRootStore = {
    commandHandlers: Container.get(CommandHandlers),
    MonitoringQueryHandlers: Container.get(MonitoringQueryHandlers),
    MonitoringCommandHandler: Container.get(CommandHandlers).MonitoringCommandHandler,
    dialogsStore: Container.get(DialogsStore),
    stores: Container.get(Stores),
    routing: routingStore,
    loginModel,
    history,
    caUiStore,
};

interface CaRootStore {
    commandHandlers: CommandHandlers,
    MonitoringQueryHandlers: MonitoringQueryHandlers,
    MonitoringCommandHandler: MonitoringCommandHandler,
    dialogsStore: DialogsStore,
    stores: Stores,
    routing: RouterStore,
    loginModel: DummyLoginModel,
    history: MobxReactRouter.SynchronizedHistory,
    caUiStore: CaUiStore,
}