export interface SalaryDetailDTO {
    name:     string;
    quantity: number;
    price:    number;
    total:    number;
}

// Converts JSON strings to/from your types
export class SalaryDetailDTOConvert {
    public static toSalaryDetailDTO(json: string): SalaryDetailDTO {
        return JSON.parse(json);
    }

    public static salaryDetailDTOToJson(value: SalaryDetailDTO): string {
        return JSON.stringify(value);
    }
}
