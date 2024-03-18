export interface SalaryMovementList {
    meetingId:               string;
    meetingName:             string;
    meetingDate:             Date;
    salaryMovementMonth:     number;
    specialAid:              number;
    specialRaiseType:        string;
    specialRaise:            number;
    employeeName:            string;
    employeeNumber:          string;
    employeeGrade:           string;
    tpg:                     number;
    kgt:                     number;
    salary1:                 number;
    wilayahAllowance1:       number;
    criticalAllowance1:      number;
    salary2:                 number;
    wilayahAllowance2:       number;
    criticalAllowance2:      number;
    specialkgt:              number;
    specialSalary:           number;
    specialWilayahAllowance: number;
    status:                  string;
}

export interface SalaryMovementFilter {
    month:                 number;
    year:                  number;
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