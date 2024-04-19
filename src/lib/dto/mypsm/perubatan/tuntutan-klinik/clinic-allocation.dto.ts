export interface ClinicAllocation {
    year?:                number;
    currentAllocation:   number;
    remainingAllocation: number;
    newAllocation:       number;
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