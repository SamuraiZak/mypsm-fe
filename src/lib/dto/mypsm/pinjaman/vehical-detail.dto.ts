export interface vechicalDetail {
    id:                 number;
    condition:          string;
    vehicleType:        string;
    brandModel:         string;
    engineNumber:       string;
    registrationNumber: string;
    registrationDate:   string;
    nettPrice:          number;
    isDraft: boolean;
}

// Converts JSON strings to/from your types
export class vechicalDetailConvert {
    public static fromJson(json: string): vechicalDetail {
        return JSON.parse(json);
    }

    public static toJson(value: vechicalDetail): string {
        return JSON.stringify(value);
    }
}