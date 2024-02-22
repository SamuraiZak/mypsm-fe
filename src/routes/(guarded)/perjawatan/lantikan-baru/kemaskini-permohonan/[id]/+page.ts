import type { AddApprovalResultRequestBody } from '$lib/dto/core/common/add-approval-results-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { CandidateActivityDetailsDTO } from '$lib/dto/mypsm/employment/new-hire/new-hire-activity.dto.js';
import type { CandidateAcademicDetailsDTO } from '$lib/dto/mypsm/employment/new-hire/new-hire-candidate-academic-details.dto.js';
import type { CandidateDependenciesDetailsDTO } from '$lib/dto/mypsm/employment/new-hire/new-hire-candidate-dependencies-details.dto.js';
import type { CandidateExperiencesDetailDTO } from '$lib/dto/mypsm/employment/new-hire/new-hire-candidate-experience-details.dto.js';
import type { CandidateFamilyDetailsDTO } from '$lib/dto/mypsm/employment/new-hire/new-hire-candidate-family-details.dto.js';
import type { CandidateNextOfKinDetailsDTO } from '$lib/dto/mypsm/employment/new-hire/new-hire-candidate-next-of-kin-details.dto.js';
import type { CandidatePersonalDTO } from '$lib/dto/mypsm/employment/new-hire/new-hire-candidate-personal-details.dto.js';
import type { CandidateNewHireApproverResultDTO } from '$lib/dto/mypsm/employment/new-hire/new-hire-get-approver-result.dto';
import type { NewHireGetApproversDTO } from '$lib/dto/mypsm/employment/new-hire/new-hire-get-approvers.dto.js';
import type { NewHireSecretaryServiceUpdateDTO } from '$lib/dto/mypsm/employment/new-hire/new-hire-secretary-service-update.dto.js';
import type { NewHireSetApproversDTO } from '$lib/dto/mypsm/employment/new-hire/new-hire-set-approvers.dto';
import { getErrorToast } from '$lib/helpers/core/toast.helper';
import {
    _academicInfoSchema,
    _academicListSchema,
    _activityInfoSchema,
    _activityListSchema,
    _approvalResultSchema,
    _dependencyListSchema,
    _experienceInfoSchema,
    _experienceListSchema,
    _familyListSchema,
    _nextOfKinListSchema,
    _personalInfoSchema,
    _serviceInfoSchema,
    _setApproversSchema,
} from '$lib/schemas/mypsm/employment/new-hire/schema.js';
import { EmploymentServices } from '$lib/services/implementation/mypsm/perjawatan/employment.service';
import { error } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/client';

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
        await EmploymentServices.getCurrentCandidateFamily(
            candidateIdRequestBody,
        );

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
    const serviceDetails: NewHireSecretaryServiceUpdateDTO = serviceResponse
        .data?.details as NewHireSecretaryServiceUpdateDTO;

    const secretaryApprovalResponse: CommonResponseDTO =
        await EmploymentServices.getCurrentCandidateSecretaryApproval(
            candidateIdRequestBody,
        );

    const secretaryApprovalDetails: CandidateNewHireApproverResultDTO =
        secretaryApprovalResponse.data
            ?.details as CandidateNewHireApproverResultDTO;

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
    const personalInfoForm = await superValidate(
        personalDetailResponse.data?.details as CandidatePersonalDTO,
        _personalInfoSchema,
    );

    const academicInfoForm = await superValidate(
        academicInfoResponse.data?.details as CandidateAcademicDetailsDTO,
        _academicListSchema,
    );

    const experienceInfoForm = await superValidate(
        experienceInfoResponse.data?.details as CandidateExperiencesDetailDTO,
        _experienceListSchema,
    );
    const activityInfoForm = await superValidate(
        activityInfoResponse.data?.details as CandidateActivityDetailsDTO,
        _activityListSchema,
    );

    const familyInfoForm = await superValidate(
        familyInfoResponse.data?.details as CandidateFamilyDetailsDTO,
        _familyListSchema,
    );

    const dependencyInfoForm = await superValidate(
        dependencyInfoResponse.data?.details as CandidateDependenciesDetailsDTO,
        _dependencyListSchema,
    );
    const nextOfKinInfoForm = await superValidate(
        nextOfKinInfoResponse.data?.details as CandidateNextOfKinDetailsDTO,
        _nextOfKinListSchema,
    );

    const addAcademicModal = await superValidate(_academicInfoSchema);
    const addExperienceModal = await superValidate(_experienceInfoSchema);
    const addActivityModal = await superValidate(_activityInfoSchema);
    const addFamilyModal = await superValidate(_familyListSchema);
    const addNonFamilyModal = await superValidate(_dependencyListSchema);
    const addNextOfKinModal = await superValidate(_nextOfKinListSchema);

    const serviceInfoForm = await superValidate(
        serviceDetails,
        _serviceInfoSchema,
    );

    const secretaryApprovalInfoForm = await superValidate(
        secretaryApprovalDetails,
        _approvalResultSchema,
    );

    const secretarySetApproversForm = await superValidate(
        secretaryGetApproversResponse.data?.details as NewHireGetApproversDTO,
        _setApproversSchema,
    );

    serviceInfoForm.data.candidateId = candidateIdRequestBody.candidateId;
    secretarySetApproversForm.data.candidateId =
        candidateIdRequestBody.candidateId;

    return {
        personalDetailResponse,
        personalInfoForm,
        academicInfoResponse,
        academicInfoForm,
        experienceInfoResponse,
        experienceInfoForm,
        activityInfoResponse,
        activityInfoForm,
        familyInfoResponse,
        familyInfoForm,
        dependencyInfoResponse,
        dependencyInfoForm,
        nextOfKinInfoResponse,
        nextOfKinInfoForm,
        supporterResultResponse,
        approverResultResponse,
        serviceResponse,
        serviceInfoForm,
        documentInfoResponse,
        secretaryApprovalResponse,
        secretaryApprovalInfoForm,
        secretaryGetApproversResponse,
        secretarySetApproversForm,
        addAcademicModal,
        addExperienceModal,
        addActivityModal,
        addFamilyModal,
        addNonFamilyModal,
        addNextOfKinModal,
    };
}

