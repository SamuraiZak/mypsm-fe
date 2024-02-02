// =================================================================
// Employee List Request View Model
// =================================================================

export interface EmployeesListResponseViewModel {
    status: number;
    message: string;
    data: EmployeesListResponseData;
}

export interface EmployeesListResponseData {
    result: EmployeesList[];
}
export interface EmployeesList {
    employeeId: number;
    employeeNumber: string;
    name: string;
    position: string;
    grade: string;
    // employeeNumber: string;
    // retirementDate: Date;
    // scheme: null | string;
    // eligibleLeaveCount: number;
    // newRecruitEffectiveDate: Date;
    // programme: string;
    // civilServiceStartDate: Date;
    // firstServiceDate: Date;
    // firstConfirmServiceDate: Date;
    // firstEffectiveServiceDate: Date | null;
    // serviceDate: Date;
    // confirmServiceDate: Date | null;
    // effectiveDate: Date;
    // officeNumber: null | string;
}

// Converts JSON strings to/from your types
export class EmployeesListResponseConvert {
    // to model from response
    public static fromResponse(
        response: Response,
    ): EmployeesListResponseViewModel {
        return JSON.parse(JSON.stringify(response));
    }

    // to model from json string
    public static fromJson(json: string): EmployeesListResponseViewModel {
        return JSON.parse(json);
    }

    // to json string from model
    public static toJson(value: EmployeesListResponseViewModel): string {
        return JSON.stringify(value);
    }
}
