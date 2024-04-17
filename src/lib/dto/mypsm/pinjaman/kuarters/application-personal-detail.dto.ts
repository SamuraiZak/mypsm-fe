export interface QuartersPersonalDetail {
    employeeNumber:         string;
    name:                   string;
    identityDocumentNumber: string;
    gradeId:                number;
    placementId:            number;
    phoneNumber:            string;
    mailAddress:            string;
    maritalId:              number;
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