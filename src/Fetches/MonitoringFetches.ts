import { DummyApiService } from "../Abstract/ApiServiceBase";
import { CreateCommandResponse, CommandResponse } from "../Abstract/Response";
import { MonitoringDtos } from "../Dtos/Monitoring";

export namespace MonitoringFetches {

    export interface IQueries {
        getMonitoringLibrariesGridRows(token: string | undefined, query: MonitoringDtos.GridRowsQuery): Promise<MonitoringDtos.GridRowsResponse>;
        getMonitoringQuestionsGridRows(token: string | undefined, query: MonitoringDtos.QuestionGridRowsQuery): Promise<MonitoringDtos.QuestionGridRowsResponse>;
        getMonitoringQuestionMutations(token: string | undefined, query: MonitoringDtos.MutationsQuery): Promise<MonitoringDtos.MutationsResponse>;
    }

    export interface ICommands {
        monitoringQuestionCreate(token: string | undefined, query: MonitoringDtos.CreateQuestionCommand): Promise<CreateCommandResponse>;
        monitoringQuestionRemove(token: string | undefined, query: MonitoringDtos.RemoveQuestionCommand): Promise<CommandResponse>;
        monitoringQuestionChangeName(token: string | undefined, query: MonitoringDtos.ChangeNameCommand): Promise<CommandResponse>;
        monitoringQuestionChangeIsMandatory(token: string | undefined, query: MonitoringDtos.ChangeIsMandatoryCommand): Promise<CommandResponse>;
        monitoringQuestionChangeAnswerType(token: string | undefined, query: MonitoringDtos.ChangeAnswerTypeCommand): Promise<CommandResponse>;
        monitoringLibraryCreate(token: string | undefined, query: MonitoringDtos.CreateLibraryCommand): Promise<CreateCommandResponse>;
        monitoringLibraryRemove(token: string | undefined, query: MonitoringDtos.RemoveLibraryCommand): Promise<CommandResponse>;
        monitoringLibraryChangeName(token: string | undefined, query: MonitoringDtos.ChangeLibraryNameCommand): Promise<CommandResponse>;
        monitoringLibraryChangeNote(token: string | undefined, query: MonitoringDtos.ChangeNoteCommand): Promise<CommandResponse>;
    }

    export class Queries extends DummyApiService {
        // Monitoring

        public async getMonitoringLibrariesGridRows(token: string | undefined, query: MonitoringDtos.GridRowsQuery): Promise<MonitoringDtos.GridRowsResponse> {
            const result = await super.makeApiRequest("api/q/adm/mon/q/l/GridRows", token, query);
            return result;
        };

        public async getMonitoringQuestionsGridRows(token: string | undefined, query: MonitoringDtos.QuestionGridRowsQuery): Promise<MonitoringDtos.QuestionGridRowsResponse> {
            const result = await super.makeApiRequest("api/q/adm/mon/q/GridRows", token, query);
            return result;
        };
    }

    export class Commands extends DummyApiService {
        // Monitoring questions

        public async monitoringQuestionCreate(token: string | undefined, query: MonitoringDtos.CreateQuestionCommand): Promise<CreateCommandResponse> {
            const result = await super.makeApiRequest("api/c/adm/mon/q/Create", token, query);
            return result;
        };

        public async monitoringQuestionRemove(token: string | undefined, query: MonitoringDtos.RemoveQuestionCommand): Promise<CommandResponse> {
            const result = await super.makeApiRequest("api/c/adm/mon/q/Remove", token, query);
            return result;
        };

        public async monitoringQuestionChangeName(token: string | undefined, query: MonitoringDtos.ChangeNameCommand): Promise<CommandResponse> {
            const result = await super.makeApiRequest("api/c/adm/mon/q/ChangeName", token, query);
            return result;
        };

        public async monitoringQuestionChangeIsMandatory(token: string | undefined, query: MonitoringDtos.ChangeIsMandatoryCommand): Promise<CommandResponse> {
            const result = await super.makeApiRequest("api/c/adm/mon/q/ChangeIsMandatory", token, query);
            return result;
        };

        public async monitoringQuestionChangeAnswerType(token: string | undefined, query: MonitoringDtos.ChangeAnswerTypeCommand): Promise<CommandResponse> {
            const result = await super.makeApiRequest("api/c/adm/mon/q/ChangeAnswerType", token, query);
            return result;
        };

        // Monitoring Library

        public async monitoringLibraryCreate(token: string | undefined, query: MonitoringDtos.CreateLibraryCommand): Promise<CreateCommandResponse> {
            const result = await super.makeApiRequest("api/c/adm/mon/q/l/Create", token, query);
            return result;
        };

        public async monitoringLibraryRemove(token: string | undefined, query: MonitoringDtos.RemoveLibraryCommand): Promise<CommandResponse> {
            const result = await super.makeApiRequest("api/c/adm/mon/q/l/Remove", token, query);
            return result;
        };

        public async monitoringLibraryChangeName(token: string | undefined, query: MonitoringDtos.ChangeLibraryNameCommand): Promise<CommandResponse> {
            const result = await super.makeApiRequest("api/c/adm/mon/q/l/ChangeName", token, query);
            return result;
        };

        public async monitoringLibraryChangeNote(token: string | undefined, query: MonitoringDtos.ChangeNoteCommand): Promise<CommandResponse> {
            const result = await super.makeApiRequest("api/c/adm/mon/q/l/ChangeNote", token, query);
            return result;
        };
    }
}
