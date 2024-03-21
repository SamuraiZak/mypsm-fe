export interface RenewContractSecretaryUpdate {
    contractId:                number;
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
    firstConfirmServiceDate:   string;
    currentConfirmServiceDate: string;
    isReadonly?:               boolean;
}

// Converts JSON strings to/from your types
export class RenewContractSecretaryUpdateConvert {
    public static fromJson(json: string): RenewContractSecretaryUpdate {
        return JSON.parse(json);
    }

    public static toJson(value: RenewContractSecretaryUpdate): string {
        return JSON.stringify(value);
    }
}
