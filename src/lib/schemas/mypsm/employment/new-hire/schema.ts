//==========================================================
//================== Personal Info Schema ==============
//==========================================================

import {
    booleanSchema,
    codeSchema,
    dateStringSchema,
    longTextSchema,
    nricSchema,
    numberIdSchema,
    numberSchema,
    shortTextSchema,
} from '$lib/schemas/common/schema-type';
import { z } from 'zod';

// creating schema
export const _addNewHireSchema = z.object({
    id: z.number().nullable(),
    // applicationId: z.number().nullable(),
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
    isDraft: z.boolean(),
});

export const _personalInfoResponseSchema = z.object({
    id: z.number().readonly(),
    name: shortTextSchema,
    alternativeName: z.string().nullable(),
    identityDocumentNumber: shortTextSchema,
    identityDocumentColor: codeSchema,
    email: shortTextSchema.email({ message: 'Emel tidak lengkap.' }),
    assetDeclarationStatusId: numberIdSchema.refine((val) => val > 0, {
        message: 'Sila Tetapkan Pilihan',
    }),
    propertyDeclarationDate: dateStringSchema.nullable(),
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
    homeCountryId: numberIdSchema.refine((val) => val > 0, {
        message: 'Sila Tetapkan Pilihan',
    }),
    homeStateId: numberIdSchema.refine((val) => val > 0, {
        message: 'Sila Tetapkan Pilihan',
    }),
    homeCityId: numberIdSchema.refine((val) => val > 0, {
        message: 'Sila Tetapkan Pilihan',
    }),
    homePostcode: shortTextSchema,
    mailAddress: shortTextSchema,
    mailCountryId: numberIdSchema.refine((val) => val > 0, {
        message: 'Sila Tetapkan Pilihan',
    }),
    mailStateId: numberIdSchema.refine((val) => val > 0, {
        message: 'Sila Tetapkan Pilihan',
    }),
    mailCityId: numberIdSchema.refine((val) => val > 0, {
        message: 'Sila Tetapkan Pilihan',
    }),
    mailPostcode: shortTextSchema,
    isExPoliceOrSoldier: booleanSchema,
    isInternalRelationship: booleanSchema,
    employeeNumber: z.string().nullable(),
    employeeName: z.string().nullable(),
    employeePosition: z.string().nullable(),
    relationshipId: z.number().nullable(),
    isReadonly: z.boolean().readonly(),
    isDraft: z.boolean(),
});

export const _personalInfoRequestSchema = _personalInfoResponseSchema
    .omit({
        id: true,
        employeeName: true,
        employeePosition: true,
        isReadonly: true,
    })
    .superRefine(
        (
            {
                assetDeclarationStatusId,
                propertyDeclarationDate,
                isInternalRelationship,
                employeeNumber,
                relationshipId,
            },
            ctx,
        ) => {
            if (
                assetDeclarationStatusId === 12 ||
                assetDeclarationStatusId === 14 ||
                assetDeclarationStatusId === 15 ||
                assetDeclarationStatusId === 17 ||
                assetDeclarationStatusId === 18 ||
                assetDeclarationStatusId === 22
            ) {
                if (propertyDeclarationDate === null) {
                    ctx.addIssue({
                        code: 'custom',
                        message: 'Tarikh tidak boleh kosong.',
                        path: ['propertyDeclarationDate'],
                    });
                }
            }

            if (isInternalRelationship) {
                if (employeeNumber === '') {
                    ctx.addIssue({
                        code: 'custom',
                        message: 'Nombor pekerja tidak boleh kosong.',
                        path: ['employeeNumber'],
                    });
                }
                if (relationshipId === null) {
                    ctx.addIssue({
                        code: 'custom',
                        message: 'Hubungan tidak boleh kosong.',
                        path: ['relationshipId'],
                    });
                }
            }
        },
    );

//==========================================================
//================== Academic Schema =====================
//==========================================================

export const _academicInfoSchema = z
    .object({
        id: z.number().readonly(),
        majorId: numberIdSchema.refine((val) => val > 0, {
            message: 'Sila Tetapkan Pilihan',
        }),
        minorId: numberIdSchema,
        countryId: numberIdSchema,
        institutionId: numberIdSchema,
        educationLevelId: numberIdSchema,
        sponsorshipId: numberIdSchema,
        name: codeSchema,
        completionDate: dateStringSchema,
        finalGrade: codeSchema,
        field: shortTextSchema,
    })
    .partial({
        id: true,
    });

