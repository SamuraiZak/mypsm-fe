import type { DocumentBase64RequestDTO } from "$lib/dto/core/common/base-64-document-request.dto";

export interface MedicalEmployeeMakePayment {
    id:                number;
    paymentType:       string;
    transactionNumber: string;
    transactionDate:   string;
    documents: DocumentBase64RequestDTO[];
}

// Converts JSON strings to/from your types
export class MedicalEmployeeMakePaymentConvert {
    public static fromJson(json: string): MedicalEmployeeMakePayment {
        return JSON.parse(json);
    }

    public static toJson(value: MedicalEmployeeMakePayment): string {
        return JSON.stringify(value);
    }
}