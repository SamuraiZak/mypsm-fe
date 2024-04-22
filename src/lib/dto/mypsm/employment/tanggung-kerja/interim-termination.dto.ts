export interface InterimTermination {
    applicationDetail: ApplicationDetail;
    detail:            TerminatioNDetail;
    verify:            TerminationVerify;
    calculation:       TerminationCalculation;
    supportApprover:   TerminationSuppApp;
    support:           TerminationApproval;
    approval:          TerminationApproval;
}

export interface ApplicationDetail {
    interimId:       number;
    grade:           number;
    position:        number;
    placement:       number;
    newPlacement:    number;
    referenceNumber: string;
    startDate:       string;
    endDate:         string;
    reason:          string;
}

export interface TerminationApproval {
    interimId:         number;
    name:              string;
    remark:            string;
    status:            boolean;
}

export interface TerminationCalculation {
    personalDetail: TerminationPersonalDetail;
    breakdown:      TerminationBreakdown;
}

export interface TerminationBreakdown {
    allowance:                 string;
    startDay:                  number;
    NumberOfDaysForStartMonth: number;
    firstMonthAllowance:       string;
    MonthInBetween:            number;
    calculateInBetween:        string;
    endDay:                    number;
    NumberOfDaysForEndMonth:   number;
    lastMonthAllowance:        string;
    totalETK:                  string;
}

export interface TerminationPersonalDetail {
    interimId:            number;
    name:                 string;
    identityCardNumber:   string;
    employeeNumber:       string;
    currentPosition:      string;
    interimPosition:      string;
    interimMinimalSalary: string;
    twentyfivePercent:    string;
    startEffectiveDate:   string;
    endEffectiveDate:     string;
    placement:            string;
}

export interface TerminatioNDetail {
    interimId:          number;
    name:               string;
    identityCardNumber: string;
    serviceDate:        string;
    effectiveDate:      string;
    positionWithGrade:  string;
    confirmDate:        string;
    placement:          string;
}

export interface TerminationSuppApp {
    interimId: number;
    supporter: string;
    approver:  string;
}

export interface TerminationVerify {
    name:              string;
    remark:            string;
    status:            string;
    statusDescription: string;
}

// Converts JSON strings to/from your types
export class TerminationSuppAppConvert {
    public static fromJson(json: string): TerminationSuppApp {
        return JSON.parse(json);
    }

    public static toJson(value: TerminationSuppApp): string {
        return JSON.stringify(value);
    }
}