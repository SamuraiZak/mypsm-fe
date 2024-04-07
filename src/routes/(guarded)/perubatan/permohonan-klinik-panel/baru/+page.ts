import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant";
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import type { DropdownDTO } from "$lib/dto/core/dropdown/dropdown.dto";
import type { MedicalClinicApplication } from "$lib/dto/mypsm/perubatan/permohonan-klinik/medical-clinic-application.dto";
import { _addClinicApplicationSchema, _addClinicContractSchema, _clinicCommonResultSchema, _clinicSupporterApproverSchema } from "$lib/schemas/mypsm/medical/medical-schema";
import { LookupServices } from "$lib/services/implementation/core/lookup/lookup.service";
import { MedicalServices } from "$lib/services/implementation/mypsm/perubatan/medical.service";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";

export const load = async () => {
    let currentRoleCode = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode)

    const lookup = await getLookup();

    //supervalidate
    const clinicApplicationForm = await superValidate(zod(_addClinicApplicationSchema));

    return {
        currentRoleCode,
        lookup,
        clinicApplicationForm,
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
    const districtLookupResponse: CommonResponseDTO =
        await LookupServices.getDistrictEnums();

    const districtLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(districtLookupResponse);

    return {
        stateLookup,
        cityLookup,
        districtLookup,
    }
}