export interface SecondSchedule {
    id:             number;
    sellingPrice:   number;
    sellingBalance: number;
    govFund:        number;
    installment:    number;
    paymentPeriod:  number;
}

// Converts JSON strings to/from your types
export class Convert {
    public static fromJson(json: string): SecondSchedule {
        return JSON.parse(json);
    }

    public static toJson(value: SecondSchedule): string {
        return JSON.stringify(value);
    }
}
