import { AbstractQuery, AbstractRequest, AbstractResponse } from "../Abstract/Abstract";

export namespace MonitoringDtos {

    // Enums
    export enum AnswerTypes {
        YesNo = 1,
        Quantity = 2,
        Number = 3,
        Quality = 4,
    }

    // Qrs

    export interface GridRowsResponse extends AbstractResponse {
        data: LibraryGridRowDTO[];
    }

    export interface LibraryGridRowDTO {
        libraryID: string;
        libraryName: string;
        poolCount: number;
        questionCount: number;
        note: string;
    }

    export interface QuestionGridRowsResponse extends AbstractResponse {
        data: QuestionGridRowDTO[];
    }

    export interface QuestionGridRowDTO {
        questionID: string;
        questionName: string;
        isMandatory: boolean;
        answerType: number;
    }

    export interface MutationsResponse extends AbstractResponse {

        data: QuestionMutationDTO[];
    }

    export interface QuestionMutationDTO {
        mutationID: string;
        language: string;
        localizedQuestion: string;
    }

    export interface MutationsQuery extends AbstractQuery {
        questionID: string;
    }

    export interface QuestionGridRowsQuery extends AbstractQuery {
        libraryID: string;
    }

    export interface GridRowsQuery extends AbstractQuery {

    }

    // Cmds Mut

    export interface CreateLibraryCommand extends AbstractRequest {
        libraryName: string;
    }
    export interface RemoveLibraryCommand extends AbstractRequest {
        libraryID: string;
    }

    export interface ChangeLibraryNameCommand extends AbstractRequest {
        libraryID: string;
        newLibraryName: string;
    }

    export interface ChangeNoteCommand extends AbstractRequest {
        libraryID: string;
        newNote: string;
    }

    // Cmds Q

    export interface CreateQuestionCommand extends AbstractRequest {
        libraryID: string;
        questionName: string;
        isMandatory: boolean;
        answerType: number;
    }

    export interface RemoveQuestionCommand extends AbstractRequest {
        libraryID: string;
        questionID: string;
    }

    export interface ChangeNameCommand extends AbstractRequest {
        questionID: string;
        newName: string;
    }

    export interface ChangeIsMandatoryCommand extends AbstractRequest {
        questionID: string;
        isMandatory: boolean;
    }

    export interface ChangeAnswerTypeCommand extends AbstractRequest {
        questionID: string;
        answerType: number;
    }

    // Cmds Mut

    export interface CreateMutationCommand extends AbstractRequest {
        questionID: string;
        language: string;
        localizedQuestion: string;
    }

    export interface RemoveMutationCommand extends AbstractRequest {
        mutationID: string;
    }

    export interface ChangeLocalizedQuestionCommand extends AbstractRequest {
        mutationID: string;
        newLocalizedQuestion: string;
    }


}