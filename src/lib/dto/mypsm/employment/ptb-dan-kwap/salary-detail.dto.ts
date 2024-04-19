export interface SalaryDetailDTO {
    effectiveDate: Date;
    baseSalary:    number;
    ITKA:          string;
    ITP:           number;
    EPW:           number;
    COLA:          string;
}

// Converts JSON strings to/from your types
export class SalaryDetailDTOConvert {
    public static fromJson(json: string): SalaryDetailDTO {
        return JSON.parse(json);
    }

    public static toJson(value: SalaryDetailDTO): string {
        return JSON.stringify(value);
    }
}
