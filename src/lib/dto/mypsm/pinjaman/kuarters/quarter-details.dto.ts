export interface QuarterDetails {
    id:                 number;
    directorApproverId: number;
    movingInDate:       string;
    quarterDetails:     string;
}

// Converts JSON strings to/from your types
export class QuarterDetailsConvert {
    public static fromJson(json: string): QuarterDetails {
        return JSON.parse(json);
    }

    public static toJson(value: QuarterDetails): string {
        return JSON.stringify(value);
    }
}

export interface QuarterPayment {
    id:            number;
    paymentMethod: number;
    rentRate?:      number;
    deposit?:       number;
    billDeposit?:   number;
}

// Converts JSON strings to/from your types
export class QuarterPaymentConvert {
    public static fromJson(json: string): QuarterPayment {
        return JSON.parse(json);
    }

    public static toJson(value: QuarterPayment): string {
        return JSON.stringify(value);
    }
}