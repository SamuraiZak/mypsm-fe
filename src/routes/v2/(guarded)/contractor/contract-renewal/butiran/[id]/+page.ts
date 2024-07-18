import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant'
import type { CandidateIDRequestBody } from '$lib/dto/core/common/candidate-id-request.view-dto'
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto'
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto'
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto'
import type { RadioDTO } from '$lib/dto/core/radio/radio.dto'
import type { GetContractAcademicDetailDTO } from '$lib/dto/mypsm/kakitangan-kontrak/get-contract-academic-detail.dto'
import type { GetContractActivityDetailDTO } from '$lib/dto/mypsm/kakitangan-kontrak/get-contract-activity-detail.dto'
import type { GetContractDependencyDetailDTO } from '$lib/dto/mypsm/kakitangan-kontrak/get-contract-dependency-detail.dto'
import type { GetContractDocumentDTO, RenewContractDocument } from '$lib/dto/mypsm/kakitangan-kontrak/get-contract-document.dto'
import type { GetContractExperienceDetailDTO } from '$lib/dto/mypsm/kakitangan-kontrak/get-contract-experience-detail.dto'
import type { GetContractNextOfKinDetailDTO } from '$lib/dto/mypsm/kakitangan-kontrak/get-contract-next-of-kin-detail.dto'
import type { GetContractPersonalDetailDTO } from '$lib/dto/mypsm/kakitangan-kontrak/get-contract-personal-detail.dto'
import type { GetContractSecretaryUpdateDTO } from '$lib/dto/mypsm/kakitangan-kontrak/get-contract-secretary-update.dto'
import type { RenewContractMeeting } from '$lib/dto/mypsm/kakitangan-kontrak/renew-contract-meeting.dto.js'
import type { RenewContractAddPerfomance, RenewContractGetPerfomance } from '$lib/dto/mypsm/kakitangan-kontrak/renew-contract-performance.dto.js'
import type { RenewContractSecretaryUpdate } from '$lib/dto/mypsm/kakitangan-kontrak/renew-contract-secretary-update.dto.js'
import type { RenewContractSuppAppApproval, RenewContractSupporterApprover } from '$lib/dto/mypsm/kakitangan-kontrak/renew-contract-supp-app.dto.js'
import { _addContractCommonRoleResult, _addPerformanceSchema, _contractDocumentSchema, _contractMeetingSchema, _renewContractSecretaryUpdateSchema, _renewContractSupporterApproverSchema } from '$lib/schemas/mypsm/contract-employee/contract-employee-schemas.js'
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service'
import { ContractEmployeeServices } from '$lib/services/implementation/mypsm/kakitangan-kontrak/contract-employee.service'
import { superValidate } from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters'

