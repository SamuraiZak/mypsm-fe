export interface ClinicApplicationList {
    id:                   number;
    code:                 string;
    name:                 string;
    district:             string;
    applicationDate:      Date;
    panelAppointedDate:   Date | null;
    panelContractEndDate: Date | null;
    duration:             number;
    status:               string;
    remark:               string;
}

export interface ClinicApplicationListFilter {
    code: string;
    description: string;
}

// Converts JSON strings to/from your types
export class ClinicApplicationListConvert {
    public static fromJson(json: string): ClinicApplicationList[] {
        return JSON.parse(json);
    }

    public static toJson(value: ClinicApplicationList[]): string {
        return JSON.stringify(value);
    }
}