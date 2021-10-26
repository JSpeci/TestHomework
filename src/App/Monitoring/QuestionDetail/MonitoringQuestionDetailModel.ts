import { ADetailModel } from "../../../Abstract/ADetailModel";
import { MonitoringDtos } from "../../../Dtos/Monitoring";
import { MonitoringQuestionDetailActionListModel } from "./DetailBoxes/MonitoringQuestionDetailActionList";
import { MonitoringQuestionDetailGenerailInfoModel } from "./DetailBoxes/MonitoringQuestionDetailGenerailInfo";

export class MonitoringQuestionDetailModel extends ADetailModel<MonitoringDtos.QuestionGridRowDTO> {

    MonitoringQuestionDetailGenerailInfoModel: MonitoringQuestionDetailGenerailInfoModel;
    MonitoringQuestionDetailActionListModel: MonitoringQuestionDetailActionListModel;

    constructor() {
        super();

        this.MonitoringQuestionDetailActionListModel = new MonitoringQuestionDetailActionListModel();
        this.MonitoringQuestionDetailGenerailInfoModel = new MonitoringQuestionDetailGenerailInfoModel();
    }

    setDto(dto: MonitoringDtos.QuestionGridRowDTO) {
        this.id = dto.questionID;
        super.setDto(dto);
        this.MonitoringQuestionDetailGenerailInfoModel.setDto(dto);
        this.MonitoringQuestionDetailActionListModel.setDto(dto);
    }
}