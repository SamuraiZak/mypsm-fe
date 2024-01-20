// ===============================================================
// Relationship Enum Response View Model
// ===============================================================

export interface EnumSponsorshipResponseViewModel {
    status:  number;
    message: string;
    data:    EnumSponsorshipResponseData;
}

export interface EnumSponsorshipResponseData {
    sponsorships: EnumSponsorship[];
}

export interface EnumSponsorship {
    id:          number;
    code:        string;
    description: string;
}

// Converts JSON strings to/from your types
export class EnumSponsorshipResponseConvert {

    // to model from response
    public static fromResponse(response: Response): EnumSponsorshipResponseViewModel {
        return JSON.parse(JSON.stringify(response));
    }

    // to model from json string
    public static fromJson(json: string): EnumSponsorshipResponseViewModel {
        return JSON.parse(json);
    }

    // to json string from model
    public static toJson(value: EnumSponsorshipResponseViewModel): string {
        return JSON.stringify(value);
    }
}