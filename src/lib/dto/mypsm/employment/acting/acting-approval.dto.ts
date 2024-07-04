export interface ActingFinalApproval {
    status: boolean;
    remark: string;
    supportedDate?:   string;
    approvedDate?:   string;
}

export interface ActingDirectorApproval {
    directorCertifiedStatus: string;
    directorCertifiedRemark: string;
    directorCertifiedDate:   string;
}
export interface ActingIntegrityApproval {
    integrityCertifiedStatus: string;
    integrityCertifiedRemark: string;
    integrityCertifiedDate:   string;
}

export interface ActingCommonApproval {
    id:     number;
    status: boolean;
    remark: string;
    directorCertifiedDate?: string;
}
