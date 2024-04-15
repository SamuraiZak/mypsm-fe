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

///=====================================================
//================= Personal Detail ===================
//=====================================================

export const _personalDetail = z.object({
    name: shortTextSchema,
    identityDocumentNumber:numberSchema,
    birthDate:dateSchema ,
    age:numberSchema ,
    positionId:numberIdSchema ,
    serviceGroupId: numberIdSchema ,
    gradeId:numberIdSchema ,
    schemeId: numberIdSchema ,
    serviceDate:dateSchema,
    confirmServiceDate:dateSchema ,
    baseSalary:shortTextSchema,
    allowance:shortTextSchema ,
})

///=====================================================
//=================Loan Detail ========================
//=====================================================

export const _loanDetail = z.object({
    id: numberIdSchema,
    maxLoan:numberSchema,
    requestedLoan:numberSchema ,
    paymentPeriod:numberSchema ,
    reason:shortTextSchema ,
   
})

// export const _loanDetailResponseSchema =_loanDetail.omit ({
//     id : true,
// });

// export const _loanDetailRequestSchema =_loanDetail.omit ({
//     id: true,
// });



///=====================================================
//================Vehicle Detail ========================
//=====================================================

export const _vehicleDetail = z.object({
    id: numberIdSchema,
    condition:shortTextSchema,
    vehicleType:shortTextSchema ,
    brandModel:shortTextSchema ,
    engineNumber:shortTextSchema ,
    registrationNumber:shortTextSchema ,
    registrationDate:shortTextSchema ,
    nettPrice:shortTextSchema ,
})

///=====================================================
//================ Offer Loan ==========================
//=====================================================

export const _offerLoan = z.object({
    id: numberIdSchema,
    loanType:shortTextSchema,
    purchasePrice:shortTextSchema ,
    deposit:shortTextSchema ,
    govProfit:shortTextSchema ,
    govFund:shortTextSchema ,
    sellingPrice:shortTextSchema ,
    installment:shortTextSchema ,
    startLoanDate:dateSchema ,
    paymentPeriod:shortTextSchema ,
})

///=====================================================
//================ Supplier   ==========================
//=====================================================

export const _supplier = z.object({
    id: numberIdSchema,
    name:shortTextSchema,
    address:shortTextSchema ,
   
})


///=====================================================
//================ Jadual Pertama (Kenderaan)  ========
//=====================================================

export const _carFirstSchedule = z.object({
    id: numberIdSchema,
    engineNumber:shortTextSchema,
    chassisNumber:shortTextSchema ,
    countryOrigin:shortTextSchema,
    brandModel:shortTextSchema ,
    engineHP:shortTextSchema,
    fuelType:shortTextSchema ,
    class:shortTextSchema,
    bodyType:shortTextSchema ,
    makeYear:numberSchema,
    previousOwner:shortTextSchema ,
    previousOwnerIC:shortTextSchema,
    address:shortTextSchema ,
   
})

///=====================================================
//================ first Schedule ======================
//=====================================================

export const _firstSchedule = z.object({
    id: numberIdSchema,
    purchasePrice:numberSchema,
    balancePayment:numberSchema ,
    govFund:numberSchema ,
   
})

///=====================================================
//================ second Schedule ======================
//=====================================================

export const _secondSchedule = z.object({
    id: numberIdSchema,
    sellingPrice:numberSchema,
    sellingBalance:numberSchema ,
    govFund:numberSchema ,
    installment:numberSchema ,
    paymentPeriod:numberSchema ,
   
})


// ======================================================================================//


///=====================================================
//================ Supporter approval ======================
//=====================================================

export const _supportApproval = z.object({
    id: numberIdSchema,
    status:shortTextSchema,
    remark:shortTextSchema ,
})

///=====================================================
//================ Approver ======================
//=====================================================

export const _approver = z.object({
    id: numberIdSchema,
    approverId:numberIdSchema,
   
})

///=====================================================
//================ Approver approval ======================
//=====================================================

export const _approverApproval = z.object({
    id: numberIdSchema,
    status:shortTextSchema,
    remark:shortTextSchema ,
})






