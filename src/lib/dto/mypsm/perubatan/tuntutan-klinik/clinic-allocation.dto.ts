export interface ClinicAllocation {
    year:                number;
    currentAllocation:   number;
    cumulAlloc:       number;
    cumulRemainder: number;
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

export interface ClinicAllocationEdit {
    year:                number;
    newAllocation:   number;
}

// Converts JSON strings to/from your types
export class ClinicAllocationEditConvert {
    public static fromJson(json: string): ClinicAllocationEdit {
        return JSON.parse(json);
    }

    public static toJson(value: ClinicAllocationEdit): string {
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