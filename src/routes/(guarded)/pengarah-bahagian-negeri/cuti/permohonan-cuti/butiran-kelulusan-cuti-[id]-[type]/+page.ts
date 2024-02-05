import { goto } from '$app/navigation';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { AddLeaveApprovalResultRequestBody } from '$lib/dto/mypsm/leave/add-leave-approvers-results-request.model';
import type { AddHajiLeaveRequest } from '$lib/dto/mypsm/leave/leave-applications/haji-leave/add-haji-leave-request.dto';
import type { AddHalfPayLeaveRequest } from '$lib/dto/mypsm/leave/leave-applications/halfpay-leave/add-halfpay-leave-request.dto';
import type { AddMaternityLeaveRequest } from '$lib/dto/mypsm/leave/leave-applications/maternity-leave/add-maternity-leave-request.dto';
import type { AddOtherLeavesRequest } from '$lib/dto/mypsm/leave/leave-applications/other-leaves/add-other-leaves-request.dto';
import type { AddReplacementLeaveRequest } from '$lib/dto/mypsm/leave/leave-applications/replacement-leave/add-replacement-leave-request.dto';
import type { AddUnrecordLeaveRequest } from '$lib/dto/mypsm/leave/leave-applications/unrecord-leave/add-unrecord-leave-request.dto';
import type { AddWithoutPayLeaveRequest } from '$lib/dto/mypsm/leave/leave-applications/without-pay-leave/add-without-pay-leave-request.dto';
import type { LeaveApprovalResultResponse } from '$lib/dto/mypsm/leave/leave-approvers-results-response.model';
import type { LeaveEmployeeDetailsResponse } from '$lib/dto/mypsm/leave/leave-employee-detail-response.dto';
import type { LeaveIDRequest } from '$lib/dto/mypsm/leave/leave-id-request.dto';
import type { LeaveListResponse } from '$lib/dto/mypsm/leave/leave-list-response.dto';
import type { DropdownOptionsInterface } from '$lib/interfaces/common/dropdown-option';
import {
    getErrorToast,
    getLoadingToast,
    getServerErrorToast,
    getSuccessToast,
} from '$lib/services/core/toast/toast-service';
import { LeaveServices } from '$lib/services/implementations/mypsm/leave/leave.service';
import { fail } from '@sveltejs/kit';
import toast from 'svelte-french-toast';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

// ===================================================
// General Form Schema
// ===================================================
const dateScheme = z.coerce
    .date({
        errorMap: (issue, { defaultError }) => ({
            message:
                issue.code === 'invalid_date'
                    ? 'Tarikh tidak boleh dibiar kosong.'
                    : defaultError,
        }),
    })
    .min(new Date(), {
        message: 'Tarikh lepas tidak boleh kurang dari tarikh semasa.',
    });
const generalSelectSchema = z
    .string()
    .min(1, { message: 'Sila tetapkan pilihan anda. ' });
const generalTextSchema = z
    .string()
    .min(1, { message: 'Medan ini perlu diisi. ' });

const numberIdSchema = z.coerce.number({
    required_error: 'Tidak tepat.',
    invalid_type_error: 'Sila pastikan ID ditaip dengan angka',
});

const booleanSchema = z.boolean({
    required_error: 'Sila tetapkan pilihan anda.',
    invalid_type_error: 'Medan ini haruslah jenis boolean.',
});

export const _hasApplicationReasonSchema = z.object({
    applicationReason: generalSelectSchema,
    startDate: dateScheme,
    endDate: dateScheme,
    totalDay: generalSelectSchema,
});

export const _generalMaternityLeaveSchema = z.object({
    applicationReason: generalSelectSchema,
    expectedBirthDate: generalSelectSchema,
    startDate: dateScheme,
    endDate: dateScheme,
});

export const _generalLeaveSchema = z.object({
    startDate: dateScheme,
    endDate: dateScheme,
});

