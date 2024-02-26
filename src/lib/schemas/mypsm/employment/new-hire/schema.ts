//==========================================================
//================== Personal Info Schema ==============
//==========================================================

import {
    booleanSchema,
    codeSchema,
    dateSchema,
    longTextSchema,
    maxDateSchema,
    minDateSchema,
    numberIdSchema,
    numberSchema,
    shortTextSchema,
} from '$lib/schemas/common/schema-type';
import { z } from 'zod';

// creating schema
export const _addNewHireSchema = z.object({
    name: z.coerce
        .string({
            required_error: 'Sila tetapkan ID sementara calon',
            invalid_type_error: 'Id hendaklah terdiri daripada nombor sahaja',
        })
        .min(1, { message: 'ID hendaklah lebih daripada 1 angka' }),
    identityDocumentNumber: z
        .string()
        .min(12, {
            message: 'Ruangan ini harus diisi tidak kurang dari 12 aksara',
        })
        .max(12, {
            message: 'Ruangan ini harus diisi tidak kurang dari 12 aksara',
        }),
    email: z
        .string()
        .email({ message: 'Pastikan emel adalah betul dan lengkap' }),
});

export const _personalInfoSchema = z
    .object({
        id: z.number().readonly(),
        name: shortTextSchema,
        alternativeName: z.string(),
        identityDocumentNumber: shortTextSchema,
        identityDocumentColor: codeSchema,
        email: shortTextSchema.email({ message: 'Emel tidak lengkap.' }),
        propertyDeclarationDate: maxDateSchema,
        birthDate: maxDateSchema,
        birthStateId: numberIdSchema,
        birthCountryId: numberIdSchema,
        genderId: numberIdSchema,
        nationalityId: numberIdSchema,
        religionId: numberIdSchema,
        raceId: numberIdSchema,
        titleId: numberIdSchema,
        ethnicId: numberIdSchema,
        maritalId: numberIdSchema,
        assetDeclarationStatusId: numberIdSchema,
        homeAddress: shortTextSchema,
        homeCountryId: numberIdSchema,
        homeStateId: numberIdSchema,
        homeCityId: numberIdSchema,
        homePostcode: shortTextSchema,
        mailAddress: shortTextSchema,
        mailCountryId: numberIdSchema,
        mailStateId: numberIdSchema,
        mailCityId: numberIdSchema,
        mailPostcode: shortTextSchema,
        isExPoliceOrSoldier: booleanSchema,
        isInternalRelationship: booleanSchema,
        employeeNumber: z.string(),
        employeeName: z.string(),
        employeePosition: z.string(),
        relationshipId: z.number(),
        isReadOnly: z.boolean().readonly(),
    })
    .refine((data) => !data.isInternalRelationship, {
        message: 'Sila isi medan ini.',
        path: [
            'employeeNumber',
            'employeeName',
            'employeePosition',
            'relationshipId',
        ],
    });

//==========================================================
//================== Academic Schema =====================
//==========================================================

export const _academicInfoSchema = z.object({
    id: numberIdSchema,
    majorId: numberIdSchema,
    minorId: numberIdSchema,
    countryId: numberIdSchema,
    institutionId: numberIdSchema,
    educationLevelId: numberIdSchema,
    sponsorshipId: numberIdSchema,
    name: codeSchema,
    completionDate: maxDateSchema,
    finalGrade: codeSchema,
    field: shortTextSchema,
});

export const _academicListSchema = z.object({
    academicList: z.array(_academicInfoSchema),
    isReadOnly: z.boolean().readonly(),
});

//==========================================================
//================== Experience Schema =====================
//==========================================================

export const _experienceInfoSchema = z.object({
    company: shortTextSchema,
    address: shortTextSchema,
    position: shortTextSchema,
    positionCode: codeSchema,
    startDate: maxDateSchema,
    endDate: maxDateSchema,
    salary: numberSchema,
});

export const _experienceListSchema = z.object({
    experienceList: z.array(_experienceInfoSchema),
    isReadOnly: z.boolean().readonly(),
});

//==========================================================
//================== Activity Schema =====================
//==========================================================

