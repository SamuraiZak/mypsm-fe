export interface ActingSupportApproval {
    supportedStatus: string;
    supportedRemark: string;
    supportedDate:   string;
}

export interface ActingApproverApproval {
    approvedStatus: string;
    approvedRemark: string;
    approvedDate:   string;
}

export interface ActingDirectorApproval {
    directorCertifiedStatus: string;
    directorCertifiedRemark: string;
    directorCertifiedDate:   Date;
}