// ===================================================
// Cuti Gantian (Maklumat Gantian)
// ===================================================

export const _replacementLeaveSchema = z
    .object({
        substituteName: generalTextSchema,
        startDate: dateScheme,
        endDate: dateScheme,
        lastLeaveDate: dateScheme,
        replacementType: generalSelectSchema,
        dutyDescription: generalTextSchema,
        dutyDate: dateScheme,
        dutyLocation: generalTextSchema,
        dutyStartHour: dateScheme,
        dutyEndHour: dateScheme,
        leaveCategory: z.string().optional(),
    })
    .superRefine(({ replacementType }, ctx) => {
        if (replacementType === 'Tugas-tugas Rasmi Yang Jatuh Pada Hari Cuti') {
            return ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Sila isi medan ini.',
                path: ['leaveCategory'],
            });
        }
    });

export const _replacementLeaveSchema1 = z.object({
    substituteName: generalSelectSchema,
    startDate: dateScheme,
    endDate: dateScheme,
    lastLeaveDate: dateScheme,
});

// ===================================================
// Jenis Gantian =====================================
// ===================================================
export const _leaveTypeSchema = z.object({
    officialTask: generalSelectSchema,
    date: dateScheme,
    placement: generalSelectSchema,
    startTime: generalSelectSchema,
    endTime: generalSelectSchema,
    totalTime: generalSelectSchema,
});

export const _officialTaskOnHolidaySchema = z
    .object({
        holidayCategory: generalSelectSchema,
    })
    .merge(_leaveTypeSchema);

// ==================================================
// Cuti Tanpa Rekod =================================
// ==================================================
export const _untrackedLeaveSchema = z.object({
    untrackedLeaveType: generalTextSchema,
    reason: generalTextSchema,
    startDate: dateScheme,
    endDate: dateScheme,
});

// ==================================================
// Cuti Separuh Gaji & Cuti Tanpa Gaji ==============
// ==================================================
export const _halfPayLeaveSchema = z.object({
    reason: generalTextSchema,
    startDate: dateScheme,
    endDate: dateScheme,
});

export const _withoutPayLeaveSchema = z.object({
    reason: generalTextSchema,
    startDate: dateScheme,
    endDate: dateScheme,
});

// ==================================================
// Cuti Bersalin Awal ===============================
// ==================================================
export const _commonLeavePropsSchema = z.object({
    leaveType: generalTextSchema,
    startDate: dateScheme,
    endDate: dateScheme,
});
export const _spouseMaternityLeaveSchema = _commonLeavePropsSchema;

export const _earlyMaternityLeaveSchema = z
    .object({
        reason: generalTextSchema,
        expectedDeliveryDate: dateScheme,
    })
    .merge(_spouseMaternityLeaveSchema);

export const _staffMaternityLeaveSchema = z
    .object({
        currentAddress: generalTextSchema,
    })
    .merge(_earlyMaternityLeaveSchema);

// ==================================================
//  Haji Leave Form ==============================
// ==================================================
export const _hajiLeaveSchema = z.object({
    startDate: dateScheme,
    endDate: dateScheme,
});

// ==================================================
//  Other Leaves Form ==============================
// ==================================================

export const _otherLeavesSchema = z
    .object({
        reason: z.optional(generalTextSchema),
        academicQualification: z.optional(generalTextSchema),
        professionalQualification: z.optional(generalTextSchema),
        courseTaken: z.optional(generalTextSchema),
        institution: z.optional(generalTextSchema),
    })
    .merge(_commonLeavePropsSchema);

export const _otherLeavesSecondarySchema = _otherLeavesSchema.required({
    reason: true,
});

export const _otherLeavesTertiarySchema = _otherLeavesSchema.required({
    academicQualification: true,
    professionalQualification: true,
    courseTaken: true,
    institution: true,
});

export const _setApprovalSchema = z.object({
    id: numberIdSchema,
    remark: generalTextSchema.default(' '),
    isApproved: booleanSchema,
});

