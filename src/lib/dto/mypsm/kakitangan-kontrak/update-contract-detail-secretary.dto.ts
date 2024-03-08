export interface EditContractDetailSecretaryDTO {
    candidateId:               number;
    startContract:             Date | string;
    endContract:               Date | string;
    wageRate:                  number;
    placementId:               number;
    designation:               string;
    reportDutyDate:            Date | string;
    kwspNo:                    string;
    socsoNo:                   string;
    taxNo:                     string;
    bankName:                  string;
    bankAccount:               string;
    serviceTypeId:             number;
    leaveEntitlement:          number;
    effectiveDate:             Date | string;
    civilServiceStartDate:     Date | string;
    lkimServiceStartDate:      Date | string;
    currentServiceStartDate:   Date | string;
    firstConfirmServiceDate:   Date | string;
    currentConfirmServiceDate: Date | string;
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