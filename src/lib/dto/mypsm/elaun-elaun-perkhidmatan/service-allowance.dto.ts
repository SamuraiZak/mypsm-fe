export interface ServiceAllowanceDTO {
    allowanceID: string;
    employeeID: string;
    name: string;
    identityCardNumber: string;
    allowanceType: string;
    category: string;
    applicationDate: string;
    total: number;
    status: string;
    remark: string | null;
}

// Converts JSON strings to/from your types
export class ServiceAllowanceConvert {
    public static fromJson(json: string): ServiceAllowanceDTO {
        return JSON.parse(json);
    }

    public static toJson(value: ServiceAllowanceDTO): string {
        return JSON.stringify(value);
    }
}
