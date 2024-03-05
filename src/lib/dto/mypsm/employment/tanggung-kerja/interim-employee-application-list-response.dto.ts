export interface EmployeeInterimApplicationListResponseDTO {
    id:              number;
    employeeNumber:  string;
    name:            string;
    icNumber:        string;
    applicationDate: Date | null;
    startDate:       Date | null;
    endDate:         Date | null;
    status:          string | null;
    remark:          string | null;
}

// Converts JSON strings to/from your types
export class EmployeeInterimApplicationListResponseDTOConvert {
    public static fromJson(json: string): EmployeeInterimApplicationListResponseDTO {
        return JSON.parse(json);
    }

    public static toJson(value: EmployeeInterimApplicationListResponseDTO): string {
        return JSON.stringify(value);
    }
}