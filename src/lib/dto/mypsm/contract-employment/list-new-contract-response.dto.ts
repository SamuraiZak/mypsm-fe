export interface ListNewContractResponse {
    candidateId:    number;
    candidateName:  string;
    temporaryId:    string;
    identityCardNo: string;
    email:          string;
}

// Converts JSON strings to/from your types
export class ListNewContractResponseConvert {
    public static fromResponse(json: string): ListNewContractResponse {
        return JSON.parse(json);
    }

    public static toJson(value: ListNewContractResponse): string {
        return JSON.stringify(value);
    }
}
