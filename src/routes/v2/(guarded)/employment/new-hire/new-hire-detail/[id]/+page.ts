import { RoleConstant } from '$lib/constants/core/role.constant';
import type { DocumentBase64RequestDTO } from '$lib/dto/core/common/base-64-document-request.dto';
import type { CandidateIDRequestBody } from '$lib/dto/core/common/candidate-id-request.view-dto';
import type { CommonFilterDTO } from '$lib/dto/core/common/common-filter.dto';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { CommonEmployeeDTO } from '$lib/dto/core/common/employee/employee.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto.js';
import type {
    Academic,
    CandidateAcademicDetailRequestDTO,
} from '$lib/dto/mypsm/employment/new-hire/new-hire-candidate-academic-details.dto.js';
import type {
    Activity,
    CandidateActivityDetailRequestDTO,
} from '$lib/dto/mypsm/employment/new-hire/new-hire-candidate-activity.dto.js';
import type {
    CandidateDependenciesDetailRequestDTO,
    Dependency,
} from '$lib/dto/mypsm/employment/new-hire/new-hire-candidate-dependencies-details.dto.js';
import type {
    CandidateExperiencesDetailRequestDTO,
    Experience,
} from '$lib/dto/mypsm/employment/new-hire/new-hire-candidate-experience-details.dto.js';
import type {
    CandidateFamilyDetailRequestDTO,
    Family,
} from '$lib/dto/mypsm/employment/new-hire/new-hire-candidate-family-details.dto.js';
import type {
    CandidateNextOfKinDetailRequestDTO,
    NextOfKin,
} from '$lib/dto/mypsm/employment/new-hire/new-hire-candidate-next-of-kin-details.dto.js';
import type { CandidatePersonalRequestDTO } from '$lib/dto/mypsm/employment/new-hire/new-hire-candidate-personal-details.dto.js';
import type { NewHireFullDetailResponseDTO } from '$lib/dto/mypsm/employment/new-hire/new-hire-full-detail-response.dto';
import type { CandidateNewHireApproverResultDTO } from '$lib/dto/mypsm/employment/new-hire/new-hire-get-approver-result.dto';
import type { NewHireSecretaryServiceUpdateRequestDTO } from '$lib/dto/mypsm/employment/new-hire/new-hire-secretary-service-update.dto.js';
import type { NewHireSetApproversDTO } from '$lib/dto/mypsm/employment/new-hire/new-hire-set-approvers.dto';
import { _fileToBase64String } from '$lib/helpers/core/fileToBase64String.helper';
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
    _employeeNumberSchema,
    _experienceInfoSchema,
    _experienceListRequestSchema,
    _experienceListResponseSchema,
    _familyListRequestSchema,
    _getNewHireApproversSchema,
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
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms/client';

//==================================================
//=============== Load Function ====================
//==================================================

