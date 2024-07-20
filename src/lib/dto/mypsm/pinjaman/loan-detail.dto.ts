export interface loanDetail {
    id:            number;
    maxLoan:       number;
    requestedLoan: number;
    paymentPeriod: number;
    reason:        string;
    isDraft: boolean;
}

// Converts JSON strings to/from your types
export class Convert {
    public static fromJson(json: string): loanDetail {
        return JSON.parse(json);
    }

    public static toJson(value: loanDetail): string {
        return JSON.stringify(value);
    }
}