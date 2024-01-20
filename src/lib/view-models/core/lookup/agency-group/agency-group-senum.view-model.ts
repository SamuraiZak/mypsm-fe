// ===============================================================
// Agency Group Enum View Model
// ===============================================================

export interface EnumAgencyGroup {
    status:  number;
    message: string;
    data:    Data;
}

export interface Data {
    agencyGroups: AgencyGroup[];
}

export interface AgencyGroup {
    id:          string;
    code:        string;
    description: string;
}

// Converts JSON strings to/from your types
export class EnumAgencyGroupConvert {

    // to model from response
    public static fromResponse(response: Response): EnumAgencyGroup {
        return JSON.parse(JSON.stringify(response));
    }

    // to model from json string
    public static fromJson(json: string): EnumAgencyGroup {
        return JSON.parse(json);
    }

    // to json string from model
    public static toJson(value: EnumAgencyGroup): string {
        return JSON.stringify(value);
    }
}