export interface FinalSalaryServiceDetail {
    gradeId:                 number;
    maxGradeId:              number;
    positionId:              number;
    serviceTypeId:           number;
    serviceGroupId:          number;
    placementId:             number;
    unitId:                  number;
    employmentStatusId:      number;
    effectiveDate:           string;
    retirementBenefit:       string;
    epfNumber:               string;
    socsoNumber:             string;
    incomeNumber:            string;
    eligibleLeaveCount:      number;
    civilServiceStartDate:   string;
    newRecruitEffectiveDate: string;
    serviceDate:             string;
    firstServiceDate:        string;
    firstConfirmServiceDate: string;
    firstEffectiveDate:      string;
    confirmDate:             string;
    pensionNumber:           string;
    kgt:                     number;
    retirementDate:          string;
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

// Converts JSON strings to/from your types
export class FinalSalaryServiceDetailConvert {
    public static fromJson(json: string): FinalSalaryServiceDetail {
        return JSON.parse(json);
    }

    public static toJson(value: FinalSalaryServiceDetail): string {
        return JSON.stringify(value);
    }
}