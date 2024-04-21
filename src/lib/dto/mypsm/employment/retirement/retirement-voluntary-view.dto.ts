export interface VoluntaryViewDetailDTO {
    details: Details;
}

export interface Details {
    applicationDetail:     ApplicationDetail;
    certification:         Approval;
    confirmation:          Approval;
    supportApprover:       SupportApprover;
    firstSupporter:        Approval;
    secondSupporter:       Approval;
    approval:              Approval;
    secretaryApproval:     Approval;
    documentCertification: DocumentCertification;
    letterCertification:   Approval;
}

export interface ApplicationDetail {
    voluntaryId:       number;
    newRetirementDate: Date;
    retirementDate:    Date;
    reason:            string;
}

export interface Approval {
    voluntaryId: number;
    name:        string;
    status:      boolean;
    remark:      string;
}

export interface DocumentCertification {
    document: Document;
}

export interface Document {
    voluntaryId: number;
    name:        string;
    remark:      string;
    status:      string;
}

export interface SupportApprover {
    voluntaryId: number;
    supporter1:  string;
    supporter2:  string;
    approver:    string;
}

// Converts JSON strings to/from your types
export class VoluntaryViewDetailDTOConvert {
    public static fromJson(json: string): VoluntaryViewDetailDTO {
        return JSON.parse(json);
    }

    public static toJson(value: VoluntaryViewDetailDTO): string {
        return JSON.stringify(value);
}
}