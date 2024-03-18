export interface ClinicPanelTreatmentBillList {
    patientId:          number;
    claimId:            number;
    employeeId:         number;
    employeeNumber:     string;
    employeeName:       string;
    identityCardNumber: string;
    patientName:        string;
    clinicCode:         string;
    clinicName:         string;
    placement:          string;
    status:             string;
    remark:             string;
}

// Converts JSON strings to/from your types
export class ClinicPanelTreatmentBillListConvert {
    public static fromJson(json: string): ClinicPanelTreatmentBillList[] {
        return JSON.parse(json);
    }

    public static toJson(value: ClinicPanelTreatmentBillList[]): string {
        return JSON.stringify(value);
    }
}