export const _academicListResponseSchema = z.object({
    academics: z.array(_academicInfoSchema),
    isReadonly: z.boolean().readonly(),
    isDraft: z.boolean(),
});

export const _academicListRequestSchema = _academicListResponseSchema.pick({
    academics: true,
    isDraft: true,
});

//==========================================================
//================== Experience Schema =====================
//==========================================================

export const _experienceInfoSchema = z.object({
    company: shortTextSchema,
    address: z.string().nullish(),
    position: shortTextSchema,
    positionCode: codeSchema,
    startDate: dateStringSchema,
    endDate: dateStringSchema,
    salary: numberSchema,
});

export const _experienceListResponseSchema = z.object({
    experiences: z.array(_experienceInfoSchema),
    isReadonly: z.boolean().readonly(),
    isDraft: z.boolean(),
});

export const _experienceListRequestSchema = _experienceListResponseSchema.pick({
    experiences: true,
    isDraft: true,
});

//==========================================================
//================== Activity Schema =====================
//==========================================================

export const _activityInfoSchema = z.object({
    name: shortTextSchema,
    joinDate: dateStringSchema,
    position: shortTextSchema,
    description: longTextSchema,
});

export const _activityListResponseSchema = z.object({
    activities: z.array(_activityInfoSchema),
    isReadonly: z.boolean().readonly(),
    isDraft: z.boolean(),
});

export const _activityListRequestSchema = _activityListResponseSchema.pick({
    activities: true,
    isDraft: true,
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
        alternativeName: z.string({
            required_error: 'Medan ini tidak boleh kosong.',
            invalid_type_error: 'Medan ini tidak boleh kosong.',
        }),
        identityDocumentColor: codeSchema,
        identityDocumentNumber: nricSchema,
        address: shortTextSchema,
        postcode: shortTextSchema,
        birthDate: dateStringSchema,
        workAddress: z.string().nullish(),
        workPostcode: z.string().nullish(),
        phoneNumber: shortTextSchema,
        marriageDate: dateStringSchema.nullable(),
        inSchool: booleanSchema,
    })
    .partial({
        marriageDate: true,
        alternativeName: true,
    })
    .superRefine(({ maritalId, marriageDate }, ctx) => {
        if (maritalId === 3) {
            if (marriageDate === null) {
                ctx.addIssue({
                    code: 'custom',
                    message: 'Tarikh tidak boleh kosong.',
                    path: ['marriageDate'],
                });
            }
        }
    });

// export const _familyListResponseSchema = z.object({
//     dependencies: z.array(_relationsSchema),
//     isReadonly: z.boolean().readonly(),
// });

export const _dependencyListResponseSchema = z.object({
    dependencies: z.array(_relationsSchema),
    isReadonly: z.boolean().readonly(),
    isDraft: z.boolean(),
});

// export const _nextOfKinListResponseSchema = z.object({
//     nextOfKins: z.array(_relationsSchema),
//     isReadonly: z.boolean().readonly(),
// });

export const _familyListRequestSchema = _dependencyListResponseSchema.pick({
    dependencies: true,
    isDraft: true,
});

export const _dependencyListRequestSchema = _dependencyListResponseSchema.pick({
    dependencies: true,
    isDraft: true,
});

export const _nextOfKinListRequestSchema = z.object({
    nextOfKins: z.array(_relationsSchema),
    isDraft: z.boolean(),
});

//==========================================================
//================== Service Schema ===================
//==========================================================

