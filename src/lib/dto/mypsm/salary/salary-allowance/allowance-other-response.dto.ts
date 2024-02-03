export interface AllowanceOtherResponseDTO {
    employeeId: string;
    name:       string;
    total:      number;
    fromDate:   Date;
    toDate:     Date;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toAllowanceOtherResponseDTO(json: string): AllowanceOtherResponseDTO {
        return JSON.parse(json);
    }

    public static allowanceOtherResponseDTOToJson(value: AllowanceOtherResponseDTO): string {
        return JSON.stringify(value);
    }
}
