export interface AllowanceActingResponseDTO {
    grade:     string;
    ITK:       number;
    ITP:       number;
    allowance: number;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toAllowanceActingResponseDTO(json: string): AllowanceActingResponseDTO {
        return JSON.parse(json);
    }

    public static allowanceActingResponseDTOToJson(value: AllowanceActingResponseDTO): string {
        return JSON.stringify(value);
    }
}
