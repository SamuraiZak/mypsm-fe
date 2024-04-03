export interface ClinicContract {
    id:                   number;
    panelAppointedDate:   string;
    panelContractEndDate: string;
}

// Converts JSON strings to/from your types
export class ClinicContractConvert {
    public static fromJson(json: string): ClinicContract {
        return JSON.parse(json);
    }

    public static toJson(value: ClinicContract): string {
        return JSON.stringify(value);
    }
}
