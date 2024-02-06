export interface AllowanceAdjustmentResponseDTO {
    type: string;
    startDate: Date;
    endDate: Date;
    paymentType: string;
    amount: number;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toAllowanceAdjustmentResponseDTO(
        json: string,
    ): AllowanceAdjustmentResponseDTO {
        return JSON.parse(json);
    }

    public static allowanceAdjustmentResponseDTOToJson(
        value: AllowanceAdjustmentResponseDTO,
    ): string {
        return JSON.stringify(value);
    }
}