// const authorisedRoleCode : string[] = [
//     UserRoleConstants.calon
// ];
export async function load({ params, parent }) {
    // const currentLoggedInUser = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode);

    const newHireId: number = Number(params.id);

    let newHireStatusResponse: CommonResponseDTO = {};

    const { layoutData } = await parent();

    const currentRoleCode = layoutData.accountDetails.currentRoleCode;

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

    const newHireFullDetailResponse: CommonResponseDTO =
        await EmploymentServices.getNewHireFullDetail(candidateIdRequestBody);

    const newHireFullDetailView: NewHireFullDetailResponseDTO =
        newHireFullDetailResponse.data?.details;

    // filter
    const filter: CommonFilterDTO = {
        program: 'SEMUA',
        identityDocumentNumber: null,
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
        pageSize: 10000,
        orderBy: 'name',
        orderType: 0,
        filter: filter,
    };

    // fetch apc history
    const response: CommonResponseDTO =
        await EmployeeServices.getEmployeeList(param);

    // convert to emp number string
    const employeeIdLookup: DropdownDTO[] = (
        response.data?.dataList as CommonEmployeeDTO[]
    ).map((data) => ({
        value: String(data.employeeNumber),
        name: String(data.name),
    }));

    //convert to id number
    const employeeLookup: DropdownDTO[] = (
        response.data?.dataList as CommonEmployeeDTO[]
    ).map((data) => ({
        value: Number(data.employeeId),
        name: String(data.name),
    }));

    // ============================================================
    // Superformed the data
    // ============================================================
    const personalInfoForm = await superValidate(
        newHireFullDetailView.personalDetail,
        zod(_personalInfoResponseSchema),
        { errors: false },
    );

    const academicInfoForm = await superValidate(
        newHireFullDetailView.academic,
        zod(_academicListResponseSchema),
        { errors: false },
    );

    const experienceInfoForm = await superValidate(
        newHireFullDetailView.experience,
        zod(_experienceListResponseSchema),
        { errors: false },
    );
    const activityInfoForm = await superValidate(
        newHireFullDetailView.activity,
        zod(_activityListResponseSchema),
        { errors: false },
    );

    const familyInfoForm = await superValidate(
        newHireFullDetailView.family,
        zod(_dependencyListResponseSchema),
        { errors: false, id: 'familyFormId' },
    );

    const dependencyInfoForm = await superValidate(
        newHireFullDetailView.dependent,
        zod(_dependencyListResponseSchema),
        { errors: false, id: 'dependencyFormId' },
    );
    const nextOfKinInfoForm = await superValidate(
        newHireFullDetailView.nextOfKin,
        zod(_dependencyListResponseSchema),
        { errors: false, id: 'nextOfKinFormId' },
    );

    const addAcademicModal = await superValidate(zod(_academicInfoSchema), {
        errors: false,
    });
    const addExperienceModal = await superValidate(zod(_experienceInfoSchema), {
        errors: false,
    });
    const addActivityModal = await superValidate(zod(_activityInfoSchema), {
        errors: false,
    });
    const addFamilyModal = await superValidate(zod(_relationsSchema), {
        errors: false,
        id: 'addFamilyModalId',
    });
    const addNonFamilyModal = await superValidate(zod(_relationsSchema), {
        errors: false,
        id: 'addNonFamilyModalId',
    });
    const addNextOfKinModal = await superValidate(zod(_relationsSchema), {
        errors: false,
        id: 'addNextOfKinModalId',
    });

    const serviceInfoForm = await superValidate(
        newHireFullDetailView.secretaryUpdate,
        zod(_serviceInfoResponseSchema),
        { errors: false },
    );

    const secretaryApprovalInfoForm = await superValidate(
        newHireFullDetailView.secretaryApproval,
        zod(_approvalResultSchema),
        { errors: false },
    );
    const supporterApprovalForm = await superValidate(
        newHireFullDetailView.supporter,
        zod(_approvalResultSchema),
        { errors: false, id: 'supporterApprovalId' },
    );
    const approverApprovalForm = await superValidate(
        newHireFullDetailView.approver,
        zod(_approvalResultSchema),
        { errors: false, id: 'approverApprovalId' },
    );

    const secretarySetApproversForm = await superValidate(
        newHireFullDetailView.supporterApprover,
        zod(_getNewHireApproversSchema),
        { errors: false },
    );

    const submittedDocuments = await superValidate(
        newHireFullDetailView.document,
        zod(_documentsSchema),
        { errors: false },
    );
    const newHireEmployeeNumberForm = await superValidate(
        newHireFullDetailView.employeeNumber,
        zod(_employeeNumberSchema),
    );

    const newHireDocumentForm = await superValidate(
        zod(_uploadDocumentsSchema),
    );

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

    const relationshipLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsRelationship(relationshipLookupResponse);

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

    const programLookupResponse: CommonResponseDTO =
        await LookupServices.getProgrammeEnums();

    const programLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        programLookupResponse,
    );

    // ===========================================================================

    const schemeLookupResponse: CommonResponseDTO =
        await LookupServices.getSchemeEnums();

    const schemeLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(schemeLookupResponse);
    // ===========================================================================

    const bankLookupResponse: CommonResponseDTO =
        await LookupServices.getBankEnums();

    const bankLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsValueIsDescription(bankLookupResponse);

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
        params,
        newHireFullDetailView,
        newHireId,
        newHireStatusResponse,
        personalInfoForm,
        academicInfoForm,
        experienceInfoForm,
        activityInfoForm,
        familyInfoForm,
        dependencyInfoForm,
        nextOfKinInfoForm,
        serviceInfoForm,
        secretaryApprovalInfoForm,
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
        relationshipLookupResponse,
        newHireEmployeeNumberForm,
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
            programLookup,
            relationshipLookup,
            institutionLookup,
            bankLookup,
            schemeLookup,
            educationLookup,
            sponsorshipLookup,
            majorMinorLookup,
            titleLookup,
            generalLookup,
            employeeLookup,
            employeeIdLookup,
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
    const form = await superValidate(formData, zod(_personalInfoRequestSchema));

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
    const form = await superValidate(formData, zod(_academicListRequestSchema));

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
    const form = await superValidate(
        formData,
        zod(_experienceListRequestSchema),
    );

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
    const form = await superValidate(formData, zod(_activityListRequestSchema));

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
    const form = await superValidate(formData, zod(_familyListRequestSchema));

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
    const form = await superValidate(
        formData,
        zod(_dependencyListRequestSchema),
    );

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
    const form = await superValidate(
        formData,
        zod(_nextOfKinListRequestSchema),
    );

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

