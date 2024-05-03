import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant";
import type { CandidateIDRequestBody } from "$lib/dto/core/common/candidate-id-request.view-dto";
import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import type { DropdownDTO } from "$lib/dto/core/dropdown/dropdown.dto";
import type { RadioDTO } from "$lib/dto/core/radio/radio.dto";
import type { AddNewContractEmployeeAcademicDTO } from "$lib/dto/mypsm/kakitangan-kontrak/add-contract-academic.dto";
import type { AddNewContractEmployeeActivityDTO } from "$lib/dto/mypsm/kakitangan-kontrak/add-contract-activity.dto";
import type { AddNewContractEmployeeDependencyDTO } from "$lib/dto/mypsm/kakitangan-kontrak/add-contract-dependency.dto";
import type { AddNewContractEmployeeExperienceDTO } from "$lib/dto/mypsm/kakitangan-kontrak/add-contract-experience.dto";
import type { AddContractNextOfKinDTO } from "$lib/dto/mypsm/kakitangan-kontrak/add-contract-next-of-kin.dto";
import type { AddContractApproverSupporterDTO } from "$lib/dto/mypsm/kakitangan-kontrak/add-contract-supproter-approver.dto";
import type { EditNewContractEmployeeDetailDTO } from "$lib/dto/mypsm/kakitangan-kontrak/edit-new-contract-employee-detail.dto";
import type { GetContractAcademicDetailDTO } from "$lib/dto/mypsm/kakitangan-kontrak/get-contract-academic-detail.dto";
import type { GetContractActivityDetailDTO } from "$lib/dto/mypsm/kakitangan-kontrak/get-contract-activity-detail.dto";
import type { GetContractDependencyDetailDTO } from "$lib/dto/mypsm/kakitangan-kontrak/get-contract-dependency-detail.dto";
import type { GetContractDocumentDTO } from "$lib/dto/mypsm/kakitangan-kontrak/get-contract-document.dto";
import type { GetContractEmployeeNumberDTO } from "$lib/dto/mypsm/kakitangan-kontrak/get-contract-employee-number.dto";
import type { GetContractExperienceDetailDTO } from "$lib/dto/mypsm/kakitangan-kontrak/get-contract-experience-detail.dto";
import type { GetContractNextOfKinDetailDTO } from "$lib/dto/mypsm/kakitangan-kontrak/get-contract-next-of-kin-detail.dto";
import type { GetContractPersonalDetailDTO } from "$lib/dto/mypsm/kakitangan-kontrak/get-contract-personal-detail.dto";
import type { GetContracSecretaryResultDTO } from "$lib/dto/mypsm/kakitangan-kontrak/get-contract-secretary-result.dto";
import type { GetContractSecretaryUpdateDTO } from "$lib/dto/mypsm/kakitangan-kontrak/get-contract-secretary-update.dto";
import type { GetContractSupporterApproverResultDTO } from "$lib/dto/mypsm/kakitangan-kontrak/get-contract-supporter-approver-result.dto";
import type { GetContractSupporterApproverDTO } from "$lib/dto/mypsm/kakitangan-kontrak/get-contract-supporter-approver.dto";
import type { EditContractDetailSecretaryDTO } from "$lib/dto/mypsm/kakitangan-kontrak/update-contract-detail-secretary.dto";
import type { ContractCommonRoleResultDTO } from "$lib/dto/mypsm/kakitangan-kontrak/update-contract-secretary-result.dto";
import {
    _addContractAcademicSchema,
    _addContractActivitySchema,
    _addContractCommonRoleResult,
    _addContractExperienceSchema,
    _addContractSupporterApprover,
    _addContractViewSecretaryUpdate,
    _commonContractDependencySchema,
    _editNewContractEmployeeSchema,
    _getContractEmployeeNumber,
    _uploadDocSchema,
} from '$lib/schemas/mypsm/contract-employee/contract-employee-schemas';
import { LookupServices } from "$lib/services/implementation/core/lookup/lookup.service";
import { ContractEmployeeServices } from "$lib/services/implementation/mypsm/kakitangan-kontrak/contract-employee.service";
import { zod } from "sveltekit-superforms/adapters";
import { superValidate } from "sveltekit-superforms/client";

