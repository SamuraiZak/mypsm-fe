export interface EditContractDetailSecretaryDTO {
    candidateId:               number;
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
}

// Converts JSON strings to/from your types
export class EditContractDetailSecretaryDTOConvert {
    public static fromJson(json: string): EditContractDetailSecretaryDTO {
        return JSON.parse(json);
    }

    public static toJson(value: EditContractDetailSecretaryDTO): string {
        return JSON.stringify(value);
    }
}