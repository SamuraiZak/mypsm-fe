export interface Finalpayslip {
    id:       number;
    document: string;
}

// Converts JSON strings to/from your types
export class FinalpayslipConvert {
    public static fromJson(json: string): Finalpayslip {
        return JSON.parse(json);
    }

    public static toJson(value: Finalpayslip): string {
        return JSON.stringify(value);
    }
}