// =============================================
// load function
// =============================================
export const load = async ({ params }) => {
    console.log(params.id);
    const leaveIdRequest: LeaveIDRequest = {
        id: Number(params.id),
    };

    const selectedLeaveType: string = String(params.type);

    let currenLeaveDetailResponse: CommonResponseDTO;

    if (selectedLeaveType === 'Gantian')
        currenLeaveDetailResponse =
            await LeaveServices.getReplacementLeaveDetail(leaveIdRequest);
    else if (selectedLeaveType === 'Tanpa Rekod')
        currenLeaveDetailResponse =
            await LeaveServices.getUnrecordLeaveDetail(leaveIdRequest);
    else if (selectedLeaveType === 'Separuh Gaji')
        currenLeaveDetailResponse =
            await LeaveServices.getHalfPayLeaveDetail(leaveIdRequest);
    else if (selectedLeaveType === 'Tanpa Gaji')
        currenLeaveDetailResponse =
            await LeaveServices.getWithoutPayLeaveDetail(leaveIdRequest);
    else if (
        selectedLeaveType === 'Cuti Bersalin Awal' ||
        selectedLeaveType === 'Cuti Bersalin Pegawai' ||
        selectedLeaveType === 'Cuti Isteri Bersalin'
    )
        currenLeaveDetailResponse =
            await LeaveServices.getMaternityLeaveDetail(leaveIdRequest);
    else if (selectedLeaveType === 'Haji')
        currenLeaveDetailResponse =
            await LeaveServices.getHajiLeaveDetail(leaveIdRequest);
    else if (
        selectedLeaveType === 'Cuti Kuarantin' ||
        selectedLeaveType === 'Cuti Menjaga Anak Tanpa Gaji' ||
        selectedLeaveType === 'Cuti Kursus Sambilan' ||
        selectedLeaveType === 'Cuti Perakuan Tidak Hadir Ke Pejabat' ||
        selectedLeaveType === 'Cuti Sakit Lanjutan' ||
        selectedLeaveType === 'Cuti Tanpa Gaji Mengikut Pasangan' ||
        selectedLeaveType === 'Cuti Penyakit Barah Dan Kusta' ||
        selectedLeaveType === 'Cuti Penyakit Tibi'
    )
        currenLeaveDetailResponse =
            await LeaveServices.getOtherLeavesDetail(leaveIdRequest);

    // fetch functions
    const employeeResponse: CommonResponseDTO =
        await LeaveServices.getLeaveEmployeeDetail();

    const employeeDetails: LeaveEmployeeDetailsResponse = employeeResponse.data
        ?.details as LeaveEmployeeDetailsResponse;

    const leaveListResponse: CommonResponseDTO =
        await LeaveServices.getLeaveList();

    const leaveList: DropdownOptionsInterface[] = (
        leaveListResponse.data?.details as LeaveListResponse
    ).leaveTypes?.map((val) => ({ value: val, name: val }));

    const untrackedLeaveListResponse: CommonResponseDTO =
        await LeaveServices.getUnrecordLeaveList();

    const untrackedLeaveList: DropdownOptionsInterface[] = (
        untrackedLeaveListResponse.data?.details as LeaveListResponse
    ).leaveTypes?.map((val) => ({ value: val, name: val }));

    const stateDirectorResultResponse: CommonResponseDTO =
        await LeaveServices.getReplacementLeaveDirectorSupporterDetail(
            leaveIdRequest,
        );

    const stateDirectorResult: LeaveApprovalResultResponse =
        stateDirectorResultResponse.data
            ?.details as LeaveApprovalResultResponse;

    const verifierResponse: CommonResponseDTO =
        await LeaveServices.getReplacementLeaveVerifierDetail(leaveIdRequest);

    const verifierResult: LeaveApprovalResultResponse = verifierResponse.data
        ?.details as LeaveApprovalResultResponse;

    const supporterResponse: CommonResponseDTO =
        await LeaveServices.getReplacementLeaveSupporterDetail(leaveIdRequest);

    const supporterResult: LeaveApprovalResultResponse = supporterResponse.data
        ?.details as LeaveApprovalResultResponse;

    const apppproverResultResponse: CommonResponseDTO =
        await LeaveServices.getReplacementLeaveApproverDetail(leaveIdRequest);

    const appproverResult: LeaveApprovalResultResponse =
        apppproverResultResponse.data?.details as LeaveApprovalResultResponse;

    // superValidate sections
    const replacementLeaveForm = await superValidate(_replacementLeaveSchema);

    const untrackedLeaveForm = await superValidate(_untrackedLeaveSchema);

    const halfPayLeaveForm = await superValidate(_halfPayLeaveSchema);

    const withoutPayLeaveForm = await superValidate(_withoutPayLeaveSchema);

    const earlyMaternityLeaveForm = await superValidate(
        _earlyMaternityLeaveSchema,
    );

    const staffMaternityLeaveForm = await superValidate(
        _staffMaternityLeaveSchema,
    );
    const spouseMaternityLeaveForm = await superValidate(
        _spouseMaternityLeaveSchema,
    );
    const hajiLeaveForm = await superValidate(_hajiLeaveSchema);

    const otherLeavesForm = await superValidate(_otherLeavesSchema);

    const verifierSetResultForm = await superValidate(
        verifierResult,
        _setApprovalSchema,
    );

    return {
        selectedLeaveType,
        currenLeaveDetailResponse,
        employeeDetails,
        leaveList,
        untrackedLeaveList,
        replacementLeaveForm,
        untrackedLeaveForm,
        halfPayLeaveForm,
        withoutPayLeaveForm,
        earlyMaternityLeaveForm,
        staffMaternityLeaveForm,
        spouseMaternityLeaveForm,
        hajiLeaveForm,
        otherLeavesForm,
        stateDirectorResult,
        verifierResult,
        supporterResult,
        appproverResult,
        verifierSetResultForm,
    };
};

