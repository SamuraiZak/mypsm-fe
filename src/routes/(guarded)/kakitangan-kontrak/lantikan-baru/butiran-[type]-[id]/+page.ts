import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant";
import type { CandidateIDRequestBody } from "$lib/dto/core/common/candidate-id-request.view-dto.js";
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import type { DropdownDTO } from "$lib/dto/core/dropdown/dropdown.dto";
import type { RadioDTO } from "$lib/dto/core/radio/radio.dto.js";
import type { AddNewContractEmployeeAcademicDTO, ContractAcademic } from "$lib/dto/mypsm/kakitangan-kontrak/add-contract-academic.dto.js";
import type { AddNewContractEmployeeActivityDTO } from "$lib/dto/mypsm/kakitangan-kontrak/add-contract-activity.dto.js";
import type { AddNewContractEmployeeDependencyDTO } from "$lib/dto/mypsm/kakitangan-kontrak/add-contract-dependency.dto.js";
import type { AddNewContractEmployeeExperienceDTO } from "$lib/dto/mypsm/kakitangan-kontrak/add-contract-experience.dto.js";
import type { AddContractNextOfKinDTO } from "$lib/dto/mypsm/kakitangan-kontrak/add-contract-next-of-kin.dto.js";
import type { AddContractApproverSupporterDTO } from "$lib/dto/mypsm/kakitangan-kontrak/add-contract-supproter-approver.dto.js";
import type { EditNewContractEmployeeDetailDTO } from "$lib/dto/mypsm/kakitangan-kontrak/edit-new-contract-employee-detail.dto.js";
import type { AcademicList, GetContractAcademicDetailDTO } from "$lib/dto/mypsm/kakitangan-kontrak/get-contract-academic-detail.dto.js";
import type { GetContractActivityDetailDTO } from "$lib/dto/mypsm/kakitangan-kontrak/get-contract-activity-detail.dto.js";
import type { GetContractDependencyDetailDTO } from "$lib/dto/mypsm/kakitangan-kontrak/get-contract-dependency-detail.dto.js";
import type { GetContractDocumentDTO } from "$lib/dto/mypsm/kakitangan-kontrak/get-contract-document.dto.js";
import type { GetContractEmployeeNumberDTO } from "$lib/dto/mypsm/kakitangan-kontrak/get-contract-employee-number.dto.js";
import type { GetContractExperienceDetailDTO } from "$lib/dto/mypsm/kakitangan-kontrak/get-contract-experience-detail.dto.js";
import type { GetContractNextOfKinDetailDTO } from "$lib/dto/mypsm/kakitangan-kontrak/get-contract-next-of-kin-detail.dto.js";
import type { GetContractPersonalDetailDTO } from "$lib/dto/mypsm/kakitangan-kontrak/get-contract-personal-detail.dto.js";
import type { GetContracSecretaryResultDTO } from "$lib/dto/mypsm/kakitangan-kontrak/get-contract-secretary-result.dto";
import type { GetContractSecretaryUpdateDTO } from "$lib/dto/mypsm/kakitangan-kontrak/get-contract-secretary-update.dto";
import type { GetContractSupporterApproverResultDTO } from "$lib/dto/mypsm/kakitangan-kontrak/get-contract-supporter-approver-result.dto.js";
import type { GetContractSupporterApproverDTO } from "$lib/dto/mypsm/kakitangan-kontrak/get-contract-supporter-approver.dto";
import type { EditContractDetailSecretaryDTO } from "$lib/dto/mypsm/kakitangan-kontrak/update-contract-detail-secretary.dto.js";
import type { ContractCommonRoleResultDTO } from "$lib/dto/mypsm/kakitangan-kontrak/update-contract-secretary-result.dto.js";
import { getErrorToast } from "$lib/helpers/core/toast.helper";
import {
    _addContractAcademicSchema,
    _addContractActivitySchema,
    _addContractCommonRoleResult,
    _addContractExperienceSchema,
    _addContractSupporterApprover,
    _addContractViewSecretaryUpdate,
    _commonContractDependencySchema,
    _contractAcademicSchema,
    _editNewContractEmployeeSchema,
    _getContractEmployeeNumber,
    _uploadDocSchema,
} from '$lib/schemas/mypsm/contract-employee/contract-employee-schemas';
import { LookupServices } from "$lib/services/implementation/core/lookup/lookup.service";
import { ContractEmployeeServices } from "$lib/services/implementation/mypsm/kakitangan-kontrak/contract-employee.service";
import { error } from "@sveltejs/kit";
import { zod } from "sveltekit-superforms/adapters";
import { superValidate } from "sveltekit-superforms/client";

