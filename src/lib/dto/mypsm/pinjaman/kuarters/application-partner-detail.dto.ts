export interface QuartersPartnerDetail {
    id:                 number;
    name:               string;
    phoneNumber:        string;
    position:           string;
    salary:             number;
    numberOfDependents: number;
}

// Converts JSON strings to/from your types
export class QuartersPartnerDetailConvert {
    public static fromJson(json: string): QuartersPartnerDetail {
        return JSON.parse(json);
    }

    public static toJson(value: QuartersPartnerDetail): string {
        return JSON.stringify(value);
    }
}