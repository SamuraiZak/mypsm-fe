export interface KPEmployeeListDTO {
    id:                 string;
    employeeNumber:     string;
    name:               string;
    identityCardNumber: string;
    grade:              string;
    position:           string;
    placement:          string;
}

// Converts JSON strings to/from your types
export class KPEmployeeListConvert {
    public static fromJson(json: string): KPEmployeeListDTO {
        return JSON.parse(json);
    }

    public static toJson(value: KPEmployeeListDTO): string {
        return JSON.stringify(value);
    }
}