export const load = async ({ params }) => {
    const currentRoleCode: string | null = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode);
    const contractId: CandidateIDRequestBody = {
        id: Number(params.id)
    };
    let contractDocLink: string = ""
    let viewOnly: boolean = true;
    let getContractPersonalDetailResponse: CommonResponseDTO = {}
    let getContractPersonalDetail = {} as GetContractPersonalDetailDTO;
    let getContractAcedemicDetailsResponse: CommonResponseDTO = {};
    let getContractAcademicDetails = {} as GetContractAcademicDetailDTO;
    let getContractExperienceDetailsResponse: CommonResponseDTO = {};
    let getContractExperienceDetails = {} as GetContractExperienceDetailDTO;
    let getContractActivityDetailsResponse: CommonResponseDTO = {};
    let getContractActivityDetails = {} as GetContractActivityDetailDTO;
    let getContractFamilyDetailsResponse: CommonResponseDTO = {};
    let getContractFamilyDetails: GetContractDependencyDetailDTO = { dependenciesList: [], isReadonly: true };
    let getContractNonFamilyDetailsResponse: CommonResponseDTO = {};
    let getContractNonFamilyDetails: GetContractDependencyDetailDTO = { dependenciesList: [], isReadonly: true };
    let getContractNextOfKinDetailsResponse: CommonResponseDTO = {};
    let getContractNextOfKinDetails: GetContractNextOfKinDetailDTO = { nextOfKinList: [], isReadonly: true };
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

    if (params.type == "baru") {
        viewOnly = false;
        contractDocLink = getContractDocumentLink()
    } else if (params.type == "calon") {
        viewOnly = true;
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
    const editNewContractEmployeeDetailForm = await superValidate(getContractPersonalDetail, zod(_editNewContractEmployeeSchema));
    const academicDetailForm = await superValidate(zod(_addContractAcademicSchema));
    const experienceDetailForm = await superValidate(zod(_addContractExperienceSchema));
    const activityDetailForm = await superValidate(zod(_addContractActivitySchema));
    const familyDetailForm = await superValidate(zod(_commonContractDependencySchema));
    const dependantDetailForm = await superValidate(zod(_commonContractDependencySchema));
    const nextOfKinDetailForm = await superValidate(zod(_commonContractDependencySchema));
    const updateContractDetailForm = await superValidate(getSecretaryUpdate, zod(_addContractViewSecretaryUpdate))
    const secretaryContractResultForm = await superValidate(getSecretaryResult, zod(_addContractCommonRoleResult));
    const setSupporterApproverForm = await superValidate(getSupporterApprover, zod(_addContractSupporterApprover));
    const supporterContractResultForm = await superValidate(getSupporterResult, zod(_addContractCommonRoleResult));
    const approverContractResultForm = await superValidate(getApproverResult, zod(_addContractCommonRoleResult));
    const contractUploadDocumentForm = await superValidate(zod(_uploadDocSchema));
    const getContractEmployeeNumberForm = await superValidate(getContractEmployeeNumber,zod(_getContractEmployeeNumber))

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
        viewOnly,
        contractDocLink,
        getContractEmployeeNumberForm,
    }
}

