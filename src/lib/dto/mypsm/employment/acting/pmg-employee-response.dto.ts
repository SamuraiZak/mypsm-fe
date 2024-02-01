export interface PMGEmployeeListDTO {
    employeeNumber: string;
    employeeName:   string;
    ICNumber:       string;
    homeAddress:    string;
    programme:      string;
    scheme:         string;
    grade:          string;
    roles:          string[];
}

// Converts JSON strings to/from your types
export class PMGEmployeeListConvert {
    public static toPMGEmployeeListResponseDTO(json: string): PMGEmployeeListDTO {
        return JSON.parse(json);
    }

    public static pMGEmployeeListResponseDTOToJson(value: PMGEmployeeListDTO): string {
        return JSON.stringify(value);
    }
}