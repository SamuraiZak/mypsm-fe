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
import { date, z } from 'zod';

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
    grade: numberIdSchema,
    // maxGradeId: numberIdSchema,
    position: numberIdSchema,
    placement: numberIdSchema,
    serviceLevel: numberIdSchema,
    // serviceGroupId: numberIdSchema,
    // unitId: numberIdSchema,
    // programId: numberIdSchema,
    // employmentStatusId: numberIdSchema,
    // effectiveDate: minDateSchema,
    retirementType: codeSchema,
    EPFNumber: shortTextSchema,
    SOCSONumber: shortTextSchema,
    incomeNumber: shortTextSchema,
    bankName: shortTextSchema,
    bankAccount: shortTextSchema,
    program:shortTextSchema,
    leaveEntitlement: numberSchema,
    hireByGovermentDate: dateSchema,
    hireByLKIMDate: dateSchema,
    // serviceDate: dateSchema,
    currentServiceStartDate:shortTextSchema,
    firstServiceConfirmedDate: dateSchema,
    currentServiceConfirmedDate: dateSchema,
    currentActing: dateSchema,
    confirmDate: dateSchema,
    // pensionNumber: shortTextSchema,
    lastSalary:shortTextSchema,
    lastPromotion:shortTextSchema,
    kgt: numberSchema,
    retirementDate: minDateSchema,
    // revisionMonth: codeSchema,
    // maximumSalary: numberSchema,
    // baseSalary: numberSchema,
    // itka: numberSchema,
    // itp: numberSchema,
    // epw: numberSchema,
    // cola: numberSchema,
    // isReadOnly: z.boolean().readonly().nullable(),
});

//======================================================
//================== PTB KWAP Schema ===================
//======================================================

export const _PTBInfoSchema = z.object({

    applicationDate:dateSchema,
    PTBdate:dateSchema,
    refrenceDate:dateSchema,
    referenceNumber:numberSchema,
    status:shortTextSchema,
    remark:shortTextSchema,
    pensionNumber:shortTextSchema,
    KWAPEmailDate:dateSchema,

});

//======================================================
//========= edit Peranan -Peranan Berkaitan ============
//======================================================

// belum superform/service
export const _rolesRelatedEditSchema = z.object({
    id:numberSchema,
    supportername:shortTextSchema,
    approverName:shortTextSchema,
   
    
});
//======================================================
//=== Keputusan Daripada Peranan - Peranan Berkaitan ===
//======================================================

export const _resultInfoSchema = z.object({

    supporterName:shortTextSchema,
    supportedStatus:shortTextSchema,
    supportedRemark:shortTextSchema,
    supportedDate:dateSchema,
    approverName:shortTextSchema,
    approvedStatus:shortTextSchema,
    approvedRemark:shortTextSchema,
    approvedDate:dateSchema,
    

});

//======================================================
//============= Kemaskini Maklumat Temuduga ============
//======================================================


// edit pension Detail
// belum superform
export const _meetingInfoSchema = z.object({

    id:numberIdSchema,
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

    supporterName:shortTextSchema,
    supportedStatus:shortTextSchema,
    supportedRemark:shortTextSchema,
    supportedDate:dateSchema,
});

//======================================================
//========= Add keputusan Penyokong ============
//======================================================

export const _addSupporterInfoSchema = z.object({

    supportedStatus:shortTextSchema,
    supportedRemark:shortTextSchema,
    supportedDate:dateSchema,
});



//======================================================
//============= pelulus Penyokong ============
//======================================================

export const _passerInfoSchema = z.object({

    approverName:shortTextSchema,
    approvedStatus:shortTextSchema,
    approvedRemark:shortTextSchema,
    approvedDate:dateSchema,
   
});

//======================================================
//========= Add pelulus ============
//======================================================

export const _addapproveInfoSchema = z.object({

    approvedStatus:shortTextSchema,
    approvedRemark:shortTextSchema,
    approvedDate:dateSchema,
});
