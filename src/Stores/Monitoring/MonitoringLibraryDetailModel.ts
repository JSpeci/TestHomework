import { ADetailModel } from "../../Abstract/ADetailModel";
import { MonitoringLibraryDetailActionsBoxModel } from "../../App/Monitoring/LibraryDetail/DetailBoxes/MonitoringLibraryActions";
import { MonitoringLibraryGeneralInfoBoxModel } from "../../App/Monitoring/LibraryDetail/DetailBoxes/MonitoringLibraryGeneralInfoBox";
import { MonitoringLibraryQuestionsBoxModel } from "../../App/Monitoring/LibraryDetail/DetailBoxes/MonitoringLibraryQuestionsBox";
 
import { MonitoringQuestionDetailModel } from "../../App/Monitoring/QuestionDetail/MonitoringQuestionDetailModel";
import { MonitoringDtos } from "../../Dtos/Monitoring";
import { MonitoringQuestionsListModel } from "./MonitoringQuestionsListModel";

export class MonitoringLibraryDetailModel extends ADetailModel<MonitoringDtos.LibraryGridRowDTO> {

    MonitoringLibraryGeneralInfoBoxModel: MonitoringLibraryGeneralInfoBoxModel;
    MonitoringLibraryDetailActionsBoxModel: MonitoringLibraryDetailActionsBoxModel;
    MonitoringLibraryQuestionsBoxModel: MonitoringLibraryQuestionsBoxModel;

    MonitoringQuestionDetailModel: MonitoringQuestionDetailModel;
    MonitoringQuestionsListModel: MonitoringQuestionsListModel;

    constructor() {
        super();
        this.MonitoringQuestionsListModel = new MonitoringQuestionsListModel();
        this.MonitoringQuestionDetailModel = new MonitoringQuestionDetailModel();

        this.MonitoringLibraryDetailActionsBoxModel = new MonitoringLibraryDetailActionsBoxModel();
        this.MonitoringLibraryGeneralInfoBoxModel = new MonitoringLibraryGeneralInfoBoxModel();
        this.MonitoringLibraryQuestionsBoxModel = new MonitoringLibraryQuestionsBoxModel(this.MonitoringQuestionsListModel);
    }

    setDto(dto: MonitoringDtos.LibraryGridRowDTO) {
        this.id = dto.libraryID;
        super.setDto(dto);
        this.MonitoringLibraryDetailActionsBoxModel.setDto(dto);
        this.MonitoringLibraryGeneralInfoBoxModel.setDto(dto);
        this.MonitoringLibraryQuestionsBoxModel.setDto(dto);
    }
}