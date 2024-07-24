export interface AddNewSalaryMovement {
    id: number | null;
    meetingName: string | null;
    meetingDate: string | null;
    salaryMovementTypeId: number;
    salaryMovementMonthId: number;
    amount: number | null;
    isPercentage: boolean;
    isDraft: boolean;
    employees: SalaryMovementEmployee[];
}

export interface SalaryMovementEmployee {
    employeeId: number;
}

// Converts JSON strings to/from your types
export class AddNewSalaryMovementConvert {
    public static fromJson(json: string): AddNewSalaryMovement {
        return JSON.parse(json);
    }

    public static toJson(value: AddNewSalaryMovement): string {
        return JSON.stringify(value);
    }
}

export interface SalaryMovementComment {
    id:         number;
    employeeId: number;
    remarks:    string;
}

// Converts JSON strings to/from your types
export class SalaryMovementCommentConvert {
    public static fromJson(json: string): SalaryMovementComment {
        return JSON.parse(json);
    }

    public static toJson(value: SalaryMovementComment): string {
        return JSON.stringify(value);
    }
}