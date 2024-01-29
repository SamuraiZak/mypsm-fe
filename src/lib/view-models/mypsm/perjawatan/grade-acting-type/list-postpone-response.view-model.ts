export interface ListPostpone {
    status:  number;
    message: string;
    data:    Data;
}

export interface Data {
    pageNum:   number;
    totalData: number;
    totalPage: number;
    postpones: Postpone[];
}

export interface Postpone {
    employeeNumber:      string;
    employeeName:        string;
    ICNumber:            string;
    programme:           string;
    grade:               string;
    position:            string;
    currentPlacement:    string;
    meetingResult:       string;
    postponeApplication: string;
}
