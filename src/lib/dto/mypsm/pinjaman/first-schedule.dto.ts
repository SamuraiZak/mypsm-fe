export interface FirstSchedule {
    id:             number;
    purchasePrice:  number;
    balancePayment: number;
    govFund:        number;
    isDraft: boolean;
}

// Converts JSON strings to/from your types
export class FirstScheduleConvert {
    public static fromJson(json: string): FirstSchedule {
        return JSON.parse(json);
    }

    public static toJson(value: FirstSchedule): string {
        return JSON.stringify(value);
    }
}