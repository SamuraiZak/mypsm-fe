export interface ClinicPanelClaimList {
    clinicId:        number;
    clinicCode:      string;
    clinicName:      string;
    state:           string;
    applicationDate: Date;
    status:          string;
    totalClaimed:    number;
}

// Converts JSON strings to/from your types
export class ClinicPanelClaimListConvert {
    public static fromJson(json: string): ClinicPanelClaimList[] {
        return JSON.parse(json);
    }

    public static toJson(value: ClinicPanelClaimList[]): string {
        return JSON.stringify(value);
    }
}