export const load = async ({ params }) => {
    const currentRoleCode = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode);
    const contractId: CandidateIDRequestBody = {
        id: Number(params.id)
    };
    let contractDocLink: string = getContractDocumentLink()
    let getContractPersonalDetailResponse: CommonResponseDTO = {}
    let getContractPersonalDetail = {} as GetContractPersonalDetailDTO;
    let getContractAcedemicDetailsResponse: CommonResponseDTO = {};
    let getContractAcademicDetails: GetContractAcademicDetailDTO = { academicList: [], isReadonly: false };
    let getContractExperienceDetailsResponse: CommonResponseDTO = {};
    let getContractExperienceDetails: GetContractExperienceDetailDTO = { experienceList: [], isReadonly: false };
    let getContractActivityDetailsResponse: CommonResponseDTO = {};
    let getContractActivityDetails: GetContractActivityDetailDTO = { activityList: [], isReadonly: false };
    let getContractFamilyDetailsResponse: CommonResponseDTO = {};
    let getContractFamilyDetails: GetContractDependencyDetailDTO = { dependenciesList: [], isReadonly: false };
    let getContractNonFamilyDetailsResponse: CommonResponseDTO = {};
    let getContractNonFamilyDetails: GetContractDependencyDetailDTO = { dependenciesList: [], isReadonly: false };
    let getContractNextOfKinDetailsResponse: CommonResponseDTO = {};
    let getContractNextOfKinDetails: GetContractNextOfKinDetailDTO = { nextOfKinList: [], isReadonly: false };
    let getContractDocumentsResponse: CommonResponseDTO = {};
    let getContractDocuments = {} as GetContractDocumentDTO;
    let getContractSecretaryUpdateResponse: CommonResponseDTO = {};
    let getSecretaryUpdate = {} as GetContractSecretaryUpdateDTO;
    let getContractSecretaryResultResponse: CommonResponseDTO = {};
    let getSecretaryResult = {} as GetContracSecretaryResultDTO;
    let getContractSupporterApproverResponse: CommonResponseDTO = {};
    let getSupporterApprover = {} as GetContractSupporterApproverDTO;
    let getContractSupporterResultResponse: CommonResponseDTO = {};
    let getSupporterResult = {} as GetContractSupporterApproverResultDTO;
    let getContractApproverResultResponse: CommonResponseDTO = {};
    let getApproverResult = {} as GetContractSupporterApproverResultDTO;
    let getContractEmployeeNumberResponse: CommonResponseDTO = {};
    let getContractEmployeeNumber = {} as GetContractEmployeeNumberDTO;

    const lookup = await getLookup();

    // ========================== get personal detail
    getContractPersonalDetailResponse =
        await ContractEmployeeServices.getContractPersonalDetail(contractId)
    getContractPersonalDetail =
        await getContractPersonalDetailResponse.data?.details as GetContractPersonalDetailDTO;

    // ========================== get academic detail
    getContractAcedemicDetailsResponse =
        await ContractEmployeeServices.getContractAcademicDetail(contractId)
    getContractAcademicDetails =
        await getContractAcedemicDetailsResponse.data?.details as GetContractAcademicDetailDTO;

    // ========================== get experience detail
    getContractExperienceDetailsResponse =
        await ContractEmployeeServices.getContractExperienceDetail(contractId)
    getContractExperienceDetails =
        await getContractExperienceDetailsResponse.data?.details as GetContractExperienceDetailDTO;

    // ========================== get activity detail
    getContractActivityDetailsResponse =
        await ContractEmployeeServices.getContractActivityDetail(contractId)
    getContractActivityDetails =
        await getContractActivityDetailsResponse.data?.details as GetContractActivityDetailDTO;

    // ========================== get family detail
    getContractFamilyDetailsResponse =
        await ContractEmployeeServices.getContractFamilyDetail(contractId)
    getContractFamilyDetails =
        await getContractFamilyDetailsResponse.data?.details as GetContractDependencyDetailDTO;

    // ========================== get non family detail
    getContractNonFamilyDetailsResponse =
        await ContractEmployeeServices.getContractNonFamilyDetail(contractId)
    getContractNonFamilyDetails =
        await getContractNonFamilyDetailsResponse.data?.details as GetContractDependencyDetailDTO;

    // ========================== get next of kin detail
    getContractNextOfKinDetailsResponse =
        await ContractEmployeeServices.getContractNextOfKinDetail(contractId)
    getContractNextOfKinDetails =
        await getContractNextOfKinDetailsResponse.data?.details as GetContractNextOfKinDetailDTO;

    // ========================== get uploaded documents
    getContractDocumentsResponse =
        await ContractEmployeeServices.getContractDocument(contractId)
    getContractDocuments =
        await getContractDocumentsResponse.data?.details as GetContractDocumentDTO;
    // ========================== get secretary update
    getContractSecretaryUpdateResponse =
        await ContractEmployeeServices.getContractSecretaryUpdate(contractId)
    getSecretaryUpdate =
        await getContractSecretaryUpdateResponse.data?.details as GetContractSecretaryUpdateDTO;
    // ========================== get secretary result
    getContractSecretaryResultResponse =
        await ContractEmployeeServices.getContractSecretaryResult(contractId)
    getSecretaryResult =
        await getContractSecretaryResultResponse.data?.details as GetContracSecretaryResultDTO;
    // ========================== get assigned supporter and approver
    if (getContractDocumentsResponse.status == "success") {
        getContractSupporterApproverResponse =
            await ContractEmployeeServices.getContractSupporterApprover(contractId)
        getSupporterApprover =
            await getContractSupporterApproverResponse.data?.details as GetContractSupporterApproverDTO;
        // ========================== get assigned supporter result
        getContractSupporterResultResponse =
            await ContractEmployeeServices.getContractSupporterResult(contractId)
        getSupporterResult =
            await getContractSupporterResultResponse.data?.details as GetContractSupporterApproverResultDTO;
        // ========================== get assigned approver result
        getContractApproverResultResponse =
            await ContractEmployeeServices.getContractApproverResult(contractId)
        getApproverResult =
            await getContractApproverResultResponse.data?.details as GetContractSupporterApproverResultDTO;
        // ========================== get contract employee number 
        getContractEmployeeNumberResponse =
            await ContractEmployeeServices.getContractEmployeeNumber(contractId)
        getContractEmployeeNumber =
            await getContractEmployeeNumberResponse.data?.details as GetContractEmployeeNumberDTO;
    }

    //form validation
    const editNewContractEmployeeDetailForm = await superValidate(getContractPersonalDetail, zod(_editNewContractEmployeeSchema), { errors: false });
    const academicDetailForm = await superValidate(zod(_addContractAcademicSchema));
    const experienceDetailForm = await superValidate(zod(_addContractExperienceSchema));
    const activityDetailForm = await superValidate(zod(_addContractActivitySchema));
    const familyDetailForm = await superValidate(zod(_commonContractDependencySchema));
    const dependantDetailForm = await superValidate(zod(_commonContractDependencySchema));
    const nextOfKinDetailForm = await superValidate(zod(_commonContractDependencySchema));
    const updateContractDetailForm = await superValidate(getSecretaryUpdate, zod(_addContractViewSecretaryUpdate), { errors: false });
    const secretaryContractResultForm = await superValidate(getSecretaryResult, zod(_addContractCommonRoleResult), { errors: false });
    const setSupporterApproverForm = await superValidate(getSupporterApprover, zod(_addContractSupporterApprover), { errors: false });
    const supporterContractResultForm = await superValidate(getSupporterResult, zod(_addContractCommonRoleResult), { errors: false });
    const approverContractResultForm = await superValidate(getApproverResult, zod(_addContractCommonRoleResult), { errors: false });
    const contractUploadDocumentForm = await superValidate(zod(_uploadDocSchema));
    const getContractEmployeeNumberForm = await superValidate(getContractEmployeeNumber, zod(_getContractEmployeeNumber), { errors: false });

    return {
        currentRoleCode,
        contractId,
        editNewContractEmployeeDetailForm,
        contractUploadDocumentForm,
        academicDetailForm,
        experienceDetailForm,
        activityDetailForm,
        familyDetailForm,
        dependantDetailForm,
        nextOfKinDetailForm,
        updateContractDetailForm,
        secretaryContractResultForm,
        supporterContractResultForm,
        setSupporterApproverForm,
        approverContractResultForm,
        getContractAcedemicDetailsResponse,
        getContractAcademicDetails,
        getContractExperienceDetails,
        getContractActivityDetails,
        getContractFamilyDetails,
        getContractNonFamilyDetails,
        getContractNextOfKinDetails,
        getContractDocuments,
        lookup,
        contractDocLink,
        getContractEmployeeNumberForm,
        getSecretaryResult,
    }
}

