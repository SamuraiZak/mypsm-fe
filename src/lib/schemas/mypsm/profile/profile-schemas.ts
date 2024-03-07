import {
    booleanSchema,
    codeSchema,
    dateSchema,
    dateStringSchema,
    longTextSchema,
    maxDateSchema,
    minDateSchema,
    numberIdSchema,
    numberSchema,
    shortTextSchema,
} from '$lib/schemas/common/schema-type';
import { date, number, z } from 'zod';


export const _personalInfoResponseSchema = z
    .object({
        // id: z.number().readonly(),
        fullName: shortTextSchema,
        alternativeName: z.string(),
        identityCardNumber: numberSchema,
        icColour: codeSchema,
        email: shortTextSchema.email({ message: 'Emel tidak lengkap.' }),
        assetDeclarationStatusId: numberIdSchema,
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
        mailAddress: shortTextSchema,
        houseloan: shortTextSchema,
        houseLoanType: shortTextSchema,
        isExPoliceOrSoldier: booleanSchema,
        isInternalRelationship: booleanSchema,
        employeeNumber: z.string().nullable(),
        employeeName: z.string(),
        employeePosition: z.string(),
        relationship: z.number().nullable(),
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
    .omit({
        id: true,
        employeeName: true,
        employeePosition: true,
        isReadOnly: true,
    })
    .superRefine(
        (
            {
                assetDeclarationStatusId,
                propertyDeclarationDate,
                isInternalRelationship,
                employeeNumber,
                relationship,
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
                if (relationship === null) {
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
//================== Service Schema ===================
//==========================================================

export const _serviceDetailSchema = z.object({
    candidateId: numberIdSchema,
    currentGrade: numberIdSchema,
    currentPosition: numberIdSchema,
    placement: numberIdSchema,
    serviceType: shortTextSchema,
    // maxGradeId: numberIdSchema,  
    // serviceTypeId: numberIdSchema,
    // serviceGroupId: numberIdSchema,
    // unitId: numberIdSchema,
    // programId: numberIdSchema,
    // employmentStatusId: numberIdSchema,
    effectiveDate: dateStringSchema,
    retirementBenefit: codeSchema,
    EPFNumber: shortTextSchema,
    SOCSO: shortTextSchema,
    taxIncome: shortTextSchema,
    bankName: shortTextSchema,
    accountNumber: shortTextSchema,
    program: shortTextSchema,
    eligibleLeaveCount: numberSchema,
    civilServiceStartDate: dateStringSchema,
    confirmServiceDate: dateStringSchema,
    historyList: shortTextSchema,
    // newRecruitEffectiveDate: dateStringSchema,
    // serviceDate: dateStringSchema,
    // firstServiceDate: dateStringSchema,
    // firstConfirmServiceDate: dateStringSchema,
    firstEffectiveDate: dateStringSchema,
    pastAttachmentDate: dateStringSchema,
    actingDate: dateStringSchema,
    interimDate: dateStringSchema,
    pensionScheme: shortTextSchema,
    lastSalaryRaiseDate: dateStringSchema,
    lastPromotionDate: dateStringSchema,
    salaryMovementMonth: shortTextSchema,
    confirmDate: dateStringSchema,
    pensionNumber: shortTextSchema,
    kgt: numberSchema,
    retirementDate: dateStringSchema,
    salaryEffectiveDate: dateStringSchema,
    // revisionMonth: codeSchema,
    maximumSalary: numberSchema,
    baseSalary: numberSchema,
    ITKA: numberSchema,
    ITP: numberSchema,
    EPW: numberSchema,
    COLA: numberSchema,
    isReadOnly: z.boolean().readonly(),
});

export const _serviceInfoResponseSchema = _serviceDetailSchema.omit({
    candidateId: true,
});

export const _serviceInfoRequestSchema = _serviceDetailSchema.omit({
    isReadOnly: true,
});

//==========================================================
//================== Academic Schema =====================
//==========================================================

export const _academicInfoSchema = z
    .object({
        id: z.number().readonly(),
        majorId: numberIdSchema,
        minorId: numberIdSchema,
        countryId: numberIdSchema,
        institutionId: numberIdSchema,
        educationLevelId: numberIdSchema,
        sponsorshipId: numberIdSchema,
        name: codeSchema,
        completionDate: dateStringSchema,
        finalGrade: codeSchema,
        remark: shortTextSchema,
    })
    .partial({ 
        id: true,
    });

export const _academicListResponseSchema = z.object({
    academics: z.array(_academicInfoSchema),
});

export const _academicListRequestSchema = _academicListResponseSchema.pick({
    academics: true,
});

//==========================================================
//================== Experience Schema =====================
//==========================================================

export const _experienceInfoSchema = z.object({
    id:numberSchema,
    company: shortTextSchema,
    address: shortTextSchema,
    position: shortTextSchema,
    positionCode: codeSchema,
    startDate: dateStringSchema,
    endDate: dateStringSchema,
    salary: numberSchema,
});

export const _experienceListResponseSchema = z.object({
    experiences: z.array(_experienceInfoSchema),
   
});

export const _experienceListRequestSchema = _experienceListResponseSchema.pick({
    experiences: true,
});

//==========================================================
//================== Activity Schema =====================
//==========================================================

export const _activityInfoSchema = z.object({
    id:numberSchema,
    name: shortTextSchema,
    joinDate: dateStringSchema,
    position: shortTextSchema,
    description: longTextSchema,
});

export const _activityListResponseSchema = z.object({
    activities: z.array(_activityInfoSchema),
    isReadOnly: z.boolean().readonly(),
});

export const _activityListRequestSchema = _activityListResponseSchema.pick({
    activities: true,
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
        birthDate: dateStringSchema,
        workAddress: shortTextSchema,
        workPostcode: shortTextSchema,
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

export const _familyListResponseSchema = z.object({
    dependencies: z.array(_relationsSchema),
    isReadOnly: z.boolean().readonly(),
});

export const _dependencyListResponseSchema = z.object({
    dependencies: z.array(_relationsSchema),
    isReadOnly: z.boolean().readonly(),
});

export const _nextOfKinListResponseSchema = z.object({
    nextOfKins: z.array(_relationsSchema),
    isReadOnly: z.boolean().readonly(),
});

export const _familyListRequestSchema = _dependencyListResponseSchema.pick({
    dependencies: true,
});

export const _dependencyListRequestSchema = _dependencyListResponseSchema.pick({
    dependencies: true,
});

export const _nextOfKinListRequestSchema = z.object({
    nextOfKins: z.array(_relationsSchema),
});


//==========================================================
//========== Medical Assessment Schema =====================
//==========================================================

export const _medicalAssessmentInfoSchema = z.object({
    id: numberSchema,
    diseases: shortTextSchema,
    isPersonal: booleanSchema,
    isFamily: booleanSchema,
    remark: shortTextSchema,
});


export const _medicalAssessmentListResponseSchema = z.object({
    activities: z.array(_medicalAssessmentInfoSchema),
    isReadOnly: z.boolean().readonly(),
});

export const _medicalAssessmentListRequestSchema = _medicalAssessmentListResponseSchema.pick({
    activities: true,
});


//==========================================================
//========== General Assessment Schema =====================
//==========================================================

export const _generalAssessmentInfoSchema = z.object({

    year: numberSchema,
    height: numberSchema,
    weight: numberSchema,
    BMI: numberSchema,
    BPM: numberSchema,
    BP: shortTextSchema,
    paleSkin: booleanSchema,
    cycnosis: booleanSchema,
    edema: booleanSchema,
    jaundice: booleanSchema,
    lymphGlands: booleanSchema,
    skinDisease: booleanSchema,
    unaidedVisionLeft: shortTextSchema,
    unaidedVisionRight: shortTextSchema,
    aidedVisionLeft: shortTextSchema,
    aidedVisionRight: shortTextSchema,
    colourVision: booleanSchema,
    fundoscopic: booleanSchema,
    ear: booleanSchema,
    dental: shortTextSchema,
    neck: booleanSchema,
    cardiovascular: booleanSchema,
    breathingExam: booleanSchema,
    xray: shortTextSchema,
    xrayTaken: dateSchema,
    xrayLocation: shortTextSchema,
    xrayReference: shortTextSchema,
    abdomenHernia: shortTextSchema,
    mentalState: shortTextSchema,
    musculoskeletal: shortTextSchema,
    sugar: booleanSchema,
    albumin: booleanSchema,
    microscopic: shortTextSchema,

});

export const _generalAssessmentListResponseSchema = z.object({
    activities: z.array(_generalAssessmentInfoSchema),
    isReadOnly: z.boolean().readonly(),
});

export const _generalAssessmentListRequestSchema = _generalAssessmentListResponseSchema.pick({
    activities: true,
});