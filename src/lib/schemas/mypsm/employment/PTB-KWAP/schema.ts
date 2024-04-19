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
//================== Personal Schema ===================
//=====================================================

export const _personalInfoSchema = z
    .object({
        employeeNo: shortTextSchema,
        name: shortTextSchema,
        otherName:shortTextSchema,
        identityCard: shortTextSchema,
        identityCardColor: shortTextSchema,
        dateOfBirth: maxDateSchema,
        placeOfBirth: shortTextSchema,
        gender: shortTextSchema,
        nationality: shortTextSchema,
        religion: shortTextSchema,
        race: shortTextSchema,
        status: shortTextSchema,
        homeAddress: shortTextSchema,
        mailAddress: shortTextSchema,
        homeNo: shortTextSchema,
        mobileNo: shortTextSchema,
        housing: shortTextSchema,
        houseLoan: shortTextSchema,
        isExPoliceOrSoldier: booleanSchema,

    },
    );

//==========================================================
//================== Service Schema ===================
//==========================================================

export const _serviceInfoSchema = z.object({

    grade: shortTextSchema,
    position: shortTextSchema,
    placement: shortTextSchema,
    serviceLevel: shortTextSchema,
    retirementType: shortTextSchema,
    EPFNumber: shortTextSchema,
    SOCSONumber: shortTextSchema,
    incomeNumber: shortTextSchema,
    bankName: shortTextSchema,
    bankAccount: shortTextSchema,
    program: shortTextSchema,
    leaveEntitlement: numberSchema,
    hireByGovermentDate: dateSchema,
    hireByLKIMDate: dateSchema,
    currentServiceStartDate: dateSchema,
    firstServiceConfirmedDate: dateSchema,
    currentServiceConfirmedDate: dateSchema,
    currentActing: shortTextSchema,
    lastSalary: numberSchema,
    lastPromotion: shortTextSchema,
    kgt: numberSchema,
    retirementDate: minDateSchema,

});

//======================================================
//================== PTB KWAP Schema ===================
//======================================================

export const _PTBPensionInfoSchema = z.object({
    id: numberSchema,
    employeeId: numberSchema,
    PTBDate: dateSchema,
    referenceNumber: shortTextSchema,
    referenceDate: dateSchema,
    pensionNumber: shortTextSchema,
    KWAPEmailDate: dateSchema,

});

//======================================================
//================== Salary ===================
//======================================================

export const _salaryInfoSchema = z.object({
    effectiveDate: dateSchema,
    baseSalary: numberSchema,
    ITKA: shortTextSchema,
    ITP: numberSchema,
    EPW: numberSchema,
    COLA: shortTextSchema,

});

//======================================================
//========= edit Peranan -Peranan Berkaitan ============
//======================================================

// belum superform/service
export const _rolesRelatedEditSchema = z.object({
    supporterName: shortTextSchema,
    supportedStatus: shortTextSchema,
    supportedRemark: shortTextSchema,
    supportedDate: dateSchema,
    approverName: shortTextSchema,
    approvedStatus: shortTextSchema,
    approvedRemark: shortTextSchema,
    approvedDate: dateSchema,


});


//======================================================
//============= keputusan Penyokong ============
//======================================================

export const _supporterInfoSchema = z.object({

    supporterName: shortTextSchema,
    supportedStatus: shortTextSchema,
    supportedRemark: shortTextSchema,
    supportedDate: dateSchema,
});

//======================================================
//=========  pelulus ============
//======================================================

export const _approveInfoSchema = z.object({

    approverName: shortTextSchema,
    approvedStatus: shortTextSchema,
    approvedRemark: shortTextSchema,
    approvedDate: dateSchema,
});