export const _submitEditNewContractEmployeeDetailForm = async (formData: EditNewContractEmployeeDetailDTO) => {
    const form = await superValidate(formData, zod(_editNewContractEmployeeSchema));

    if (form.valid) {
        const { isReadonly, employeeName, employeePosition, ...tempObj } = form.data
        const response: CommonResponseDTO =
            await ContractEmployeeServices.editNewContractEmployeeDetail(
                tempObj as EditNewContractEmployeeDetailDTO
            )
        return { response }
    }
};

export const _submitAcademicDetailForm = async (formData: AddNewContractEmployeeAcademicDTO) => {
    const response: CommonResponseDTO =
        await ContractEmployeeServices.addNewContractEmployeeAcademic(
            formData
        )
    return { response }
};

export const _submitExperienceDetailForm = async (formData: AddNewContractEmployeeExperienceDTO) => {
    const response: CommonResponseDTO =
        await ContractEmployeeServices.addNewContractEmployeeExperience(
            formData
        )
    return { response }
};

export const _submitActivityDetailForm = async (formData: AddNewContractEmployeeActivityDTO) => {
    const response: CommonResponseDTO =
        await ContractEmployeeServices.addNewContractEmployeeActivity(
            formData
        )
    return { response }
};
export const _submitFamilyDetailForm = async (formData: AddNewContractEmployeeDependencyDTO) => {
    const response: CommonResponseDTO =
        await ContractEmployeeServices.addNewContractEmployeeFamily(
            formData
        )
    return { response }
}
export const _submitDependantDetailForm = async (formData: AddNewContractEmployeeDependencyDTO) => {
    const response: CommonResponseDTO =
        await ContractEmployeeServices.addNewContractEmployeeDependency(
            formData
        )

    return { response }
};
export const _submitNextOfKinForm = async (formData: AddContractNextOfKinDTO) => {
    const response: CommonResponseDTO =
        await ContractEmployeeServices.addNewContractEmployeeNextOfKin(
            formData
        )
    return { response }
};
export const _submitDocumentForm = async (formData: string) => {

    const response: CommonResponseDTO =
        await ContractEmployeeServices.addNewContractEmployeeDocument(formData);
    return { response };


};
export const _submitUpdateContractDetailForm = async (formData: EditContractDetailSecretaryDTO) => {
    const form = await superValidate(formData, zod(_addContractViewSecretaryUpdate));
    if (form.valid) {
        const response: CommonResponseDTO =
            await ContractEmployeeServices.updateContractDetail(
                form.data
            )
        if (form.valid) {
            const result: string | null = 'success';
            return { response, result };
        } else {
            const result: string | null = 'fail';
            return { response, result };
        }
    }
};

