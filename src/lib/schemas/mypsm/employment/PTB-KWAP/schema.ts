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

//=====================================================
//================== Service Schema ===================
//=====================================================

export const _personalInfoSchema = z
    .object({
        employeeNo:numberSchema,
        name: shortTextSchema,
        otherName: z.string(),
        identityCard: shortTextSchema,
        identityCardColor: shortTextSchema,
        // email: shortTextSchema.email({ message: 'Emel tidak lengkap.' }),
        // assetDeclarationStatusId: numberIdSchema,
        // propertyDeclarationDate: z.date().nullable(),
        dateOfBirth: maxDateSchema,
        placeOfBirth: shortTextSchema,
        // birthCountryId: numberIdSchema,
        gender: shortTextSchema,
        nationality: shortTextSchema,
        religion: shortTextSchema,
        race: shortTextSchema,
        titleId: shortTextSchema,
        ethnicId: shortTextSchema,
        status: shortTextSchema,
        homeAddress: shortTextSchema,
        // homeCountryId: numberIdSchema,
        // homeStateId: numberIdSchema,
        // homeCityId: numberIdSchema,
        // homePostcode: shortTextSchema,
        mailAddress: shortTextSchema,
        // mailCountryId: numberIdSchema,
        // mailStateId: numberIdSchema,
        // mailCityId: numberIdSchema,
        // mailPostcode: shortTextSchema,
        homeNo:numberSchema,
        mobileNo:numberSchema,
        housing:shortTextSchema,
        houseLoan:shortTextSchema,
        isExPoliceOrSoldier: booleanSchema,
        isInternalRelationship: booleanSchema,
        employeeNumber: z.string().nullable(),
        employeeName: z.string().nullable(),
        employeePosition: z.string().nullable(),
        relationshipId: z.number().nullable(),
        isReadOnly: z.boolean().readonly().nullable(),
    // })
    // .superRefine(
    //     ({ assetDeclarationStatusId, isInternalRelationship }, ctx) => {
    //         if (assetDeclarationStatusId !== 0) {
    //             ctx.addIssue({
    //                 code: 'custom',
    //                 message: 'Tarikh tidak boleh kosong.',
    //                 path: ['propertyDeclarationDate'],
    //             });
    //         }

    //         if (isInternalRelationship) {
    //             ctx.addIssue({
    //                 code: 'custom',
    //                 message: 'Sila isi medan ini.',
    //                 path: [
    //                     'employeeNumber',
    //                     'employeeName',
    //                     'employeePosition',
    //                     'relationshipId',
    //                 ],
    //             });
    //         }
        },
    );

//==========================================================
//================== Service Schema ===================
//==========================================================

export const _serviceInfoSchema = z.object({
    // candidateId: numberIdSchema,
    gradeId: numberIdSchema,
    // maxGradeId: numberIdSchema,
    positionId: numberIdSchema,
    placementId: numberIdSchema,
    serviceTypeId: numberIdSchema,
    // serviceGroupId: numberIdSchema,
    // unitId: numberIdSchema,
    // programId: numberIdSchema,
    // employmentStatusId: numberIdSchema,
    // effectiveDate: minDateSchema,
    retirementBenefit: codeSchema,
    epfNumber: shortTextSchema,
    socsoNumber: shortTextSchema,
    incomeNumber: shortTextSchema,
    bankName: shortTextSchema,
    bankAccount: shortTextSchema,
    eligibleLeaveCount: numberSchema,
    civilServiceStartDate: dateSchema,
    newRecruitEffectiveDate: dateSchema,
    // serviceDate: dateSchema,
    firstServiceDate: dateSchema,
    firstConfirmServiceDate: dateSchema,
    firstEffectiveDate: dateSchema,
    confirmDate: dateSchema,
    // pensionNumber: shortTextSchema,
    kgt: numberSchema,
    retirementDate: minDateSchema,
    // revisionMonth: codeSchema,
    maximumSalary: numberSchema,
    baseSalary: numberSchema,
    itka: numberSchema,
    itp: numberSchema,
    epw: numberSchema,
    cola: numberSchema,
    isReadOnly: z.boolean().readonly().nullable(),
});

//======================================================
//================== PTB KWAP Schema ===================
//======================================================

export const _PTBInfoSchema = z.object({

    PTBdate:dateSchema,
    refrenceDate:dateSchema,
    referenceNumber:numberSchema,
    pensionNumber:shortTextSchema,
    KWAPEmailDate:dateSchema,

});

//======================================================
//============= Peranan -Peranan Berkaitan ============
//======================================================

//======================================================
//=== Keputusan Daripada Peranan - Peranan Berkaitan ===
//======================================================

export const _resultInfoSchema = z.object({

    passerName:shortTextSchema,
    passerRemark:shortTextSchema,
    supporterName:shortTextSchema,
    supporterRemark:shortTextSchema,
    approverName:shortTextSchema,
    approverRemark: shortTextSchema,

});

//======================================================
//============= Kemaskini Maklumat Temuduga ============
//======================================================

export const _meetingInfoSchema = z.object({

    PTBDate:dateSchema,
    referenceNumber:numberSchema,
    referenceDate:dateSchema,
    pensionNumber:numberSchema,
    KWAPEmailDate:dateSchema,

});

//======================================================
//============= keputusan Penyokong ============
//======================================================

export const _supporterInfoSchema = z.object({

    supporterResult:shortTextSchema,
    supporterRemark:shortTextSchema,
    passerName:shortTextSchema,
   
});


//======================================================
//============= pelulus Penyokong ============
//======================================================

export const _passerInfoSchema = z.object({

    supporterResult:shortTextSchema,
    supporterRemark:shortTextSchema,
    passerName:shortTextSchema,
    passerRemark:shortTextSchema,
   
});