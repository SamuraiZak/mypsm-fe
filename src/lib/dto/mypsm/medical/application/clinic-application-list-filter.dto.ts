export interface ClinicAppListFilterDTO {
    code:               string;
    clinicName:         string;
    state:              string;
    status:             string;
    applicationDate:    string;
    panelAppointedDate: string;
}

// Converts JSON strings to/from your types
export class ClinicAppListFilterConvert {
    public static fromJson(json: string): ClinicAppListFilterDTO {
        return JSON.parse(json);
    }

    public static toJson(value: ClinicAppListFilterDTO): string {
        return JSON.stringify(value);
    }
}