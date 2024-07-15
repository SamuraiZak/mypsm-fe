export interface GetContractSecretaryUpdateDTO {
    applicationId:               number;
    startContract:             string;
    endContract:               string;
    wageRate:                  number;
    placementId:               number;
    designation:               string;
    reportDutyDate:            string;
    kwspNo:                    string;
    socsoNo:                   string;
    taxNo:                     string;
    bankName:                  string;
    bankAccount:               string;
    serviceTypeId:             number;
    leaveEntitlement:          number;
    effectiveDate:             string;
    civilServiceStartDate:     string;
    lkimServiceStartDate:      string;
    currentServiceStartDate:   string;
    isReadonly?:                boolean;
    isDraft: boolean;
}