export const _submitServiceForm = async (id: number, formData: object) => {
    const form = await superValidate(formData, zod(_serviceInfoRequestSchema));
    form.data.candidateId = id;
    console.log(form);
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

export const _submitSecretaryApprovalForm = async (
    id: number,
    formData: object,
) => {
    const form = await superValidate(formData, zod(_approvalResultSchema));
    form.data.id = id;

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

export const _submitSupporterApprovalForm = async (
    id: number,
    formData: object,
) => {
    const form = await superValidate(formData, zod(_approvalResultSchema));
    form.data.id = id;

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

export const _submitApproverApprovalForm = async (
    id: number,
    formData: object,
) => {
    const form = await superValidate(formData, zod(_approvalResultSchema));
    form.data.id = id;

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

export const _submitSecretarySetApproverForm = async (
    id: number,
    formData: object,
) => {
    const form = await superValidate(formData, zod(_setApproversSchema));
    form.data.candidateId = id;

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

export const _submitDocumentForm = async (isDraft: boolean, files: File[]) => {
    const documentData = new FormData();

    // check file size validation
    files.forEach((file) => {
        documentData.append('document', file, file.name);
    });

    const form = await superValidate(documentData, zod(_uploadDocumentsSchema));

    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    // turns file into base 64 format
    const base64String = await _fileToBase64String(files[0]);

    const requestBody: {
        isDraft: boolean;
        document?: DocumentBase64RequestDTO | undefined;
    } = {
        isDraft: isDraft,
        document: {
            base64: base64String,
            name: files[0].name,
        },
    };

    const response: CommonResponseDTO =
        await EmploymentServices.createCurrentCandidateDocuments(requestBody);

    return { response };
};

export const _downloadDocument = async (param: string) => {
    const response = await EmploymentServices.downloadAttachment(param);

    return { response };
};

// submit array modal functions
export const _submitAcademicInfoForm = async (
    isDraft: boolean,
    formData: Academic[],
) => {
    if (formData.length < 1) {
        getErrorToast();
        return fail(400);
    }
    const requestData: CandidateAcademicDetailRequestDTO = {
        academics: formData,
        isDraft: isDraft,
    };

    const response: CommonResponseDTO =
        await EmploymentServices.createCurrentCandidateAcademicDetails(
            requestData as CandidateAcademicDetailRequestDTO,
        );

    return { response };
};

export const _submitExperienceInfoForm = async (
    isDraft: boolean,
    formData: Experience[],
) => {
    if (formData.length < 1) {
        getErrorToast();
        return fail(400);
    }
    const requestData: CandidateExperiencesDetailRequestDTO = {
        experiences: formData,
        isDraft: isDraft,
    };

    const response: CommonResponseDTO =
        await EmploymentServices.createCurrentCandidateExperienceDetails(
            requestData as CandidateExperiencesDetailRequestDTO,
        );

    return { response };
};

export const _submitActivityInfoForm = async (
    isDraft: boolean,
    formData: Activity[],
) => {
    if (formData.length < 1) {
        getErrorToast();
        return fail(400);
    }
    const requestData: CandidateActivityDetailRequestDTO = {
        activities: formData,
        isDraft: isDraft,
    };

    const response: CommonResponseDTO =
        await EmploymentServices.createCurrentCandidateActivityDetails(
            requestData as CandidateActivityDetailRequestDTO,
        );

    return { response };
};

export const _submitFamilyInfoForm = async (
    isDraft: boolean,
    formData: Family[],
) => {
    if (formData.length < 1) {
        getErrorToast();
        return fail(400);
    }
    const requestData: CandidateFamilyDetailRequestDTO = {
        dependencies: formData,
        isDraft: isDraft,
    };

    const response: CommonResponseDTO =
        await EmploymentServices.createCurrentCandidateFamilyDetails(
            requestData as CandidateFamilyDetailRequestDTO,
        );

    return { response };
};

export const _submitDependencyInfoForm = async (
    isDraft: boolean,
    formData: Dependency[],
) => {
    if (formData.length < 1) {
        getErrorToast();
        return fail(400);
    }
    const requestData: CandidateDependenciesDetailRequestDTO = {
        dependencies: formData,
        isDraft: isDraft,
    };

    const response: CommonResponseDTO =
        await EmploymentServices.createCurrentCandidateDependenciesDetails(
            requestData as CandidateDependenciesDetailRequestDTO,
        );

    return { response };
};

export const _submitNextOfKinInfoForm = async (
    isDraft: boolean,
    formData: NextOfKin[],
) => {
    if (formData.length < 1) {
        getErrorToast();
        return fail(400);
    }
    const requestData: CandidateNextOfKinDetailRequestDTO = {
        nextOfKins: formData,
        isDraft: isDraft,
    };

    const response: CommonResponseDTO =
        await EmploymentServices.createCurrentCandidateNextOfKinDetails(
            requestData as CandidateNextOfKinDetailRequestDTO,
        );

    return { response };
};