export interface FinalSalaryServiceDTO {
    gradeId:                 string;
    maxGradeId:              string;
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
    firstEffectiveDate:      Date;
    confirmDate:             Date;
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

// Converts JSON strings to/from your types
export class FinalSalaryServiceDTOConvert {
    public static toFinalSalaryServiceDTO(json: string): FinalSalaryServiceDTO {
        return JSON.parse(json);
    }

    public static finalSalaryServiceDTOToJson(value: FinalSalaryServiceDTO): string {
        return JSON.stringify(value);
    }
}