export interface ContractEmployeeDocument {
    document: ContractDocument;
}

export interface ContractDocument {
    base64: string;
    name:   string;
}

// Converts JSON strings to/from your types
export class ContractEmployeeDocumentConvert {
    public static fromJson(json: string): ContractEmployeeDocument {
        return JSON.parse(json);
    }

    public static toJson(value: ContractEmployeeDocument): string {
        return JSON.stringify(value);
    }
}