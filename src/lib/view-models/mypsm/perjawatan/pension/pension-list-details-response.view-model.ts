// respnse
export interface PensionTableResponse {
    status: number;
    message: string;
    data: Data;
}

export interface Data {
    pageNum: number;
    totalData: number;
    totalPage: number;
    pensionDetails: PensionDetail[];
}

export interface PensionDetail {
    employeeId: number;
    employeeNo: string;
    employeeName: string;
    identityCardNo: string;
    category: Category;
    applicationDate: Date;
    status: string;
    remark: string;
}

export enum Category {
    Tetap = 'tetap',
}
