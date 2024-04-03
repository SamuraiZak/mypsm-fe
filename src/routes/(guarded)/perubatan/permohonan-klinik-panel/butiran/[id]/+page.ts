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
    let clinicContract = {} as ClinicContract;
    let clinicSecretaryApproval = {} as ClinicCommonResult;
    let clinicSupporterAndApprover = {} as ClinicSetSupporterApprover;

    const clinicContractResponse: CommonResponseDTO = 
        await MedicalServices.getClinicContractDetail(clinicId)
    clinicContract = 
        clinicContractResponse.data?.details as ClinicContract;
    // TODO: Get clinicSecretaryApproval
    // TODO: Get clinicApplicationDetail
    const clinicSupporterAndApproverResponse: CommonResponseDTO =
        await MedicalServices.getClinicSupporterApprover(clinicId)
    clinicSupporterAndApprover =
        clinicSupporterAndApproverResponse.data?.details as ClinicSetSupporterApprover;

    //supervalidate
    const clinicApplicationForm = await superValidate(zod(_addClinicApplicationSchema));
    const clinicContractForm = await superValidate(clinicContract,zod(_addClinicContractSchema), {errors: false});
    const secretaryApprovalForm = await superValidate(zod(_clinicCommonResultSchema));
    const supporterApproverForm = await superValidate(clinicSupporterAndApprover, zod(_clinicSupporterApproverSchema), {errors: false});
    return {
        currentRoleCode,
        clinicId,
        lookup,
        isViewOnly,
        clinicApplicationForm,
        clinicContractForm,
        secretaryApprovalForm,
        supporterApproverForm,
    }
}

export const _submitClinicApplicationForm = async (formData: MedicalClinicApplication) => {
    const form = await superValidate(formData, zod(_addClinicApplicationSchema))

    if (form.valid) {
        const response: CommonResponseDTO =
            await MedicalServices.addClinicApplication(form.data as MedicalClinicApplication)

        if (response.status == "success") {
            return { response }
        }
    }
}

export const _submitClinicContractForm = async (formData: ClinicContract) => {
    const form = await superValidate(formData, zod(_addClinicContractSchema))

    if(form.valid){
        const response: CommonResponseDTO =
            await MedicalServices.addClinicContract(form.data as ClinicContract)

            if(response.status == "success"){
                return { response }
            }
    }
}

export const _submitSecretaryApprovalForm = async (formData: ClinicCommonResult) => {
    const form = await superValidate(formData, zod(_clinicCommonResultSchema))

    if(form.valid){
        const response: CommonResponseDTO =
            await MedicalServices.addClinicSecretaryApproval(form.data as ClinicCommonResult)

            if(response.status == "success"){
                return { response }
            }
    }
}
export const _submitSupporterApproverForm = async (formData: ClinicSetSupporterApprover) => {
    const form = await superValidate(formData, zod(_clinicSupporterApproverSchema))

    if(form.valid){
        const response: CommonResponseDTO =
            await MedicalServices.addClinicSupporterApprover(form.data as ClinicSetSupporterApprover)

            if(response.status == "success"){
                return { response }
            }
    }
}

// =======================================================
// Dropdown Lookup =======================================
// =======================================================
const getLookup = async () => {
    // -------------------------------------------------------
    const stateLookupResponse: CommonResponseDTO =
        await LookupServices.getStateEnums();
    const stateLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(stateLookupResponse)
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
        stateLookup,
        cityLookup,
        countryLookup,
        supporterApproverLookup,
    }

}

const getViewType = (viewType: string) => {
    if (viewType === "baru")
        return false
    else
        return true
}