export interface ApcDTO {
    employeeID:          number;
    employeeNumber:      string;
    employeeName:        string;
    employeeIdentityNo:  string;
    grade:               string;
    position:            string;
    placement:           string;
    excellenceAwardYear: number;
}

// Converts JSON strings to/from your types
export class ApcConvert {
    public static toApcDTO(json: string): ApcDTO {
        return JSON.parse(json);
    }

    public static apcDTOToJson(value: ApcDTO): string {
        return JSON.stringify(value);
    }
}