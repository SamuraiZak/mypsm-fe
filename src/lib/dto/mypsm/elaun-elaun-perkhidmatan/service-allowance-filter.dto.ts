export interface ServiceAllowanceFilterDTO {
    employeeNumber: string | null;
    name: string | null;
    allowanceType: string | null;
    applicationDate: string | null;
    status: string | null;
}

// Converts JSON strings to/from your types
export class ServiceAllowanceFilterConvert {
    public static fromJson(json: string): ServiceAllowanceFilterDTO {
        return JSON.parse(json);
    }

    public static toJson(value: ServiceAllowanceFilterDTO): string {
        return JSON.stringify(value);
    }
}
