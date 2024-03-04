import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
import { RoleConstant } from '$lib/constants/core/role.constant';
import type { CandidateIDRequestBody } from '$lib/dto/core/common/candidate-id-request.view-dto';
import type { CommonFilterDTO } from '$lib/dto/core/common/common-filter.dto';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { CommonEmployeeDTO } from '$lib/dto/core/common/employee/employee.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto.js';
import type {
    Academic,
    CandidateAcademicDetailRequestDTO,
    CandidateAcademicDetailResponseDTO,
} from '$lib/dto/mypsm/employment/new-hire/new-hire-candidate-academic-details.dto.js';
import type {
    Activity,
    CandidateActivityDetailRequestDTO,
    CandidateActivityDetailResponseDTO,
} from '$lib/dto/mypsm/employment/new-hire/new-hire-candidate-activity.dto.js';
import type {
    CandidateDependenciesDetailRequestDTO,
    CandidateDependenciesDetailResponseDTO,
    Dependency,
} from '$lib/dto/mypsm/employment/new-hire/new-hire-candidate-dependencies-details.dto.js';
import type {
    CandidateExperiencesDetailRequestDTO,
    CandidateExperiencesDetailResponseDTO,
    Experience,
} from '$lib/dto/mypsm/employment/new-hire/new-hire-candidate-experience-details.dto.js';
import type {
    CandidateFamilyDetailRequestDTO,
    CandidateFamilyDetailResponseDTO,
    Family,
} from '$lib/dto/mypsm/employment/new-hire/new-hire-candidate-family-details.dto.js';
import type {
    CandidateNextOfKinDetailRequestDTO,
    CandidateNextOfKinDetailResponseDTO,
    NextOfKin,
} from '$lib/dto/mypsm/employment/new-hire/new-hire-candidate-next-of-kin-details.dto.js';
import type {
    CandidatePersonalRequestDTO,
    CandidatePersonalResponseDTO,
} from '$lib/dto/mypsm/employment/new-hire/new-hire-candidate-personal-details.dto.js';
import type { NewHireDocumentsDTO } from '$lib/dto/mypsm/employment/new-hire/new-hire-documents.dto.js';
import type { CandidateNewHireApproverResultDTO } from '$lib/dto/mypsm/employment/new-hire/new-hire-get-approver-result.dto';
import type { NewHireGetApproversDTO } from '$lib/dto/mypsm/employment/new-hire/new-hire-get-approvers.dto.js';
import type {
    NewHireSecretaryServiceUpdateRequestDTO,
    NewHireSecretaryServiceUpdateResponseDTO,
} from '$lib/dto/mypsm/employment/new-hire/new-hire-secretary-service-update.dto.js';
import type { NewHireSetApproversDTO } from '$lib/dto/mypsm/employment/new-hire/new-hire-set-approvers.dto';
import { getErrorToast } from '$lib/helpers/core/toast.helper';
import {
    _academicInfoSchema,
    _academicListRequestSchema,
    _academicListResponseSchema,
    _activityInfoSchema,
    _activityListRequestSchema,
    _activityListResponseSchema,
    _approvalResultSchema,
    _dependencyListRequestSchema,
    _dependencyListResponseSchema,
    _documentsSchema,
    _experienceInfoSchema,
    _experienceListRequestSchema,
    _experienceListResponseSchema,
    _familyListRequestSchema,
    _nextOfKinListRequestSchema,
    _personalInfoRequestSchema,
    _personalInfoResponseSchema,
    _relationsSchema,
    _serviceInfoRequestSchema,
    _serviceInfoResponseSchema,
    _setApproversSchema,
    _uploadDocumentsSchema,
} from '$lib/schemas/mypsm/employment/new-hire/schema.js';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service.js';
import { EmploymentServices } from '$lib/services/implementation/mypsm/perjawatan/employment.service';
import { EmployeeServices } from '$lib/services/implementation/mypsm/shared/employee.service';
import { error, fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/client';

//==================================================
//=============== Load Function ====================
//==================================================

// const authorisedRoleCode : string[] = [
//     UserRoleConstants.calon
// ];
export async function load({ params }) {
    // const currentLoggedInUser = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode);

    let newHireStatusResponse: CommonResponseDTO = {};

    const currentRoleCode = localStorage.getItem(
        LocalStorageKeyConstant.currentRoleCode,
    );

    const isEmploymentSecretaryRole =
        currentRoleCode === RoleConstant.urusSetiaPerjawatan.code;

    const candidateIdRequestBody: CandidateIDRequestBody = {
        id: Number(params.id),
    };

    if (isEmploymentSecretaryRole) {
        newHireStatusResponse = await EmploymentServices.getNewHireStatus(
            candidateIdRequestBody,
        );
    }

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
    const serviceDetails: NewHireSecretaryServiceUpdateResponseDTO =
        serviceResponse.data
            ?.details as NewHireSecretaryServiceUpdateResponseDTO;

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
        value: data.employeeNumber,
        name: data.employeeNumber,
    }));

    // ============================================================
    // Superformed the data
    // ============================================================
    const personalInfoForm = await superValidate(
        personalDetailResponse.data?.details as CandidatePersonalResponseDTO,
        _personalInfoResponseSchema,
    );

    const academicInfoForm = await superValidate(
        academicInfoResponse.data
            ?.details as CandidateAcademicDetailResponseDTO,
        _academicListResponseSchema,
    );

    const experienceInfoForm = await superValidate(
        experienceInfoResponse.data
            ?.details as CandidateExperiencesDetailResponseDTO,
        _experienceListResponseSchema,
    );
    const activityInfoForm = await superValidate(
        activityInfoResponse.data
            ?.details as CandidateActivityDetailResponseDTO,
        _activityListResponseSchema,
    );

    const familyInfoForm = await superValidate(
        familyInfoResponse.data?.details as CandidateFamilyDetailResponseDTO,
        _dependencyListResponseSchema,
    );

    const dependencyInfoForm = await superValidate(
        dependencyInfoResponse.data
            ?.details as CandidateDependenciesDetailResponseDTO,
        _dependencyListResponseSchema,
    );
    const nextOfKinInfoForm = await superValidate(
        nextOfKinInfoResponse.data
            ?.details as CandidateNextOfKinDetailResponseDTO,
        _dependencyListResponseSchema,
    );

    const addAcademicModal = await superValidate(_academicInfoSchema);
    const addExperienceModal = await superValidate(_experienceInfoSchema);
    const addActivityModal = await superValidate(_activityInfoSchema);
    const addFamilyModal = await superValidate(_relationsSchema);
    const addNonFamilyModal = await superValidate(_relationsSchema);
    const addNextOfKinModal = await superValidate(_relationsSchema);

    const serviceInfoForm = await superValidate(
        serviceDetails,
        _serviceInfoResponseSchema,
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

    const gradeLookupResponse: CommonResponseDTO =
        await LookupServices.getServiceGradeEnums();

    const gradeLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsNameIsCode(gradeLookupResponse);

    // ===========================================================================

    const placementLookupResponse: CommonResponseDTO =
        await LookupServices.getPlacementEnums();

    const placementLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        placementLookupResponse,
    );

    // ===========================================================================

    const serviceGroupLookupResponse: CommonResponseDTO =
        await LookupServices.getServiceGroupEnums();

    const serviceGroupLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        serviceGroupLookupResponse,
    );

    // ===========================================================================

    const unitLookupResponse: CommonResponseDTO =
        await LookupServices.getUnitEnums();

    const unitLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(unitLookupResponse);

    // ===========================================================================

    const serviceTypeLookupResponse: CommonResponseDTO =
        await LookupServices.getServiceTypeEnums();

    const serviceTypeLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        serviceTypeLookupResponse,
    );

    // ===========================================================================

    const retirementBenefitLookupResponse: CommonResponseDTO =
        await LookupServices.getRetirementTypeEnums();

    const retirementBenefitLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsInString(
            retirementBenefitLookupResponse,
        );

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
            gradeLookup,
            placementLookup,
            serviceGroupLookup,
            unitLookup,
            serviceTypeLookup,
            retirementBenefitLookup,
        },
    };
}

