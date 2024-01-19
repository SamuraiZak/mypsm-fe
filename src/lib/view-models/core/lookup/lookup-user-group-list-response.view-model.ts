// ===============================================================
// Lookup User Group List Response View Model
// ===============================================================

export interface UserGroupListResponseViewModel {
    status:  number;
    message: string;
    data:    UserGroupListData;
}

export interface UserGroupListData {
    userGroupList: string[];
}

// Converts JSON strings to/from your types
export class UserGroupListConvert {

    // to model from response
    public static fromResponse(response: Response): UserGroupListResponseViewModel {
        return JSON.parse(JSON.stringify(response));
    }

    // to model from json string
    public static fromJson(json: string): UserGroupListResponseViewModel {
        return JSON.parse(json);
    }

    // to json string from model
    public static toJson(value: UserGroupListResponseViewModel): string {
        return JSON.stringify(value);
    }
}