export interface PensionListSupportResponse {
    status:  number;
    message: string;
    data:    Data;
}

export interface Data {
    pageNum:        number;
    totalData:      number;
    totalPage:      number;
    pensionDetails: PensionDetail[];
}

export interface PensionDetail {
    employeeNo:      string;
    employeeName:    string;
    identityCardNo:  string;
    category:        string;
    applicationDate: Date;
    status:          string;
    remark:          string;
}
