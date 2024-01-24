export interface AddPensionDetailResponse {
    status:  number;
    message: string;
    data:    Data;
}

export interface Data {
    pensionId:           number;
    createPensionDetail: CreatePensionDetail;
}

export interface CreatePensionDetail {
    ptbDate:         Date;
    applicationDate: Date;
    referenceNumber: string;
    referenceDate:   Date;
    pensionNumber:   string;
}
