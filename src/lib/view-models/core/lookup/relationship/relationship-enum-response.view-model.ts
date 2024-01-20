// ===============================================================
// Relationship Enum Response View Model
// ===============================================================

export interface EnumRelationshipResponseViewModel {
    status:  number;
    message: string;
    data:    EnumRelationshipResponseData;
}

export interface EnumRelationshipResponseData {
    relationships: EnumRelationship[];
}

export interface EnumRelationship {
    id:          number;
    code:        string;
    description: string;
}

// Converts JSON strings to/from your types
export class EnumRelationshipResponseConvert {

    // to model from response
    public static fromResponse(response: Response): EnumRelationshipResponseViewModel {
        return JSON.parse(JSON.stringify(response));
    }

    // to model from json string
    public static fromJson(json: string): EnumRelationshipResponseViewModel {
        return JSON.parse(json);
    }


    // to json string from model
    public static toJson(value: EnumRelationshipResponseViewModel): string {
        return JSON.stringify(value);
    }
}