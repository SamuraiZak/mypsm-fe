export interface DetailSalaryMovementApprovalDTO {
    id:         string;
    name:       null;
    remark:     null;
    isApproved: boolean;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toDetailSalaryMovementApprovalDTO(json: string): DetailSalaryMovementApprovalDTO {
        return JSON.parse(json);
    }

    public static detailSalaryMovementApprovalDTOToJson(value: DetailSalaryMovementApprovalDTO): string {
        return JSON.stringify(value);
    }
}