// ===============================================================
// Update Password Response View Model
// ===============================================================

export interface UpdatePasswordResponseViewModel {
    status:  number;
    message: string;
    data:    Data;
}

export interface Data {
}

// Converts JSON strings to/from your types
export class UpdatePasswordResponseConvert {

    // to model from response
    public static fromResponse(response: Response): UpdatePasswordResponseViewModel {
        return JSON.parse(JSON.stringify(response));
    }

    // to model from json string
    public static fromJson(json: string): UpdatePasswordResponseViewModel {
        return JSON.parse(json);
    }

    // to json string from model
    public static toJson(value: UpdatePasswordResponseViewModel): string {
        return JSON.stringify(value);
    }
}