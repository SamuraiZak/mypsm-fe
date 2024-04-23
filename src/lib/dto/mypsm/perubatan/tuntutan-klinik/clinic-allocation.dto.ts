export interface ClinicAllocation {
    year:                number;
    currentAllocation:   number;
    newAllocation:       number;
    remainingAllocation: number;
}

// Converts JSON strings to/from your types
export class ClinicAllocationConvert {
    public static fromJson(json: string): ClinicAllocation {
        return JSON.parse(json);
    }

    public static toJson(value: ClinicAllocation): string {
        return JSON.stringify(value);
    }
}

export interface CurrentYearAllocation {
    year:       number;
}

export class CurrentYearAllocationConvert {
    public static fromJson(json: string): CurrentYearAllocation {
        return JSON.parse(json);
    }

    public static toJson(value: CurrentYearAllocation): string {
        return JSON.stringify(value);
    }
}