export const _activityInfoSchema = z.object({
    name: shortTextSchema,
    joinDate: maxDateSchema,
    position: shortTextSchema,
    description: longTextSchema,
});

export const _activityListSchema = z.object({
    activityList: z.array(_activityInfoSchema),
    isReadOnly: z.boolean().readonly(),
});

//==========================================================
//================== Realations Schema =====================
//==========================================================

export const _relationsSchema = z.object({
    birthCountryId: numberIdSchema,
    birthStateId: numberIdSchema,
    relationshipId: numberIdSchema,
    educationLevelId: numberIdSchema,
    raceId: numberIdSchema,
    nationalityId: numberIdSchema,
    maritalId: numberIdSchema,
    genderId: numberIdSchema,
    name: shortTextSchema,
    alternativeName: z.string(),
    identityDocumentColor: codeSchema,
    identityDocumentNumber: shortTextSchema,
    address: shortTextSchema,
    postcode: shortTextSchema,
    birthDate: maxDateSchema,
    workAddress: shortTextSchema,
    workPostcode: shortTextSchema,
    phoneNumber: shortTextSchema,
    marriageDate: z.date(),
    inSchool: booleanSchema,
});

export const _familyListSchema = z.object({
    dependenciesList: z.array(_relationsSchema),
    isReadOnly: z.boolean().readonly(),
});

export const _dependencyListSchema = z.object({
    dependenciesList: z.array(_relationsSchema),
    isReadOnly: z.boolean().readonly(),
});

export const _nextOfKinListSchema = z.object({
    nextOfKinsList: z.array(_relationsSchema),
    isReadOnly: z.boolean().readonly(),
});

//==========================================================
//================== Service Schema ===================
//==========================================================

export const _serviceInfoSchema = z.object({
    candidateId: numberIdSchema,
    gradeId: numberIdSchema,
    maxGradeId: numberIdSchema,
    positionId: numberIdSchema,
    placementId: numberIdSchema,
    serviceTypeId: numberIdSchema,
    serviceGroupId: numberIdSchema,
    unitId: numberIdSchema,
    programId: numberIdSchema,
    employmentStatusId: numberIdSchema,
    effectiveDate: minDateSchema,
    retirementBenefit: codeSchema,
    epfNumber: shortTextSchema,
    socsoNumber: shortTextSchema,
    incomeNumber: shortTextSchema,
    bankName: shortTextSchema,
    bankAccount: shortTextSchema,
    eligibleLeaveCount: numberSchema,
    civilServiceStartDate: dateSchema,
    newRecruitEffectiveDate: dateSchema,
    serviceDate: dateSchema,
    firstServiceDate: dateSchema,
    firstConfirmServiceDate: dateSchema,
    firstEffectiveDate: dateSchema,
    confirmDate: dateSchema,
    pensionNumber: shortTextSchema,
    kgt: numberSchema,
    retirementDate: minDateSchema,
    revisionMonth: codeSchema,
    maximumSalary: numberSchema,
    baseSalary: numberSchema,
    itka: numberSchema,
    itp: numberSchema,
    epw: numberSchema,
    cola: numberSchema,
    isReadOnly: z.boolean().readonly(),
});

//==========================================================
//========= Approval Info Schema ===========================
//==========================================================

export const _approvalResultSchema = z.object({
    id: numberIdSchema,
    name: z.string().readonly(),
    remark: longTextSchema,
    isApproved: booleanSchema.default(true),
});

//==========================================================
//========= Set Approver Info Schema =======================
//==========================================================

export const _setApproversSchema = z.object({
    candidateId: numberIdSchema,
    supporterId: numberIdSchema,
    approverId: numberIdSchema,
});

//==========================================================
//========= Get Approvers Info Schema =======================
//==========================================================

export const _getNewHireApproversSchema = z.object({
    isReadonly: z.boolean().readonly(),
    supporterId: z.number().readonly(),
    approverId: z.number().readonly(),
});

//==========================================================
//================== Document Schema =======================
//==========================================================

export const _documentsSchema = z.object({
    isReadonly: z.boolean().readonly(),
});
