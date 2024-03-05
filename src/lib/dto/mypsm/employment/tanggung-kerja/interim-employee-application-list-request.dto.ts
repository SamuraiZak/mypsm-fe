export interface EmployeeInterimApplicationDTO {
    employeeNumber?:     number;
    name?:               string;
    identityCardNumber?: string;
    applicationDate?:    Date;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toEmployeeInterimApplicationDTO(json: string): EmployeeInterimApplicationDTO {
        return JSON.parse(json);
    }

    public static employeeInterimApplicationDTOToJson(value: EmployeeInterimApplicationDTO): string {
        return JSON.stringify(value);
    }
}