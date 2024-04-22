export interface EmployeeInterimApplicationListResponseDTO {
    id:              number;
    employeeNumber:  string;
    name:            string;
    icNumber:        string;
    applicationDate?: string;
    startDate:       string;
    endDate:         string;
    status:          string | null;
    remark:          string | null;
}

export interface EmployeeInterimApplicationFilter {
    employeeNumber: string | null;
    name: string | null;
    identityCardNumber: string | null;
    applicationDate: string | null;
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