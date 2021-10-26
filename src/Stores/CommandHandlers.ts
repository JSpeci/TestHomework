import 'reflect-metadata';
import Container, { Service } from 'typedi';
import { MonitoringCommandHandler } from './Monitoring/MonitoringCommandHandler';
import { Stores } from './Stores';

@Service()
export class CommandHandlers {

    MonitoringCommandHandler: MonitoringCommandHandler;

    constructor() {

        this.MonitoringCommandHandler = new MonitoringCommandHandler(
            Container.get("loginModel"),
            Container.get("MonitoringFetchesCommands"),
            Container.get(Stores).MonitoringStore);
    }
}