//==================================================
//=============== Submit Functions =================
//==================================================
export const _submitPersonalForm = async (formData: object) => {
    const form = await superValidate(formData, _personalInfoRequestSchema);

    console.log(form);

    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await EmploymentServices.createCurrentCandidatePersonalDetails(
            form.data as CandidatePersonalRequestDTO,
        );

    return { response };
};

export const _submitAcademicForm = async (formData: object) => {
    const form = await superValidate(formData, _academicListRequestSchema);

    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await EmploymentServices.createCurrentCandidateAcademicDetails(
            form.data as CandidateAcademicDetailRequestDTO,
        );

    return { response };
};

export const _submitExperienceForm = async (formData: object) => {
    const form = await superValidate(formData, _experienceListRequestSchema);

    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await EmploymentServices.createCurrentCandidateExperienceDetails(
            form.data as CandidateExperiencesDetailRequestDTO,
        );

    return { response };
};

export const _submitActivityForm = async (formData: object) => {
    const form = await superValidate(formData, _activityListRequestSchema);

    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await EmploymentServices.createCurrentCandidateActivityDetails(
            form.data as CandidateActivityDetailRequestDTO,
        );

    return { response };
};

export const _submitFamilyForm = async (formData: object) => {
    const form = await superValidate(formData, _familyListRequestSchema);

    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await EmploymentServices.createCurrentCandidateFamilyDetails(
            form.data as CandidateFamilyDetailRequestDTO,
        );

    return { response };
};

