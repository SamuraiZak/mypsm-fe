import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant'
import type { CandidateIDRequestBody } from '$lib/dto/core/common/candidate-id-request.view-dto'
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto'
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto'
import type { RadioDTO } from '$lib/dto/core/radio/radio.dto'
import type { GetContractAcademicDetailDTO } from '$lib/dto/mypsm/kakitangan-kontrak/get-contract-academic-detail.dto'
import type { GetContractActivityDetailDTO } from '$lib/dto/mypsm/kakitangan-kontrak/get-contract-activity-detail.dto.js'
import type { GetContractDependencyDetailDTO } from '$lib/dto/mypsm/kakitangan-kontrak/get-contract-dependency-detail.dto.js'
import type { GetContractDocumentDTO } from '$lib/dto/mypsm/kakitangan-kontrak/get-contract-document.dto'
import type { GetContractExperienceDetailDTO } from '$lib/dto/mypsm/kakitangan-kontrak/get-contract-experience-detail.dto.js'
import type { GetContractNextOfKinDetailDTO } from '$lib/dto/mypsm/kakitangan-kontrak/get-contract-next-of-kin-detail.dto.js'
import type { GetContractPersonalDetailDTO } from '$lib/dto/mypsm/kakitangan-kontrak/get-contract-personal-detail.dto'
import type { GetContractSecretaryUpdateDTO } from '$lib/dto/mypsm/kakitangan-kontrak/get-contract-secretary-update.dto'
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service'
import { ContractEmployeeServices } from '$lib/services/implementation/mypsm/kakitangan-kontrak/contract-employee.service'
import { zod } from 'sveltekit-superforms/adapters'

export const load = async ({ params }) => {
    let currentRoleCode = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode)
    const contractId: CandidateIDRequestBody = {
        id: Number(params.id)
    }
    const inputOption = await getInputOption();

    //get contract personal detail
    const getContractPersonalDetailResponse: CommonResponseDTO =
        await ContractEmployeeServices.getRenewContractPersonalDetail(contractId);
    const getContractPersonalDetail: GetContractPersonalDetailDTO =
        getContractPersonalDetailResponse.data?.details as GetContractPersonalDetailDTO;
    const getAcademicRecordsResponse: CommonResponseDTO =
        await ContractEmployeeServices.getRenewContractAcademic(contractId)
    const getAcademicRecords: GetContractAcademicDetailDTO = 
        getAcademicRecordsResponse.data?.details as GetContractAcademicDetailDTO;
    const getExperienceRecordResponse: CommonResponseDTO =
        await ContractEmployeeServices.getRenewContractExperience(contractId)
    const getExperienceRecord: GetContractExperienceDetailDTO =
        getExperienceRecordResponse.data?.details as GetContractExperienceDetailDTO;
    const getActivityRecordResponse: CommonResponseDTO = 
        await ContractEmployeeServices.getRenewContractActivity(contractId);
    const getActivityRecord: GetContractActivityDetailDTO =
        getActivityRecordResponse.data?.details as GetContractActivityDetailDTO;
    const getFamilyRecordResponse: CommonResponseDTO = 
        await ContractEmployeeServices.getRenewContractFamily(contractId)
    const getFamilyRecord: GetContractDependencyDetailDTO =
        getFamilyRecordResponse.data?.details as GetContractDependencyDetailDTO;
    const getNonFamilyRecordResponse: CommonResponseDTO =
        await ContractEmployeeServices.getRenewContractNonFamily(contractId);
    const getNonFamilyRecord: GetContractDependencyDetailDTO =
        getNonFamilyRecordResponse.data?.details as GetContractDependencyDetailDTO;
    const getNextOfKinRecordResponse: CommonResponseDTO =
        await ContractEmployeeServices.getRenewContractNextOfKin(contractId);
    const getNextOfKinRecord: GetContractNextOfKinDetailDTO =
        getNextOfKinRecordResponse.data?.details as GetContractNextOfKinDetailDTO;
    const getContractDocumentResponse: CommonResponseDTO =
        await ContractEmployeeServices.getRenewContractDocument(contractId);
    const getContractDocument: GetContractDocumentDTO =
        getContractDocumentResponse.data?.details as GetContractDocumentDTO;
    const getContractInfoResponse: CommonResponseDTO =
        await ContractEmployeeServices.getRenewContractInfo(contractId);
    const getContractInfo: GetContractSecretaryUpdateDTO = 
        getContractInfoResponse.data?.details;

    return {
        currentRoleCode,
        getContractPersonalDetail,
        getAcademicRecords,
        getActivityRecord,
        getExperienceRecord,
        getFamilyRecord,
        getNonFamilyRecord,
        inputOption,
        getNextOfKinRecord,
        getContractDocument,
        getContractInfo,
    }
}

const getInputOption = async () => {

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
    const verifyOption: RadioDTO[] = [
        { name: "Sah", value: true },
        { name: "Tidak Sah", value: false }
    ]
    const commonOption: DropdownDTO[] = [
        { name: "Ya", value: true },
        { name: "Tidak", value: false }
    ]
    const supportOption: RadioDTO[] = [
        { name: "Sokong", value: true },
        { name: "Tidak Sokong", value: false }
    ]
    const approveOption: RadioDTO[] = [
        { name: "Lulus", value: true },
        { name: "Tidak Lulus", value: false }
    ]

    const meetingNameOption: DropdownDTO[] = [
        { value: 'Mesyuarat 1/12', name: 'Mesyuarat 1/12' },
        { value: 'Mesyuarat 1/102', name: 'Mesyuarat 1/102' },
        { value: 'Mesyuarat 2/101', name: 'Mesyuarat 2/101' },
    ]

    return {
        verifyOption,
        meetingNameOption,
        supportOption,
        approveOption,
        titleLookup,
        genderLookup,
        identityCardTypeLookup,
        stateLookup,
        nationalityLookup,
        raceLookup,
        maritalLookup,
        religionLookup,
        ethnicLookup,
        relationshipLookup,
        cityLookup,
        countryLookup,
        assetDeclarationLookup,
        institutionLookup,
        educationLookup,
        sponsorshipLookup,
        majorMinorLookup,
        placementLookup,
        positionLookup,
        serviceTypeLookup,
        commonOption,
    }
}
