export interface NewHireSecretaryUpdateResponse {
    status:  number;
    message: string;
    data:    SecretaryUpdateData;
}

export interface SecretaryUpdateData {
    isReadonly:              boolean;
    gradeId:                 string;
    positionId:              string;
    serviceTypeId:           string;
    serviceGroupId:          string;
    placementId:             string;
    unitId:                  string;
    employmentStatusId:      string;
    effectiveDate:           Date;
    retirementBenefit:       string;
    epfNumber:               string;
    socsoNumber:             string;
    incomeNumber:            string;
    eligibleLeaveCount:      number;
    civilServiceStartDate:   Date;
    newRecruitEffectiveDate: Date;
    serviceDate:             Date;
    firstServiceDate:        Date;
    firstConfirmServiceDate: Date;
    firstEffectiveDate:      null;
    confirmDate:             null;
    pensionNumber:           string;
    kgt:                     null;
    retirementDate:          Date;
    revisionMonth:           string;
    maximumSalary:           number;
    baseSalary:              number;
    itka:                    number;
    itp:                     number;
    epw:                     number;
    cola:                    number;
    bankName:                string;
    bankAccount:             string;
}
