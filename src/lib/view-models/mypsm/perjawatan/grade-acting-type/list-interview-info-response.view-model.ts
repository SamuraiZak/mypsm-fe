export interface ListInterviewInfo {
    status:  number;
    message: string;
    data:    Data;
}

export interface Data {
    pageNum:        number;
    totalData:      number;
    totalPage:      number;
    interviewInfos: InterviewInfo[];
}

export interface InterviewInfo {
    employeeNumber:   string;
    employeeName:     string;
    ICNumber:         string;
    programme:        string;
    scheme:           string;
    grade:            string;
    position:         string;
    currentPlacement: string;
    selectionResult:  string;
}
