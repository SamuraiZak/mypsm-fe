export interface addLoan {
    loanType:     string;
   
}

// Converts JSON strings to/from your types
export class addLoanConvert {
    public static fromJson(json: string): addLoan {
        return JSON.parse(json);
    }

    public static toJson(value: addLoan): string {
        return JSON.stringify(value);
    }
}