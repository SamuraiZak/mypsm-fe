export interface AllowancePublicResponseDTO {
    leave: any[];
    loan:  any[];
}

// Converts JSON strings to/from your types
export class Convert {
    public static toAllowancePublicResponseDTO(json: string): AllowancePublicResponseDTO {
        return JSON.parse(json);
    }

    public static allowancePublicResponseDTOToJson(value: AllowancePublicResponseDTO): string {
        return JSON.stringify(value);
    }
}
