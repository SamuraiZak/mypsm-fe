// kakitangan rekod tuntutan perubatan
export interface MedicalClaimList {
    medicalClaimId:  number;
    date:            Date;
    totalClaims:     number;
    totalCovered:    number;
    totalNotCovered: number;
    status:          string;
    remark:          string;
}

// Converts JSON strings to/from your types
export class MedicalClaimListConvert {
    public static fromJson(json: string): MedicalClaimList[] {
        return JSON.parse(json);
    }

    public static toJson(value: MedicalClaimList[]): string {
        return JSON.stringify(value);
    }
}

//urus setia - rekod tuntutan klinik panel
export interface MedicalClinicPanelClaimList {
    clinicId:             number;
    clinicCode:           string;
    clinicName:           string;
    state:                string | null;
    month:                string;
    panelAppointedDate:   string;
    panelContractEndDate: string;
    totalClaim:           number;
    currentTotalClaim:    number;
}

export interface MedicalClinicPanelClaimListFilter {
    code:                  string | null;
    description:           string | null;
}

// Converts JSON strings to/from your types
export class MedicalClinicPanelClaimListConvert {
    public static fromJson(json: string): MedicalClinicPanelClaimList[] {
        return JSON.parse(json);
    }

    public static toJson(value: MedicalClinicPanelClaimList[]): string {
        return JSON.stringify(value);
    }
}

// klinik panel - rekod bil rawatan
export interface MedicalClinicTreatmentList {
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
    remark:             null;
}

// Converts JSON strings to/from your types
export class MedicalClinicTreatmentListConvert {
    public static fromJson(json: string): MedicalClinicTreatmentList[] {
        return JSON.parse(json);
    }

    public static toJson(value: MedicalClinicTreatmentList[]): string {
        return JSON.stringify(value);
    }
}