export interface MainActingInfo {
    actingId:        number;
    employeeNumber:  string;
    employeeName:    string;
    ICNumber:        string;
    acceptingLetter: boolean | null;
    reportingForm:   boolean | null;
    handoverNote:    boolean | null;
}

export interface MainActingDetail {
    employeeDetails:   EmployeeDetails;
    actingDetails:     ActingDetails;
    supporterApprover: SupporterApprover;
    supporter:         MainActingApprover;
    approver:          MainActingApprover;
}

export interface ActingDetails {
    actingPosition: string;
    actingGrade:    string;
    newPlacement:   string;
    reportDate:     string;
}

export interface MainActingApprover {
    remark: string;
    status: boolean;
}

export interface EmployeeDetails {
    employeeId:     number;
    employeeNumber: string;
    employeeName:   string;
    ICNumber:       string;
}

export interface SupporterApprover {
    supporterName: string;
    approverName:  string;
}