export const _submitApprovalResult = async (formData: object) => {
    const form = await superValidate(formData, _setApprovalSchema);
    console.log(form);

    if (!form.valid) {
        getErrorToast();
        return fail(400, form);
    }

    const requestBody: AddLeaveApprovalResultRequestBody = {
        id: form.data.id,
        remark: form.data.remark,
        status: form.data.isApproved,
    };

    // start by rendering loading toast
    getLoadingToast();

    const response: CommonResponseDTO =
        await LeaveServices.createOtherLeavesApproversResults(
            requestBody,
        ).finally(() => toast.dismiss());
    console.log(response);

    if (response.status !== 'success') {
        // if error toast
        getServerErrorToast();
        // return error(400, { message: response.message });
    }
    // // if success toast
    getSuccessToast().finally(() =>
        setTimeout(() => {
            goto('../cuti/laporan-cuti');
        }, 2000),
    );

    return { form };
};

export const _submitReplacementLeaveForm = async (formData: object) => {
    const form = await superValidate(formData, _replacementLeaveSchema);
    console.log(form);

    if (!form.valid) {
        getErrorToast();
        return fail(400, form);
    }

    // start by rendering loading toast
    getLoadingToast();

    const response: CommonResponseDTO =
        await LeaveServices.createReplacementLeave(
            form.data as AddReplacementLeaveRequest,
        ).finally(() => toast.dismiss());
    console.log(response);

    if (response.status !== 'success') {
        // if error toast
        getServerErrorToast();
        // return error(400, { message: response.message });
    }
    // // if success toast
    getSuccessToast().finally(() =>
        setTimeout(() => {
            goto('../cuti/laporan-cuti');
        }, 2000),
    );

    return { form };
};

