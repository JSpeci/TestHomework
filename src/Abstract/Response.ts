import { AbstractResponse } from "./Abstract";

export interface CommandResponse extends AbstractResponse {

}

export interface CreateCommandResponse extends AbstractResponse {
    id: string;
}
