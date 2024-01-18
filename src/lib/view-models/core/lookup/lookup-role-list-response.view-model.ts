// ===============================================================
// Lookup Role List Response View Model
// ===============================================================

export interface RoleListResponseViewModel {
    status:  number;
    message: string;
    data:    RoleListData;
}

export interface RoleListData {
    rolesList: string[];
}

// Converts JSON strings to/from your types
export class RoleListConvert {

    // to model from response
    public static fromResponse(response: Response): RoleListResponseViewModel {
        return JSON.parse(JSON.stringify(response));
    }

    // to model from json string
    public static fromJson(json: string): RoleListResponseViewModel {
        return JSON.parse(json);
    }

    public static toJson(value: RoleListResponseViewModel): string {
        return JSON.stringify(value);
    }
}