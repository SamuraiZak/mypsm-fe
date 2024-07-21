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

// Converts JSON strings to/from your types
export class ActingCommonApprovalConvert {
    public static fromJson(json: string): ActingCommonApproval {
        return JSON.parse(json);
    }

    public static toJson(value: ActingCommonApproval): string {
        return JSON.stringify(value);
    }
}
