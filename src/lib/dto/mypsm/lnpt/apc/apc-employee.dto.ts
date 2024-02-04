export interface ApcEmployeeDTO {
    employeeId?: number;
    employeeNumber: string;
    employeeName: string;
    employeeIdentityNo: string;
    grade: string;
    position: string;
    placement: string;
    excellenceAwardYear: number;
}

// Converts JSON strings to/from your types
export class ApcEmployeeConvert {
    public static fromJson(json: string): ApcEmployeeDTO {
        return JSON.parse(json);
    }

    public static toJson(value: ApcEmployeeDTO): string {
        return JSON.stringify(value);
    }
}
