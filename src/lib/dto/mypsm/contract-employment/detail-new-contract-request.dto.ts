export interface NewContractDetailRequest {
    candidateId: number;
}

// Converts JSON strings to/from your types
export class NewContractDetailRequestConvert {
    public static fromResponse(json: string): NewContractDetailRequest {
        return JSON.parse(json);
    }

    public static toJson(value: NewContractDetailRequest): string {
        return JSON.stringify(value);
    }
}
