import { action, makeObservable, observable } from "mobx";
import { ResponseStatusEnum } from "../Abstract/Abstract";
import { CreateCommandResponse, CommandResponse } from "../Abstract/Response";
import { MonitoringDtos } from "../Dtos/Monitoring";
import { MonLibs } from "./MonLibs.statit";
import { MonQs1, MonQs2 } from "./MonQuestions.static";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export class DummyServer {
  libs: MonitoringDtos.LibraryGridRowDTO[];
  questions1: MonitoringDtos.QuestionGridRowDTO[];
  questions2: MonitoringDtos.QuestionGridRowDTO[];

  constructor() {
    makeObservable(this, {
      libs: observable,
      questions1: observable,
      questions2: observable,
      CreateMonitoringLibrary: action,
      RemoveMonitoringLibrary: action,
    });

    this.libs = MonLibs;
    this.questions1 = MonQs1;
    this.questions2 = MonQs2;
  }

  public async GetMonitoringLibraries(): Promise<MonitoringDtos.GridRowsResponse> {
    const obj: MonitoringDtos.GridRowsResponse = {
      data: this.libs,
      responseStatus: ResponseStatusEnum.OK,
    };
    const p = Promise.resolve(obj);
    return p;
  }

  public async GetMonitoringQuestions(
    body: MonitoringDtos.QuestionGridRowsQuery
  ): Promise<MonitoringDtos.QuestionGridRowsResponse> {
    switch (body.libraryID) {
      case "123": {
        const obj: MonitoringDtos.QuestionGridRowsResponse = {
          data: this.questions1,
          responseStatus: ResponseStatusEnum.OK,
        };
        const p = Promise.resolve(obj);
        return p;
      }
      case "456": {
        const obj: MonitoringDtos.QuestionGridRowsResponse = {
          data: this.questions2,
          responseStatus: ResponseStatusEnum.OK,
        };
        const p = Promise.resolve(obj);
        return p;
      }
      default: {
        const obj: MonitoringDtos.QuestionGridRowsResponse = {
          data: [],
          responseStatus: ResponseStatusEnum.OK,
        };
        const p = Promise.resolve(obj);
        return p;
      }
    }
  }

  public async CreateMonitoringLibrary({
    libraryName,
  }: MonitoringDtos.CreateLibraryCommand): Promise<CreateCommandResponse> {
    const lib = {
      libraryName,
      libraryID: getRandomInt(9999).toString(),
      note: "",
      poolCount: 0,
      questionCount: 0,
    };
    this.libs.push(lib);

    return {
      id: lib.libraryID,
      responseStatus: ResponseStatusEnum.OK,
    };
  }

  public async RemoveMonitoringLibrary({
    libraryID,
  }: MonitoringDtos.RemoveLibraryCommand): Promise<CommandResponse> {
    const lib = this.libs.find((lib) => lib.libraryID === libraryID);
    if (lib) {
      this.libs.splice(this.libs.indexOf(lib), 1);
      return {
        responseStatus: ResponseStatusEnum.OK,
      };
    } else {
      return {
        responseStatus: ResponseStatusEnum.ValidationError,
        errorCode: "LibraryNotFound",
      };
    }
  }
}
