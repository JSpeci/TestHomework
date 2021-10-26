import { ASingleFieldValid, ACommandValid } from "../Abstract/AbstractValid";
import { SinglefieldValidResult, MultifieldValidResult } from "../Abstract/ValidResult";
import { MonitoringDtos } from "../Dtos/Monitoring";

export namespace MonitoringValids {
    export class MonitoringLibraryName extends ASingleFieldValid<string> {
        public Valid(value: string): SinglefieldValidResult {
            const valid = value.length > 0 && value.length <= 50;
            const message = valid ? undefined : "Invalid lenght";
            return { valid, message, name: this.name }
        }
    }

    export class MonitoringLibraryNote extends ASingleFieldValid<string> {
        public Valid(value: string): SinglefieldValidResult {
            const valid = value.length > 0 && value.length <= 500;
            const message = valid ? undefined : "Invalid lenght";
            return { valid, message, name: this.name }
        }
    }

    export class MonitoringMutationLocalizedQuestion extends ASingleFieldValid<string> {
        public Valid(value: string): SinglefieldValidResult {
            const valid = value.length > 0 && value.length <= 100;
            const message = valid ? undefined : "Invalid lenght";
            return { valid, message, name: this.name }
        }
    }

    export class CreateMonitoringLibraryCommand extends ACommandValid<MonitoringDtos.CreateLibraryCommand> {

        name: MonitoringLibraryName = new MonitoringLibraryName();

        public Valid(command: MonitoringDtos.CreateLibraryCommand): MultifieldValidResult {

            const singles: SinglefieldValidResult[] = [];
            singles.push(this.name.Valid(command.libraryName));
            
            let validAll = true;
            singles.forEach(s => {
                validAll = validAll && (s.valid === undefined ? true : s.valid);
            });

            return { validAll, singles }
        }
    }

    export class CreateQuestionMutationCommand extends ACommandValid<MonitoringDtos.CreateMutationCommand> {

        name: MonitoringMutationLocalizedQuestion = new MonitoringMutationLocalizedQuestion();
        lang: MonitoringMutationLocalizedQuestion = new MonitoringMutationLocalizedQuestion();

        public Valid(command: MonitoringDtos.CreateMutationCommand): MultifieldValidResult {

            const singles: SinglefieldValidResult[] = [];
            singles.push(this.name.Valid(command.localizedQuestion));
            singles.push(this.lang.Valid(command.language));
            
            let validAll = true;
            singles.forEach(s => {
                validAll = validAll && (s.valid === undefined ? true : s.valid);
            });

            return { validAll, singles }
        }
    }

    export class CreateMonitoringQuestionCommand extends ACommandValid<MonitoringDtos.CreateQuestionCommand> {

        name: MonitoringLibraryName = new MonitoringLibraryName();

        public Valid(command: MonitoringDtos.CreateQuestionCommand): MultifieldValidResult {

            const singles: SinglefieldValidResult[] = [];
            singles.push(this.name.Valid(command.questionName));
            
            let validAll = true;
            singles.forEach(s => {
                validAll = validAll && (s.valid === undefined ? true : s.valid);
            });

            return { validAll, singles }
        }
    }
}