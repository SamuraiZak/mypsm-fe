import { _surcajEmployeeDetailViewSchema } from "$lib/schemas/mypsm/integrity/surcaj-scheme";
import type { z } from "zod";

export type SurcajPersonalDetailResponseDTO = z.infer<typeof _surcajEmployeeDetailViewSchema>

export interface EmployeeDetail {
    employeeNumber: string;
    identityCardNumber: string;
    fullName: string;
    alternativeName: string;
    icColour: string;
    birthDate: Date;
    birthplace: string;
    nationality: string;
    race: string;
    ethnic: string;
    religion: string;
    gender: string;
    marital: string;
    email: string;
    homeAddress: string;
    mailAddress: string;
    isExPolice: boolean;
    isRelatedToLKIM: boolean;
    relationDetail: null;
}

export interface ServiceDetail {
    currentGrade: string;
    currentPosition: string;
    placement: string;
    serviceType: string;
    effectiveDate: Date;
    retirementBenefit: string;
    EPFNumber: string;
    SOCSO: string;
    taxIncome: string;
    bankName: string;
    accountNumber: string;
    program: string;
    eligibleLeaveCount: number;
    civilServiceStartDate: Date;
    confirmServiceDate: Date;
    historyList: null;
    firstEffectiveDate: Date;
    pastAttachmentDate: Date;
    actingDate: null;
    interimDate: null;
    pensionScheme: string;
    lastSalaryRaiseDate: null;
    lastPromotionDate: null;
    salaryMovementMonth: null;
    retirementDate: Date;
    salaryEffectiveDate: Date;
    maximumSalary: number;
    baseSalary: number;
    ITKA: number;
    ITP: number;
    EPW: number;
    COLA: number;
}
