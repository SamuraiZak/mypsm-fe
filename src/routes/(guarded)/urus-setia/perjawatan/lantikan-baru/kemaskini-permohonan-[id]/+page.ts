import {
    getErrorToast,
    getLoadingToast,
    getServerErrorToast,
    getSuccessToast,
} from '$lib/services/core/toast/toast-service';
import { EmployeeService } from '$lib/services/implementations/mypsm/employee/employee-services.service';
import type { AddApprovalResultRequestBody } from '$lib/view-models/mypsm/common/add-approval-results-request.model';
import type { NewHireActivity } from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-activity-response.view-model';
import type { CandidateAcademicDetailsResponse } from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-candidate-academic-details-response.model';
import type { CandidateDependenciesDetailResponse } from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-candidate-dependencies-details-response.model';
import type { CandidateExperienceDetailsResponse } from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-candidate-experience-details-respone.model';
import type { CandidateFamilyDetailsResponse } from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-candidate-family-details-response.model';
import type { CandidateNextOfKinDetailsResponse } from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-candidate-next-of-kin-details-response.model';
import type { CandidatePersonalDetailsResponse } from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-candidate-personal-details-respone.model';
import type { NewHireApproverResultResponse } from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-get-approver-result-response.model';
import type {
    NewHireGetApproversResponse,
    SupporterApprovalData,
} from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-get-approvers-response.model.js';
import type { NewHireDocumentsResponse } from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-get-document-response.view-model';
import type { NewHireSupporterResultResponse } from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-get-supporter-result-response.model';
import type { NewHireSecretaryAddUpdateRequestBody } from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-secretary-add-update-request.model';
import type {
    NewHireSecretaryApprovalResponse,
    SecretaryApprovalData,
} from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-secretary-approval-response.model';
import type {
    NewHireSecretaryUpdateResponse,
    SecretaryUpdateData,
} from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-secretary-update-response.model';
import type { NewHireSetApproversRequestBody } from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-set-approvers-request.model';
import type { RequestSuccessBody } from '$lib/view-models/mypsm/request-success.view-model';
import { error, fail } from '@sveltejs/kit';
import toast from 'svelte-french-toast';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

// =========================================================================
// z validation schema and submit function for the calon lantikan baru form fields
// =========================================================================
const shortTextSchema = z
    .string({ required_error: 'Medan ini tidak boleh kosong.' })
    .min(4, {
        message: 'Medan ini hendaklah lebih daripada 4 karakter.',
    })
    .max(124, {
        message: 'Medan ini tidak boleh melebihi 124 karakter.',
    })
    .trim();
const codeSchema = z
    .string({ required_error: 'Medan ini tidak boleh kosong.' })
    .min(1, {
        message: 'Medan ini hendaklah lebih daripada 1 karakter.',
    })
    .max(124, {
        message: 'Medan ini tidak boleh melebihi 124 karakter.',
    })
    .trim();
const longTextSchema = z
    .string({
        required_error: 'Medan ini tidak boleh kosong.',
        invalid_type_error: 'Medan ini tidak boleh kosong.',
    })
    .min(4, {
        message: 'Medan ini hendaklah lebih daripada 4 karakter.',
    })
    .max(124, {
        message: 'Medan ini tidak boleh melebihi 124 karakter.',
    })
    .trim();

const dateSchema = z.coerce.date({
    errorMap: (issue, { defaultError }) => ({
        message:
            issue.code === 'invalid_date'
                ? 'Tarikh tidak boleh dibiar kosong.'
                : defaultError,
    }),
});

const minDateSchema = z.coerce
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

const booleanSchema = z.boolean({
    required_error: 'Sila tetapkan pilihan anda.',
    invalid_type_error: 'Medan ini haruslah jenis boolean.',
});

const numberSchema = z.coerce.number({
    required_error: 'Medan ini hendaklah diisi.',
    invalid_type_error: 'Sila pastikan medan ini ditaip dengan angka',
});

const numberIdSchema = z.coerce.number({
    required_error: 'Tidak tepat.',
    invalid_type_error: 'Sila pastikan ID ditaip dengan angka',
});

export const _serviceInfoSchema = z.object({
    candidateId: numberIdSchema,
    gradeId: numberIdSchema,
    maxGradeId: numberIdSchema,
    positionId: numberIdSchema,
    placementId: numberIdSchema,
    serviceTypeId: numberIdSchema,
    serviceGroupId: numberIdSchema,
    unitId: numberIdSchema,
    employmentStatusId: numberIdSchema,
    effectiveDate: minDateSchema,
    retirementBenefit: codeSchema,
    epfNumber: shortTextSchema,
    socsoNumber: shortTextSchema,
    incomeNumber: shortTextSchema,
    bankName: shortTextSchema,
    bankAccount: shortTextSchema,
    eligibleLeaveCount: numberSchema,
    civilServiceStartDate: dateSchema,
    newRecruitEffectiveDate: dateSchema,
    serviceDate: dateSchema,
    firstServiceDate: dateSchema,
    firstConfirmServiceDate: dateSchema,
    firstEffectiveDate: dateSchema,
    confirmDate: dateSchema,
    pensionNumber: shortTextSchema,
    kgt: numberSchema,
    retirementDate: minDateSchema,
    revisionMonth: codeSchema,
    maximumSalary: numberSchema,
    baseSalary: numberSchema,
    itka: numberSchema,
    itp: numberSchema,
    epw: numberSchema,
    cola: numberSchema,
});

export const _secretaryApprovalInfoSchema = z.object({
    id: numberIdSchema,
    remark: longTextSchema,
    isApproved: booleanSchema.default(true),
});

export const _secretarySetApproversSchema = z.object({
    candidateId: numberIdSchema,
    supporterId: numberIdSchema,
    approverId: numberIdSchema,
});

