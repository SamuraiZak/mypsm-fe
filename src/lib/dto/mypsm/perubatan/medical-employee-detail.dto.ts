export interface MedicalEmployeeDetail {
    employeeId:         number;
    employeeNumber:     string;
    name?:              string;
    identityCard?:      string;
    program?:           string;
    scheme?:            string;
    grade:              string;
    position?:          string;
    placement:          string;
    identityCardNumber?: string;
    fullName?:           string;
    serviceGroup?:       string;
}

// Converts JSON strings to/from your types
export class MedicalEmployeeDetailConvert {
    public static fromJson(json: string): MedicalEmployeeDetail {
        return JSON.parse(json);
    }

    public static toJson(value: MedicalEmployeeDetail): string {
        return JSON.stringify(value);
    }
}