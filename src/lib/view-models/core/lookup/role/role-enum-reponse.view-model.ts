// ===============================================================
// Role Enum Response View Model
// ===============================================================

export interface EnumRoleResponseViewModel {
    status:  number;
    message: string;
    data:    EnumRoleResponseData;
}

export interface EnumRoleResponseData {
    rolesList: EnumRole[];
}

export interface EnumRole {
    id:   number;
    name: string;
}

// Converts JSON strings to/from your types
export class EnumRoleResponseConvert {

    // to model from response
    public static fromResponse(response: Response): EnumRoleResponseViewModel {
        return JSON.parse(JSON.stringify(response));
    }

    // to model from json string
    public static fromJson(json: string): EnumRoleResponseViewModel {
        return JSON.parse(json);
    }

    // to json string from model
    public static toJson(value: EnumRoleResponseViewModel): string {
        return JSON.stringify(value);
    }
}