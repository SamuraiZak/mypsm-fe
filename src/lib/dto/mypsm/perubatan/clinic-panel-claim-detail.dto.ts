export interface ClinicPanelClaimDetail {
    clinicName:     string;
    invoiceDate:    string;
    invoiceNumber:  string;
    treatmentMonth: number;
    treatmentYear:  number;
    total:          number;
}

// Converts JSON strings to/from your types
export class ClinicPanelClaimDetailConvert {
    public static fromJson(json: string): ClinicPanelClaimDetail {
        return JSON.parse(json);
    }

    public static toJson(value: ClinicPanelClaimDetail): string {
        return JSON.stringify(value);
    }
}
