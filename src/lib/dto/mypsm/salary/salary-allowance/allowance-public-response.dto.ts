export interface AllowancePublicResponseDTO {
    leave: Leave[];
    loan: Loan[];
}

export interface Loan {
    startDate: Date;
    endDate: Date;
    name: string;
    type: string;
    amount: number;
}

export interface Leave {
    type: string;
    appliedDate: Date;
    fromDate: Date;
    toDate: Date;
    reason: string;
    status: string;
    total: number;
    amount: number;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toAllowancePublicResponseDTO(
        json: string,
    ): AllowancePublicResponseDTO {
        return JSON.parse(json);
    }

    public static allowancePublicResponseDTOToJson(
        value: AllowancePublicResponseDTO,
    ): string {
        return JSON.stringify(value);
    }
}
