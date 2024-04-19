export interface SecretaryApprovalDetailDTO {
    voluntaryId: number;
    status:      boolean;
    remark:      string;
    isReadOnly:  boolean;
}

// Converts JSON strings to/from your types
export class SecretaryApprovalDetailDTOConvert {
    public static fromJson(json: string): SecretaryApprovalDetailDTO {
        return JSON.parse(json);
    }

    public static toJson(value: SecretaryApprovalDetailDTO): string {
        return JSON.stringify(value);
}
}