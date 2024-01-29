export interface ListActingConfirmation {
    status:  number;
    message: string;
    data:    Data;
}

export interface Data {
    pageNum:             number;
    totalData:           number;
    totalPage:           number;
    actingConfirmations: ActingConfirmation[];
}

export interface ActingConfirmation {
    employeeNumber:   string;
    employeeName:     string;
    ICNumber:         string;
    currentGrade:     string;
    actingGrade:      string;
    position:         string;
    currentPlacement: string;
    actingResult:     string;
}
