// =================================================================
// New Hire List Request View Model
// =================================================================

export interface NewHireListRequestViewModel {
    pageNum:   number;
    pageSize:  number;
    orderBy:   string;
    orderType: string;
    filter:    NewHireListRequestFilter;
}

export interface NewHireListRequestFilter {
    dataType:     string;
    identityCard?: string | null;
    staffNo?:      string | null;
    staffName?:    string | null;
    dateRequest?:  string | null;
    dateHire?:     string | null;
    status?:       string | null;
}

// Converts JSON strings to/from your types
export class NewHireListRequestConvert {

    // to model from json string
    public static fromJson(json: string): NewHireListRequestViewModel {
        return JSON.parse(json);
    }

    // to json string from model
    public static toJson(value: NewHireListRequestViewModel): string {
        return JSON.stringify(value);
    }
}