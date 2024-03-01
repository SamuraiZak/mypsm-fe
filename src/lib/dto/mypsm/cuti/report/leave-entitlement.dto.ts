export interface LeaveEntitlementDTO {
    type: string;
    entitlement: number;
    carryForward: number;
    total: number;
    used: number;
    balance: number;
}

// Converts JSON strings to/from your types
export class LeaveEntitlementConvert {
    public static fromJson(json: string): LeaveEntitlementDTO {
        return JSON.parse(json);
    }

    public static toJson(value: LeaveEntitlementDTO): string {
        return JSON.stringify(value);
    }
}
