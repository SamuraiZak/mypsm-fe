export interface ListInterviewResult {
    status:  number;
    message: string;
    data:    Data;
}

export interface Data {
    pageNum:          number;
    totalData:        number;
    totalPage:        number;
    interviewResults: InterviewResult[];
}

export interface InterviewResult {
    employeeNumber:   string;
    employeeName:     string;
    ICNumber:         string;
    programme:        string;
    scheme:           string;
    grade:            string;
    position:         string;
    currentPlacement: string;
    InterviewInfo:    string;
}