export interface EditPensionDetailRequest {
    id:              number;
    employeeId:      number;
    PTBDate:         Date;
    referenceNumber: string;
    referenceDate:   Date;
    pensionNumber:   string;
    KWAPEmailDate:   Date;
}
