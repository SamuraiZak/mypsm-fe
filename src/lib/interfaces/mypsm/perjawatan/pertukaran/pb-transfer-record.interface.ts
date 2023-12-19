export interface ITransferRecordPB {
    id: number;
    applicantId: number;
    
    employeeNumber: number;
    employeeName: string;
    identityDocumentNumber: string;
    transferType: string;
    applicationDate: Date;
    result: string;
    progress: string;
}
