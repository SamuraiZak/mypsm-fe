export interface QuartersPersonalDetail {
    employeeNumber:         string | null;
    name:                   string;
    identityDocumentNumber: string;
    phoneNumber:            string;
    mailAddress:            string;
    gradeId?:               number;
    placementId?:           number;
    maritalId?:             number;
    marital?:               boolean;
    email?:                 string;
}

export interface QuartersEligibilityDetail {
    id: number;
    baseSalary: number;
    allowance: number;
}
// Converts JSON strings to/from your types
export class QuartersPersonalDetailConvert {
    public static fromJson(json: string): QuartersPersonalDetail {
        return JSON.parse(json);
    }

    public static toJson(value: QuartersPersonalDetail): string {
        return JSON.stringify(value);
    }
}