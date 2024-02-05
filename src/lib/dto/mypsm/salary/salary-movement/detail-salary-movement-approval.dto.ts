export interface DetailSalaryMovementApprovalDTO {
    id:     number;
    name:   string;
    remark: string;
    status: boolean;
}

// Converts JSON strings to/from your types
export class DetailSalaryMovementApprovalDTOConvert {
    public static toDetailSalaryMovementApprovalDTO(json: string): DetailSalaryMovementApprovalDTO {
        return JSON.parse(json);
    }

    public static detailSalaryMovementApprovalDTOToJson(value: DetailSalaryMovementApprovalDTO): string {
        return JSON.stringify(value);
    }
}