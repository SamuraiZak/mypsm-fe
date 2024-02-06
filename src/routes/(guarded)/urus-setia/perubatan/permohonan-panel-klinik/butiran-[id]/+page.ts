import { CommonResponseConstant } from '$lib/constants/core/common-response-constant';
import type { CommonRequestDTO } from '$lib/dto/core/common/common-request.dto.js';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { AddClinicAppRequestDTO } from '$lib/dto/mypsm/medical/application/add-clinic-app-request.dto';
import type { ClinicAppDetailDTO } from '$lib/dto/mypsm/medical/application/clinic-app-detail-response.dto.js';
import { MedicalServices } from '$lib/services/implementations/mypsm/medical/medical.service';
import { loadingState } from '$lib/stores/globalState';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

// =================================================================================
//  Schema
// =================================================================================
export const _addClinicApplicationScheme = z.object({
    district: z.string(),
    name: z.string(),
    address: z.string(),
    email: z.string(),
    contactNumber: z.string(),
    foundationDate: z.coerce.date(),
    clinicType: z.string(),
    ownershipStatus: z.string(),
    registeredMedicalPractitioner: z.string(),
    branchCount: z.number(),
    clinicOfficeDistance: z.number(),
    nearestClinicDistance: z.number(),
    operationHours: z.string(),
});

export const _verificationSchema = z.object({
    id: z.number(),
    remark: z.string(),
    status: z.boolean(),
});

export const _addApproverSupporterSchema = z.object({
    id: z.number(),
    supporterName: z.string(),
    approverName: z.string(),
});

export const _approveSchema = z.object({
    id: z.number(),
    remark: z.string(),
    status: z.boolean(),
});

export const _supportSchema = z.object({
    id: z.number(),
    remark: z.string(),
    status: z.boolean(),
});

export const _clinicDetailsSchema = z.object({
    id: z.number(),
    panelAppointedDate: z.coerce.date(),
    panelContractEndDate: z.coerce.date(),
    bankName: z.string(),
    bankAccount: z.string(),
});

// =================================================================================
//  Page Functions
// =================================================================================

export async function load({ params }) {
    const applicationForm = await superValidate(_addClinicApplicationScheme);
    const verificationForm = await superValidate(_verificationSchema);
    const addApproverSupporterForm = await superValidate(
        _addApproverSupporterSchema,
    );
    const supportForm = await superValidate(_supportSchema);
    const approvalForm = await superValidate(_approveSchema);
    const addDetailForm = await superValidate(_clinicDetailsSchema);

    const request: CommonRequestDTO = {
        id: Number(params.id),
    };

    const response: CommonResponseDTO =
        await MedicalServices.getClinicAppDetail(request);

    const clinicAppDetail: ClinicAppDetailDTO = response.data
        ?.details as ClinicAppDetailDTO;

    if ((response.status = 'success')) {
        applicationForm.data = { ...clinicAppDetail };
    }

    const step: string = 'verification';

    return {
        applicationForm,
        verificationForm,
        addApproverSupporterForm,
        supportForm,
        approvalForm,
        addDetailForm,
        props: {
            step,
            response,
        },
    };
}

export async function _submitForm(formData: AddClinicAppRequestDTO) {
    const form = await superValidate(formData, _addClinicApplicationScheme);

    if (form.valid) {
        loadingState.set(true);

        const response: CommonResponseDTO =
            await MedicalServices.addClinicApplication(formData);

        if (response.status == 'success') {
            loadingState.set(false);
            const result: string | null = 'success';
            return { response, result };
        } else {
            loadingState.set(false);
            const result: string | null = 'fail';
            return { response, result };
        }
    } else {
        const result: string | null = 'error';
        const response = CommonResponseConstant.httpError;
        return { response, result };
    }
}

// verification
export async function _submitVerificationForm(formData: object) {
    const form = await superValidate(formData, _verificationSchema);

    if (form.valid) {
        loadingState.set(true);

        const response: CommonResponseDTO =
            await MedicalServices.verifyClinicApp(formData);

        if (response.status == 'success') {
            loadingState.set(false);
            const result: string | null = 'success';
            return { response, result };
        } else {
            loadingState.set(false);
            const result: string | null = 'fail';
            return { response, result };
        }
    } else {
        const result: string | null = 'error';
        const response = CommonResponseConstant.httpError;
        return { response, result };
    }
}

// add approver and supporter
export async function _submitAddApproverSupporterForm(formData: object) {
    const form = await superValidate(formData, _addApproverSupporterSchema);

    if (form.valid) {
        loadingState.set(true);

        const response: CommonResponseDTO =
            await MedicalServices.verifyClinicApp(formData);

        if (response.status == 'success') {
            loadingState.set(false);
            const result: string | null = 'success';
            return { response, result };
        } else {
            loadingState.set(false);
            const result: string | null = 'fail';
            return { response, result };
        }
    } else {
        const result: string | null = 'error';
        const response = CommonResponseConstant.httpError;
        return { response, result };
    }
}

// approval
export async function _submitApprovalForm(formData: object) {
    const form = await superValidate(formData, _approveSchema);

    if (form.valid) {
        loadingState.set(true);

        const response: CommonResponseDTO =
            await MedicalServices.verifyClinicApp(formData);

        if (response.status == 'success') {
            loadingState.set(false);
            const result: string | null = 'success';
            return { response, result };
        } else {
            loadingState.set(false);
            const result: string | null = 'fail';
            return { response, result };
        }
    } else {
        const result: string | null = 'error';
        const response = CommonResponseConstant.httpError;
        return { response, result };
    }
}

// support
export async function _submitSupportForm(formData: object) {
    const form = await superValidate(formData, _supportSchema);

    if (form.valid) {
        loadingState.set(true);

        const response: CommonResponseDTO =
            await MedicalServices.verifyClinicApp(formData);

        if (response.status == 'success') {
            loadingState.set(false);
            const result: string | null = 'success';
            return { response, result };
        } else {
            loadingState.set(false);
            const result: string | null = 'fail';
            return { response, result };
        }
    } else {
        const result: string | null = 'error';
        const response = CommonResponseConstant.httpError;
        return { response, result };
    }
}

// add Clinic Details
export async function _submitAddClinicDetailForm(formData: object) {
    const form = await superValidate(formData, _clinicDetailsSchema);

    if (form.valid) {
        loadingState.set(true);

        const response: CommonResponseDTO =
            await MedicalServices.verifyClinicApp(formData);

        if (response.status == 'success') {
            loadingState.set(false);
            const result: string | null = 'success';
            return { response, result };
        } else {
            loadingState.set(false);
            const result: string | null = 'fail';
            return { response, result };
        }
    } else {
        const result: string | null = 'error';
        const response = CommonResponseConstant.httpError;
        return { response, result };
    }
}