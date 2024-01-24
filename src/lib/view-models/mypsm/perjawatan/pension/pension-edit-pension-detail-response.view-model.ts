export interface EditPensionDetailResponse {
    status:  number;
    message: string;
    data:    Data;
}

export interface Data {
    applicationDate: Date;
    ptbDate:         Date;
    referenceNumber: string;
    referenceDate:   Date;
    status:          string;
    remark:          string;
    pensionNumber:   string;
}
