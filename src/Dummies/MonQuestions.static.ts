import { MonitoringDtos } from "../Dtos/Monitoring";

export const MonQs1: MonitoringDtos.QuestionGridRowDTO[] = [
    {
        questionID: "123",
        questionName: "How many dirty words operator said?",
        answerType: MonitoringDtos.AnswerTypes.Number,
        isMandatory: true,
    },
    {
        questionID: "456",
        questionName: "Was rainy outside during the call?",
        answerType: MonitoringDtos.AnswerTypes.YesNo,
        isMandatory: false,
    },
];

export const MonQs2: MonitoringDtos.QuestionGridRowDTO[] = [
    {
        questionID: "789",
        questionName: "QWas the call profi?",
        answerType: MonitoringDtos.AnswerTypes.Quality,
        isMandatory: true,
    }
];