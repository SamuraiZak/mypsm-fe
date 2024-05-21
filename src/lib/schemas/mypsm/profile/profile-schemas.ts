import {
    booleanSchema,
    codeSchema,
    dateSchema,
    dateStringSchema,
    longTextSchema,
    maxDateSchema,
    minDateSchema,
    numberIdSchema,
    numberSchem0,
    numberSchema,
    shortTextSchema,
} from '$lib/schemas/common/schema-type';
import { date, number, z } from 'zod';

export const _relationDetailSchema = z.object({
    employeeNumber: z.string().nullable(),
    employeeName: z.string().nullable(),
    employeePosition: z.string().nullable(),
    relationshipId: z.number().nullable(),
})
// export const _personalInfoResponseSchema = z
//     .object({
//         id: z.number().readonly(),
//         name: z.string(),
//         alternativeName: shortTextSchema.nullable(),
//         identityCardNumber: z.string(),
//         identityDocumentColor: z.string(),
//         email: shortTextSchema.email({ message: 'Emel tidak lengkap.' }),
//         assetDeclarationStatusId: numberIdSchema,
//         propertyDeclarationDate: dateStringSchema.nullable(),
//         birthDate: z.coerce.string({
//             required_error: 'Pastikan tarikh adalah betul.',
//         }),
//         birthStateId: numberIdSchema,
//         birthCountryId: numberIdSchema,
//         genderId: numberIdSchema,
//         nationalityId: numberIdSchema,
//         religionId: numberIdSchema,
//         raceId: numberIdSchema,
//         titleId: numberIdSchema,
//         ethnicId: numberIdSchema,
//         maritalId: numberIdSchema,
//         homeAddress: shortTextSchema,
//         homeCountryId: numberIdSchema,
//         homeStateId: numberIdSchema,
//         homeCityId: numberIdSchema,
//         homePostcode: shortTextSchema.nullish(),
//         mailAddress: shortTextSchema,
//         mailCountryId: numberIdSchema,
//         mailStateId: numberIdSchema,
//         mailCityId: numberIdSchema,
//         mailPostcode: shortTextSchema.nullish(),
//         isExPoliceOrSoldier: booleanSchema,
//         isInternalRelationship: booleanSchema,
//         relationshipId: z.number().nullable(),
//         houseLoanType: z.string(),
//         houseLoan: z.number(),
//         employeeNumber: z.string().nullable(),
//         vehicleLoan: z.number(),
//     })

