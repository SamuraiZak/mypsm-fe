import type { CandidateIDRequestBody } from '$lib/dto/core/common/candidate-id-request.view-dto';
import type { CommonFilterDTO } from '$lib/dto/core/common/common-filter.dto';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { CommonEmployeeDTO } from '$lib/dto/core/common/employee/employee.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto.js';
import type {
    Activity,
    CandidateActivityDetailsDTO,
} from '$lib/dto/mypsm/employment/new-hire/new-hire-activity.dto.js';
import type { CandidateAcademicDetailsDTO } from '$lib/dto/mypsm/employment/new-hire/new-hire-candidate-academic-details.dto.js';
import type {
    CandidateDependenciesDetailsDTO,
    Dependency,
} from '$lib/dto/mypsm/employment/new-hire/new-hire-candidate-dependencies-details.dto.js';
import type {
    CandidateExperiencesDetailDTO,
    Experience,
} from '$lib/dto/mypsm/employment/new-hire/new-hire-candidate-experience-details.dto.js';
import type {
    CandidateFamilyDetailsDTO,
    Family,
} from '$lib/dto/mypsm/employment/new-hire/new-hire-candidate-family-details.dto.js';
import type {
    CandidateNextOfKinDetailsDTO,
    NextOfKin,
} from '$lib/dto/mypsm/employment/new-hire/new-hire-candidate-next-of-kin-details.dto.js';
import type { CandidatePersonalDTO } from '$lib/dto/mypsm/employment/new-hire/new-hire-candidate-personal-details.dto.js';
import type { NewHireDocumentsDTO } from '$lib/dto/mypsm/employment/new-hire/new-hire-documents.dto.js';
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
    _documentsSchema,
    _experienceInfoSchema,
    _experienceListSchema,
    _familyListSchema,
    _nextOfKinListSchema,
    _personalInfoSchema,
    _relationsSchema,
    _serviceInfoSchema,
    _setApproversSchema,
    _uploadDocumentsSchema,
} from '$lib/schemas/mypsm/employment/new-hire/schema.js';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service.js';
import { EmploymentServices } from '$lib/services/implementation/mypsm/perjawatan/employment.service';
import { EmployeeServices } from '$lib/services/implementation/mypsm/shared/employee.service';
import { error } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/client';

//==================================================
//=============== Load Function ====================
//==================================================

