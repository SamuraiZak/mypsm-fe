// ===============================================================
// Employment Status Enum Response View Model
// ===============================================================

export interface EnumEmploymentStatusResponseViewModel {
    status: number;
    message: string;
    data: EnumEmploymentStatusResponseData;
}

export interface EnumEmploymentStatusResponseData {
    employmentStatus: EnumEmploymentStatus[];
}

export interface EnumEmploymentStatus {
    id: string;
    occSectorCode: string;
    occSectorName: string;
}

// Converts JSON strings to/from your types
export class EnumEmploymentStatusResponseConvert {
    // to model from response
    public static fromResponse(
        response: Response,
    ): EnumEmploymentStatusResponseViewModel {
        return JSON.parse(JSON.stringify(response));
    }

    // to model from json string
    public static fromJson(
        json: string,
    ): EnumEmploymentStatusResponseViewModel {
        return JSON.parse(json);
    }

    // to json string from model
    public static toJson(value: EnumEmploymentStatusResponseViewModel): string {
        return JSON.stringify(value);
    }
}