export const load = async ({ params, parent }) => {
    const { layoutData } = await parent();

    const currentRoleCode: string = layoutData.accountDetails.currentRoleCode
    const contractId: CandidateIDRequestBody = {
        id: Number(params.id)
    }
    const inputOption = await getInputOption();

    let getContractPerformanceDetail = {} as RenewContractGetPerfomance;
    let getContractMeetingDetail = {} as RenewContractMeeting;
    let getSupporterApprover = {} as RenewContractSupporterApprover;
    let getSupporterApproval = {} as RenewContractSuppAppApproval;
    let getApproverApproval = {} as RenewContractSuppAppApproval;
    let getSecretaryUpdate = {} as RenewContractSecretaryUpdate;
    let getSecretaryApproval = {} as RenewContractSuppAppApproval;
    let getRenewContractDocument = {} as GetContractDocumentDTO;
    let getRenewDocumentTemplate = {} as RenewContractDocument;
    let contractDocLink: string = getContractDocumentLink()
    
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
    const getRenewDocumentTemplateRes: CommonResponseDTO = 
        await ContractEmployeeServices.getRenewTemplate();
    getRenewDocumentTemplate = 
        getRenewDocumentTemplateRes.data?.details as RenewContractDocument;
    const getContractDocument: GetContractDocumentDTO =
        getContractDocumentResponse.data?.details as GetContractDocumentDTO;
    const getContractInfoResponse: CommonResponseDTO =
        await ContractEmployeeServices.getRenewContractInfo(contractId);
    const getContractInfo: GetContractSecretaryUpdateDTO =
        getContractInfoResponse.data?.details;
    //contract performance detail
    const getContractPerformanceDetailResponse: CommonResponseDTO =
        await ContractEmployeeServices.getRenewContractPerformance(contractId);
    getContractPerformanceDetail =
        getContractPerformanceDetailResponse.data?.details as RenewContractGetPerfomance;
    //contract meeting detail
    const getContractMeetingDetailResponse: CommonResponseDTO =
        await ContractEmployeeServices.getRenewContractMeeting(contractId);
    getContractMeetingDetail =
        getContractMeetingDetailResponse.data?.details as RenewContractMeeting;
    //contract assigned supporter and approver
    const getSupporterApproverResponse: CommonResponseDTO =
        await ContractEmployeeServices.getRenewContractSupporterApprover(contractId);
    getSupporterApprover =
        getSupporterApproverResponse.data?.details as RenewContractSupporterApprover;
    //contract assigned supporter result
    const getSupporterApprovalResponse: CommonResponseDTO =
        await ContractEmployeeServices.getRenewContractSupporterApproval(contractId);
    getSupporterApproval =
        getSupporterApprovalResponse.data?.details as RenewContractSuppAppApproval;
    //contract assigned approver result
    const getApproverApprovalResponse: CommonResponseDTO =
        await ContractEmployeeServices.getRenewContractApproverApproval(contractId);
    getApproverApproval =
        getApproverApprovalResponse.data?.details as RenewContractSuppAppApproval;
    //updated contract detail
    const getSecretaryUpdateResponse: CommonResponseDTO =
        await ContractEmployeeServices.getRenewContractSecretaryUpdate(contractId);
    getSecretaryUpdate =
        getSecretaryUpdateResponse.data?.details as RenewContractSecretaryUpdate;
    //get secretary approval
    const getSecretaryApprovalResponse: CommonResponseDTO =
        await ContractEmployeeServices.getRenewContractSecretaryApproval(contractId);
    getSecretaryApproval =
        getSecretaryApprovalResponse.data?.details as RenewContractSuppAppApproval;
    //get renew contract document
    const getRenewContractDocumentResponse: CommonResponseDTO =
        await ContractEmployeeServices.getRenewContractUploadedDocument(contractId);
    getRenewContractDocument =
        getRenewContractDocumentResponse.data?.details as GetContractDocumentDTO



    const addPerformanceForm = await superValidate(zod(_addPerformanceSchema));
    const contractMeetingForm = await superValidate(getContractMeetingDetail, zod(_contractMeetingSchema), { errors: false })
    const contractSupporterApproverForm = await superValidate(getSupporterApprover, zod(_renewContractSupporterApproverSchema), { errors: false })
    const contractSupporterApprovalForm = await superValidate(getSupporterApproval, zod(_addContractCommonRoleResult), { errors: false })
    const contractApproverApprovalForm = await superValidate(getApproverApproval, zod(_addContractCommonRoleResult), { errors: false })
    const contractSecretaryUpdateForm = await superValidate(getSecretaryUpdate, zod(_renewContractSecretaryUpdateSchema), { errors: false });
    const contractSecretaryApprovalForm = await superValidate(getSecretaryApproval, zod(_addContractCommonRoleResult), { errors: false })
    const contractUploadDocument = await superValidate(zod(_contractDocumentSchema))

    return {
        currentRoleCode,
        contractId,
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
        addPerformanceForm,
        getContractPerformanceDetail,
        contractMeetingForm,
        contractSupporterApproverForm,
        contractSupporterApprovalForm,
        contractApproverApprovalForm,
        contractSecretaryUpdateForm,
        contractSecretaryApprovalForm,
        contractUploadDocument,
        getRenewContractDocument,
        getApproverApproval,
        contractDocLink,
        getRenewDocumentTemplate,
    }
}

