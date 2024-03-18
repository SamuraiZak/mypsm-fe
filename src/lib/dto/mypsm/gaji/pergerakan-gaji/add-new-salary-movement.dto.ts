export interface AddNewSalaryMovement {
    meetingName:         string;
    meetingDate:         string;
    salaryMovementMonth: number;
    specialAid:          number;
    specialRaiseType:    string;
    specialRaise:        number;
    employees:           SalaryMovementEmployee[];
}

export interface SalaryMovementEmployee {
    employeeId: number;
}

// Converts JSON strings to/from your types
export class AddNewSalaryMovementConvert {
    public static fromJson(json: string): AddNewSalaryMovement {
        return JSON.parse(json);
    }

    public static toJson (value: AddNewSalaryMovement): string {
        return JSON.stringify(value);
    }
}