export async function load({ params }) {
    const candidateIdRequestBody = {
        candidateId: Number(params.id),
    };

    const personalDetailResponse: CandidatePersonalDetailsResponse =
        await EmployeeService.getCurrentCandidatePersonalDetails(
            candidateIdRequestBody,
        );

    const academicInfoResponse: CandidateAcademicDetailsResponse =
        await EmployeeService.getCurrentCandidateAcademic(
            candidateIdRequestBody,
        );

    const experienceInfoResponse: CandidateExperienceDetailsResponse =
        await EmployeeService.getCurrentCandidateExperience(
            candidateIdRequestBody,
        );

    const activityInfoResponse: NewHireActivity =
        await EmployeeService.getCurrentCandidateActivities(
            candidateIdRequestBody,
        );

    const familyInfoResponse: CandidateFamilyDetailsResponse =
        await EmployeeService.getCurrentCandidateFamily(candidateIdRequestBody);

    const dependencyInfoResponse: CandidateDependenciesDetailResponse =
        await EmployeeService.getCurrentCandidateDependencies(
            candidateIdRequestBody,
        );

    const nextOfKinInfoResponse: CandidateNextOfKinDetailsResponse =
        await EmployeeService.getCurrentCandidateNextOfKin(
            candidateIdRequestBody,
        );

    const documentInfoResponse: NewHireDocumentsResponse =
        await EmployeeService.getCurrentCandidateDocuments(
            candidateIdRequestBody,
        );

    const serviceResponse: NewHireSecretaryUpdateResponse =
        await EmployeeService.getCurrentCandidateSecretaryUpdate(
            candidateIdRequestBody,
        );
    const serviceDetails: SecretaryUpdateData = serviceResponse.data;

    const secretaryApprovalResponse: NewHireSecretaryApprovalResponse =
        await EmployeeService.getCurrentCandidateSecretaryApproval(
            candidateIdRequestBody,
        );

    const secretaryApprovalDetails: SecretaryApprovalData =
        secretaryApprovalResponse.data;

    const secretaryGetApproversResponse: NewHireGetApproversResponse =
        await EmployeeService.getCurrentCandidateApprovers(
            candidateIdRequestBody,
        );

    const supporterResultResponse: NewHireSupporterResultResponse =
        await EmployeeService.getCurrentCandidateSupporterApproval(
            candidateIdRequestBody,
        );

    const approverResultResponse: NewHireApproverResultResponse =
        await EmployeeService.getCurrentCandidateApproverApproval(
            candidateIdRequestBody,
        );

    // Superformed the data
    const serviceInfoForm = await superValidate(
        serviceDetails,
        _serviceInfoSchema,
    );

    const secretaryApprovalInfoForm = await superValidate(
        secretaryApprovalDetails,
        _secretaryApprovalInfoSchema,
    );

    const secretarySetApproversForm = await superValidate(
        secretaryGetApproversResponse.data as SupporterApprovalData,
        _secretarySetApproversSchema,
    );

    serviceInfoForm.data.candidateId = candidateIdRequestBody.candidateId;
    secretarySetApproversForm.data.candidateId =
        candidateIdRequestBody.candidateId;

    return {
        supporterResultResponse,
        approverResultResponse,
        personalDetailResponse,
        academicInfoResponse,
        experienceInfoResponse,
        activityInfoResponse,
        familyInfoResponse,
        dependencyInfoResponse,
        nextOfKinInfoResponse,
        serviceResponse,
        serviceInfoForm,
        documentInfoResponse,
        secretaryApprovalResponse,
        secretaryApprovalInfoForm,
        secretaryGetApproversResponse,
        secretarySetApproversForm,
    };
}

export const _submitServiceInfoForm = async (formData: object) => {
    const form = await superValidate(formData, _serviceInfoSchema);

    if (!form.valid) {
        getErrorToast();
        return fail(400, form);
    }

    // start by rendering loading toast
    getLoadingToast();

    const response: RequestSuccessBody =
        await EmployeeService.createCurrentCandidateSecretaryUpdate(
            form.data as NewHireSecretaryAddUpdateRequestBody,
        ).finally(() => toast.dismiss());

    if (response.status > 201) {
        // if error toast
        getServerErrorToast();
        return error(400, { message: response.message });
    }

    // if success toast
    getSuccessToast();

    return { form };
};

export const _submitSecretaryApprovalForm = async (formData: object) => {
    const form = await superValidate(formData, _secretaryApprovalInfoSchema);

    if (!form.valid) {
        getErrorToast();
        return fail(400, form);
    }

    console.log(form.data);
    // start by rendering loading toast
    getLoadingToast();

    const response: RequestSuccessBody =
        await EmployeeService.createCurrentCandidateSecretaryApproval(
            form.data as AddApprovalResultRequestBody,
        ).finally(() => toast.dismiss());

    if (response.status > 201) {
        // if error toast
        getServerErrorToast();
        return error(400, { message: response.message });
    }

    // if success toast
    getSuccessToast();

    return { form };
};

export const _submitSecretarySetApproverForm = async (formData: object) => {
    const form = await superValidate(formData, _secretarySetApproversSchema);
    console.log(form.data);

    if (!form.valid) {
        getErrorToast();
        return fail(400, form);
    }

    // start by rendering loading toast
    getLoadingToast();

    const response: RequestSuccessBody =
        await EmployeeService.createCurrentCandidateApprovers(
            form.data as NewHireSetApproversRequestBody,
        ).finally(() => toast.dismiss());

    if (response.status > 201) {
        // if error toast
        getServerErrorToast();
        return error(400, { message: response.message });
    }

    // if success toast
    getSuccessToast();

    return { form };
};
