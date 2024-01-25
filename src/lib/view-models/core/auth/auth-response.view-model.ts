// ===============================================================
// Reset Password Request View Model
// ===============================================================

export interface AuthenticationResponseViewModel {
    status:  number;
    message: string;
    data:    AuthenticationResponseData;
}

export interface AuthenticationResponseData {
    token: string;
}

// Converts JSON strings to/from your types
export class AuthenticationResponseConvert {

    // to model from response
    public static fromResponse(response: Response): AuthenticationResponseViewModel {
        return JSON.parse(JSON.stringify(response));
    }

    // to model from json string
    public static fromJson(json: string): AuthenticationResponseViewModel {
        return JSON.parse(json);
    }

    // to json string form model
    public static toJson(value: AuthenticationResponseViewModel): string {
        return JSON.stringify(value);
    }
}