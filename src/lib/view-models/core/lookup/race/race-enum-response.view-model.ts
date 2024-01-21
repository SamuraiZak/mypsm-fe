// ===============================================================
// Race Enum Response View Model
// ===============================================================

export interface EnumRaceResponseViewModel {
    status:  number;
    message: string;
    data:    EnumRaceResponseData;
}

export interface EnumRaceResponseData {
    races: EnumRace[];
}

export interface EnumRace {
    id:          number;
    code:        string;
    description: string;
}

// Converts JSON strings to/from your types
export class EnumRaceResponseConvert {

    // to model from response
    public static fromResponse(response: Response): EnumRaceResponseViewModel {
        return JSON.parse(JSON.stringify(response));
    }

    // to model from json string
    public static fromJson(json: string): EnumRaceResponseViewModel {
        return JSON.parse(json);
    }

    // to json string from model
    public static enumRaceResponseViewModelToJson(value: EnumRaceResponseViewModel): string {
        return JSON.stringify(value);
    }
}