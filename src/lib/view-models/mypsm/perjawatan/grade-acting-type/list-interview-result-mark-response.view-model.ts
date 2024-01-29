export interface ListInterviewResultMark {
    status:  number;
    message: string;
    data:    Data;
}

export interface Data {
    pageNum:              number;
    totalData:            number;
    totalPage:            number;
    interviewResultMarks: InterviewResultMark[];
}

export interface InterviewResultMark {
    employeeNumber:     string;
    employeeName:       string;
    ICNumber:           string;
    disciplinaryReview: string;
    assetDeclaration:   string;
    secretariatStatus:  string;
    directorStatus:     string;
}