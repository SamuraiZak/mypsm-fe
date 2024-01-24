export interface PensionEditApproveResponse {
    status:  number;
    message: string;
    data:    Data;
}

export interface Data {
    approvedStatus: string;
    approvedRemark: string;
    approvedDate:   Date;
}