export const _submitHalfSalaryLeaveForm = async (formData: object) => {
    const form = await superValidate(formData, _halfPayLeaveSchema);
    console.log(form);

    if (!form.valid) {
        getErrorToast();
        return fail(400, form);
    }

    // start by rendering loading toast
    getLoadingToast();

    const response: CommonResponseDTO = await LeaveServices.createHalfPayLeave(
        form.data as AddHalfPayLeaveRequest,
    ).finally(() => toast.dismiss());
    console.log(response);

    if (response.status !== 'success') {
        // if error toast
        getServerErrorToast();
        // return error(400, { message: response.message });
    }
    // // if success toast
    getSuccessToast().finally(() =>
        setTimeout(() => {
            goto('../cuti/laporan-cuti');
        }, 2000),
    );

    return { form };
};

export const _submitWithoutPayLeaveForm = async (formData: object) => {
    const form = await superValidate(formData, _withoutPayLeaveSchema);
    console.log(form);

    if (!form.valid) {
        getErrorToast();
        return fail(400, form);
    }

    // start by rendering loading toast
    getLoadingToast();

    const response: CommonResponseDTO =
        await LeaveServices.createWithoutPayLeave(
            form.data as AddWithoutPayLeaveRequest,
        ).finally(() => toast.dismiss());
    console.log(response);

    if (response.status !== 'success') {
        // if error toast
        getServerErrorToast();
        // return error(400, { message: response.message });
    }
    // if success toast
    getSuccessToast().finally(() =>
        setTimeout(() => {
            goto('../cuti/laporan-cuti');
        }, 2000),
    );

    return { form };
};

export const _submitEarlyMaternityLeaveForm = async (formData: object) => {
    const form = await superValidate(formData, _earlyMaternityLeaveSchema);
    console.log(form);

    if (!form.valid) {
        getErrorToast();
        return fail(400, form);
    }

    // start by rendering loading toast
    getLoadingToast();

    const response: CommonResponseDTO =
        await LeaveServices.createMaternityLeave(
            form.data as AddMaternityLeaveRequest,
        ).finally(() => toast.dismiss());
    console.log(response);

    if (response.status !== 'success') {
        // if error toast
        getServerErrorToast();
        // return error(400, { message: response.message });
    }
    // if success toast
    getSuccessToast().finally(() =>
        setTimeout(() => {
            goto('../cuti/laporan-cuti');
        }, 2000),
    );

    return { form };
};

export const _submitStaffMaternityLeaveForm = async (formData: object) => {
    const form = await superValidate(formData, _staffMaternityLeaveSchema);
    console.log(form);

    if (!form.valid) {
        getErrorToast();
        return fail(400, form);
    }

    // start by rendering loading toast
    getLoadingToast();

    const response: CommonResponseDTO =
        await LeaveServices.createMaternityLeave(
            form.data as AddMaternityLeaveRequest,
        ).finally(() => toast.dismiss());
    console.log(response);

    if (response.status !== 'success') {
        // if error toast
        getServerErrorToast();
        // return error(400, { message: response.message });
    }
    // if success toast
    getSuccessToast().finally(() =>
        setTimeout(() => {
            goto('../cuti/laporan-cuti');
        }, 2000),
    );

    return { form };
};

export const _submitSpouseMaternityLeaveForm = async (formData: object) => {
    const form = await superValidate(formData, _spouseMaternityLeaveSchema);
    console.log(form);

    if (!form.valid) {
        getErrorToast();
        return fail(400, form);
    }

    // start by rendering loading toast
    getLoadingToast();

    const response: CommonResponseDTO =
        await LeaveServices.createMaternityLeave(
            form.data as AddMaternityLeaveRequest,
        ).finally(() => toast.dismiss());
    console.log(response);

    if (response.status !== 'success') {
        // if error toast
        getServerErrorToast();
        // return error(400, { message: response.message });
    }
    // if success toast
    getSuccessToast().finally(() =>
        setTimeout(() => {
            goto('../cuti/laporan-cuti');
        }, 2000),
    );

    return { form };
};

