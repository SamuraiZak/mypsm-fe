// ===============================================================
// Authentication Request View Model
// ===============================================================

export interface AuthenticationRequestViewModel {
    idType:      string;
    userGroup:   string;
    username:    string;
    password:    string;
    currentRole: string;
}

// Converter
export class AuthenticationRequestConvert {

    // convert to model from type response
    public static fromResponse(response: Response): AuthenticationRequestViewModel {
        return JSON.parse(JSON.stringify(response));
    }

    // convert to model from json string
    public static fromJson(json: string): AuthenticationRequestViewModel {
        return JSON.parse(json);
    }

    // convert to json string from model
    public static tojson(value: AuthenticationRequestViewModel): string {
        return JSON.stringify(value);
    }
}