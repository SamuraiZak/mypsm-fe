export interface SalaryMovementList {
    applicationId: number;
    meetingName: string;
    movementType: string;
    totalEmployee: number;
    salaryMovementMonth: string;
    salaryMovementYear: number;
    meetingDate: string;
    status: string;
}

export interface SalaryMovementFilter {
    month: number;
    year: number;
}

export interface SalaryAllowanceFilter {
    employeeNumber: string;
    name: string;
    identityDocumentNumber: string;
    month: number;
    year: number;
}
// Converts JSON strings to/from your types
export class SalaryMovementListConvert {
    public static fromJson(json: string): SalaryMovementList {
        return JSON.parse(json);
    }

    public static toJson(value: SalaryMovementList): string {
        return JSON.stringify(value);
    }
}

export interface SalaryMovementApplicationDetail {
    applicationId: number;
    meetingName: string;
    movementType: string;
    totalEmployee: number;
    salaryMovementMonth: string;
    salaryMovementYear: number;
    meetingDate: string;
    status: string;
    employeeList: ExcludedEmployee[];
}

export interface ExcludedEmployee {
    employeeId: number;
    employeeNumber: string;
    name: string;
    grade: string;
    salaryMovementMonth: string;
    kgt: number;
    currentSalary: number;
    currentAllowance: number;
    currentCriticalAllowance: number;
    newSalary: number;
    newAllowance: number;
    newCriticalAllowance: number;
    remark: string;
    isIncluded: boolean;
}
