export interface LeaveEntitlementRequestDTO {
    employeeId: number | null;
    year: number;
}

// Converts JSON strings to/from your types
export class LeaveEntitlementRequestConvert {
    public static fromJson(json: string): LeaveEntitlementRequestDTO {
        return JSON.parse(json);
    }

    public static toJson(value: LeaveEntitlementRequestDTO): string {
        return JSON.stringify(value);
    }
}