//==================================================
//=============== Maklumat Peribadi ================
//==================================================
// export const _submitFormStepperMaklumatPeribadi = async (formData: object) => {
//     const form = await superValidate(formData, _stepperMaklumatPeribadi);

//     if (!form.valid) {
//         getErrorToast();
//         return fail(400, form);
//     }

//     // start by rendering loading toast
//     getLoadingToast();

//     const response: CommonResponseDTO = await ProfileService.editPersonalDetail(
//         form.data as PutPersonalDetailRequest,
//     ).finally(() => toast.dismiss());
//     console.log(response);

//     if (response.status !== 'success') {
//         // if error toast
//         getServerErrorToast();
//         // return error(400, { message: response.message });
//     }
//     // if success toast
//     getSuccessToast();
//     invalidateAll();
//     return { form };
// };

//==================================================
//=============== Create Academic ================
//==================================================
// export const _submitCreateAcademicForm = async (formData: object) => {
//     const form = await superValidate(formData, _addAcademicInfoSchema);

//     if (!form.valid) {
//         getErrorToast();
//         return fail(400, form);
//     }

//     // start by rendering loading toast
//     getLoadingToast();

//     const response: CommonResponseDTO =
//         await ProfileService.createAcademicDetail(
//             form.data as PostPersonalAcademicRequest,
//         ).finally(() => toast.dismiss());

//     if (response.status !== 'success') {
//         // if error toast
//         getServerErrorToast();
//     }
//     // if success toast
//     getSuccessToast();
//     invalidateAll();
//     return { form };
// };

// export const _submitCreateExperienceForm = async (formData: object) => {
//     const form = await superValidate(formData, _addExperienceInfoSchema);

//     if (!form.valid) {
//         getErrorToast();
//         return fail(400, form);
//     }

//     // start by rendering loading toast
//     getLoadingToast();

//     const response: CommonResponseDTO =
//         await ProfileService.createExperienceDetail(
//             form.data as PostPersonalExperiencesRequest,
//         ).finally(() => toast.dismiss());

//     if (response.status !== 'success') {
//         // if error toast
//         getServerErrorToast();
//     }
//     // if success toast
//     getSuccessToast();
//     invalidateAll();
//     return { form };
// };

// export const _submitCreateActivityForm = async (formData: object) => {
//     const form = await superValidate(formData, _addActivityModalSchema);

//     console.log(form);

//     if (!form.valid) {
//         getErrorToast();
//         return fail(400, form);
//     }

//     // start by rendering loading toast
//     getLoadingToast();

//     const response: CommonResponseDTO =
//         await ProfileService.createActivityDetail(
//             form.data as PostPersonalActivityRequest,
//         ).finally(() => toast.dismiss());

//     if (response.status !== 'success') {
//         // if error toast
//         getServerErrorToast();
//     }
//     // if success toast
//     getSuccessToast();
//     invalidateAll();

//     return { form };
// };

// export const _submitCreateFamilyForm = async (formData: object) => {
//     const form = await superValidate(formData, _addRelationModalSchema);

//     if (!form.valid) {
//         getErrorToast();
//         return fail(400, form);
//     }

//     // start by rendering loading toast
//     getLoadingToast();

//     const response: CommonResponseDTO = await ProfileService.createFamilyDetail(
//         form.data as PostPersonalFamilyRequest,
//     ).finally(() => toast.dismiss());

//     if (response.status !== 'success') {
//         // if error toast
//         getServerErrorToast();
//     }
//     // if success toast
//     getSuccessToast();
//     invalidateAll();
//     return { form };
// };

export const _submitCreateDependencyForm = async (formData: object) => {
    const form = await superValidate(formData, _dependencyListSchema);

    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await EmploymentServices.createCurrentCandidateDependenciesDetails(
            form.data as CandidateDependenciesDetailsDTO,
        );

    return { response };
};

export const _submitNextOfKinForm = async (formData: object) => {
    const form = await superValidate(formData, _nextOfKinListSchema);

    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await EmploymentServices.createCurrentCandidateNextOfKinDetails(
            form.data as CandidateNextOfKinDetailsDTO,
        );

    return { response };
};

export const _submitServiceForm = async (formData: object) => {
    const form = await superValidate(formData, _serviceInfoSchema);

    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await EmploymentServices.createCurrentCandidateSecretaryUpdate(
            form.data as NewHireSecretaryServiceUpdateDTO,
        );

    return { response };
};

export const _submitSecretaryApprovalForm = async (formData: object) => {
    const form = await superValidate(formData, _approvalResultSchema);

    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await EmploymentServices.createCurrentCandidateSecretaryApproval(
            form.data as AddApprovalResultRequestBody,
        );

    return { response };
};

export const _submitSecretarySetApproverForm = async (formData: object) => {
    const form = await superValidate(formData, _setApproversSchema);

    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await EmploymentServices.createCurrentCandidateApprovers(
            form.data as NewHireSetApproversDTO,
        );

    return { response };
};
