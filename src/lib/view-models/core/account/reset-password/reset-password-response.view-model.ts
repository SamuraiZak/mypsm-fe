// ===============================================================
// Reset Password Response View Model
// ===============================================================

export interface ResetPasswordResponseViewModel {
    status:  number;
    message: string;
    data:    ResetPasswordResponseData;
}

export interface ResetPasswordResponseData {
    email: string;
}

// Converts JSON strings to/from your types
export class ResetPasswordResponseConvert {

    // to model from response
    public static fromResponse(response: Response): ResetPasswordResponseViewModel {
        return JSON.parse(JSON.stringify(response));
    }

    // to model from json string
    public static fromJson(json: string): ResetPasswordResponseViewModel {
        return JSON.parse(json);
    }

    // to json string from model
    public static toJson(value: ResetPasswordResponseViewModel): string {
        return JSON.stringify(value);
    }
}