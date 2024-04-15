export interface CarFirstSchedule {
    id:              number;
    engineNumber:    string;
    chassisNumber:   string;
    countryOrigin:   string;
    brandModel:      string;
    engineHP:        string;
    fuelType:        string;
    class:           string;
    bodyType:        string;
    makeYear:        number;
    previousOwner:   string;
    previousOwnerIC: string;
    address:         string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static fromJson(json: string): CarFirstSchedule {
        return JSON.parse(json);
    }

    public static toJson(value: CarFirstSchedule): string {
        return JSON.stringify(value);
    }
}