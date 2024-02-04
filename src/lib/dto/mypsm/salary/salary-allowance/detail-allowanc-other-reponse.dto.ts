export interface DetailAllowanceOtherResponseDTO {
    employeeId:    string;
    name:          string;
    total:         number;
    submittedDate: Date;
    approvedDate:  Date;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toDetailAllowanceOtherResponseDTO(json: string): DetailAllowanceOtherResponseDTO {
        return JSON.parse(json);
    }

    public static detailAllowanceOtherResponseDTOToJson(value: DetailAllowanceOtherResponseDTO): string {
        return JSON.stringify(value);
    }
}