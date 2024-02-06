export interface AddNewContractRequest {
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
export class AddNewContractRequestConvert {
    public static fromResponse(json: string): AddNewContractRequest {
        return JSON.parse(json);
    }

    public static toJson(value: AddNewContractRequest): string {
        return JSON.stringify(value);
    }
}
