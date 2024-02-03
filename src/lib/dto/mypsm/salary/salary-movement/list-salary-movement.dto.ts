export interface SalaryMovementListDTO {
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
    kgt?:                     number;
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

export class SalaryMovementListDTOConvert {
    public static toListSalaryMovementRequest(json: string): SalaryMovementListDTO {
        return JSON.parse(json);
    }

    public static listSalaryMovementRequestToJson(value: SalaryMovementListDTO): string {
        return JSON.stringify(value);
    }
}