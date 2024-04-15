export interface ClinicPanelClaimHistory {
    claimId:      number;
    employeeId:   number;
    employeeName: string;
    ICNumber:     string;
    LKIMOffice:   string;
    status:       string;
    remarks:      string;
}
export interface ClinicPanelClaimHistoryFilter {
    name:         string | null;
    patientName:  string;
    identityDocumentNumber: string;
}

// Converts JSON strings to/from your types
export class ClinicPanelClaimHistoryConvert {
    public static fromJson(json: string): ClinicPanelClaimHistory[] {
        return JSON.parse(json);
    }

    public static toJson(value: ClinicPanelClaimHistory[]): string {
        return JSON.stringify(value);
    }
}
