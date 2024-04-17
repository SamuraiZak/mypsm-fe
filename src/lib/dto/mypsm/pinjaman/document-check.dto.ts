export interface DocumentCheck {
    id:                number;
    agreementReceived: boolean;
    agreementChecked:  boolean;
}

// Converts JSON strings to/from your types
export class DocumentCheckConvert {
    public static fromJson(json: string): DocumentCheck {
        return JSON.parse(json);
    }

    public static toJson(value: DocumentCheck): string {
        return JSON.stringify(value);
    }
}
