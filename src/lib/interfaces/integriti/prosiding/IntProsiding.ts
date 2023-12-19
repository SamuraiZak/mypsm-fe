/* eslint-disable @typescript-eslint/no-unused-vars */
interface IntProsiding {
    id: string;
    employeeNumber: string;
    officerName: string;
    identityDocumentNumber: string;
    gred: string;
    position: string;
    placement: string;
    disciplinaryProceedingType: string;
    chargesMeetingDate: string;
    chargesMeetingNumber: string;
    chargesMeetingName: string;
    charges: IntCharges;
    proceedingMeetingDate: string;
    proceedingMeetingNumber: string;
    proceedingMeetingName: string;
    proceedingMeetingRemark: string;
    proceedingMeetingResult: proceedingResult[];
    declarationLetterReceived: boolean;
    status: string;
    isAppealed?: boolean;
}

interface proceedingResult {
    chargeName: string;
    meetingResult: string;
    punishments: IntPunishment;
}

type punishmentType =
    | punishmentWarning
    | punishmentPenalty
    | punishmentEmolumentDeprivation
    | punishmentSalaryMovementDelay
    | punishmentDeductSalary
    | punishmentDemote
    | punishmentFire;

interface punishmentWarning {
    punishmentNameWarning: string;
    dateOfEffectWarning: string;
}
interface punishmentPenalty {
    punishmentNamePenalty: string;
    emolumentDaysPenalty: string;
    dateOfEffectPenalty: string;
}
interface punishmentEmolumentDeprivation {
    punishmentNameEmolumentDeprivation: string;
    emolumentDaysEmolumentDeprivation: string;
    dateOfEffectEmolumentDeprivation: string;
    depriveDatesEmolumentDeprivation: IntEmolumentDeprivationDays;
}
interface punishmentSalaryMovementDelay {
    punishmentNameSalaryMovementDelay: string;
    monthsOfDelaysSalaryMovementDelay: string;
    dateOfEffectSalaryMovementDelay: string;
    newKgtDateSalaryMovementDelay: string;
}
interface punishmentDeductSalary {
    punishmentNameDeductSalary: string;
    salaryMovementCountsDeductSalary: string;
    punishmentPeriodDeductSalary: string;
    dateOfEffectDeductSalary: string;
    newKgtDateDeductSalary: string;
}
interface punishmentDemote {
    punishmentNameDemote: string;
    currentGredDemote: string;
    demoteToDemote: string;
    dateOfEffectDemote: string;
}
interface punishmentFire {
    punishmentNameFire: string;
    dateOfEffectFire: string;
}

interface IntChargesFormGroup {
    title: string;
}

interface IntDeprivesDay {
    startDate: string;
    endDate: string;
    totalDays: number | string;
}

interface IntCharges {
    [key: string]: IntChargesFormGroup | undefined;
}
interface IntPunishment {
    [key: string]: punishmentType | undefined;
}

interface IntEmolumentDeprivationDays {
    [key: string]: IntDeprivesDay | undefined;
}
