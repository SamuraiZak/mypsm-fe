export interface PensionDetailDTO {
    id:              number;
    employeeId:      number;
    PTBDate:         Date;
    referenceNumber: string;
    referenceDate:   Date;
    pensionNumber:   string;
    KWAPEmailDate:   Date;
}

// Converts JSON strings to/from your types
export class PensionDetailDTOConvert {
    public static fromJson(json: string): PensionDetailDTO {
        return JSON.parse(json);
    }

    public static toJson(value: PensionDetailDTO): string {
        return JSON.stringify(value);
    }
}