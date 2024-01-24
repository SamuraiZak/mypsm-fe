export interface DetailPensionDetailResponse {
    status:  number;
    message: string;
    data:    Data;
}

export interface Data {
    pensionDetail: PensionDetail;
}

export interface PensionDetail {
    applicationDate: Date;
    PTBDate:         Date;
    referenceNumber: string;
    referenceDate:   Date;
    status:          string;
    remark:          string;
    pensionNumber:   string;
    KWAPEmailDate:   Date;
}
