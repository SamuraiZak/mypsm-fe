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

export const _relationDetailSchema = z.object({
    employeeNumber: z.string(),
    employeeName: z.string(),
    employeePosition: z.string(),
    relationshipId: z.number(),
})
export const _personalInfoResponseSchema = z
    .object({
        id: z.number().readonly(),
        name: shortTextSchema,
        alternativeName: shortTextSchema.nullable(),
        identityCardNumber: shortTextSchema,
        identityDocumentColor: shortTextSchema,
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
        homeCountryId: numberIdSchema,
        homeStateId: numberIdSchema,
        homeCityId: numberIdSchema,
        homePostcode: codeSchema,
        mailAddress: shortTextSchema,
        mailCountryId: numberIdSchema,
        mailStateId: numberIdSchema,
        mailCityId: numberIdSchema,
        mailPostcode: codeSchema,
        isExPoliceOrSoldier: booleanSchema,
        isInternalRelationship: booleanSchema,
        relationDetail: _relationDetailSchema,
    })

export const _personalInfoRequestSchema = _personalInfoResponseSchema
    .omit({
        id: true,
        relationDetail: true,
        identityCardNumber: true,
    }).extend({
        identityDocumentNumber: z.string(),
        employeeNumber: z.string().nullable(),
        relationshipId: z.number().nullable(),
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

            // if (isInternalRelationship) {
            //     if (employeeNumber === '') {
            //         ctx.addIssue({
            //             code: 'custom',
            //             message: 'Nombor pekerja tidak boleh kosong.',
            //             path: ['employeeNumber'],
            //         });
            //     }
            //     if (relationshipId === null) {
            //         ctx.addIssue({
            //             code: 'custom',
            //             message: 'Hubungan tidak boleh kosong.',
            //             path: ['relationshipId'],
            //         });
            //     }
            // }
        },
    );

//==========================================================
//================== Service Schema ===================
//==========================================================

export const _serviceDetailSchema = z.object({
    candidateId: numberIdSchema,
    gradeId: numberIdSchema,
    positionId: numberIdSchema,
    placementId: numberIdSchema,
    serviceTypeId: numberIdSchema,
    // maxGradeId: numberIdSchema,  
    // serviceTypeId: numberIdSchema,
    // serviceGroupId: numberIdSchema,
    // unitId: numberIdSchema,
    // programId: numberIdSchema,
    // employmentStatusId: numberIdSchema,
    effectiveDate: dateStringSchema,
    retirementBenefit: shortTextSchema,
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
    newRecruitEffectiveDate: dateStringSchema,
    // serviceDate: dateStringSchema,
    firstServiceDate: dateStringSchema,
    // firstConfirmServiceDate: dateStringSchema,
    firstEffectiveDate: dateStringSchema,
    pastAttachmentDate: dateStringSchema,


    actingDate: dateStringSchema,
    interimDate: dateStringSchema,
    pensionScheme: shortTextSchema,
    lastSalaryRaiseDate: dateStringSchema,
    lastPromotionDate: dateStringSchema,
    salaryMovementMonth: numberIdSchema,

    // confirmDate: dateStringSchema,
    // pensionNumber: shortTextSchema,
    // kgt: shortTextSchema,
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
        educationId: z.number().readonly(),
        majorId: numberIdSchema,
        minorId: numberIdSchema,
        countryId: numberIdSchema,
        institutionId: numberIdSchema,
        educationLevelId: numberIdSchema,
        sponsorshipId: numberIdSchema,
        name: codeSchema,
        completionDate: dateStringSchema,
        finalGrade: codeSchema,
        field: shortTextSchema,
    });

export const _academicListResponseSchema = z.object({
    academics: z.array(_academicInfoSchema),
});

export const _academicListRequestSchema = z.object({
    academics: z.array(_academicInfoSchema),
});

export const _academicEditRequestSchema = z.object({
    academics: z.array(_academicInfoSchema.omit({ educationId: true }).extend({ id: numberIdSchema.optional() })),
});

//==========================================================
//================== Experience Schema =====================
//==========================================================

export const _experienceInfoSchema = z.object({
    id: numberSchema.optional(),
    company: shortTextSchema,
    address: shortTextSchema,
    position: shortTextSchema,
    description: shortTextSchema,
    // positionCode: codeSchema.nullable(),
    startDate: dateStringSchema,
    endDate: dateStringSchema,
    grade: z.string(),
});

