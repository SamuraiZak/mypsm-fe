export interface MedicalEmployeeClaimPaymentDetail {
    amountToPay:       number;
    paymentMethod:     string;
    transactionNumber: string;
    receiverBank:      string;
    receiverBankAcc:   string;
    transactionDate:   string;
}

export interface MedicalEmployeeClaimPayment {
    totalPayment:       number;
    paymentMethod:     string;
    transactionNumber: string;
    receiverBank:      string;
    receiverAcc:   string;
    transactionDate:   string;
}
// Converts JSON strings to/from your types
export class MedicalEmployeeClaimPaymentDetailConvert {
    public static fromJson(json: string): MedicalEmployeeClaimPaymentDetail {
        return JSON.parse(json);
    }

    public static toJson(value: MedicalEmployeeClaimPaymentDetail): string {
        return JSON.stringify(value);
    }
}