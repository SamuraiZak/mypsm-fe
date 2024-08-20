export interface InterimReferenceNumber {
    interimId : number;
    referenceNumber: string;
    status: boolean;
    slogan: string;
    date:  string;
    isDraft: boolean
}

// Converts JSON strings to/from your types
export class InterimReferenceNumberConvert {
    public static fromJson(json: string): InterimReferenceNumber {
        return JSON.parse(json);
    }

    public static toJson(value: InterimReferenceNumber): string {
        return JSON.stringify(value);
    }
}