// const authorisedRoleCode : string[] = [
//     UserRoleConstants.calon
// ];
export async function load({ params }) {
    // const currentLoggedInUser = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode);

    const candidateIdRequestBody: CandidateIDRequestBody = {
        id: Number(params.id),
    };

    const newHireStatusResponse: CommonResponseDTO =
        await EmploymentServices.getNewHireStatus(candidateIdRequestBody);

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

    const secretaryApprovalDetailResponse: CandidateNewHireApproverResultDTO =
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

    const mypsmIDResponse: CommonResponseDTO =
        await EmploymentServices.getCurrentCandidateMypsmID(
            candidateIdRequestBody,
        );

    // temp employee list dropdown

    // filter
    const filter: CommonFilterDTO = {
        program: 'SEMUA',
        identityCard: null,
        employeeNumber: null,
        name: null,
        position: null,
        status: null,
        grade: null,
        scheme: null,
    };

    // request body
    const param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: filter,
    };

    // fetch apc history
    const response: CommonResponseDTO =
        await EmployeeServices.getEmployeeList(param);

    // convert to apcdto
    const employeeLookup: DropdownDTO[] = (
        response.data?.dataList as CommonEmployeeDTO[]
    ).map((data) => ({
        value: data.employeeId,
        name: data.name,
    }));

    // ============================================================
    // Superformed the data
    // ============================================================
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
    const addFamilyModal = await superValidate(_relationsSchema);
    const addNonFamilyModal = await superValidate(_relationsSchema);
    const addNextOfKinModal = await superValidate(_relationsSchema);

    const serviceInfoForm = await superValidate(
        serviceDetails,
        _serviceInfoSchema,
    );

    const secretaryApprovalInfoForm = await superValidate(
        secretaryApprovalDetailResponse,
        _approvalResultSchema,
    );
    const supporterApprovalForm = await superValidate(
        supporterResultResponse.data
            ?.details as CandidateNewHireApproverResultDTO,
        _approvalResultSchema,
    );
    const approverApprovalForm = await superValidate(
        approverResultResponse.data
            ?.details as CandidateNewHireApproverResultDTO,
        _approvalResultSchema,
    );

    const secretarySetApproversForm = await superValidate(
        secretaryGetApproversResponse.data?.details as NewHireGetApproversDTO,
        _setApproversSchema,
    );

    const submittedDocuments = await superValidate(
        documentInfoResponse.data?.details as NewHireDocumentsDTO,
        _documentsSchema,
    );
    const newHireDocumentForm = await superValidate(_uploadDocumentsSchema);

    // serviceInfoForm.data.candidateId = candidateIdRequestBody.candidateId;
    // secretarySetApproversForm.data.candidateId =
    //     candidateIdRequestBody.candidateId;

    // ==========================================================================
    // Get Lookup Functions
    // ==========================================================================
    const identityCardColorLookupResponse: CommonResponseDTO =
        await LookupServices.getICTypeEnums();

    const identityCardColorLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsInString(
            identityCardColorLookupResponse,
        );

    // ===========================================================================

    const stateLookupResponse: CommonResponseDTO =
        await LookupServices.getStateEnums();

    const stateLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(stateLookupResponse);

    // ===========================================================================

    const cityLookupResponse: CommonResponseDTO =
        await LookupServices.getCityEnums();

    const cityLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(cityLookupResponse);

    // ===========================================================================

    const countryLookupResponse: CommonResponseDTO =
        await LookupServices.getCountryEnums();

    const countryLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        countryLookupResponse,
    );

    // ===========================================================================

    const nationalityLookupResponse: CommonResponseDTO =
        await LookupServices.getNationalityEnums();

    const nationalityLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        nationalityLookupResponse,
    );

    // ===========================================================================

    const raceLookupResponse: CommonResponseDTO =
        await LookupServices.getRaceEnums();

    const raceLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(raceLookupResponse);

    // ===========================================================================

    const ethnicityLookupResponse: CommonResponseDTO =
        await LookupServices.getEthnicEnums();

    const ethnicityLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        ethnicityLookupResponse,
    );

    // ===========================================================================

    const religionLookupResponse: CommonResponseDTO =
        await LookupServices.getReligionEnums();

    const religionLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        religionLookupResponse,
    );

    // ===========================================================================

    const genderLookupResponse: CommonResponseDTO =
        await LookupServices.getGenderEnums();

    const genderLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(genderLookupResponse);

    // ===========================================================================

    const maritalLookupResponse: CommonResponseDTO =
        await LookupServices.getMaritalEnums();

    const maritalLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        maritalLookupResponse,
    );

    // ===========================================================================

    const positionLookupResponse: CommonResponseDTO =
        await LookupServices.getPositionEnums();

    const positionLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        positionLookupResponse,
    );

    // ===========================================================================

    const relationshipLookupResponse: CommonResponseDTO =
        await LookupServices.getRelationshipEnums();

    const relationshipLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        relationshipLookupResponse,
    );

    // ===========================================================================

    const institutionLookupResponse: CommonResponseDTO =
        await LookupServices.getInstitutionEnums();

    const institutionLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        institutionLookupResponse,
    );

    // ===========================================================================

    const educationLookupResponse: CommonResponseDTO =
        await LookupServices.getHighestEducationEnums();

    const educationLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        educationLookupResponse,
    );

    // ===========================================================================

    const sponsorshipLookupResponse: CommonResponseDTO =
        await LookupServices.getSponsorshipEnums();

    const sponsorshipLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        sponsorshipLookupResponse,
    );

    // ===========================================================================

    const majorMinorLookupResponse: CommonResponseDTO =
        await LookupServices.getMajorMinorEnums();

    const majorMinorLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        majorMinorLookupResponse,
    );

    // ===========================================================================

    const titleLookupResponse: CommonResponseDTO =
        await LookupServices.getTitleEnums();

    const titleLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(titleLookupResponse);

    // ===========================================================================

    const assetDeclarationLookupResponse: CommonResponseDTO =
        await LookupServices.getPropertyDeclarationEnums();

    const assetDeclarationLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(assetDeclarationLookupResponse);

    // ===========================================================================

    const generalLookup: DropdownDTO[] = [
        {
            value: true,
            name: 'Ya',
        },
        {
            value: false,
            name: 'Tidak',
        },
    ];

    // ===========================================================================

    return {
        newHireStatusResponse,
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
        supporterApprovalForm,
        approverApprovalForm,
        addAcademicModal,
        addExperienceModal,
        addActivityModal,
        addFamilyModal,
        addNonFamilyModal,
        addNextOfKinModal,
        newHireDocumentForm,
        submittedDocuments,
        mypsmIDResponse,
        selectionOptions: {
            identityCardColorLookup,
            cityLookup,
            stateLookup,
            countryLookup,
            nationalityLookup,
            raceLookup,
            ethnicityLookup,
            religionLookup,
            genderLookup,
            maritalLookup,
            positionLookup,
            relationshipLookup,
            institutionLookup,
            educationLookup,
            sponsorshipLookup,
            majorMinorLookup,
            titleLookup,
            generalLookup,
            employeeLookup,
            assetDeclarationLookup,
        },
    };
}

