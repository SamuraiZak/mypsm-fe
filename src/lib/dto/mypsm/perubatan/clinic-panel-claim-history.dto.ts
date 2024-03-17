export interface ClinicPanelClaimHistory {
    employeeId:   number;
    employeeName: string;
    ICNumber:     string;
    patientId:    number;
    patientName:  string;
    LKIMOffice:   string;
    status:       string;
    remarks:      string;
}
export interface ClinicPanelClaimHistoryFilter {
    code:         string;
    description:  string;
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
