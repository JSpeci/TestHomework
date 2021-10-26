import 'reflect-metadata';
import { Service } from 'typedi';
import { MonitoringStore } from './Monitoring/MonitoringStore';

@Service()
export class Stores {

    MonitoringStore: MonitoringStore;

    constructor() {
        this.MonitoringStore = new MonitoringStore();
    }

}