//==================================================
//=============== Submit Functions =================
//==================================================
export const _submitPersonalForm = async (formData: FormData) => {
    const form = await superValidate(formData, _personalInfoSchema);

    console.log(form);

    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    // const response: CommonResponseDTO =
    //     await EmploymentServices.createCurrentCandidatePersonalDetails(
    //         form.data as CandidatePersonalDTO,
    //     );

    return { form };
};

export const _submitAcademicForm = async (formData: object) => {
    const form = await superValidate(formData, _academicListSchema);

    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await EmploymentServices.createCurrentCandidateAcademicDetails(
            form.data as CandidateAcademicDetailsDTO,
        );

    return { response };
};

export const _submitExperienceForm = async (formData: object) => {
    const form = await superValidate(formData, _experienceInfoSchema);

    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await EmploymentServices.createCurrentCandidateExperienceDetails(
            form.data as Experience,
        );

    return { response };
};

export const _submitActivityForm = async (formData: object) => {
    const form = await superValidate(formData, _activityInfoSchema);

    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await EmploymentServices.createCurrentCandidateActivityDetails(
            form.data as Activity,
        );

    return { response };
};

export const _submitFamilyForm = async (formData: object) => {
    const form = await superValidate(formData, _relationsSchema);

    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await EmploymentServices.createCurrentCandidateFamilyDetails(
            form.data as Family,
        );

    return { response };
};

export const _submitDependencyForm = async (formData: object) => {
    const form = await superValidate(formData, _relationsSchema);

    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await EmploymentServices.createCurrentCandidateDependenciesDetails(
            form.data as Dependency,
        );

    return { response };
};

export const _submitNextOfKinForm = async (formData: object) => {
    const form = await superValidate(formData, _relationsSchema);

    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await EmploymentServices.createCurrentCandidateNextOfKinDetails(
            form.data as NextOfKin,
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
            form.data as CandidateNewHireApproverResultDTO,
        );

    return { response };
};

export const _submitSupporterApprovalForm = async (formData: object) => {
    const form = await superValidate(formData, _approvalResultSchema);

    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await EmploymentServices.createCurrentCandidateSupporterApproval(
            form.data as CandidateNewHireApproverResultDTO,
        );

    return { response };
};

export const _submitApproverApprovalForm = async (formData: object) => {
    const form = await superValidate(formData, _approvalResultSchema);

    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await EmploymentServices.createCurrentCandidateApproverApproval(
            form.data as CandidateNewHireApproverResultDTO,
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

export const _submitDocumentsForm = async (formData: FormData) => {
    const form = await superValidate(formData, _uploadDocumentsSchema);

    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await EmploymentServices.createCurrentCandidateDocuments(formData);

    return { response };
};

    export const _downloadDocument = async (param: string) => {
        const response = await EmploymentServices.downloadAttachment(param);

        return { response };
    };
