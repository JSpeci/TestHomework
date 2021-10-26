import { makeObservable, computed } from "mobx";
import { ListModelGeneric } from "../../Abstract/ListModelGeneric";
import { MonitoringDtos } from "../../Dtos/Monitoring";

export class MonitoringQuestionsListModel extends ListModelGeneric<MonitoringDtos.QuestionGridRowDTO> {

    constructor() {
        super();
        makeObservable(this, {
            Questions: computed,
        });
    }

    get Questions(): MonitoringDtos.QuestionGridRowDTO[] {
        return this.Items
            .filter((lib: MonitoringDtos.QuestionGridRowDTO) => lib.questionName.toLowerCase().includes(this.findInput.toLowerCase()));
    }
}