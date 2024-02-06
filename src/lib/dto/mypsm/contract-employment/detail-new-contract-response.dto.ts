export interface NewContractDetailResponse {
    name:           string;
    email:          string;
    startContract:  Date;
    endContract:    Date;
    contractPeriod: number;
    wageRate:       number;
    designation:    string;
    reportDutyDate: Date;
}

// Converts JSON strings to/from your types
export class NewContractDetailResponseConvert {
    public static fromResponse(json: string): NewContractDetailResponse {
        return JSON.parse(json);
    }

    public static toJson(value: NewContractDetailResponse): string {
        return JSON.stringify(value);
    }
}
