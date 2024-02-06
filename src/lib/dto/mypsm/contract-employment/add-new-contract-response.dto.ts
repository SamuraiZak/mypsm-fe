export interface AddNewContractResponse {
    status: string;
}

// Converts JSON strings to/from your types
export class AddNewContractResponseConvert {
    public static fromResponse(json: string): AddNewContractResponse {
        return JSON.parse(json);
    }

    public static toJson(value: AddNewContractResponse): string {
        return JSON.stringify(value);
    }
}