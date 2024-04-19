export interface RequestLettercertificationDetailDTO {
    forcedId: number;
    remark:   string;
    status:   boolean;
}

// Converts JSON strings to/from your types
export class RequestLettercertificationDetailDTOConvert {
    public static fromJson(json: string): RequestLettercertificationDetailDTO {
        return JSON.parse(json);
    }

    public static toJson(value: RequestLettercertificationDetailDTO): string {
        return JSON.stringify(value);
    }
}