export const _submitDependencyForm = async (formData: object) => {
    const form = await superValidate(formData, _dependencyListRequestSchema);

    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await EmploymentServices.createCurrentCandidateDependenciesDetails(
            form.data as CandidateDependenciesDetailRequestDTO,
        );

    return { response };
};

export const _submitNextOfKinForm = async (formData: object) => {
    const form = await superValidate(formData, _nextOfKinListRequestSchema);

    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await EmploymentServices.createCurrentCandidateNextOfKinDetails(
            form.data as CandidateNextOfKinDetailRequestDTO,
        );

    return { response };
};

export const _submitServiceForm = async (formData: object) => {
    const form = await superValidate(formData, _serviceInfoRequestSchema);

    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await EmploymentServices.createCurrentCandidateSecretaryUpdate(
            form.data as NewHireSecretaryServiceUpdateRequestDTO,
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

export const _submitDocumentsForm = async (file: File | null | undefined) => {
    const documentData = new FormData();

    documentData.append('document', file as File);

    const form = await superValidate(documentData, _uploadDocumentsSchema);

    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await EmploymentServices.createCurrentCandidateDocuments(documentData);

    return { response };
};

export const _downloadDocument = async (param: string) => {
    const response = await EmploymentServices.downloadAttachment(param);

    return { response };
};

// submit array modal functions
export const _submitAcademicInfoForm = async (formData: Academic[]) => {
    if (formData.length < 1) {
        getErrorToast();
        return fail(400);
    }
    const requestData: CandidateAcademicDetailRequestDTO = {
        academics: formData,
    };

    console.log(requestData);

    const response: CommonResponseDTO =
        await EmploymentServices.createCurrentCandidateAcademicDetails(
            requestData as CandidateAcademicDetailRequestDTO,
        );

    return { response };
};

export const _submitExperienceInfoForm = async (formData: Experience[]) => {
    if (formData.length < 1) {
        getErrorToast();
        return fail(400);
    }
    const requestData: CandidateExperiencesDetailRequestDTO = {
        experiences: formData,
    };

    const response: CommonResponseDTO =
        await EmploymentServices.createCurrentCandidateExperienceDetails(
            requestData as CandidateExperiencesDetailRequestDTO,
        );

    return { response };
};

export const _submitActivityInfoForm = async (formData: Activity[]) => {
    if (formData.length < 1) {
        getErrorToast();
        return fail(400);
    }
    const requestData: CandidateActivityDetailRequestDTO = {
        activities: formData,
    };

    const response: CommonResponseDTO =
        await EmploymentServices.createCurrentCandidateActivityDetails(
            requestData as CandidateActivityDetailRequestDTO,
        );

    return { response };
};

export const _submitFamilyInfoForm = async (formData: Family[]) => {
    if (formData.length < 1) {
        getErrorToast();
        return fail(400);
    }
    const requestData: CandidateFamilyDetailRequestDTO = {
        dependencies: formData,
    };

    const response: CommonResponseDTO =
        await EmploymentServices.createCurrentCandidateFamilyDetails(
            requestData as CandidateFamilyDetailRequestDTO,
        );

    return { response };
};

export const _submitDependencyInfoForm = async (formData: Dependency[]) => {
    if (formData.length < 1) {
        getErrorToast();
        return fail(400);
    }
    const requestData: CandidateDependenciesDetailRequestDTO = {
        dependencies: formData,
    };

    const response: CommonResponseDTO =
        await EmploymentServices.createCurrentCandidateDependenciesDetails(
            requestData as CandidateDependenciesDetailRequestDTO,
        );

    return { response };
};

export const _submitNextOfKinInfoForm = async (formData: NextOfKin[]) => {
    if (formData.length < 1) {
        getErrorToast();
        return fail(400);
    }
    const requestData: CandidateNextOfKinDetailRequestDTO = {
        nextOfKins: formData,
    };

    const response: CommonResponseDTO =
        await EmploymentServices.createCurrentCandidateNextOfKinDetails(
            requestData as CandidateNextOfKinDetailRequestDTO,
        );

    return { response };
};