export const _experienceListResponseSchema = z.object({
    experiences: z.array(_experienceInfoSchema),

});

export const _experienceListRequestSchema = z.object({
    experiences: z.array(_experienceInfoSchema.omit({ id: true })),

});

export const _experienceEditRequestSchema = z.object({
    experiences: z.array(_experienceInfoSchema),

});
//==========================================================
//================== Activity Schema =====================
//==========================================================

export const _activityInfoSchema = z.object({
    id: numberSchema.optional(),
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

export const _activityEditRequestSchema = _activityListResponseSchema.pick({
    activities: true,
});


//==========================================================
//================== Realations Schema =====================
//==========================================================

export const _relationsSchema = z
    .object({
        familyId:numberIdSchema,
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
        identityDocumentColor: shortTextSchema,
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
    families: z.array(_relationsSchema),
});

export const _dependencyListResponseSchema = z.object({
    dependents: z.array(_relationsSchema),
});

export const _nextOfKinListResponseSchema = z.object({
    nextOfKins: z.array(_relationsSchema),
});

export const _familyListRequestSchema = _familyListResponseSchema.pick({
    families: true,
});

export const _familyEditRequestSchema = _familyListResponseSchema.pick({
    families: true,
});

export const _dependencyListRequestSchema = z.object({
    families: z.array(_relationsSchema),
});

export const _dependencyEditRequestSchema = z.object({
    families: z.array(_relationsSchema),
});

export const _nextOfKinListRequestSchema = z.object({
    families: z.array(_relationsSchema),
});

export const _nextOfKinEditRequestSchema = z.object({
    families: z.array(_relationsSchema),
});


//==========================================================
//========== Medical Assessment Schema =====================
//==========================================================

export const _medicalAssessmentInfoSchema = z.object({
    id: numberSchema.optional(),
    diseases: shortTextSchema,
    isPersonal: booleanSchema,
    isFamily: booleanSchema,
    remark: shortTextSchema,
});


export const _medicalAssessmentListResponseSchema = z.object({
    medicalHistory: _medicalAssessmentInfoSchema.array(),
});

export const _medicalAssessmentListRequestSchema = _medicalAssessmentListResponseSchema;




export let _diseaseInfoSchema = z.object({
    id: z.number().readonly(),
    disease: z.string(),
    isPersonal: z.boolean(),
    isFamily: z.boolean(),
    remark: z.string().optional(),
});

export let _diseaseInfoCollectionSchema = z.object({
    medicalHistory: _diseaseInfoSchema.array(),
});

export let _diseaseInfoCollectionSchemaRequest = _diseaseInfoCollectionSchema

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
    cyanosis: booleanSchema,
    edema: booleanSchema,
    jaundice: booleanSchema,
    lymphGlands: booleanSchema,
    skinDisease: booleanSchema,
    unaidedVisionLeft: shortTextSchema,
    unaidedVisionRight: shortTextSchema,
    aidedVisionLeft: shortTextSchema,
    aidedVisionRight: shortTextSchema,
    colourVision: shortTextSchema,
    fundoscopic: shortTextSchema,
    ear: shortTextSchema,
    dental: shortTextSchema,
    neck: shortTextSchema,
    cardiovascular: shortTextSchema,
    breathingExam: shortTextSchema,
    xray: shortTextSchema,
    xrayTaken: dateStringSchema,
    xrayLocation: shortTextSchema,
    xrayReference: shortTextSchema,
    abdomenHernia: shortTextSchema,
    mentalState: shortTextSchema,
    musculoskeletal: shortTextSchema,
    sugar: booleanSchema,
    albumin: booleanSchema,
    microscopic: shortTextSchema,

});

// export const _generalAssessmentListResponseSchema = z.object({
//     activities: z.array(_generalAssessmentInfoSchema),
//     isReadOnly: z.boolean().readonly(),
// });

// export const _generalAssessmentListRequestSchema = _generalAssessmentListResponseSchema.pick({
//     activities: true,
// });


export const _generalAssessmentListResponseSchema = _generalAssessmentInfoSchema.omit({
    // candidateId: true,
});

export const _generalAssessmentListRequestSchema = _generalAssessmentListResponseSchema.omit({
    // isReadOnly: true,
});