export interface ListPostponeResult {
    status:  number;
    message: string;
    data:    Data;
}

export interface Data {
    pageNum:         number;
    totalData:       number;
    totalPage:       number;
    postponeResults: PostponeResult[];
}

export interface PostponeResult {
    employeeNumber:      string;
    employeeName:        string;
    ICNumber:            string;
    programme:           string;
    grade:               string;
    position:            string;
    currentPlacement:    string;
    postponeApplication: string;
    postponeResult:      string;
}