export const _serviceDetailSchema = z.object({
    applicationId: z.number().readonly(),
    gradeId: numberIdSchema,
    maxGradeId: numberIdSchema,
    // positionId: numberIdSchema,
    placementId: numberIdSchema,
    // schemeId: numberIdSchema,
    serviceTypeId: numberIdSchema,
    serviceGroupId: numberIdSchema,
    unitId: numberIdSchema,
    // programmeId: numberIdSchema,
    // employmentStatusId: numberIdSchema,
    effectiveDate: dateStringSchema,
    retirementBenefit: codeSchema,
    epfNumber: z.string().nullish(),
    socsoNumber: z.string().nullish(),
    incomeNumber: z.string().nullish(),
    bankName: shortTextSchema,
    bankAccount: shortTextSchema,
    // eligibleLeaveCount: numberSchema,
    civilServiceStartDate: dateStringSchema,
    newRecruitEffectiveDate: dateStringSchema,
    serviceDate: dateStringSchema,
    // firstServiceDate: dateStringSchema,
    // firstConfirmServiceDate: dateStringSchema,
    // firstEffectiveDate: dateStringSchema,
    // firstEffectiveServiceDate: dateStringSchema,
    // confirmServiceDate: dateStringSchema,
    // confirmDate: dateStringSchema,
    pensionNumber: z.string().nullish(),
    kgt: numberSchema,
    retirementAge: numberSchema,
    retirementDate: dateStringSchema.refine(
        (data) => new Date(data) >= new Date(),
        { message: 'Tarikh bersara tidak boleh kurang dari tahun semasa.' },
    ),
    revisionMonthId: numberIdSchema,
    maximumSalary: z.number().nullable(),
    baseSalary: numberSchema,
    itka: numberSchema,
    itp: numberSchema,
    epw: numberSchema,
    cola: numberSchema,
    isReadonly: z.boolean().readonly(),
    isDraft: z.boolean(),
});

export const _serviceInfoResponseSchema = _serviceDetailSchema.omit({
    applicationId: true,
});

export const _serviceInfoRequestSchema = _serviceDetailSchema;

//==========================================================
//========= Approval Info Schema ===========================
//==========================================================

export const _approvalResultSchema = z.object({
    id: z.number().readonly(),
    name: z.string().readonly(),
    remark: longTextSchema,
    status: booleanSchema,
    isReadonly: z.boolean().readonly(),
    isDraft: z.boolean(),
    approvalDate: z.string().readonly(),
    identityDocumentNumber: z.string().nullish(),
});

//==========================================================
//========= Set Approver Info Schema =======================
//==========================================================

export const _setApproversSchema = z.object({
    applicationId: z.number().readonly(),
    supporterId: numberIdSchema,
    approverId: numberIdSchema,
    isDraft: z.boolean(),
});

//==========================================================
//========= Get Approvers Info Schema =======================
//==========================================================

export const _getNewHireApproversSchema = z.object({
    supporterId: z.number().readonly(),
    approverId: z.number().readonly(),
    isReadonly: z.boolean().readonly(),
    isDraft: z.boolean(),
});

//==========================================================
//================== Document Schema =======================
//==========================================================

export const _employeeNumberSchema = z.object({
    employeeNumber: z.string().readonly(),
});

//==========================================================
//================== Employee Number Schema =======================
//==========================================================

export const _documentsSchema = z.object({
    template: z.string().readonly(),
    templateName: z.string().readonly(),
    attachment: z.string().readonly(),
    attachmentName: z.string().readonly(),
    isReadonly: z.boolean().readonly(),
    isDraft: z.boolean(),
});

export const _uploadDocumentsSchema = z.object({
    isDraft: z.boolean(),
    document: z
        .instanceof(File, { message: 'Sila muat naik dokumen berkenaan.' })
        .refine((f) => f.size < 10_000_000, 'Maximum 10 MB saiz muat naik.')
        .array()
        .min(1, { message: 'Dokumen berkenaan hendaklah dimuat naik.' }),
});

export const _newHireFullDetailSchema = z.object({
    personalDetail: _personalInfoResponseSchema,
    academic: _academicListResponseSchema,
    experience: _experienceListResponseSchema,
    activity: _activityListResponseSchema,
    family: _dependencyListResponseSchema,
    dependent: _dependencyListResponseSchema,
    nextOfKin: _dependencyListResponseSchema,
    document: _documentsSchema,
    secretaryUpdate: _serviceDetailSchema,
    secretaryApproval: _approvalResultSchema,
    supporterApprover: _getNewHireApproversSchema,
    supporter: _approvalResultSchema,
    approver: _approvalResultSchema,
    employeeNumber: _employeeNumberSchema,
});
