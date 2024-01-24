export interface PensionDetailServiceResponse {
   status:  number;
    message: string;
    data:    Data;
}

export interface Data {
    service: Service;
}

export interface Service {
    grade:                       string;
    position:                    string;
    placement:                   string;
    serviceLevel:                string;
    retirementType:              string;
    EPFNumber:                   string;
    SOCSONumber:                 string;
    incomeNumber:                string;
    bankName:                    string;
    bankAccount:                 string;
    leaveEntitlement:            number;
    hireByGovermentDate:         Date;
    hireByLKIMDate:              Date;
    currentServiceStartDate:     Date;
    firstServiceConfirmedDate:   Date;
    currentServiceConfirmedDate: Date;
    currentActing:               string;
    currentInterim:              Date;
    pensionScheme:               Date;
    lastSalary:                  number;
    lastPromotion:               string;
    retirementDate:              Date;
}
