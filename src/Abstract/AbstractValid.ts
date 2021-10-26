import { MultifieldValidResult, SinglefieldValidResult } from "./ValidResult";

export abstract class ASingleFieldValid<T> {

    public readonly name?: string;
    public readonly mandatory?: boolean = true;

    constructor(mandatory: boolean = true, name?: string) {
        this.name = name;
        this.mandatory = mandatory;
    }
    
    public abstract Valid(value: T): SinglefieldValidResult;
}

export abstract class ASingleFieldVsArrayValid<T> {

    public readonly name?: string;

    constructor(name?: string) {
        this.name = name;
    }

    public abstract Valid(value: T, array: T[]): SinglefieldValidResult;
}

export abstract class ACommandValid<CommandType> {
    public abstract Valid(command: CommandType): MultifieldValidResult;
}