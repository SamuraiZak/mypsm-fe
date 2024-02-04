export interface CommonEmployeeDTO {
    employeeNumber?: string;
    name?:           string;
    identityCard?:   string;
    program?:        string;
    scheme?:         string;
    grade?:          string;
    position?:       string;
    placement?:      string;
}

// Converts JSON strings to/from your types
export class CommonEmployeeConvert {
    public static fromJson(json: string): CommonEmployeeDTO {
        return JSON.parse(json);
    }

    public static toJson(value: CommonEmployeeDTO): string {
        return JSON.stringify(value);
    }
}