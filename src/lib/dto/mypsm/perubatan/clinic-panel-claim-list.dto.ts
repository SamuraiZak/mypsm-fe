export interface ClinicPanelClaimList {
    id:        number;
    clinicCode:      string;
    name:      string;
    address:           string;
    applicationDate: Date;
    status:          string;
    claim:    number;
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