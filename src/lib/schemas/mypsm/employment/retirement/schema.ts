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
//================== Voluntary ========================
//=====================================================

//======================================================
//========== Voluntary Certification ===================
//======================================================

export const _retirementVoluntaryCertificationInfoSchema = z.object({
    voluntaryId: numberSchema,
    status: booleanSchema,
    remark: shortTextSchema,

});

//======================================================
//========== Voluntary Confirmation ===================
//======================================================

export const _retirementVoluntaryConfirmationInfoSchema = z.object({
    voluntaryId: numberSchema,
    status: booleanSchema,
    remark: shortTextSchema,

});


//======================================================
//========== Voluntary First Supporter ================
//======================================================

export const _retirementVoluntaryFirstSupporterInfoSchema = z.object({
    voluntaryId: numberSchema,
    status: booleanSchema,
    remark: shortTextSchema,
    isReadOnly: booleanSchema,

});

//======================================================
//========== Voluntary Second Supporter ================
//======================================================

export const _retirementVoluntarySecondSupporterInfoSchema = z.object({
    voluntaryId: numberSchema,
    status: booleanSchema,
    remark: shortTextSchema,
    isReadOnly: booleanSchema,

});

//======================================================
//========== Voluntary Appointed Approval ==============
//======================================================

export const _retirementVoluntaryAppointedApprovalInfoSchema = z.object({
    voluntaryId: numberSchema,
    status: booleanSchema,
    remark: shortTextSchema,
    isReadOnly: booleanSchema,

});

//======================================================
//========== Voluntary Secretary Approval ==============
//======================================================

export const _retirementVoluntarySecretaryApprovalInfoSchema = z.object({
    voluntaryId: numberSchema,
    status: booleanSchema,
    remark: shortTextSchema,
    isReadOnly: booleanSchema,

});

//======================================================
//========== Voluntary Document Certification ==============
//======================================================

export const _retirementVoluntaryDocumentCertificationlInfoSchema = z.object({
    voluntaryId: numberSchema,
    status: booleanSchema,
    remark: shortTextSchema,
    isReadOnly: booleanSchema,

});

//======================================================
//========== Voluntary Letter Certification ==============
//======================================================

export const _retirementVoluntaryLetterCertificationlInfoSchema = z.object({
    voluntaryId: numberSchema,
    status: booleanSchema,
    remark: shortTextSchema,
    isReadOnly: booleanSchema,

});

//=====================================================
//================== Voluntary ========================
//=====================================================

//======================================================
//========== Voluntary Statuts =========================
//======================================================

export const _retirementVoluntaryStatusInfoSchema = z.object({
    voluntaryId: numberSchema,
    status: booleanSchema,
    remark: shortTextSchema,

});

//======================================================
//========== Voluntary Support Approver ================
//======================================================

export const _retirementVoluntarySupportApproverInfoSchema = z.object({
    voluntaryId: numberSchema,
    supporter1: shortTextSchema,
    supporter2: shortTextSchema,
    approver: shortTextSchema,
    isReadOnly: booleanSchema,

});


//=====================================================
//================== Forced ===========================
//=====================================================

//======================================================
//========== Forced Statuts =========================
//======================================================

export const _retirementForceStatusInfoSchema = z.object({
    voluntaryId: numberSchema,
    status: booleanSchema,
    remark: shortTextSchema,

});

//=====================================================
//================== Unspecify ========================
//=====================================================

//======================================================
//========== Unspecify Statuts =========================
//======================================================

export const _retirementUnspecifyStatusInfoSchema = z.object({
    id: numberSchema,
    status: booleanSchema,
    remark: shortTextSchema,

});

