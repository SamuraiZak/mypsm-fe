export interface EditNewContractRequest {
    candidateId:    number;
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
export class EditNewContractRequestConvert {
    public static fromResponse(json: string): EditNewContractRequest {
        return JSON.parse(json);
    }

    public static toJson(value: EditNewContractRequest): string {
        return JSON.stringify(value);
    }
}

//response use common jak