import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import type { DropdownDTO } from "$lib/dto/core/dropdown/dropdown.dto";
import type { ClinicPanelProfile } from "$lib/dto/mypsm/perubatan/clinic-panel-profile.dto";
import { _editClinicProfileSchema } from "$lib/schemas/mypsm/medical/medical-schema";
import { LookupServices } from "$lib/services/implementation/core/lookup/lookup.service";
import { MedicalServices } from "$lib/services/implementation/mypsm/perubatan/medical.service";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";

export const load = async () => {
    let profile = {} as ClinicPanelProfile;
    let lookup = await getLookup();

    const clinicPanelProfileResponse: CommonResponseDTO =
        await MedicalServices.getClinicPanelProfile()
    profile =
        clinicPanelProfileResponse.data?.details as ClinicPanelProfile;

    const clinicPanelProfile = await superValidate(profile, zod(_editClinicProfileSchema), {errors: false})
    
    return {
        clinicPanelProfile,
        lookup,
    }
}

export const _submit = async (formData: ClinicPanelProfile) => {
    const form = await superValidate(formData, zod(_editClinicProfileSchema));
    if (form.valid) {

        let response: CommonResponseDTO = {}

        response = await MedicalServices.editClinicPanelProfile(form.data as ClinicPanelProfile
        )
        if (response.status == 'success') {

            return response
        }
    }
};

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