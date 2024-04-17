export interface QuartersAddConfirmation {
    id:      number;
    confirm: boolean;
}

// Converts JSON strings to/from your types
export class QuartersAddConfirmationConvert {
    public static fromjson(json: string): QuartersAddConfirmation {
        return JSON.parse(json);
    }

    public static toJson(value: QuartersAddConfirmation): string {
        return JSON.stringify(value);
    }
}