export const _submitAddPerformanceForm = async (formData: RenewContractAddPerfomance) => {
    const form = await superValidate(formData, zod(_addPerformanceSchema))

    if (form.valid) {
        const response: CommonResponseDTO =
            await ContractEmployeeServices.addRenewContractPerformance(form.data);

        return { response }
    }
}

export const _submitContractMeetingForm = async (formData: RenewContractMeeting) => {
    const form = await superValidate(formData, zod(_contractMeetingSchema))

    if (form.valid) {
        const { name, isReadonly, ...tempObj } = form.data
        const response: CommonResponseDTO =
            await ContractEmployeeServices.addRenewContractMeeting(tempObj);

        return { response }
    }
}

export const _submitContractSupporterApproverForm = async (formData: RenewContractSupporterApprover) => {
    const form = await superValidate(formData, zod(_renewContractSupporterApproverSchema))

    if (form.valid) {
        const { id, isReadonly, ...tempObj } = form.data

        const response: CommonResponseDTO =
            await ContractEmployeeServices.addRenewContractSupporterApprover(tempObj);

        return { response }
    }
}

export const _submitContractSupporterApprovalForm = async (formData: RenewContractSuppAppApproval) => {
    const form = await superValidate(formData, zod(_addContractCommonRoleResult))

    if (form.valid) {
        const { name, isReadonly, ...tempObj } = form.data

        const response: CommonResponseDTO =
            await ContractEmployeeServices.addRenewContractSupporterApproval(tempObj);

        return { response }
    }
}

export const _submitContractApproverApprovalForm = async (formData: RenewContractSuppAppApproval) => {
    const form = await superValidate(formData, zod(_addContractCommonRoleResult))

    if (form.valid) {
        const { name, isReadonly, ...tempObj } = form.data

        const response: CommonResponseDTO =
            await ContractEmployeeServices.addRenewContractApproverApproval(tempObj);

        return { response }
    }
}

export const _submitContractSecretaryUpdateForm = async (formData: RenewContractSecretaryUpdate) => {
    const form = await superValidate(formData, zod(_renewContractSecretaryUpdateSchema))

    if (form.valid) {
        const { isReadonly, ...tempObj } = form.data

        const response: CommonResponseDTO =
            await ContractEmployeeServices.addRenewContractSecretaryUpdate(tempObj);

        return { response }
    }
}

export const _submitContractSecretaryApprovalForm = async (formData: RenewContractSuppAppApproval) => {
    const form = await superValidate(formData, zod(_addContractCommonRoleResult))

    if (form.valid) {
        const { name, isReadonly, ...tempObj } = form.data

        const response: CommonResponseDTO =
            await ContractEmployeeServices.addRenewContractSecretaryApproval(tempObj);

        return { response }
    }
}

export const _submitContractDocument = async (formData: string) => {

    const response: CommonResponseDTO =
        await ContractEmployeeServices.addRenewContractDocument(formData);

    return { response }
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
    // -------------------------------------------------------
    const suppAppResponse: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 10000,
        orderBy: "name",
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
    // -------------------------------------------------------
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

    const scaleLabel = [
        { name: 'Integriti' },
        { name: 'Kepimpinan/Penyeliaan' },
        { name: 'Kreatif dan Proaktif' },
        { name: 'Kawalan Diri' },
        { name: 'Jalinan Hubungan dan Kerjasama' },
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
        scaleLabel,
        supporterApproverLookup,
    }
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
                    },
                    isDraft: false,
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

const getContractDocumentLink = () => {
    const url = "http://localhost:3333/contracts/document/template"

    return url
}

