export interface ServiceAllowanceAddTMWA {
    allowanceTypeCode: string;
    applyCode: string;
    stateCode: string;
    familyDetail: ServiceAllowanceAddOriginRegionVisitFareFamilyDetail[];
}

export interface ServiceAllowanceAddOriginRegionVisitFareFamilyDetail {
    name: string;
    age: number;
    relationshipCode: string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toServiceAllowanceAddTMWA(
        json: string,
    ): ServiceAllowanceAddTMWA {
        return JSON.parse(json);
    }

    public static serviceAllowanceAddTMWAToJson(
        value: ServiceAllowanceAddTMWA,
    ): string {
        return JSON.stringify(value);
    }
}
