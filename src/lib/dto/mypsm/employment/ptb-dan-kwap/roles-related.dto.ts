export interface RolesRelatedDetailDTO {
    supporterName:   string;
    supportedStatus: string;
    supportedRemark: string;
    supportedDate:   Date;
    approverName:    string;
    approvedStatus:  string;
    approvedRemark:  string;
    approvedDate:    Date;
}

// Converts JSON strings to/from your types
export class RolesRelatedDetailDTOConvert {
    public static fromJson(json: string): RolesRelatedDetailDTO {
        return JSON.parse(json);
    }

    public static toJson(value: RolesRelatedDetailDTO): string {
        return JSON.stringify(value);
    }
}