export const _personalInfoResponseSchema = z.object({
    name: shortTextSchema,
    alternativeName:  z.string(),
    identityCardNumber: shortTextSchema,
    identityDocumentColor: shortTextSchema,
    email: shortTextSchema,
    status: shortTextSchema,
    birthDate: shortTextSchema,
    birthStateId: z.number(),
    birthCountryId: z.number(),
    genderId: z.number(),
    nationalityId: z.number(),
    religionId: z.number(),
    raceId: z.number(),
    ethnicId: z.number(),
    maritalId: z.number(),
    titleId: z.number().default(1),
    assetDeclarationStatusId: z.number().default(1),
    homeAddress: z.string(),
    homeCountryId: z.number(),
    homeStateId: z.number(),
    homeCityId: z.number(),
    homePostcode: z.string(),
    mailAddress: z.string(),
    mailCountryId: z.number(),
    mailStateId: z.number(),
    mailCityId: z.number(),
    mailPostcode: z.string(),
    employeeNumber: shortTextSchema,
    isExPoliceOrSoldier: booleanSchema,
    isInternalRelationship: booleanSchema,
    relationDetail: z.object({
        employeeNumber: z.string(),
        employeeName: z.string(),
        employeePosition: z.string(),
        relationshipId: z.number().nullable()
    }),
    houseLoanType: z.string(),
    houseLoan: z.number(),
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
                // assetDeclarationStatusId,
                // propertyDeclarationDate,
                isInternalRelationship,
                employeeNumber,
                relationshipId,
            },
            ctx,
        ) => {
            // if (
            //     assetDeclarationStatusId === 12 ||
            //     assetDeclarationStatusId === 14 ||
            //     assetDeclarationStatusId === 15 ||
            //     assetDeclarationStatusId === 17 ||
            //     assetDeclarationStatusId === 18 ||
            //     assetDeclarationStatusId === 22
            // ) {
            //     if (propertyDeclarationDate === null) {
            //         ctx.addIssue({
            //             code: 'custom',
            //             message: 'Tarikh tidak boleh kosong.',
            //             path: ['propertyDeclarationDate'],
            //         });
            //     }
            // }

            if (isInternalRelationship) {
                if (employeeNumber === '') {
                    ctx.addIssue({
                        code: 'custom',
                        message: 'Nombor pekerja tidak boleh kosong.',
                        path: ['employeeNumber'],
                    });
                }
                if (relationshipId === null ||
                    relationshipId < 0
                ) {
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
    gradeId: z.number(),
    positionId: z.number(),
    placementId: z.number(),
    serviceTypeId: z.number(),
    // maxGradeId: numberIdSchema,  
    // serviceTypeId: numberIdSchema,
    // serviceGroupId: numberIdSchema,
    // unitId: numberIdSchema,
    // programId: numberIdSchema,
    // employmentStatusId: numberIdSchema,
    effectiveDate: z.string(),
    retirementBenefit: z.string(),
    EPFNumber: shortTextSchema,
    SOCSO: shortTextSchema,
    taxIncome: shortTextSchema,
    bankName: shortTextSchema,
    accountNumber: shortTextSchema,
    program: z.string(),
    eligibleLeaveCount: z.number(),
    civilServiceStartDate: z.string(),
    confirmServiceDate: z.string(),
    historyList: shortTextSchema,
    newRecruitEffectiveDate: z.string(),
    // serviceDate: dateStringSchema,
    firstServiceDate: z.string(),
    // firstConfirmServiceDate: dateStringSchema,
    firstEffectiveDate: z.string(),
    pastAttachmentDate: z.string(),
    actingDate: z.string(),
    interimDate: z.string(),
    pensionScheme: z.string(),
    lastSalaryRaiseDate: z.string(),
    lastPromotionDate: z.string(),
    salaryMovementMonth: z.number(),

    // confirmDate: dateStringSchema,
    // pensionNumber: shortTextSchema,
    // kgt: shortTextSchema,
    retirementDate: dateStringSchema,
    salaryEffectiveDate: dateStringSchema,
    // revisionMonth: codeSchema,
    maximumSalary: z.number(),
    baseSalary: z.number(),
    ITKA: z.number(),
    ITP: z.number(),
    EPW: z.number(),
    COLA: z.number(),
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

        educationId: z.number().readonly().optional(),
        majorId: numberIdSchema,
        minorId: numberIdSchema,
        countryId: numberIdSchema,
        institutionId: numberIdSchema,
        educationLevelId: numberIdSchema,
        sponsorshipId: numberIdSchema,
        name: codeSchema,
        completionDate: dateStringSchema,
        finalGrade: codeSchema,
        field: z.string().nullable(),
    });

export const _academicListResponseSchema = z.object({
    academics: z.array(_academicInfoSchema),
});

export const _academicListRequestSchema = z.object({
    academics: z.array(_academicInfoSchema),
});

export const _academicEditRequestSchema = z.object({
    academics: z.array(_academicInfoSchema),
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
        familyId: z.number(),
        birthCountryId: numberIdSchema,
        birthStateId: numberIdSchema,
        relationshipId: numberIdSchema,
        educationLevelId: numberIdSchema,
        raceId: numberIdSchema,
        nationalityId: numberIdSchema,
        maritalId: z.number().nullish(),
        genderId: numberIdSchema,
        name: shortTextSchema,
        alternativeName: z.string().nullish(),
        identityDocumentColor: shortTextSchema,
        identityDocumentNumber: shortTextSchema,
        address: shortTextSchema,
        postcode: shortTextSchema,
        birthDate: dateStringSchema,
        workAddress: z.string().nullish(),
        workPostcode: z.string().nullish(),
        phoneNumber: z.string().nullish(),
        marriageDate:z.string().nullish(),
        inSchool: booleanSchema,
    })
// .partial({
//     marriageDate: true,
//     alternativeName: true,
// })
// .superRefine(({ maritalId, marriageDate }, ctx) => {
//     if (maritalId === 3) {
//         if (marriageDate === null) {
//             ctx.addIssue({
//                 code: 'custom',
//                 message: 'Tarikh tidak boleh kosong.',
//                 path: ['marriageDate'],
//             });
//         }
//     }
// });

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
    disease: shortTextSchema,
    isPersonal: booleanSchema,
    isFamily: booleanSchema,
    remark: shortTextSchema.optional().nullable(),
});


export const _medicalAssessmentListResponseSchema = z.object({
    medicalHistory: _medicalAssessmentInfoSchema.array(),
});

export const _medicalAssessmentListRequestSchema = _medicalAssessmentListResponseSchema;




export let _diseaseInfoSchema = z.object({
    id: z.number().readonly().nullish(),
    diseases: z.string(),
    isPersonal: z.boolean(),
    isFamily: z.boolean(),
    remark: z.string().optional(),
});

export type DiseaseInfoDTO = z.infer<typeof _diseaseInfoSchema>;

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