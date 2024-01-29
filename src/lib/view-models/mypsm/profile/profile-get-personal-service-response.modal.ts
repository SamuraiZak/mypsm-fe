export interface GetPersonalServiceResponse {
    status:  number;
    message: string;
    data:    Data;
}

export interface Data {
    currentGrade:          string;
    currentPosition:       string;
    placement:             string;
    serviceType:           string;
    effectiveDate:         Date;
    retirementBenefit:     string;
    EPFNumber:             string;
    SOCSO:                 string;
    taxIncome:             string;
    bankName:              string;
    accountNumber:         string;
    program:               string;
    eligibleLeaveCount:    number;
    civilServiceStartDate: Date;
    confirmServiceDate:    Date;
    historyList:           any[];
    firstEffectiveDate:    Date;
    pastAttachmentDate:    null;
    actingDate:            Date;
    interimDate:           Date;
    pensionScheme:         string;
    lastSalaryRaiseDate:   Date;
    lastPromotionDate:     Date;
    salaryMovementMonth:   number;
    retirementDate:        Date;
    salaryEffectiveDate:   Date;
    maximumSalary:         number;
    baseSalary:            number;
    ITKA:                  number;
    ITP:                   number;
    EPW:                   number;
    COLA:                  number;
}
