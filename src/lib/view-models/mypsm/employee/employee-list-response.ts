// =================================================================
// Employee List Request View Model
// =================================================================

export interface EmployeesListResponseViewModel {
    status: number;
    message: string;
    data: EmployeesListResponseData[];
}

export interface EmployeesListResponseData {
    employeeNumber: string;
    retirementDate: Date;
    scheme: null | string;
    eligibleLeaveCount: number;
    newRecruitEffectiveDate: Date;
    programme: string;
    civilServiceStartDate: Date;
    firstServiceDate: Date;
    firstConfirmServiceDate: Date;
    firstEffectiveServiceDate: Date | null;
    serviceDate: Date;
    confirmServiceDate: Date | null;
    effectiveDate: Date;
    officeNumber: null | string;
}

// Converts JSON strings to/from your types
export class EmployeesListResponseConvert {
    public static fromJson(json: string): EmployeesListResponseViewModel {
        return JSON.parse(json);
    }

    public static toJson(value: EmployeesListResponseViewModel): string {
        return JSON.stringify(value);
    }
}
