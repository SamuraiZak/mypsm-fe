// ===============================================================
// Reset Password Request View Model
// ===============================================================

export interface ResetPasswordRequestViewModel{
    idType: string,
    idValue: string,
}


// Converts JSON strings to/from your types
export class ResetPasswordRequestConvert {
    public static fromJson(json: string): ResetPasswordRequestViewModel {
        return JSON.parse(json);
    }

    public static toJson(value: ResetPasswordRequestViewModel): string {
        return JSON.stringify(value);
    }
}