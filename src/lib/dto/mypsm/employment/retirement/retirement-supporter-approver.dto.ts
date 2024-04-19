export interface SupporterApproverDetailDTO {
    voluntaryId: number;
    supporter1:  string;
    supporter2:  string;
    approver:    string;
    isReadOnly:  boolean;
}

// Converts JSON strings to/from your types
export class SupporterApproverDetailDTOConvert {
    public static fromJson(json: string): SupporterApproverDetailDTO {
        return JSON.parse(json);
    }

    public static toJson(value: SupporterApproverDetailDTO): string {
        return JSON.stringify(value);
}
}
