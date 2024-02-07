export interface ListNewContractRequest {
    dataType?:     string;
    identityCard?: null;
    staffNo?:      null;
    staffName?:    null;
    dateRequest?:  null;
    dateHire?:     null;
    status?:       null;
}

// Converts JSON strings to/from your types
export class ListNewContractRequestConvert {
    public static fromResponse(json: string): ListNewContractRequest {
        return JSON.parse(json);
    }

    public static toJson(value: ListNewContractRequest): string {
        return JSON.stringify(value);
    }
}
