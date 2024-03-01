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
        id:shortTextSchema,
        name: shortTextSchema,
        alternativeName: z.string(),
        identityDocumentNumber: shortTextSchema,
        identityDocumentColor: codeSchema,
        email: shortTextSchema.email({ message: 'Emel tidak lengkap.' }),
        assetDeclarationStatusId: numberIdSchema,
        propertyDeclarationDate: z.date().nullable(),
        birthDate: maxDateSchema,
        birthStateId: numberIdSchema,
        // birthCountryId: numberIdSchema,
        genderId: numberIdSchema,
        nationalityId: numberIdSchema,
        religionId: numberIdSchema,
        raceId: numberIdSchema,
        titleId: numberIdSchema,
        ethnicId: numberIdSchema,
        maritalId: numberIdSchema,
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

//==========================================================
//================== PTB KWAP Schema ===================
//==========================================================

export const _PTBInfoSchema = z.object({

    PTBdate:dateSchema,
    refrenceDate:dateSchema,
    referenceNumber:numberSchema,
    pensionNumber:shortTextSchema,
    KWAPEmailDate:dateSchema,

});