export interface OutsiderPersonalDetail {
    employeeNumber:         string | null;
    name:                   string;
    identityDocumentNumber: string;
    phoneNumber:            string;
    mailAddress:            string;
    marital:                boolean;
    email:                  string;
}

// Converts JSON strings to/from your types
export class OutsiderPersonalDetailConvert {
    public static fromJson(json: string): OutsiderPersonalDetail {
        return JSON.parse(json);
    }

    public static toJson(value: OutsiderPersonalDetail): string {
        return JSON.stringify(value);
    }
}