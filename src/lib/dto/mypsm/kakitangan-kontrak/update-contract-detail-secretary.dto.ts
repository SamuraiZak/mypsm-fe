export interface EditContractDetailSecretaryDTO {
    candidateId:               number;
    startContract:             Date;
    endContract:               Date;
    wageRate:                  number;
    placementId:               number;
    designation:               string;
    reportDutyDate:            Date;
    kwspNo:                    string;
    socsoNo:                   string;
    taxNo:                     string;
    bankName:                  string;
    bankAccount:               string;
    serviceTypeId:             number;
    leaveEntitlement:          number;
    effectiveDate:             Date;
    civilServiceStartDate:     Date;
    lkimServiceStartDate:      Date;
    currentServiceStartDate:   Date;
    firstConfirmServiceDate:   Date;
    currentConfirmServiceDate: Date;
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