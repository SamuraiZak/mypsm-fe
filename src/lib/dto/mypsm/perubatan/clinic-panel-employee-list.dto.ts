export interface ClinicPanelEmployeeList {
    id:                 number;
    employeeNumber:     string;
    name:               string;
    identityCardNumber: string;
    grade:              string;
    dependentCount:     number;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toClinicPanelEmployeeList(json: string): ClinicPanelEmployeeList[] {
        return JSON.parse(json);
    }

    public static clinicPanelEmployeeListToJson(value: ClinicPanelEmployeeList[]): string {
        return JSON.stringify(value);
    }
}