// =================================================================
// Service Allowance Employee Info Request View Model
// =================================================================

export interface AllowanceEmployeeInfoRequestViewModel {
    employeeNumber: string;
    recordID:       string;
}

// Converts JSON strings to/from your types
export class AllowanceEmployeeInfoRequestConvert {

    // to model from json string
    public static fromJson(json: string): AllowanceEmployeeInfoRequestViewModel {
        return JSON.parse(json);
    }

    // to json string from model
    public static toJson(value: AllowanceEmployeeInfoRequestViewModel): string {
        return JSON.stringify(value);
    }
}