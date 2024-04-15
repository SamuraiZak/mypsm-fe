export interface vechicalDetail {
    name:                   string;
    identityDocumentNumber: string;
    birthDate:              Date;
    age:                    number;
    positionId:             number;
    serviceGroupId:         number;
    gradeId:                number;
    schemeId:               number;
    serviceDate:            Date;
    confirmServiceDate:     Date;
    baseSalary:             number;
    allowance:              null;
}

// Converts JSON strings to/from your types
export class Convert {
    public static fromJson(json: string): vechicalDetail {
        return JSON.parse(json);
    }

    public static toJson(value: vechicalDetail): string {
        return JSON.stringify(value);
    }
}