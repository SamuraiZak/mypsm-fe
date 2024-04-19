export interface ServiceDetailDTO {
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
    program:                     string;
    leaveEntitlement:            number;
    hireByGovermentDate:         Date;
    hireByLKIMDate:              Date;
    currentServiceStartDate:     Date;
    firstServiceConfirmedDate:   Date;
    currentServiceConfirmedDate: Date;
    currentActing:               string;
    lastSalary:                  number;
    lastPromotion:               string;
    retirementDate:              Date;
}

// Converts JSON strings to/from your types
export class ServiceDetailDTOConvert {
    public static fromJson(json: string): ServiceDetailDTO {
        return JSON.parse(json);
    }

    public static toJson(value: ServiceDetailDTO): string {
        return JSON.stringify(value);
    }
}