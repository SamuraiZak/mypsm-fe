//==========================================================
//================== Personal Info Schema ==============
//==========================================================

import {
    booleanSchema,
    codeSchema,
    longTextSchema,
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

export const _personalInfoResponseSchema = z
    .object({
        id: z.number().readonly(),
        name: shortTextSchema,
        alternativeName: z.string(),
        identityDocumentNumber: shortTextSchema,
        identityDocumentColor: codeSchema,
        email: shortTextSchema.email({ message: 'Emel tidak lengkap.' }),
        assetDeclarationStatusId: numberIdSchema,
        propertyDeclarationDate: z.coerce.string(),
        birthDate: z.coerce.string({
            required_error: 'Pastikan tarikh adalah betul.',
        }),
        birthStateId: numberIdSchema,
        birthCountryId: numberIdSchema,
        genderId: numberIdSchema,
        nationalityId: numberIdSchema,
        religionId: numberIdSchema,
        raceId: numberIdSchema,
        titleId: numberIdSchema,
        ethnicId: numberIdSchema,
        maritalId: numberIdSchema,
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
        relationshipId: z.number().nullable(),
        isReadOnly: z.boolean().readonly(),
    })
    .partial({
        alternativeName: true,
        propertyDeclarationDate: true,
        employeeNumber: true,
        employeeName: true,
        employeePosition: true,
        relationshipId: true,
    });

export const _personalInfoRequestSchema = _personalInfoResponseSchema
    .omit({ id: true, isReadOnly: true })
    .superRefine(
        ({ assetDeclarationStatusId, isInternalRelationship }, ctx) => {
            if (
                assetDeclarationStatusId === 12 ||
                assetDeclarationStatusId === 14 ||
                assetDeclarationStatusId === 15 ||
                assetDeclarationStatusId === 17 ||
                assetDeclarationStatusId === 18 ||
                assetDeclarationStatusId === 22
            ) {
                ctx.addIssue({
                    code: 'custom',
                    message: 'Tarikh tidak boleh kosong.',
                    path: ['propertyDeclarationDate'],
                });
            }

            if (isInternalRelationship) {
                ctx.addIssue({
                    code: 'custom',
                    message: 'Sila isi medan ini.',
                    path: [
                        'employeeNumber',
                        'employeeName',
                        'employeePosition',
                        'relationshipId',
                    ],
                });
            }
        },
    );

//==========================================================
//================== Academic Schema =====================
//==========================================================

export const _academicInfoSchema = z.object({
    id: z.number().readonly(),
    majorId: numberIdSchema,
    minorId: numberIdSchema,
    countryId: numberIdSchema,
    institutionId: numberIdSchema,
    educationLevelId: numberIdSchema,
    sponsorshipId: numberIdSchema,
    name: codeSchema,
    completionDate: z.coerce.string(),
    finalGrade: codeSchema,
    field: shortTextSchema,
});

export const _academicListResponseSchema = z.object({
    academicList: z.array(_academicInfoSchema),
    isReadOnly: z.boolean().readonly(),
});

export const _academicListRequestSchema = _academicListResponseSchema.pick({
    academicList: true,
});

//==========================================================
//================== Experience Schema =====================
//==========================================================

export const _experienceInfoSchema = z.object({
    company: shortTextSchema,
    address: shortTextSchema,
    position: shortTextSchema,
    positionCode: codeSchema,
    startDate: z.coerce.string(),
    endDate: z.coerce.string(),
    salary: numberSchema,
});

export const _experienceListResponseSchema = z.object({
    experienceList: z.array(_experienceInfoSchema),
    isReadOnly: z.boolean().readonly(),
});

export const _experienceListRequestSchema = _experienceListResponseSchema.pick({
    experienceList: true,
});

//==========================================================
//================== Activity Schema =====================
//==========================================================

export const _activityInfoSchema = z.object({
    name: shortTextSchema,
    joinDate: z.coerce.string(),
    position: shortTextSchema,
    description: longTextSchema,
});

export const _activityListResponseSchema = z.object({
    activityList: z.array(_activityInfoSchema),
    isReadOnly: z.boolean().readonly(),
});

export const _activityListRequestSchema = _activityListResponseSchema.pick({
    activityList: true,
});

//==========================================================
//================== Realations Schema =====================
//==========================================================

export const _relationsSchema = z
    .object({
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
        birthDate: z.coerce.string(),
        workAddress: shortTextSchema,
        workPostcode: shortTextSchema,
        phoneNumber: shortTextSchema,
        marriageDate: z.coerce.string(),
        inSchool: booleanSchema,
    })
    .partial({
        marriageDate: true,
        alternativeName: true,
    });

export const _familyListResponseSchema = z.object({
    dependenciesList: z.array(_relationsSchema),
    isReadOnly: z.boolean().readonly(),
});

export const _dependencyListResponseSchema = z.object({
    dependenciesList: z.array(_relationsSchema),
    isReadOnly: z.boolean().readonly(),
});

export const _nextOfKinListResponseSchema = z.object({
    nextOfKinsList: z.array(_relationsSchema),
    isReadOnly: z.boolean().readonly(),
});

export const _familyListRequestSchema = _familyListResponseSchema.pick({
    dependenciesList: true,
});

export const _dependencyListRequestSchema = _dependencyListResponseSchema.pick({
    dependenciesList: true,
});

export const _nextOfKinListRequestSchema = _nextOfKinListResponseSchema.pick({
    nextOfKinsList: true,
});

//==========================================================
//================== Service Schema ===================
//==========================================================

export const _serviceDetailSchema = z.object({
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
    effectiveDate: z.coerce.string(),
    retirementBenefit: codeSchema,
    epfNumber: shortTextSchema,
    socsoNumber: shortTextSchema,
    incomeNumber: shortTextSchema,
    bankName: shortTextSchema,
    bankAccount: shortTextSchema,
    eligibleLeaveCount: numberSchema,
    civilServiceStartDate: z.coerce.string(),
    newRecruitEffectiveDate: z.coerce.string(),
    serviceDate: z.coerce.string(),
    firstServiceDate: z.coerce.string(),
    firstConfirmServiceDate: z.coerce.string(),
    firstEffectiveDate: z.coerce.string(),
    confirmDate: z.coerce.string(),
    pensionNumber: shortTextSchema,
    kgt: numberSchema,
    retirementDate: z.coerce.string(),
    revisionMonth: codeSchema,
    maximumSalary: numberSchema,
    baseSalary: numberSchema,
    itka: numberSchema,
    itp: numberSchema,
    epw: numberSchema,
    cola: numberSchema,
    isReadOnly: z.boolean().readonly(),
});

export const _serviceInfoResponseSchema = _serviceDetailSchema.omit({
    candidateId: true,
});

export const _serviceInfoRequestSchema = _serviceDetailSchema.omit({
    isReadOnly: true,
});

//==========================================================
//========= Approval Info Schema ===========================
//==========================================================

export const _approvalResultSchema = z.object({
    id: z.number().readonly(),
    name: z.string().readonly(),
    remark: longTextSchema,
    status: booleanSchema.default(true),
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
    template: z.string().readonly(),
    attachment: z.string().readonly(),
    isReadonly: z.boolean().readonly(),
});

export const _uploadDocumentsSchema = z.object({
    document: z
        .instanceof(File, { message: 'Sila muat naik dokumen berkenaan.' })
        .refine((f) => f.size < 1_000_000, 'Maximum 1 MB saiz muat naik.')
        .array(),
});
