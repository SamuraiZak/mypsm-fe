import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { SupporterApprovalData } from '$lib/dto/mypsm/employment/new-hire/new-hire-get-approvers-response.dto';
import type { NewHireSecretaryAddUpdateRequestBody } from '$lib/dto/mypsm/employment/new-hire/new-hire-secretary-add-update-request.dto';
import type { SecretaryApprovalData } from '$lib/dto/mypsm/employment/new-hire/new-hire-secretary-approval-response.dto';
import type { SecretaryUpdateData } from '$lib/dto/mypsm/employment/new-hire/new-hire-secretary-update-response.dto';
import type { NewHireSetApproversRequestBody } from '$lib/dto/mypsm/employment/new-hire/new-hire-set-approvers-request.dto';
import { getErrorToast } from '$lib/helpers/core/toast.helper';
import type { AddApprovalResultRequestBody } from '$lib/services/implementation/mypsm/common/add-approval-results-request.dto';
import { EmploymentServices } from '$lib/services/implementation/mypsm/perjawatan/employment.service';
import { error } from '@sveltejs/kit';
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

    const personalDetailResponse: CommonResponseDTO =
        await EmploymentServices.getCurrentCandidatePersonalDetails(
            candidateIdRequestBody,
        );

    const academicInfoResponse: CommonResponseDTO =
        await EmploymentServices.getCurrentCandidateAcademic(
            candidateIdRequestBody,
        );

    const experienceInfoResponse: CommonResponseDTO =
        await EmploymentServices.getCurrentCandidateExperience(
            candidateIdRequestBody,
        );

    const activityInfoResponse: CommonResponseDTO =
        await EmploymentServices.getCurrentCandidateActivities(
            candidateIdRequestBody,
        );

    const familyInfoResponse: CommonResponseDTO =
        await EmploymentServices.getCurrentCandidateFamily(candidateIdRequestBody);

    const dependencyInfoResponse: CommonResponseDTO =
        await EmploymentServices.getCurrentCandidateDependencies(
            candidateIdRequestBody,
        );

    const nextOfKinInfoResponse: CommonResponseDTO =
        await EmploymentServices.getCurrentCandidateNextOfKin(
            candidateIdRequestBody,
        );

    const documentInfoResponse: CommonResponseDTO =
        await EmploymentServices.getCurrentCandidateDocuments(
            candidateIdRequestBody,
        );

    const serviceResponse: CommonResponseDTO =
        await EmploymentServices.getCurrentCandidateSecretaryUpdate(
            candidateIdRequestBody,
        );
    const serviceDetails: SecretaryUpdateData = serviceResponse.data?.details as SecretaryUpdateData;

    const secretaryApprovalResponse: CommonResponseDTO =
        await EmploymentServices.getCurrentCandidateSecretaryApproval(
            candidateIdRequestBody,
        );

    const secretaryApprovalDetails: SecretaryApprovalData =
        secretaryApprovalResponse.data?.details as SecretaryApprovalData;

    const secretaryGetApproversResponse: CommonResponseDTO =
        await EmploymentServices.getCurrentCandidateApprovers(
            candidateIdRequestBody,
        );

    const supporterResultResponse: CommonResponseDTO =
        await EmploymentServices.getCurrentCandidateSupporterApproval(
            candidateIdRequestBody,
        );

    const approverResultResponse: CommonResponseDTO =
        await EmploymentServices.getCurrentCandidateApproverApproval(
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
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =  await EmploymentServices.createCurrentCandidateSecretaryUpdate(
        form.data as NewHireSecretaryAddUpdateRequestBody,
    )

    return { response };
};

export const _submitSecretaryApprovalForm = async (formData: object) => {
    const form = await superValidate(formData, _secretaryApprovalInfoSchema);

    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await EmploymentServices.createCurrentCandidateSecretaryApproval(
            form.data as AddApprovalResultRequestBody,
        )

    return { response };
};

export const _submitSecretarySetApproverForm = async (formData: object) => {
    const form = await superValidate(formData, _secretarySetApproversSchema);

    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await EmploymentServices.createCurrentCandidateApprovers(
            form.data as NewHireSetApproversRequestBody,
        )

    return { response };
};