export const _submitSecretaryContractResultForm = async (formData: GetContracSecretaryResultDTO) => {
    const form = await superValidate(formData, zod(_addContractCommonRoleResult));

    if (form.valid) {
        const { isReadonly, name, ...tempObj } = form.data
        const response: CommonResponseDTO =
            await ContractEmployeeServices.addContractSecretaryResult(
                tempObj as GetContracSecretaryResultDTO
            )

        return { response }
    }
};
export const _submitSetSupporterApproverForm = async (formData: AddContractApproverSupporterDTO) => {
    const form = await superValidate(formData, zod(_addContractSupporterApprover));
    if (form.valid) {
        const { isReadonly, ...tempObj } = form.data
        const response: CommonResponseDTO =
            await ContractEmployeeServices.addContractApproverSupporter(
                tempObj as AddContractApproverSupporterDTO
            )
        if (response.status == "success") {
            return { response }
        }
    }
};

export const _submitSupporterContractResultForm = async (formData: ContractCommonRoleResultDTO) => {
    const form = await superValidate(formData, zod(_addContractCommonRoleResult));

    if (form.valid) {
        const { name, isReadonly, ...tempObj } = form.data
        const response: CommonResponseDTO =
            await ContractEmployeeServices.addContractSupporterResult(
                tempObj as ContractCommonRoleResultDTO
            )
        return { response }
    }
};

