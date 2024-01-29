// ===============================================================
// Agency Group Enum View Model
// ===============================================================

export interface EnumAgencyGroupResponseViewModel {
    status:  number;
    message: string;
    data:    Data;
}

export interface Data {
    employmentStatus: any;
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
    public static fromResponse(response: Response): EnumAgencyGroupResponseViewModel {
        return JSON.parse(JSON.stringify(response));
    }

    // to model from json string
    public static fromJson(json: string): EnumAgencyGroupResponseViewModel {
        return JSON.parse(json);
    }

    // to json string from model
    public static toJson(value: EnumAgencyGroupResponseViewModel): string {
        return JSON.stringify(value);
    }
}