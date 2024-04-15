export interface ClinicClaimsDetails {
    detail:            ClinicClaimDetail;
    download:          ClinicClaimDownload[];
    secretaryApproval: SecretaryApproval | null;
    supporterApprover: SupporterApprover | null;
    supporter:         Approver | null;
    approver:          Approver | null;
}

export interface Approver {
    id:     number;
    name:   string;
    status: boolean;
    remark: string;
}

export interface ClinicClaimDetail {
    id?:            number;
    invoiceDate:    string;
    invoiceNumber:  string;
    treatmentMonth: number;
    treatmentYear:  number;
    total:          number;
    documents:      ClinicClaimDocument[];
}

export interface ClinicClaimDocument {
    base64: string;
    name: string;
}
export interface ClinicClaimDownload {
    document: string;
    name: string;
}
export interface SecretaryApproval {
    id:     number;
    remark: string;
    status: boolean;
}

export interface SupporterApprover {
    id:          number;
    supporterId: number;
    approverId:  number;
}

// Converts JSON strings to/from your types
export class ClinicClaimsDetailsConvert {
    public static fromJson(json: string): ClinicClaimsDetails {
        return JSON.parse(json);
    }

    public static toJson(value: ClinicClaimsDetails): string {
        return JSON.stringify(value);
    }
}
export class ClinicClaimDetailConvert {
    public static fromJson(json: string): ClinicClaimDetail {
        return JSON.parse(json);
    }

    public static toJson(value: ClinicClaimDetail): string {
        return JSON.stringify(value);
    }
}