export const _submitEditNewContractEmployeeDetailForm = async (formData: EditNewContractEmployeeDetailDTO) => {
    const form = await superValidate(formData, zod(_editNewContractEmployeeSchema));

    if (form.valid) {
        // const tempData: EditNewContractEmployeeDetailDTO = {
        //     birthDate: form.data.birthDate.toISOString().split('T')[0],
        //     propertyDeclarationDate: form.data.propertyDeclarationDate.toISOString().split('T')[0],
        //     genderId: form.data.genderId,
        //     nationalityId: form.data.nationalityId,
        //     religionId: form.data.religionId,
        //     raceId: form.data.raceId,
        //     titleId: form.data.titleId,
        //     ethnicId: form.data.ethnicId,
        //     maritalId: form.data.maritalId,
        //     birthCountryId: form.data.birthCountryId,
        //     birthStateId: form.data.birthStateId,
        //     phoneNumber: form.data.phoneNumber,
        //     assetDeclarationStatusId: form.data.assetDeclarationStatusId,
        //     name: form.data.name,
        //     alternativeName: form.data.alternativeName,
        //     identityDocumentColor: form.data.identityDocumentColor,
        //     identityDocumentNumber: form.data.identityDocumentNumber,
        //     email: form.data.email,
        //     homeAddress: form.data.homeAddress,
        //     homeCountryId: form.data.homeCountryId,
        //     homeStateId: form.data.homeStateId,
        //     homeCityId: form.data.homeCityId,
        //     homePostcode: form.data.homePostcode,
        //     mailAddress: form.data.mailAddress,
        //     mailCountryId: form.data.mailCountryId,
        //     mailStateId: form.data.mailStateId,
        //     mailCityId: form.data.mailCityId,
        //     mailPostcode: form.data.mailPostcode,
        //     isExPoliceOrSoldier: form.data.isExPoliceOrSoldier,
        //     isInternalRelationship: form.data.isInternalRelationship,
        //     employeeNumber: form.data.employeeNumber,
        //     relationshipId: form.data.relationshipId,
        // }
        const response: CommonResponseDTO =
            await ContractEmployeeServices.editNewContractEmployeeDetail(
                form.data as EditNewContractEmployeeDetailDTO
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

export const _submitAcademicDetailForm = async (formData: AddNewContractEmployeeAcademicDTO) => {
    // formData.academics.map((convert) => convert.completionDate = convert.completionDate.toString().split('T')[0])
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
    // formData.activities.map((convert) => {
    //     convert.joinDate = convert.joinDate.toString().split('T')[0];
    // })
    const response: CommonResponseDTO =
        await ContractEmployeeServices.addNewContractEmployeeActivity(
            formData
        )
    return { response }
};
export const _submitFamilyDetailForm = async (formData: AddNewContractEmployeeDependencyDTO) => {
    // formData.dependencies.map((convert) => {
    //     convert.birthDate = convert.birthDate.toString().split('T')[0];
    //     if (convert.marriageDate !== null) {
    //         convert.marriageDate = convert.marriageDate.toString().split('T')[0];
    //     }
    // })
    const response: CommonResponseDTO =
        await ContractEmployeeServices.addNewContractEmployeeFamily(
            formData
        )
    return { response }
}
export const _submitDependantDetailForm = async (formData: AddNewContractEmployeeDependencyDTO) => {
    // formData.dependencies.map((convert) => {
    //     convert.birthDate = convert.birthDate.toString().split('T')[0];
    //     if (convert.marriageDate !== null) {
    //         convert.marriageDate = convert.marriageDate.toString().split('T')[0];
    //     }
    // })
    const response: CommonResponseDTO =
        await ContractEmployeeServices.addNewContractEmployeeDependency(
            formData
        )

    return { response }
};
export const _submitNextOfKinForm = async (formData: AddContractNextOfKinDTO) => {
    // formData.nextOfKins.map((convert) => {
    //     convert.birthDate = convert.birthDate.toString().split('T')[0];
    //     if (convert.marriageDate !== null) {
    //         convert.marriageDate = convert.marriageDate.toString().split('T')[0];
    //     }
    // })
    const response: CommonResponseDTO =
        await ContractEmployeeServices.addNewContractEmployeeNextOfKin(
            formData
        )
    return { response }
};
export const _submitDocumentForm = async (file: File | null | undefined) => {
    const documentData = new FormData();
    documentData.append('document', file as File);
    const form = await superValidate(documentData, zod(_uploadDocSchema));
    console.log(documentData)
    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    } else if (form.valid) {
        const response: CommonResponseDTO =
            await ContractEmployeeServices.addNewContractEmployeeDocument(documentData);
        return { response };
    }

};
export const _submitUpdateContractDetailForm = async (formData: EditContractDetailSecretaryDTO) => {
    const form = await superValidate(formData, zod(_addContractViewSecretaryUpdate));
    if (form.valid) {
        // const tempData: EditContractDetailSecretaryDTO = {
        //     candidateId: form.data.candidateId,
        //     startContract: form.data.startContract.toISOString().split('T')[0],
        //     endContract: form.data.endContract.toISOString().split('T')[0],
        //     reportDutyDate: form.data.reportDutyDate.toISOString().split('T')[0],
        //     effectiveDate: form.data.effectiveDate.toISOString().split('T')[0],
        //     civilServiceStartDate: form.data.civilServiceStartDate.toISOString().split('T')[0],
        //     lkimServiceStartDate: form.data.lkimServiceStartDate.toISOString().split('T')[0],
        //     currentServiceStartDate: form.data.currentServiceStartDate.toISOString().split('T')[0],
        //     firstConfirmServiceDate: form.data.firstConfirmServiceDate.toISOString().split('T')[0],
        //     currentConfirmServiceDate: form.data.currentConfirmServiceDate.toISOString().split('T')[0],
        //     wageRate: form.data.wageRate,
        //     placementId: form.data.placementId,
        //     designation: form.data.designation,
        //     kwspNo: form.data.kwspNo,
        //     socsoNo: form.data.socsoNo,
        //     taxNo: form.data.taxNo,
        //     bankName: form.data.bankName,
        //     bankAccount: form.data.bankAccount,
        //     serviceTypeId: form.data.serviceTypeId,
        //     leaveEntitlement: form.data.leaveEntitlement,
        // }
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

export const _submitSecretaryContractResultForm = async (formData: ContractCommonRoleResultDTO) => {
    const form = await superValidate(formData, zod(_addContractCommonRoleResult));
    console.log(form)
    if (form.valid) {
        const response: CommonResponseDTO =
            await ContractEmployeeServices.addContractSecretaryResult(
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
export const _submitSetSupporterApproverForm = async (formData: AddContractApproverSupporterDTO) => {
    const form = await superValidate(formData, zod(_addContractSupporterApprover));

    if (form.valid) {
        const response: CommonResponseDTO =
            await ContractEmployeeServices.addContractApproverSupporter(
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

export const _submitSupporterContractResultForm = async (formData: object) => {
    const form = await superValidate(formData, zod(_addContractCommonRoleResult));
    
    if (form.valid) {
        const {name, ...tempObj} = form.data
        const response: CommonResponseDTO =
            await ContractEmployeeServices.addContractSupporterResult(
                tempObj as ContractCommonRoleResultDTO
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

export const _submitApproverContractResultForm = async (formData: ContractCommonRoleResultDTO) => {
    const form = await superValidate(formData, zod(_addContractCommonRoleResult));
   
    if (form.valid) {
        const response: CommonResponseDTO =
            await ContractEmployeeServices.addContractApproverResult(
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
    }
}

const getContractDocumentLink = () => {
    const url = "http://localhost:3333/contracts/document/template"

    return url
}