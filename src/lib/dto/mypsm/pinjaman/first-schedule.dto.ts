export interface FirstSchedule {
    id:             number;
    purchasePrice:  number;
    balancePayment: number;
    govFund:        number;
}

// Converts JSON strings to/from your types
export class Convert {
    public static fromJson(json: string): FirstSchedule {
        return JSON.parse(json);
    }

    public static toJson(value: FirstSchedule): string {
        return JSON.stringify(value);
    }
}