export const _submitHajiLeaveForm = async (formData: object) => {
    const form = await superValidate(formData, _hajiLeaveSchema);
    console.log(form);

    if (!form.valid) {
        getErrorToast();
        return fail(400, form);
    }

    // start by rendering loading toast
    getLoadingToast();

    const response: CommonResponseDTO = await LeaveServices.createHajiLeave(
        form.data as AddHajiLeaveRequest,
    ).finally(() => toast.dismiss());
    console.log(response);

    if (response.status !== 'success') {
        // if error toast
        getServerErrorToast();
        // return error(400, { message: response.message });
    }
    // if success toast
    getSuccessToast().finally(() =>
        setTimeout(() => {
            goto('../cuti/laporan-cuti');
        }, 2000),
    );

    return { form };
};

export const _submitOtherLeaveForm = async (formData: object) => {
    const form = await superValidate(formData, _commonLeavePropsSchema);
    console.log(form);

    if (!form.valid) {
        getErrorToast();
        return fail(400, form);
    }

    // start by rendering loading toast
    getLoadingToast();

    const response: CommonResponseDTO = await LeaveServices.createOtherLeaves(
        form.data as AddOtherLeavesRequest,
    ).finally(() => toast.dismiss());
    console.log(response);

    if (response.status !== 'success') {
        // if error toast
        getServerErrorToast();
        // return error(400, { message: response.message });
    }
    // if success toast
    getSuccessToast().finally(() =>
        setTimeout(() => {
            goto('../cuti/laporan-cuti');
        }, 2000),
    );

    return { form };
};

export const _submitOtherLeaveSecondaryForm = async (formData: object) => {
    const form = await superValidate(formData, _otherLeavesSecondarySchema);
    console.log(form);

    if (!form.valid) {
        getErrorToast();
        return fail(400, form);
    }

    // start by rendering loading toast
    getLoadingToast();

    const response: CommonResponseDTO = await LeaveServices.createOtherLeaves(
        form.data as AddOtherLeavesRequest,
    ).finally(() => toast.dismiss());
    console.log(response);

    if (response.status !== 'success') {
        // if error toast
        getServerErrorToast();
        // return error(400, { message: response.message });
    }
    // if success toast
    getSuccessToast().finally(() =>
        setTimeout(() => {
            goto('../cuti/laporan-cuti');
        }, 2000),
    );

    return { form };
};

export const _submitOtherLeaveTertiaryForm = async (formData: object) => {
    const form = await superValidate(formData, _otherLeavesTertiarySchema);
    console.log(form);

    if (!form.valid) {
        getErrorToast();
        return fail(400, form);
    }

    // start by rendering loading toast
    getLoadingToast();

    const response: CommonResponseDTO = await LeaveServices.createOtherLeaves(
        form.data as AddOtherLeavesRequest,
    ).finally(() => toast.dismiss());
    console.log(response);

    if (response.status !== 'success') {
        // if error toast
        getServerErrorToast();
        // return error(400, { message: response.message });
    }
    // if success toast
    getSuccessToast().finally(() =>
        setTimeout(() => {
            goto('../cuti/laporan-cuti');
        }, 2000),
    );

    return { form };
};

export const _submitLeaveWithoutRecordForm = async (formData: object) => {
    const form = await superValidate(formData, _untrackedLeaveSchema);
    console.log(form);

    if (!form.valid) {
        getErrorToast();
        return fail(400, form);
    }

    // start by rendering loading toast
    getLoadingToast();

    const response: CommonResponseDTO = await LeaveServices.createUnrecordLeave(
        form.data as AddUnrecordLeaveRequest,
    ).finally(() => toast.dismiss());
    console.log(response);

    if (response.status !== 'success') {
        // if error toast
        getServerErrorToast();
        // return error(400, { message: response.message });
    }
    // // if success toast
    getSuccessToast().finally(() =>
        setTimeout(() => {
            goto('../cuti/laporan-cuti');
        }, 2000),
    );

    return { form };
};
