export interface ServiceAllowanceStateVisitDetailDTO {
    allowanceTypeCode: string;
    applyCode: string;
    stateCode: string;
    familyDetail: StateVisitFamilyDetail[];
}

export interface StateVisitFamilyDetail {
    name: string;
    age: number;
    relationshipCode: string;
}

// Converts JSON strings to/from your types
export class ServiceAllowanceStateVisitDetailConvert {
    public static fromJson(json: string): ServiceAllowanceStateVisitDetailDTO {
        return JSON.parse(json);
    }

    public static toJson(value: ServiceAllowanceStateVisitDetailDTO): string {
        return JSON.stringify(value);
    }
}
