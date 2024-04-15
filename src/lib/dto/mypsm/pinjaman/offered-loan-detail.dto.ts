export interface OfferedLoan {
    id:            number;
    loanType:      string;
    purchasePrice: number;
    deposit:       number;
    govProfit:     number;
    govFund:       number;
    sellingPrice:  number;
    installment:   number;
    startLoanDate: Date;
    paymentPeriod: number;
}

export class Convert {
    public static fromJson(json: string): OfferedLoan {
        return JSON.parse(json);
    }

    public static toJson(value: OfferedLoan): string {
        return JSON.stringify(value);
    }
}