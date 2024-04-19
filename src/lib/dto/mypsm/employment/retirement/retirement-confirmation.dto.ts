export interface ConfirmationDetailDTO {
    status: boolean;
    remark: string;
}

// Converts JSON strings to/from your types
export class ConfirmationDetailDTOConvert {
    public static toConfirmationDetailDTO(json: string): ConfirmationDetailDTO {
        return JSON.parse(json);
    }

    public static confirmationDetailDTOToJson(value: ConfirmationDetailDTO): string {
        return JSON.stringify(value);
    }
}
