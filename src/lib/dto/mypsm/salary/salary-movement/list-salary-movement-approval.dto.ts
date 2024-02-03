export interface ListSalaryMovementApprovalDTO {
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
    kgt:                     null;
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

// Converts JSON strings to/from your types
export class Convert {
    public static toListSalaryMovementApprovalDTO(json: string): ListSalaryMovementApprovalDTO {
        return JSON.parse(json);
    }

    public static listSalaryMovementApprovalDTOToJson(value: ListSalaryMovementApprovalDTO): string {
        return JSON.stringify(value);
    }
}