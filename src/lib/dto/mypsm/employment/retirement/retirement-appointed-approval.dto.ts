export interface AppointedApprovalDetailDTO {
    voluntaryId: number;
    status:      boolean;
    remark:      string;
    isReadOnly:  boolean;
}

// Converts JSON strings to/from your types
export class AppointedApprovalDetailDTOConvert {
    public static fromJson(json: string): AppointedApprovalDetailDTO {
        return JSON.parse(json);
    }

    public static toJson(value: AppointedApprovalDetailDTO): string {
        return JSON.stringify(value);
}
}