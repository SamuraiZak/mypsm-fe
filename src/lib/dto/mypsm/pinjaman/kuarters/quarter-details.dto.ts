export interface QuarterDetails {
    id:                 number;
    directorApproverId: number;
    movingInDate:       string;
    quarterDetails:     string;
    paymentMethod:      number;
    rentRate?: number;
    deposit?: number;
    billDeposit?: number;
    email?: string;
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