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

const stringToMinDate = z.string({ required_error: 'Medan ini tidak boleh kosong.', invalid_type_error: 'Medan ini tidak boleh kosong.' }).refine((val) => {
    const convertedStringToDate = new Date(val);
    const currentDate = new Date();
    return convertedStringToDate > currentDate;
}, { message: "Tarikh tidak boleh kurang dari tarikh semasa." })

const stringToMaxDate = z.string({ required_error: 'Medan ini tidak boleh kosong.', invalid_type_error: 'Medan ini tidak boleh kosong.' }).refine((val) => {
    const convertedStringToDate = new Date(val);
    const currentDate = new Date();
    return convertedStringToDate < currentDate;
}, { message: "Tarikh tidak boleh lebih dari tarikh semasa." })



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
        dateOfBirth: shortTextSchema,
        placeOfBirth: shortTextSchema,
        nationality: shortTextSchema,
        race: shortTextSchema,
        religion: shortTextSchema,
        gender: shortTextSchema,
        status: shortTextSchema,
        homeAddress: shortTextSchema,
        mailAddress: shortTextSchema,
        homeNo: shortTextSchema,
        mobileNo: shortTextSchema,
        housing: shortTextSchema,
        houseLoan: shortTextSchema,
        isExPolice: shortTextSchema,

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
    retirementDate: dateSchema,

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
//================== PTB KWAP Schema ===================
//======================================================

export const _PTBPensionInfoSchema = z.object({
    id: numberSchema.optional(),
    employeeId: numberSchema.optional(),
    PTBDate: stringToMinDate,
    referenceNumber: shortTextSchema,
    referenceDate: stringToMinDate,
    pensionNumber: shortTextSchema.optional(),
    KWAPEmailDate: stringToMinDate,

});
//======================================================
//========= edit Peranan -Peranan Berkaitan ============
//======================================================

// put roles related
export const _assignRolesRelatedSchema = z.object({
    
        id: numberSchema,
        supporterName: shortTextSchema,
        approverName:  shortTextSchema,
    
})

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

    id: numberSchema,
    status: booleanSchema,
    remark: shortTextSchema,
    
});

//======================================================
//=========  pelulus ============
//======================================================

export const _approveInfoSchema = z.object({

    id: numberSchema,
    status: booleanSchema,
    remark: shortTextSchema,
});
