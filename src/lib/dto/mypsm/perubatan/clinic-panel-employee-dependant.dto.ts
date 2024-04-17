export interface ClinicPanelEmployeeDependant {
    name:               string;
    identityCardNumber: string;
    relationship:       string;
}

// Converts JSON strings to/from your types
export class ClinicPanelEmployeeDependantConvert {
    public static fromJson(json: string): ClinicPanelEmployeeDependant[] {
        return JSON.parse(json);
    }

    public static toJson(value: ClinicPanelEmployeeDependant[]): string {
        return JSON.stringify(value);
    }
}