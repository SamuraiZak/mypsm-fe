export interface EmployeeInterimApplicationDetailResponseDTO {
    interimId:          number;
    name:               string;
    identityCardNumber: string;
    confirmServiceDate: string;
    positionWithGrade:  string;
    effectiveDate:      Date;
    placement:          string;
}

// Converts JSON strings to/from your types
export class EmployeeInterimApplicationDetailResponseDTOConvert {
    public static fromJson(json: string): EmployeeInterimApplicationDetailResponseDTO {
        return JSON.parse(json);
    }

    public static toJson(value: EmployeeInterimApplicationDetailResponseDTO): string {
        return JSON.stringify(value);
    }
}