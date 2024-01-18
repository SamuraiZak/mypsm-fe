// ===============================================================
// Update Password Request View Model
// ===============================================================

export interface UpdatePasswordRequestViewModel{
    username: string,
    oldPassword: string,
    newPassword: string,
}


// Converts JSON strings to/from your types
export class UpdatePasswordRequestConvert {

    // to model from reponse
    public static fromResponse(response: Response): UpdatePasswordRequestViewModel {
        return JSON.parse(JSON.stringify(response));
    }

    // to model from json string
    public static fromJson(json: string): UpdatePasswordRequestViewModel {
        return JSON.parse(json);
    }

    // to json from model
    public static toJson(value: UpdatePasswordRequestViewModel): string {
        return JSON.stringify(value);
    }
}