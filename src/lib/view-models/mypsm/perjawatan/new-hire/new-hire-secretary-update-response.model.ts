export interface NewHireSecretaryUpdateResponse {
    status: number;
    message: string;
    data: SecretaryUpdateData;
}

export interface SecretaryUpdateData {
    isReadonly: boolean;
    gradeId: number;
    maxGradeId: number;
    positionId: number;
    placementId: number;
    serviceTypeId: number;
    serviceGroupId: number;
    unitId: number;
    employmentStatusId: number;
    effectiveDate: Date;
    retirementBenefit: string;
    epfNumber: string;
    socsoNumber: string;
    incomeNumber: string;
    bankName: string;
    bankAccount: string;
    eligibleLeaveCount: number;
    civilServiceStartDate: Date;
    newRecruitEffectiveDate: Date;
    serviceDate: Date;
    firstServiceDate: Date;
    firstConfirmServiceDate: Date;
    firstEffectiveDate: Date;
    confirmDate: Date;
    pensionNumber: string;
    kgt: number;
    retirementDate: Date;
    revisionMonth: string;
    maximumSalary: number;
    baseSalary: number;
    itka: number;
    itp: number;
    epw: number;
    cola: number;
}