export const _submitApproverContractResultForm = async (formData: ContractCommonRoleResultDTO) => {
    const form = await superValidate(formData, zod(_addContractCommonRoleResult));
    console.log(form)
    if (form.valid) {
        const { name, isReadonly, ...tempObj } = form.data
        const response: CommonResponseDTO =
            await ContractEmployeeServices.addContractApproverResult(
                tempObj as ContractCommonRoleResultDTO
            )
        if (response.status == "success") {
            return { response }
        }
    }
};
export const _submitGetContractEmployeeNumberForm = async (contractId: CandidateIDRequestBody) => {
    const response: CommonResponseDTO =
        await ContractEmployeeServices.getContractEmployeeNumber(
            contractId,
        );

    return response
};

const getLookup = async () => {

    // =======================================================
    // Dropdown Lookup =======================================
    // =======================================================
    const genderLookupResponse: CommonResponseDTO =
        await LookupServices.getGenderEnums();

    const genderLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(genderLookupResponse);
    // -------------------------------------------------------
    const identityCardTypeLookupResponse: CommonResponseDTO =
        await LookupServices.getIdentityCardColor();

    const identityCardTypeLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsInString(identityCardTypeLookupResponse)
    // -------------------------------------------------------
    const stateLookupResponse: CommonResponseDTO =
        await LookupServices.getStateEnums();

    const stateLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(stateLookupResponse)
    // -------------------------------------------------------
    const nationalityLookupResponse: CommonResponseDTO =
        await LookupServices.getNationalityEnums();

    const nationalityLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(nationalityLookupResponse)
    // -------------------------------------------------------
    const raceLookupResponse: CommonResponseDTO =
        await LookupServices.getRaceEnums();

    const raceLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(raceLookupResponse)
    // -------------------------------------------------------
    const titleLookupResponse: CommonResponseDTO =
        await LookupServices.getTitleEnums();

    const titleLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(titleLookupResponse);
    // -------------------------------------------------------
    const maritalLookupResponse: CommonResponseDTO =
        await LookupServices.getMaritalEnums();

    const maritalLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(maritalLookupResponse)
    // -------------------------------------------------------
    const religionLookupResponse: CommonResponseDTO =
        await LookupServices.getReligionEnums();

    const religionLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(religionLookupResponse)
    // -------------------------------------------------------
    const ethnicLookupResponse: CommonResponseDTO =
        await LookupServices.getEthnicEnums();

    const ethnicLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(ethnicLookupResponse)
    // -------------------------------------------------------
    const relationshipLookupResponse: CommonResponseDTO =
        await LookupServices.getRelationshipEnums();

    const relationshipLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        relationshipLookupResponse,
    );

    const relationshipIsFamilyRequest: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 350,
        orderBy: null,
        orderType: 0,
        filter: {
            code: "",
            description: "",
            isFamily: true
        },
    }
    const relationshipIsFamilyResponse: CommonResponseDTO =
        await LookupServices.getRelationshipFamily(relationshipIsFamilyRequest);
    const relationshipIsFamily: DropdownDTO[] = LookupServices.setSelectOptions(
        relationshipIsFamilyResponse,
    )
    const relationshipIsNonFamilyRequest: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 350,
        orderBy: null,
        orderType: 0,
        filter: {
            code: "",
            description: "",
            isFamily: false
        },
    }
    const relationshipIsNonFamilyResponse: CommonResponseDTO =
        await LookupServices.getRelationshipFamily(relationshipIsNonFamilyRequest);
    const relationshipIsNonFamily: DropdownDTO[] = LookupServices.setSelectOptions(
        relationshipIsNonFamilyResponse,
    )
    // -------------------------------------------------------
    const cityLookupResponse: CommonResponseDTO =
        await LookupServices.getCityEnums();

    const cityLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(cityLookupResponse);
    // -------------------------------------------------------
    const countryLookupResponse: CommonResponseDTO =
        await LookupServices.getCountryEnums();

    const countryLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        countryLookupResponse,
    );
    // -------------------------------------------------------
    const assetDeclarationLookupResponse: CommonResponseDTO =
        await LookupServices.getPropertyDeclarationEnums();

    const assetDeclarationLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(assetDeclarationLookupResponse);
    // -------------------------------------------------------
    const institutionLookupResponse: CommonResponseDTO =
        await LookupServices.getInstitutionEnums();

    const institutionLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        institutionLookupResponse,
    );
    // -------------------------------------------------------
    const educationLookupResponse: CommonResponseDTO =
        await LookupServices.getHighestEducationEnums();

    const educationLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        educationLookupResponse,
    );
    // -------------------------------------------------------
    const sponsorshipLookupResponse: CommonResponseDTO =
        await LookupServices.getSponsorshipEnums();

    const sponsorshipLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        sponsorshipLookupResponse,
    );
    // -------------------------------------------------------
    const majorMinorLookupResponse: CommonResponseDTO =
        await LookupServices.getMajorMinorEnums();

    const majorMinorLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        majorMinorLookupResponse,
    );
    // -------------------------------------------------------
    const placementLookupResponse: CommonResponseDTO =
        await LookupServices.getPlacementEnums();

    const placementLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        placementLookupResponse,
    );
    // -------------------------------------------------------
    const positionLookupResponse: CommonResponseDTO =
        await LookupServices.getPositionEnums();

    const positionLookup: DropdownDTO[] = LookupServices.setSelectOptionsValueIsDescription(
        positionLookupResponse,
    );
    // -------------------------------------------------------
    const serviceTypeLookupResponse: CommonResponseDTO =
        await LookupServices.getServiceTypeEnums();

    const serviceTypeLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        serviceTypeLookupResponse,
    );
    // -------------------------------------------------------
    const suppAppResponse: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 10000,
        orderBy: 'name',
        orderType: 0,
        filter: {
            program: "TETAP",
            employeeNumber: null,
            name: null,
            identityCard: null,
            scheme: null,
            grade: null,
            position: null,
        },
    }
    const supporterApproverResponse: CommonResponseDTO =
        await LookupServices.getEmployeeList(suppAppResponse);

    const supporterApproverLookup: DropdownDTO[] = LookupServices.setSelectOptionSupporterAndApprover(
        supporterApproverResponse,
    );

    const supportOption: RadioDTO[] = [
        { name: "Sokong", value: true },
        { name: "Tidak Sokong", value: false }
    ]
    const approveOption: RadioDTO[] = [
        { name: "Lulus", value: true },
        { name: "Tidak Lulus", value: false }
    ]
    return {
        genderLookup,
        identityCardTypeLookup,
        nationalityLookup,
        raceLookup,
        maritalLookup,
        religionLookup,
        stateLookup,
        ethnicLookup,
        relationshipLookup,
        countryLookup,
        titleLookup,
        cityLookup,
        assetDeclarationLookup,
        institutionLookup,
        educationLookup,
        sponsorshipLookup,
        majorMinorLookup,
        placementLookup,
        positionLookup,
        serviceTypeLookup,
        supportOption,
        approveOption,
        supporterApproverLookup,
        relationshipIsFamily,
        relationshipIsNonFamily,
    }
}

const getContractDocumentLink = () => {
    const url = "http://localhost:3333/contracts/document/template"

    return url
}

export function _fileToBase64Object(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            if (event.target && event.target.result) {
                const base64String = event.target.result.toString().split(",")[1];
                const resultObject = {
                    document: {

                        base64: base64String,
                        name: file.name
                    }
                };
                resolve(JSON.stringify(resultObject));
            } else {
                reject(new Error('Failed to read file.'));
            }
        };

        reader.onerror = () => {
            reject(new Error('Failed to read file.'));
        };

        reader.readAsDataURL(file);
    });
}