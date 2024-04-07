export interface SurcajEmployeeDetailResponseDTO {
    employeeDetail:    EmployeeDetail;
    serviceDetail:     ServiceDetail;
    applicationDetail: ApplicationDetail;
    meetingDetail:     MeetingDetail;
    confirmation:      Confirmation;
}

export interface ApplicationDetail {
    surchargeId:     number;
    reportDate:      string;
    employeeId:      number;
    surchargeAction: string;
    remark:          string;
}

export interface Confirmation {
    details: ConfirmationDetails |null;
}

export interface ConfirmationDetails {
    surchargeId:       number;
    name:              string;
    remark:            string;
    status:            boolean;
    statusDescription: string;
}

export interface EmployeeDetail {
    details: EmployeeDetailDetails;
}

export interface EmployeeDetailDetails {
    employeeNumber:     string;
    identityCardNumber: string;
    fullName:           string;
    alternativeName:    string;
    icColour:           string;
    birthDate:          Date;
    birthplace:         string;
    nationality:        string;
    race:               string;
    ethnic:             string;
    religion:           string;
    gender:             string;
    marital:            string;
    email:              string;
    homeAddress:        string;
    mailAddress:        string;
    isExPolice:         boolean;
    isRelatedToLKIM:    boolean;
    relationDetail:     null;
}

export interface MeetingDetail {
    surchargeId:   number;
    meetingId:     number;
    meetingType:   string;
    meetingCount:  number;
    meetingDate:   string;
    amount:        number;
    paymentType:   string;
    duration:      number;
    effectiveDate: string;
    meetingResult: string;
    remark:        string;
    meetingName?: string;
}

export interface ServiceDetail {
    details: ServiceDetailDetails;
}

export interface ServiceDetailDetails {
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
    pastAttachmentDate:    Date;
    pensionScheme:         string;
    retirementDate:        Date;
    salaryEffectiveDate:   Date;
    maximumSalary:         number;
    baseSalary:            number;
    ITKA:                  number;
    ITP:                   number;
    EPW:                   number;
    COLA:                  number;
}
