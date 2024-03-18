export interface ServiceAllowanceFamilyDetailDTO {
    name: string;
    age: string;
    relationship: string;
}

// Converts JSON strings to/from your types
export class ServiceAllowanceFamilyDetailConvert {
    public static fromJson(json: string): ServiceAllowanceFamilyDetailDTO {
        return JSON.parse(json);
    }

    public static toJson(value: ServiceAllowanceFamilyDetailDTO): string {
        return JSON.stringify(value);
    }
}
