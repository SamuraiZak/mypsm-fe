// ===============================================================
// Reset Password Response View Model
// ===============================================================

export interface ResetPasswordRequestViewModel {
    idType:  string;
    idValue: string;
}

// Converts JSON strings to/from your types
export class ResetPasswordRequestConvert {

    // to model from json string
    public static fromJson(json: string): ResetPasswordRequestViewModel {
        return JSON.parse(json);
    }

    // to json string from model
    public static toJson(value: ResetPasswordRequestViewModel): string {
        return JSON.stringify(value);
    }
}