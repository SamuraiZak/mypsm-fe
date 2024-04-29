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

///=====================================================
//================= Personal Detail ===================
//=====================================================

export const _personalDetail = z.object({
    name: shortTextSchema,
    identityDocumentNumber: shortTextSchema,
    birthDate: dateSchema,
    age: numberSchema,
    positionId: numberIdSchema,
    serviceGroupId: numberIdSchema,
    gradeId: numberIdSchema,
    schemeId: numberIdSchema,
    serviceDate: dateSchema,
    confirmServiceDate: dateSchema,
    baseSalary: numberSchema,
    allowance: numberSchema,
})

///=====================================================
//=================Loan Detail ========================
//=====================================================

export const _loanDetail = z.object({
    id: z.number(),
    maxLoan: z.number(),
    requestedLoan: z.number(),
    paymentPeriod: z.number(),
    reason: z.string(),

})


///=====================================================
//================Vehicle Detail ========================
//=====================================================

export const _vehicleDetail = z.object({
    id: numberIdSchema,
    condition: shortTextSchema,
    vehicleType: shortTextSchema,
    brandModel: shortTextSchema,
    engineNumber: shortTextSchema,
    registrationNumber: shortTextSchema,
    registrationDate: stringToMinDate,
    nettPrice: numberSchema,
})

///=====================================================
//================ Offer Loan ==========================
//=====================================================

export const _offerLoan = z.object({
    id: numberIdSchema,
    loanType: shortTextSchema,
    purchasePrice: numberSchema,
    deposit: numberSchema,
    govProfit: numberSchema,
    govFund: numberSchema,
    sellingPrice: numberSchema,
    installment: numberSchema,
    startLoanDate: stringToMinDate,
    paymentPeriod: numberSchema,
})

///=====================================================
//================ Supplier   ==========================
//=====================================================
const singleSupplier = z.object({
    name: shortTextSchema,
    address: shortTextSchema,
})
export const _supplier = z.object({
    id: numberIdSchema,
    suppliers: singleSupplier.array()

})


///=====================================================
//================ Jadual Pertama (Kenderaan)  ========
//=====================================================

export const _vehicleFirstSchedule = z.object({
    id: numberIdSchema,
    engineNumber: shortTextSchema,
    chassisNumber: shortTextSchema,
    countryOrigin: shortTextSchema,
    brandModel: shortTextSchema,
    engineHP: shortTextSchema,
    fuelType: shortTextSchema,
    class: shortTextSchema,
    bodyType: shortTextSchema,
    makeYear: numberSchema,
    previousOwner: shortTextSchema,
    previousOwnerIC: shortTextSchema,
    address: shortTextSchema,

})

//=====================================================
//================ first Schedule =====================
//=====================================================

export const _firstSchedule = z.object({
    id: numberIdSchema,
    purchasePrice: numberSchema,
    balancePayment: numberSchema,
    govFund: numberSchema,

})

///=====================================================
//================ second Schedule ======================
//=====================================================

export const _secondSchedule = z.object({
    id: numberIdSchema,
    sellingPrice: numberSchema,
    sellingBalance: numberSchema,
    govFund: numberSchema,
    installment: numberSchema,
    paymentPeriod: numberSchema,

})

///=====================================================
//================ eligibility ======================
//=====================================================

export const _eligibility = z.object({
    id: numberSchema,
    baseSalary:numberSchema,
    salaryCut: numberSchema,
    balance: numberSchema,
    salaryAndAllowance:numberSchema,
    newSalaryCut:numberSchema,
    newBalance: numberSchema,

})

///=====================================================
//================Document Check =======================
//=====================================================

export const _documentCheck = z.object({
    id:numberSchema,
    agreementReceived: booleanSchema,
    agreementChecked:  booleanSchema,

})


// ======================================================================================//


///=====================================================
//================ Supporter approval =================
//=====================================================

export const _supportApproval = z.object({
    id: numberIdSchema,
    status: booleanSchema,
    remark: shortTextSchema,
})

///=====================================================
//================ Approver ======================
//=====================================================

export const _approver = z.object({
    id: numberIdSchema,
    approverId: numberIdSchema,

})

///=====================================================
//================ Approver approval =================
//=====================================================

export const _approverApproval = z.object({
    id: numberIdSchema,
    status: booleanSchema,
    remark: shortTextSchema,
})






