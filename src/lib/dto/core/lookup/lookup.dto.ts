// ===============================================================
// Lookup DTO
// ===============================================================

export interface LookupDTO {
    id?: number;
    code: string;
    description: string;
    year?: number;
    url?: string;
    countryCode?: string;

    //for approver and supporter
    employeeId?: number;
    employeeNumber?: string;
    name?: string;
    identityCard?: string;
    program?: string;
    scheme?: string;
    grade?: string;
    position?: string;
    placement?: string;

    //for employment status
    occSectorCode?: string;
    occSectorName?: string;
}

// Converts JSON strings to/from your types
export class LookupConvert {
    // to model from json string
    public static fromJson(json: string): LookupDTO {
        return JSON.parse(json);
    }

    // to json string from model
    public static toJson(value: LookupDTO): string {
        return JSON.stringify(value);
    }
}