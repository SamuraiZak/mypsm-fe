export interface VehicleFirstSchedule {
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
    isDraft: boolean;
}

// Converts JSON strings to/from your types
export class VehicleFirstScheduleConvert {
    public static fromJson(json: string): VehicleFirstSchedule {
        return JSON.parse(json);
    }

    public static toJson(value: VehicleFirstSchedule): string {
        return JSON.stringify(value);
    }
}