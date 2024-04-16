import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant";
import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import type { commonIdRequestDTO } from "$lib/dto/core/common/id-request.dto.js";
import type { DropdownDTO } from "$lib/dto/core/dropdown/dropdown.dto";
import type { ClinicCommonResult } from "$lib/dto/mypsm/perubatan/clinic-common-approval.dto";
import type { ClinicSetSupporterApprover } from "$lib/dto/mypsm/perubatan/clinic-common-supporter-approver.dto.js";
import type { MedicalClinicApplication } from "$lib/dto/mypsm/perubatan/permohonan-klinik/medical-clinic-application.dto";
import type { ClinicContract } from "$lib/dto/mypsm/perubatan/permohonan-klinik/medical-clinic-contract.dto";
import { _addClinicApplicationSchema, _addClinicContractSchema, _clinicCommonResultSchema, _clinicSupporterApproverSchema } from "$lib/schemas/mypsm/medical/medical-schema";
import { LookupServices } from "$lib/services/implementation/core/lookup/lookup.service";
import { MedicalServices } from "$lib/services/implementation/mypsm/perubatan/medical.service";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";

export const load = async ({ params }) => {
    let currentRoleCode = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode)
    const isViewOnly: boolean = getViewType(params.id)
    const clinicId: commonIdRequestDTO = {
        id: Number(params.id)
    }
    const lookup = await getLookup();
    let clinicDetail = {} as MedicalClinicApplication;
    let clinicContract = {} as ClinicContract;
    let clinicSecretaryApproval = {} as ClinicCommonResult;
    let clinicSupporterAndApprover = {} as ClinicSetSupporterApprover;
    let clinicSupporterApproval = {} as ClinicCommonResult;
    let clinicApproverApproval = {} as ClinicCommonResult;

    const clinicDetailResponse: CommonResponseDTO =
        await MedicalServices.getClinicApplicationDetail(clinicId);
    clinicDetail =
        clinicDetailResponse.data?.details as MedicalClinicApplication;

    const clinicContractResponse: CommonResponseDTO =
        await MedicalServices.getClinicContractDetail(clinicId)
    clinicContract =
        clinicContractResponse.data?.details as ClinicContract;

    const clinicSecretaryApprovalResponse: CommonResponseDTO =
        await MedicalServices.getClinicSecretaryApproval(clinicId)
    clinicSecretaryApproval =
        clinicSecretaryApprovalResponse.data?.details as ClinicCommonResult;

    const clinicSupporterAndApproverResponse: CommonResponseDTO =
        await MedicalServices.getClinicSupporterApprover(clinicId)
    clinicSupporterAndApprover =
        clinicSupporterAndApproverResponse.data?.details as ClinicSetSupporterApprover;

    const clinicSupporterApprovalResponse: CommonResponseDTO =
        await MedicalServices.getClinicSupporterApproval(clinicId);
    clinicSupporterApproval =
        clinicSupporterApprovalResponse.data?.details as ClinicCommonResult;

    const clinicApproverApprovalResponse: CommonResponseDTO =
        await MedicalServices.getClinicApproverApproval(clinicId);
    clinicApproverApproval =
        clinicApproverApprovalResponse.data?.details as ClinicCommonResult;

    //supervalidate
    const clinicContractForm = await superValidate(clinicContract, zod(_addClinicContractSchema), { errors: false });
    const secretaryApprovalForm = await superValidate(clinicSecretaryApproval, zod(_clinicCommonResultSchema), { errors: false });
    const supporterApproverForm = await superValidate(clinicSupporterAndApprover, zod(_clinicSupporterApproverSchema), { errors: false });
    const supporterApprovalForm = await superValidate(clinicSupporterApproval, zod(_clinicCommonResultSchema), { errors: false });
    const approverApprovalForm = await superValidate(clinicApproverApproval, zod(_clinicCommonResultSchema), { errors: false });
    return {
        currentRoleCode,
        clinicId,
        lookup,
        isViewOnly,
        clinicDetail,
        clinicContractForm,
        secretaryApprovalForm,
        supporterApproverForm,
        supporterApprovalForm,
        approverApprovalForm,
        clinicSupporterApproval,
        clinicApproverApproval,
        clinicSecretaryApproval,
    }
}

export const _submitClinicContractForm = async (formData: ClinicContract) => {
    const form = await superValidate(formData, zod(_addClinicContractSchema))

    if (form.valid) {
        const response: CommonResponseDTO =
            await MedicalServices.addClinicContract(form.data as ClinicContract)

        if (response.status == "success") {
            return { response }
        }
    }
}

export const _submitSecretaryApprovalForm = async (formData: ClinicCommonResult) => {
    const form = await superValidate(formData, zod(_clinicCommonResultSchema))

    if (form.valid) {
        const response: CommonResponseDTO =
            await MedicalServices.addClinicSecretaryApproval(form.data as ClinicCommonResult)

        if (response.status == "success") {
            return { response }
        }
    }
}

export const _submitSupporterApproverForm = async (formData: ClinicSetSupporterApprover) => {
    const form = await superValidate(formData, zod(_clinicSupporterApproverSchema))

    if (form.valid) {
        const response: CommonResponseDTO =
            await MedicalServices.addClinicSupporterApprover(form.data as ClinicSetSupporterApprover)

        if (response.status == "success") {
            return { response }
        }
    }
}

export const _submitSupporterApprovalForm = async (formData: ClinicCommonResult) => {
    const form = await superValidate(formData, zod(_clinicCommonResultSchema))

    if (form.valid) {
        const response: CommonResponseDTO =
            await MedicalServices.addClinicSupporterApproval(form.data as ClinicCommonResult)

        if (response.status == "success") {
            return { response }
        }
    }
}

export const _submitApproverApprovalForm = async (formData: ClinicCommonResult) => {
    const form = await superValidate(formData, zod(_clinicCommonResultSchema))

    if (form.valid) {
        const response: CommonResponseDTO =
            await MedicalServices.addClinicApproverApproval(form.data as ClinicCommonResult)

        if (response.status == "success") {
            return { response }
        }
    }
}

// =======================================================
// Dropdown Lookup =======================================
// =======================================================
const getLookup = async () => {
    // -------------------------------------------------------
    const cityLookupResponse: CommonResponseDTO =
        await LookupServices.getCityEnums();

    const cityLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(cityLookupResponse);
    // -------------------------------------------------------
    const districtLookupResponse: CommonResponseDTO =
        await LookupServices.getDistrictEnums();

    const districtLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(districtLookupResponse);
    // -------------------------------------------------------
    const suppAppResponse: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 350,
        orderBy: null,
        orderType: null,
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

    const supporterApproverLookup: DropdownDTO[] = LookupServices.setSelectOptionSupporterAndApproverBothAreName(
        supporterApproverResponse,
    );
    return {
        districtLookup,
        cityLookup,
        supporterApproverLookup,
    }

}

const getViewType = (viewType: string) => {
    if (viewType === "baru")
        return false
    else
        return true
}