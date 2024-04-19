export interface ApproveDetailDTO {
    approverName:   string;
    approvedStatus: string;
    approvedRemark: string;
    approvedDate:   Date;
}

// Converts JSON strings to/from your types
export class ApproveDetailDTOConvert {
    public static fromJson(json: string): ApproveDetailDTO {
        return JSON.parse(json);
    }

    public static toJson(value: ApproveDetailDTO): string {
        return JSON.stringify(value);
    }
}
